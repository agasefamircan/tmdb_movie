import { type FC } from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';
import type { CrewMember, CrewSectionProps } from '../../../types/detailsPage';

const CrewSection: FC<CrewSectionProps> = ({ crew }) => {
  if (!crew.length) return null;

  const roles = ['Director', 'Producer', 'Writer'];
  const filteredCrew = crew.filter((c) => roles.includes(c.job));

  const grouped: Record<string, CrewMember[]> = {};
  filteredCrew.forEach((c) => {
    if (!grouped[c.job]) grouped[c.job] = [];
    grouped[c.job].push(c);
  });

  return (
    <Box sx={{ py: 2, bgcolor: 'background.default' }}>
      <Container maxWidth="xl">
        <Typography variant="h5" gutterBottom>
          Crew
        </Typography>

        <Stack spacing={2}>
          {Object.entries(grouped).map(([job, members]) => (
            <Box key={job}>
              <Typography variant="subtitle1" fontWeight={600}>
                {job}
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {members.map((m) => (
                  <Typography
                    key={m.id}
                    variant="body2"
                    sx={{
                      bgcolor: 'grey.200',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    {m.name}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default CrewSection;
