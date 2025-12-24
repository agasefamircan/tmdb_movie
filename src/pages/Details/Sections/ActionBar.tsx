import { type FC } from 'react';
import { Box, IconButton, Tooltip, Rating, Stack, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

import {
  useAddFavoriteMutation,
  useAddWatchlistMutation,
  useRateMediaMutation,
  useGetAccountStatesQuery,
} from '../../../api/tmdb/accountApi';

import type { ActionBarProps } from '../../../types/detailsPage';
import { toast } from 'react-toastify';

const ActionBar: FC<ActionBarProps> = ({ id, type }) => {
  const { sessionId, accountId } = useSelector((state: RootState) => state.auth);

  const { data: accountStates, isFetching } = useGetAccountStatesQuery(
    {
      mediaId: id,
      type,
      sessionId: sessionId!,
    },
    {
      skip: !sessionId,
    }
  );

  const [addFavorite] = useAddFavoriteMutation();
  const [addWatchlist] = useAddWatchlistMutation();
  const [rateMedia] = useRateMediaMutation();

  if (!sessionId || !accountId) {
    return null;
  }

  const isFavorite = accountStates?.favorite ?? false;
  const isWatchlist = accountStates?.watchlist ?? false;
  const rating =
    accountStates?.rated && typeof accountStates.rated === 'object'
      ? accountStates.rated.value
      : null;

  const toggleFavorite = () => {
    addFavorite({
      accountId,
      sessionId,
      mediaType: type,
      mediaId: id,
      favorite: !isFavorite,
    });
    toast.success(!isFavorite ? 'Added to favorites!' : 'Removed from favorites!');
  };

  const toggleWatchlist = () => {
    addWatchlist({
      accountId,
      sessionId,
      mediaType: type,
      mediaId: id,
      watchlist: !isWatchlist,
    });
    toast.success(!isWatchlist ? 'Added to watchlist!' : 'Removed from watchlist!');
  };

  const handleRatingChange = (_: any, value: number | null) => {
    if (!value) return;

    rateMedia({
      type,
      mediaId: id,
      sessionId,
      value,
    });
    toast.success(rating ? 'Rating updated!' : 'Add to rating!');
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        px: 3,
        py: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Stack direction="row" spacing={1}>
          <Tooltip title="Favorite">
            <IconButton aria-label='Favorite icon' onClick={toggleFavorite} color="error">
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Watchlist">
            <IconButton aria-label='Bookmark Icon' onClick={toggleWatchlist} color="primary">
              {isWatchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Your rating
          </Typography>
          <Rating
            value={rating}
            precision={1}
            max={5}
            onChange={handleRatingChange}
            disabled={isFetching}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ActionBar;
