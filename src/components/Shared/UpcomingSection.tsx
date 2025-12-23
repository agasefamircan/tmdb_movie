import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useGetUpcomingQuery } from '../../api/tmdb/moviesApi';
import UpcomingCard from '../Cards/UpcomingCard';
import { useI18n } from '../../app/providers/I18nProvider';
import { getApiLanguage } from '../../helper/getApiLang';

const UpcomingSection = () => {
  const { language } = useI18n()!;
  const apiLanguage = getApiLanguage(language);

  const { t } = useI18n()!;

  const { data, isLoading } = useGetUpcomingQuery({ language: apiLanguage });
  const items = data?.results || [];

  const [bgImage, setBgImage] = useState<string | null>(null);

  return (
    <Box
      sx={{
        mt: 6,
        py: 6,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#030b17',
      }}
    >
      {bgImage && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 0.5s ease, opacity 0.5s ease',
            zIndex: 0,
          }}
        />
      )}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
      linear-gradient(
        180deg,
        rgba(0,0,0,0.25) 0%,
        rgba(0,0,0,0.35) 45%,
        rgba(0,0,0,0.6) 100%
      )
    `,
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="h4" fontWeight={800} color="white" sx={{ mb: 3 }}>
          {t('upcomingTrailers.title')}
        </Typography>

        {isLoading ? (
          <Typography color="white">Loading...</Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              py: 3,
              scrollSnapType: 'x mandatory',

              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#e5e7eb',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#9ca3af',
                borderRadius: '10px',
              },
            }}
          >
            {items.map((item: any) => (
              <Box key={item.id} sx={{ scrollSnapAlign: 'start' }}>
                <UpcomingCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  backdropPath={item.backdrop_path}
                  releaseDate={item.release_date}
                  onHover={setBgImage}
                />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default UpcomingSection;
