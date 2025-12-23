import { memo, useMemo, type FC } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTmdbImageUrl } from '../../utils/imageUrl';
import type { MediaCardProps } from '../../types/common';
import { useSelector, useDispatch } from 'react-redux';
import { useAddFavoriteMutation, useAddWatchlistMutation } from '../../api/tmdb/accountApi';
import type { RootState } from '../../app/store';
import { setFavorites, setWatchlist } from '../../app/authSlice';

const MediaCard: FC<MediaCardProps> = ({
  id,
  title,
  posterPath,
  rating = 0,
  releaseDate,
  type = 'movie',
  onClick,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let isFavorite = false;
  let isWatchlist = false;

  const { sessionId, accountId, favoriteIds, watchlistIds } = useSelector(
    (state: RootState) => state.auth
  );

  const [addFavorite] = useAddFavoriteMutation();
  const [addWatchlist] = useAddWatchlistMutation();

  const poster = posterPath ? getTmdbImageUrl(posterPath) : undefined;

  const score = useMemo(() => Math.round((rating || 0) * 10), [rating]);

  if (type === 'movie' || type === 'tv') {
    isFavorite = favoriteIds[type]?.includes(id) ?? false;
    isWatchlist = watchlistIds[type]?.includes(id) ?? false;
  }
  const handleClickCard = () => {
    if (onClick) return onClick(id);
    navigate(`/${type}/${id}`);
  };

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!sessionId || !accountId) {
      navigate('/login');
      return;
    }
    if (type === 'movie' || type === 'tv') {
      var nextFavorites = isFavorite
        ? favoriteIds[type].filter((favId) => favId !== id)
        : [...favoriteIds[type], id];

      dispatch(
        setFavorites({
          ...favoriteIds,
          [type]: nextFavorites,
        })
      );
    }
    try {
      if (type === 'movie' || type === 'tv') {
        await addFavorite({
          accountId,
          sessionId,
          mediaType: type,
          mediaId: id,
          favorite: !isFavorite,
        }).unwrap();
      }

      toast.success(!isFavorite ? 'Added to favorites!' : 'Removed from favorites!');
    } catch {
      dispatch(setFavorites(favoriteIds));
      toast.error('Failed to update favorites.');
    }
  };

  const handleWatchlist = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!sessionId || !accountId) {
      navigate('/login');
      return;
    }
    if (type === 'movie' || type === 'tv') {
      var nextWatchlist = isWatchlist
        ? watchlistIds[type].filter((wid) => wid !== id)
        : [...watchlistIds[type], id];

      dispatch(
        setWatchlist({
          ...watchlistIds,
          [type]: nextWatchlist,
        })
      );
    }
    try {
      if (type === 'movie' || type === 'tv') {
        await addWatchlist({
          accountId,
          sessionId,
          mediaType: type,
          mediaId: id,
          watchlist: !isWatchlist,
        }).unwrap();
      }
      toast.success(!isWatchlist ? 'Added to watchlist!' : 'Removed from watchlist!');
    } catch {
      dispatch(setWatchlist(watchlistIds));
      toast.error('Failed to update watchlist.');
    }
  };

  return (
    <Box
      onClick={handleClickCard}
      sx={{
        width: 160,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '2 / 3' }}>
        {posterPath ? (
          <img
            src={poster ?? undefined}
            alt={title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 12,
            }}
          />
        ) : (
          ''
        )}
        <Box
          sx={{
            position: 'absolute',
            left: 10,
            bottom: -18,
            bgcolor: '#0a4025',
            borderRadius: '50%',
            width: 44,
            height: 44,
            border: '3px solid #00ff94',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '13px',
            fontWeight: 700,
            zIndex: 3,
          }}
        >
          {score}%
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            zIndex: 3,
          }}
        >
          <Tooltip title="Favorite">
            <IconButton
              onClick={handleFavorite}
              size="small"
              sx={{
                bgcolor: 'rgba(0,0,0,0.6)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                color: isFavorite ? 'error.main' : 'white',
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Watchlist">
            <IconButton
              onClick={handleWatchlist}
              size="small"
              sx={{
                bgcolor: 'rgba(0,0,0,0.6)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                color: isWatchlist ? 'primary.main' : 'white',
              }}
            >
              {isWatchlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography
          fontWeight={700}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Typography>
        <Typography fontSize={13} color="text.secondary">
          {releaseDate || ''}
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(MediaCard);
