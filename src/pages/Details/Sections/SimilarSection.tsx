import { Box, Typography, Container } from '@mui/material';
import MediaCard from '../../../components/Cards/MediaCard';

const SimilarSection = ({ data, type }: any) => (
  <Box sx={{ mt: 6, py: 5 }}>
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        Similar
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          justifyContent: 'center',
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
        }}
      >
        {data.map((item: any) => (
          <Box key={item.id} sx={{ minWidth: 160, flex: '0 0 auto' }}>
            <MediaCard
              id={item.id}
              title={item.title || item.name}
              posterPath={item.poster_path}
              rating={item.vote_average}
              releaseDate={item.release_date}
              type={type}
            />
          </Box>
        ))}
      </Box>
    </Container>
  </Box>
);

export default SimilarSection;
