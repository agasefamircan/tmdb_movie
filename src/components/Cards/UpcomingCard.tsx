import { Box, Typography } from '@mui/material';
import { type FC } from 'react';
import { getTmdbImageUrl } from '../../utils/imageUrl';
import type { UpcomingCardProps } from '../../types/common';
import { useNavigate } from 'react-router-dom';

const UpcomingCard: FC<UpcomingCardProps> = ({
  id,
  title,
  backdropPath,
  releaseDate,
  type = 'movie',
  onHover,
}) => {
  const image = backdropPath ? getTmdbImageUrl(backdropPath) : null;

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${type}/${id}`);
  };
  return (
    <Box
      onMouseEnter={() => onHover(image)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
      sx={{
        minWidth: 320,
        height: 180,
        borderRadius: 3,
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: '#0b1c2d',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      {image && (
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
        }}
      >
        <Typography fontWeight={700} color="white">
          {title}
        </Typography>
        {releaseDate && (
          <Typography fontSize={13} color="rgba(255,255,255,0.7)">
            {releaseDate}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UpcomingCard;
