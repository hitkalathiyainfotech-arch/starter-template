// /components/Layout.jsx
import React from 'react';
import SideBar from './SideBar.jsx';
import { AppBar, Box, Toolbar, Typography, IconButton, Avatar, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dashboard from './Dashboard.jsx';

const Layout = ({ children, title = 'Dashboard', showAppBar = true }) => {

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      <SideBar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {showAppBar && (
          <AppBar
            position="static"
            sx={{
              bgcolor: '#fff',
              color: '#000',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6">Dashboard</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton>
                  <Badge badgeContent={5} color="primary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>
              </Box>
            </Toolbar>
          </AppBar>
        )
        }
        <Box
          sx={{
            flexGrow: 1,
            width: '100%',
            bgcolor: '#fff',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            p: 3,
          }}
        >
          {children}
        </Box>

      </Box>
    </Box>
  );
};

export default Layout;
