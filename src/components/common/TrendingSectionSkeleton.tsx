import { Box, Container, Skeleton } from '@mui/material';

const TrendingSectionSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          pb: 1,
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <Box key={i} sx={{ minWidth: 150 }}>
            <Skeleton variant="rounded" width={150} height={225} sx={{ borderRadius: '12px' }} />
            <Skeleton variant="text" width={140} sx={{ mt: 1 }} />
            <Skeleton variant="text" width={100} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default TrendingSectionSkeleton;
