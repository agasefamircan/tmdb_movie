import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useGetTopRatedQuery } from '../../api/tmdb/moviesApi';
import MediaCard from '../Cards/MediaCard';
import TrendingSectionSkeleton from '../common/TrendingSectionSkeleton';
import { useI18n } from '../../app/providers/I18nProvider';
import { getApiLanguage } from '../../helper/getApiLang';

const TopRatedSection = () => {
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { t } = useI18n()!;

  const { language } = useI18n()!;
  const apiLanguage = getApiLanguage(language);

  const { data, isLoading, isError } = useGetTopRatedQuery({
    type: mediaType,
    language: apiLanguage,
  });

  const items = data?.results || [];

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [mediaType]);

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" fontWeight={800}>
          {mediaType === 'movie' ? t('topRated.movies') : t('topRated.tv')}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 1,
            padding: '4px',
            borderRadius: '999px',
            background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
          }}
        >
          {(['movie', 'tv'] as const).map((type) => {
            const active = mediaType === type;

            return (
              <Box
                key={type}
                onClick={() => setMediaType(type)}
                sx={{
                  px: 3,
                  py: 0.8,
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 14,
                  position: 'relative',
                  color: active ? '#0f172a' : '#475569',
                  background: active
                    ? 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
                    : 'transparent',
                  boxShadow: active ? '0 4px 10px rgba(0,0,0,0.08)' : 'none',
                  transition: 'background 0.35s ease, color 0.25s ease, box-shadow 0.35s ease',
                  '&:hover': {
                    color: '#0f172a',
                  },
                }}
              >
                {type === 'movie' ? 'Movie' : 'TV'}
              </Box>
            );
          })}
        </Box>
      </Box>

      {isLoading && <TrendingSectionSkeleton />}
      {isError && <Typography color="error">Error loading content.</Typography>}

      {!isLoading && !isError && (
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            py: 3,
            scrollSnapType: 'x mandatory',

            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-track': {
              background: '#e5e7eb',
              borderRadius: 10,
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#94a3b8',
              borderRadius: 10,
            },
          }}
        >
          {items.map((item: any) => (
            <Box key={item.id} sx={{ scrollSnapAlign: 'start' }}>
              <MediaCard
                id={item.id}
                title={item.title || item.name}
                posterPath={item.poster_path}
                rating={item.vote_average}
                releaseDate={item.release_date || item.first_air_date}
                type={mediaType}
              />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default React.memo(TopRatedSection);
