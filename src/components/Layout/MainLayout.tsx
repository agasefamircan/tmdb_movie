import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Box } from '@mui/material';

const MainLayout: React.FC = () => {
  return (
    <div>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </div>
  );
};

export default MainLayout;
