import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { useState, type FC } from 'react';
import type { Review } from '../../types/detailsPage';

const MAX_LENGTH = 250;

const ReviewCard: FC<{ review: Review }> = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  const isLong = review.content.length > MAX_LENGTH;
  const text = expanded
    ? review.content
    : review.content.slice(0, MAX_LENGTH) + (isLong ? '...' : '');

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <Avatar>{review.author.charAt(0).toUpperCase()}</Avatar>

          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {review.author}
            </Typography>

            {review.author_details?.rating && (
              <Typography variant="caption" color="text.secondary">
                Rating: {review.author_details.rating}
              </Typography>
            )}
          </Box>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>

        {isLong && (
          <Button
            aria-label="Expand text"
            size="small"
            sx={{ mt: 1, px: 0 }}
            onClick={() => setExpanded((p) => !p)}
          >
            {expanded ? 'Show less' : 'Read more'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
