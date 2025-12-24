import { useState, useEffect, type FormEvent } from 'react';
import { Box, Typography, InputBase, Button, useTheme, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetPopularQuery } from '../../api/tmdb/moviesApi';
import { useI18n } from '../../app/providers/I18nProvider';

const Welcome = () => {
  const { t } = useI18n()!;
  const navigate = useNavigate();
  const theme = useTheme();

  const [query, setQuery] = useState('');
  const [randomImage, setRandomImage] = useState<string | null>(null);

  const { data } = useGetPopularQuery({ type: 'movie' });

  const pickRandomImage = () => {
    if (!data?.results?.length) return;

    const list = data.results;
    const randomIndex = Math.floor(Math.random() * list.length);
    const backdrop = list[randomIndex].backdrop_path;

    setRandomImage(backdrop || null);
  };

  useEffect(() => {
    if (data?.results?.length) {
      pickRandomImage();
    }
  }, [data]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <Box
      sx={{
        minHeight: { xs: 250, lg: 250 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        px: 3,
        py: 6,
        background: randomImage
          ? `linear-gradient(to right, rgba(3,37,65,0.8), rgba(3,37,65,0.4)), url(https://image.tmdb.org/t/p/original${randomImage})`
          : alpha('#032541', 1),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.4s ease',
      }}
    >
      <Box sx={{ maxWidth: 900, width: '100%', textAlign: 'left' }}>
        <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
          {t('welcome.title')}
        </Typography>

        <Typography variant="h5" fontWeight={500} sx={{ mb: 3 }}>
          {t('welcome.subtitle')}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            borderRadius: 50,
            px: 2,
            py: 0.5,
            width: '100%',
            maxWidth: 900,
            boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
            [theme.breakpoints.down('sm')]: { px: 1.5 },
          }}
        >
          <InputBase
            placeholder={t('welcome.searchPlaceholder')}
            sx={{ flex: 1, color: '#fff', ml: 1 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button
            aria-label="Welcome Search Button"
            type="submit"
            variant="contained"
            disabled={!query.trim()}
            sx={{
              ml: 1,
              background: 'linear-gradient(90deg, #1ed5a9, #14b8ff)',
              borderRadius: '30px',
              px: 4,
              py: 1.2,
              textTransform: 'none',
              '&:disabled': {
                opacity: 0.5,
                cursor: 'not-allowed',
              },
            }}
          >
            {t('welcome.searchButton')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
