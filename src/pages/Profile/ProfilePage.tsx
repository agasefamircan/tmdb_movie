import { NavLink, Outlet } from 'react-router-dom';
import { Box, Avatar, Typography, Stack, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { useGetAccountQuery } from '../../api/tmdb/accountApi';
import { linkStyle } from '../../styles/ProfilePageLink';
import { usePageTitle } from '../../hooks/usePageTitle';

const ProfilePage = () => {
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);

  usePageTitle('Profile');

  const { data: account } = useGetAccountQuery(sessionId!, {
    skip: !sessionId,
  });

  const avatarSrc = account?.avatar?.tmdb?.avatar_path
    ? `https://image.tmdb.org/t/p/w185${account.avatar.tmdb.avatar_path}`
    : undefined;

  const avatarFallback = account?.username?.charAt(0).toUpperCase();

  return (
    <>
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(135deg, #032541 0%, #0d253f 100%)',
          mb: 4,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 0,
              background: 'transparent',
              color: '#fff',
            }}
          >
            <Stack direction="row" spacing={3} alignItems="center">
              <Avatar
                src={avatarSrc}
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: avatarSrc ? 'transparent' : '#01b4e4',
                  fontSize: 32,
                  fontWeight: 600,
                }}
              >
                {!avatarSrc && avatarFallback}
              </Avatar>

              <Box>
                <Typography variant="h5" fontWeight={600}>
                  {account?.username}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  TMDB Profile
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        <Stack
          direction="row"
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            mb: 4,
          }}
        >
          <NavLink to="favorites" style={linkStyle}>
            Favorites
          </NavLink>
          <NavLink to="watchlist" style={linkStyle}>
            Watchlist
          </NavLink>
          <NavLink to="ratings" style={linkStyle}>
            Ratings
          </NavLink>
        </Stack>

        <Outlet />
      </Box>
    </>
  );
};

export default ProfilePage;
