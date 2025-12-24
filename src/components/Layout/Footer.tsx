import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import { FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 10,
        backgroundColor: '#032541',
        color: '#fff',
        textAlign: 'center',
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          TMDB Style Movie
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          &copy; {currentYear} by{' '}
          <Link
            aria-label="Github link"
            href="https://github.com/agasefamircan"
            target="_blank"
            color="inherit"
            underline="hover"
          >
            Agasaf
          </Link>
        </Typography>
        <Box>
          <Link aria-label="Github link" href="https://github.com/agasefamircan" color="inherit">
            <FaGithub size={24} />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
