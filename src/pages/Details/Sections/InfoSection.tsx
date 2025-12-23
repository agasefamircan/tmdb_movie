import { type FC } from 'react';
import { Box, Container, Grid, Typography, Divider } from '@mui/material';
import type { InfoSectionProps } from '../../../types/detailsPage';

const Item = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;

  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {value}
      </Typography>
    </Box>
  );
};

const InfoSection: FC<InfoSectionProps> = ({ data, type }) => {
  const isMovie = type === 'movie';

  return (
    <Box sx={{ bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Overview
            </Typography>

            <Typography sx={{ lineHeight: 1.8 }}>
              {data.overview || 'No overview available.'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Details
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Item label="Release date" value={data.release_date || data.first_air_date} />
              </Grid>

              <Grid item xs={6}>
                <Item label="Status" value={data.status} />
              </Grid>

              {isMovie && (
                <>
                  <Grid item xs={6}>
                    <Item
                      label="Budget"
                      value={data.budget ? `$${data.budget.toLocaleString()}` : undefined}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Item
                      label="Revenue"
                      value={data.revenue ? `$${data.revenue.toLocaleString()}` : undefined}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <Item
                  label="Production countries"
                  value={data.production_countries?.map((c: any) => c.name).join(', ')}
                />
              </Grid>

              <Grid item xs={12}>
                <Item
                  label="Languages"
                  value={data.spoken_languages?.map((l: any) => l.english_name).join(', ')}
                />
              </Grid>

              {!isMovie && (
                <>
                  <Grid item xs={6}>
                    <Item label="Seasons" value={String(data.number_of_seasons)} />
                  </Grid>

                  <Grid item xs={6}>
                    <Item label="Episodes" value={String(data.number_of_episodes)} />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InfoSection;
