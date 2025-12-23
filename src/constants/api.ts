export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const TMDB_IMAGE_SIZES = {
  POSTER_SMALL: '/w154',
  POSTER_MEDIUM: '/w342',
  POSTER_LARGE: '/w500',
  BACKDROP_SMALL: '/w300',
  BACKDROP_MEDIUM: '/w780',
  BACKDROP_LARGE: '/w1280',
  PROFILE_SMALL: '/w45',
  PROFILE_MEDIUM: '/w185',
  PROFILE_LARGE: '/h632',
};

export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularity (High to Low)' },
  { value: 'vote_average.desc', label: 'Rating (High to Low)' },
  { value: 'release_date.desc', label: 'Release Date (Newest)' },
  { value: 'release_date.asc', label: 'Release Date (Oldest)' },
];
