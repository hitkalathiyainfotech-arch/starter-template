import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);
  const [bgImage, setBgImage] = useState('');

  const images = [
    'https://images.unsplash.com/photo-1529788295308-1eace6f67388?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjU4MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjU5NzAyNTB8&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1701690775399-07b302a83f8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjU4MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjU5NzAzNDZ8&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1654263391025-4c4809a37f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjU4MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjU5NzAzODJ8&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1517052269751-4ae3ad86cc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjU4MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjU5NzA0MDN8&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1516801967339-cb50a3ce7781?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjU4MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjU5NzA0NDN8&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1639921884918-8d28ab2e39a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjU4MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjU5NzA0ODV8&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1656077217715-bdaeb06bd01f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjU4MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjU5NzA1MTF8&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MjU4MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjU5NzA1NDV8&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setBgImage(images[randomIndex]);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => {
      clearInterval(countdown);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        textShadow: '2px 2px 10px rgba(0,0,0,0.7)',
        p: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: { xs: '6rem', md: '10rem' }, fontWeight: 'bold' }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Oops! You are lost in space.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you are looking for does not exist.
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Redirecting to home in {count} seconds...
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go Home Now
      </Button>
    </Box>
  );
};

export default NotFound;
