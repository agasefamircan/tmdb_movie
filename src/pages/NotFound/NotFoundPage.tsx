import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../../hooks/usePageTitle';

const NotFoundPage = () => {
  usePageTitle('Not Found');
  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography variant="h1" fontWeight={700} sx={{ color: 'primary.main' }}>
          404
        </Typography>

        <Typography variant="h6">Oops! This page went missing 🎬</Typography>

        <Typography variant="body2" color="text.secondary">
          The page you’re looking for doesn’t exist or has been moved.
        </Typography>

        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFoundPage;
