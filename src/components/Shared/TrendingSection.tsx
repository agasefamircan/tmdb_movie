import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useGetTrendingQuery } from '../../api/tmdb/moviesApi';
import { useI18n } from '../../app/providers/I18nProvider';
import TrendingSectionSkeleton from '../common/TrendingSectionSkeleton';
import MediaCard from '../Cards/MediaCard';
import { getApiLanguage } from '../../helper/getApiLang';

const TrendingSection = ({ title, type }: any) => {
  const [period, setPeriod] = useState<'day' | 'week'>('day');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [period]);

  const { t } = useI18n()!;

  const { language } = useI18n()!;
  const apiLanguage = getApiLanguage(language);

  const { data, isLoading, isError } = useGetTrendingQuery({ type, period, language: apiLanguage });
  const items = data?.results || [];

  const handlePeriodChange = useCallback(
    (p: 'day' | 'week') => {
      if (p !== period) setPeriod(p);
    },
    [period]
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          {t(title)}
        </Typography>

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            borderRadius: '30px',
            border: '1px solid #0f4c81',
            overflow: 'hidden',
            width: 200,
            height: 36,
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: period === 'day' ? 0 : '50%',
              width: '50%',
              height: '100%',
              background: '#07121bff',
              borderRadius: '30px',
              transition: 'left 0.3s ease',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              zIndex: 1,
              color: '#0f4c81',
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            <Box
              onClick={() => handlePeriodChange('day')}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: period === 'day' ? '#1ED5A9' : '#032541',
                transition: 'color 0.3s ease',
              }}
            >
              {t('trending.today')}
            </Box>
            <Box
              onClick={() => handlePeriodChange('week')}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: period === 'week' ? '#1ED5A9' : '#032541',
                transition: 'color 0.3s ease',
              }}
            >
              {t('trending.thisWeek')}
            </Box>
          </Box>
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
          {items.map((item:any) => (
            <Box key={item.id} sx={{ scrollSnapAlign: 'start' }}>
              <MediaCard
                id={item.id}
                title={item.title || item.name}
                posterPath={item.poster_path}
                rating={item.vote_average}
                releaseDate={item.release_date || item.first_air_date}
                type={item.media_type || 'movie'}
              />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default React.memo(TrendingSection);
