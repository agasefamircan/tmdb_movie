import { type FC } from 'react';
import { Box, Container, Typography, Avatar, Stack } from '@mui/material';
import { getTmdbImageUrl } from '../../../utils/imageUrl';
import type { CastSectionProps } from '../../../types/detailsPage';

const CastSection: FC<CastSectionProps> = ({ cast }) => {
  if (!cast.length) return null;

  return (
    <Box sx={{ py: 5 }}>
      <Container>
        <Typography variant="h5" gutterBottom>
          Top Billed Cast
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'rgba(0,0,0,.3)',
              borderRadius: 3,
            },
          }}
        >
          {cast.slice(0, 15).map((actor) => (
            <Box
              key={actor.id}
              sx={{
                minWidth: 140,
                flexShrink: 0,
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <Avatar
                src={ getTmdbImageUrl(actor.profile_path) ?? "undefined"}
                alt={actor.name}
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 1,
                  boxShadow: 2,
                }}
              />

              <Stack spacing={0.5}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {actor.name}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {actor.character}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CastSection;
