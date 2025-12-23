import { Button, Container, Typography } from '@mui/material';
import { useCreateRequestTokenQuery } from '../../api/tmdb/authApi';
import { usePageTitle } from '../../hooks/usePageTitle';

const LoginPage = () => {
  const { data } = useCreateRequestTokenQuery();

  usePageTitle('Login');

  const handleLogin = () => {
    if (!data?.request_token) return;

    const redirectUrl = encodeURIComponent(`${window.location.origin}/auth/callback`);

    window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${redirectUrl}`;
  };

  return (
    <Container sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Login to your TMDB account
      </Typography>

      <Button variant="contained" size="large" onClick={handleLogin}>
        Login with TMDB
      </Button>
    </Container>
  );
};

export default LoginPage;
