import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Typography, Chip, Rating, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import type { FC } from 'react';
import { getImageUrl, getTmdbImageUrl } from '../../../utils/imageUrl';
import type { HeroSectionProps } from '../../../types/detailsPage';
import { usePageTitle } from '../../../hooks/usePageTitle';

const HeroSection: FC<HeroSectionProps> = ({ data, type }) => {
  const navigate = useNavigate();

  const title = data.title || data.name;
  const originalTitle = data.original_title || data.original_name;
  const year = (data.release_date || data.first_air_date || '').slice(0, 4);

  usePageTitle(title);

  const runtime = data.runtime
    ? `${data.runtime} min`
    : data.number_of_seasons
      ? `${data.number_of_seasons} seasons`
      : null;

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 420,
        backgroundImage: `url(${getImageUrl(data.backdrop_path)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: 8, pb: 6 }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={4} lg={3}>
            <Box
              component="img"
              src={getTmdbImageUrl(data.poster_path) || ""}
              alt={title}
              sx={{
                width: '100%',
                maxWidth: 250,
                borderRadius: 2,
                boxShadow: '0 15px 30px rgba(0,0,0,.6)',
              }}
            />
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
              {title}{' '}
              {year && (
                <Typography component="span" variant="h5" sx={{ opacity: 0.8 }}>
                  ({year})
                </Typography>
              )}
            </Typography>

            {originalTitle && originalTitle !== title && (
              <Typography variant="subtitle2" sx={{ opacity: 0.7, mb: 1 }}>
                Original title: {originalTitle}
              </Typography>
            )}

            <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Rating
                  value={data.vote_average / 2}
                  precision={0.1}
                  readOnly
                  icon={<StarIcon fontSize="inherit" />}
                  emptyIcon={<StarIcon fontSize="inherit" />}
                />
                <Typography fontWeight={600}>{data.vote_average.toFixed(1)}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  ({data.vote_count} votes)
                </Typography>
              </Stack>

              {runtime && (
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  {runtime}
                </Typography>
              )}

              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Status: {data.status}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
              {data.genres?.map((genre: any) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  clickable
                  sx={{
                    bgcolor: 'rgba(255,255,255,.15)',
                    color: '#fff',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,.25)',
                    },
                  }}
                  onClick={() =>
                    navigate(
                      `/genre/${genre.id}-${genre.name.toLowerCase().replace(/\s+/g, '-')}/${type}`
                    )
                  }
                />
              ))}
            </Stack>

            {data.tagline && (
              <Typography variant="subtitle1" sx={{ mb: 2, fontStyle: 'italic', opacity: 0.85 }}>
                “{data.tagline}”
              </Typography>
            )}

            <Typography sx={{ lineHeight: 1.6, maxWidth: 850 }}>{data.overview}</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
