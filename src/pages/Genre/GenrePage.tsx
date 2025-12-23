import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Container, Pagination } from '@mui/material';
import { getTmdbImageUrl } from '../../utils/imageUrl';
import { useGetByGenreQuery } from '../../api/tmdb/moviesApi';
import { useI18n } from '../../app/providers/I18nProvider';
import { getApiLanguage } from '../../helper/getApiLang';
import { usePageTitle } from '../../hooks/usePageTitle';

const GenrePage = () => {
  const navigate = useNavigate();

  const { language } = useI18n()!;
  const apiLanguage = getApiLanguage(language);

  const { genreId, type } = useParams<{
    genreId: string;
    type: 'movie' | 'tv';
  }>();

  const [idPart, genreSlug] = genreId?.split('-') || [];
  const numGenre = Number(idPart);

  usePageTitle(genreSlug);

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [genreId, type]);

  const { data, isLoading } = useGetByGenreQuery({
    genreId: numGenre,
    type: type!,
    page,
    language: apiLanguage,
  });

  if (isLoading) return null;

  const totalPages = Math.min(data?.total_pages || 1, 500);

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Container maxWidth="lg">
        <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight={700}>
            {genreSlug ? genreSlug.replace(/-/g, ' ').replace(/\b\w/, (c) => c.toUpperCase()) : ''}·{' '}
            {type ? type.charAt(0).toUpperCase() + type.slice(1) : ''}
          </Typography>

          <Box
            onClick={() => navigate(`/genre/${genreId}/${type === 'movie' ? 'tv' : 'movie'}`)}
            sx={{
              cursor: 'pointer',
              fontWeight: 700,
              px: 2,
              py: 0.5,
              borderRadius: 1,
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {type === 'movie' ? 'Tv shows' : 'Movies'}
          </Box>
        </Box>

        <Grid container spacing={3}>
          {data?.results?.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} lg={12} key={item.id}>
              <Box
                onClick={() => navigate(`/${type}/${item.id}`)}
                sx={{
                  display: 'flex',
                  gap: 2,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  cursor: 'pointer',
                  transition: '0.2s',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                  },
                }}
              >
                <Box
                  component="img"
                  src={
                    item.poster_path ? (getTmdbImageUrl(item.poster_path) ?? undefined) : undefined
                  }
                  alt={item.title || item.name}
                  sx={{
                    width: 90,
                    height: 135,
                    borderRadius: 1,
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />

                <Box sx={{ minWidth: 0 }}>
                  <Typography fontWeight={700} noWrap>
                    {item.title || item.name}
                  </Typography>

                  <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                    {item.release_date || item.first_air_date || '—'}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {item.overview || 'Overview not found.'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, num) => setPage(num)}
              color="primary"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default GenrePage;
