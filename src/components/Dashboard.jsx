import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Layout from './Layout.jsx';

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Paper
          elevation={2}
          sx={{
            width: '90%',
            maxWidth: 800,
            p: 4,
            borderRadius: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 500 }}>
            Welcome to the Dashboard
          </Typography>
          <Typography color="text.secondary">
            This is your main dashboard content area. Add charts, tables, or widgets here.
          </Typography>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Dashboard;
