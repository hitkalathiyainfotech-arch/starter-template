import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Grid, Avatar, Typography, TextField, IconButton, List, ListItem,
  ListItemAvatar, ListItemText, Divider, Paper, InputAdornment, useMediaQuery
} from '@mui/material';
import {
  Send as SendIcon, Search as SearchIcon, AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon, SentimentSatisfiedAlt as EmojiIcon, DoneAll as DoneAllIcon
} from '@mui/icons-material';
import Layout from '../Layout.jsx';
import { io } from 'socket.io-client';

const base_url = "https://chat-backend-nu-puce.vercel.app";

// Initialize socket outside the component to prevent multiple connections on re-render
const socket = io(base_url);

const THEME = {
  chatBg: '#e5ddd5',
  sidebarBg: '#ffffff',
  myBubble: '#d9fdd3',
  theirBubble: '#ffffff',
  primary: '#00a884',
  textMain: '#111b21',
  textDim: '#667781',
  border: '#f0f0f0'
};

const INITIAL_CONTACTS = [
  { id: 1, name: 'Unkown user', online: true, lastMsg: 'See you tomorrow!' },
];

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState(INITIAL_CONTACTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const chatEndRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:768px)');

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  // Handle incoming messages
  useEffect(() => {
    socket.on('chat message', (msg) => {
      if(!msg.text) return;
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  // Scroll whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: input,
      sender: socket.id, // helpful for identifying who sent what
      isMe: true, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Send to server
    socket.emit('chat message', newMsg);
    
    // Clear input
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredContacts = INITIAL_CONTACTS.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showSidebar = !isMobile || sidebarOpen;

  return (
    <Layout>
      <Box sx={{ height: '100%', width: '100%', display: 'flex', overflow: 'hidden', userSelect: 'none' }}>
        <Grid container sx={{ height: '100%', width: '100%' }}>
          
          {/* SIDEBAR */}
          {showSidebar && (
            <Grid item sx={{
                width: isMobile ? '100%' : '25%',
                position: isMobile ? 'absolute' : 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: THEME.sidebarBg,
                borderRight: isMobile ? 'none' : `1px solid ${THEME.border}`,
                height: '100%',
              }}
            >
              <Box p={2}>
                <TextField
                  fullWidth size="small" placeholder="Search or start new chat"
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
                    ),
                    sx: { borderRadius: 2, bgcolor: '#f0f2f5', '& fieldset': { border: 'none' } }
                  }}
                />
              </Box>
              <Divider />
              <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
                {filteredContacts.map(contact => (
                  <React.Fragment key={contact.id}>
                    <ListItem disablePadding>
                      <Box
                        onClick={() => {
                          setSelectedContact(contact);
                          if (isMobile) setSidebarOpen(false);
                        }}
                        sx={{
                          width: '100%', display: 'flex', alignItems: 'center', py: 1.5, pl: 2, cursor: 'pointer',
                          borderLeft: selectedContact.id === contact.id ? `4px solid ${THEME.primary}` : '4px solid transparent',
                          bgcolor: selectedContact.id === contact.id ? '#f5f6f6' : 'transparent',
                          '&:hover': { bgcolor: '#f9f9f9' }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: contact.id % 2 === 0 ? '#53bdeb' : THEME.primary }}>
                            {contact.name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{contact.name}</Typography>}
                          secondary={<Typography noWrap variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>{contact.lastMsg}</Typography>}
                        />
                      </Box>
                    </ListItem>
                    <Divider sx={{ ml: '72px', opacity: 0.5 }} />
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          )}

          {/* MAIN CHAT */}
          <Grid item xs sx={{
              display: 'flex', flexDirection: 'column', minWidth: "75%", bgcolor: THEME.chatBg,
              marginLeft: isMobile && sidebarOpen ? 0 : 'auto',
            }}
          >
            {/* Header */}
            <Paper square elevation={0} sx={{
                p: '10px 16px', display: 'flex', alignItems: 'center', bgcolor: '#fff',
                borderBottom: `1px solid ${THEME.border}`
              }}
            >
              {isMobile && (
                <IconButton onClick={() => setSidebarOpen(true)}><MoreVertIcon /></IconButton>
              )}
              <Avatar sx={{ mr: 2, bgcolor: selectedContact.id % 2 === 0 ? '#53bdeb' : THEME.primary }}>
                {selectedContact.name.charAt(0)}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>{selectedContact.name}</Typography>
                <Typography variant="caption" sx={{ color: selectedContact.online ? THEME.primary : THEME.textDim }}>
                  {selectedContact.online ? 'online' : 'offline'}
                </Typography>
              </Box>
            </Paper>

            {/* Messages Area */}
            <Box sx={{
                flex: '1 1 auto', p: 2, overflowY: 'auto',
                backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                backgroundSize: '300px'
              }}
            >
              {messages.map((msg) => (
                <MessageBubble 
                  key={msg.id} 
                  text={msg.text} 
                  // If the message was sent by us (compare IDs), show on right
                  isMe={msg.sender === socket.id} 
                  time={msg.time} 
                />
              ))}
              <div ref={chatEndRef} />
            </Box>

            {/* Input Footer */}
            <Box sx={{ p: '8px 10px', bgcolor: '#f0f2f5', display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton size="small"><EmojiIcon sx={{ color: '#54656f' }} /></IconButton>
              <IconButton size="small"><AttachFileIcon sx={{ color: '#54656f', transform: 'rotate(45deg)' }} /></IconButton>
              
              <Paper elevation={0} sx={{ flexGrow: 1, px: 2, py: '6px', borderRadius: 2, bgcolor: '#fff' }}>
                <TextField
                  fullWidth variant="standard" placeholder="Type a message"
                  value={input} onChange={e => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputProps={{ disableUnderline: true }}
                />
              </Paper>
              
              <IconButton
                onClick={handleSend}
                disabled={!input.trim()}
                sx={{
                  bgcolor: input.trim() ? THEME.primary : 'transparent',
                  color: input.trim() ? '#fff' : '#54656f',
                  '&:hover': { bgcolor: THEME.primary }
                }}
              >
                <SendIcon fontSize="medium" sx={{ transform: "rotate(-30deg)" }} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

const MessageBubble = ({ text, isMe, time }) => (
  <Box sx={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', mb: 1.5 }}>
    <Paper elevation={1} sx={{
        p: '8px 12px', maxWidth: '80%',
        borderRadius: isMe ? '10px 0 10px 10px' : '0 10px 10px 10px',
        bgcolor: isMe ? THEME.myBubble : THEME.theirBubble,
      }}
    >
      <Typography variant="body2" sx={{ color: THEME.textMain, pr: isMe ? 2 : 0 }}>
        {text}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 0.5 }}>
        <Typography variant="caption" sx={{ color: THEME.textDim, fontSize: '0.65rem', mr: 0.5 }}>{time}</Typography>
        {isMe && <DoneAllIcon sx={{ fontSize: '1rem', color: '#53bdeb' }} />}
      </Box>
    </Paper>
  </Box>
);

export default Chat;