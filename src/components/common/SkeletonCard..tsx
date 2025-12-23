import { Card, CardContent, Skeleton } from '@mui/material';

export const SkeletonCard = () => {
  return (
    <Card sx={{ width: '100%', borderRadius: 2 }}>
      <Skeleton variant="rectangular" width="100%" height={260} />
      <CardContent>
        <Skeleton width="80%" height={24} />
        <Skeleton width="60%" height={20} sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
};
