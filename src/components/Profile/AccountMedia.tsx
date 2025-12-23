import { Grid, Tabs, Tab, Box, Paper, Typography } from '@mui/material';
import { useState, type FC } from 'react';
import MediaCard from '../Cards/MediaCard';
import type { AccountMediaProps, AccountSection } from '../../types/common';

const SECTION_TITLE: Record<AccountSection, string> = {
  favorites: 'My Favorites',
  ratings: 'My Ratings',
  watchlist: 'My Watchlist',
};
const AccountMedia: FC<AccountMediaProps> = ({ movieData, tvData, section }) => {
  const [tab, setTab] = useState<'movie' | 'tv'>('movie');

  const items = tab === 'movie' ? movieData?.results : tvData?.results;

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        bgcolor: 'background.default',
      }}
    >
      <Box
        mb={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          {SECTION_TITLE[section]}
        </Typography>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ minHeight: 'auto' }}
        >
          <Tab value="movie" label="Movies" />
          <Tab value="tv" label="TV Shows" />
        </Tabs>
      </Box>

      {!items?.length && (
        <Box textAlign="center">
          <Typography variant="h6" color="text.secondary">
            {section === 'favorites' && 'You haven’t added any favorites yet.'}
            {section === 'ratings' && 'You haven’t rated any movies or TV shows yet.'}
            {section === 'watchlist' && 'Your watchlist is currently empty.'}
          </Typography>
        </Box>
      )}

      <Grid container spacing={2}>
        {items?.map((item: any) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
            <MediaCard
              id={item.id}
              type={tab}
              title={item.title || item.name}
              posterPath={item.poster_path}
              rating={item.vote_average}
              releaseDate={item.release_date || item.first_air_date}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default AccountMedia;
