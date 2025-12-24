import { type FC, useState } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import type { ReviewsSectionProps } from '../../../types/detailsPage';
import ReviewCard from '../../../components/Cards/ReviewCard';

const INITIAL_COUNT = 4;

const ReviewsSection: FC<ReviewsSectionProps> = ({ reviews }) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <Box sx={{ py: 5 }}>
      <Box
        sx={{
          maxWidth: 'md',
          mx: 0,
          px: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>

        {reviews.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Review doesn't exist
          </Typography>
        ) : (
          <>
            <Stack spacing={2}>
              {visibleReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </Stack>

            {hasMore && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  aria-label="Load More"
                  variant="outlined"
                  onClick={() => setVisibleCount((prev) => prev + INITIAL_COUNT)}
                >
                  Load more
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ReviewsSection;
