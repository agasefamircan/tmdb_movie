import { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_SIZES } from '../constants/api';

export const getImageUrl = (
  path: string | null,
  size: keyof typeof TMDB_IMAGE_SIZES = 'POSTER_LARGE'
): string | null => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}${TMDB_IMAGE_SIZES[size]}${path}`;
};

export const getTmdbImageUrl = (path: string | null): string | null => {
  return getImageUrl(path, 'POSTER_LARGE');
};
