import { tmdbBaseApi } from './tmdbBaseApi';
import type { MovieDetails, MoviesResponse, GenresResponse } from '../../types/movie';
import type { FiltersState } from '../../types/filters';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const moviesApi = tmdbBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopular: builder.query<any, { type?: 'movie' | 'tv'; page?: number }>({
      query: ({ type = 'movie', page = 1 }) => ({
        url: `/${type}/popular`,
        params: {
          language: 'en-US',
          page,
        },
      }),
    }),

    getMovieDetails: builder.query<MovieDetails, { id: number; language: string }>({
      query: ({ id, language }) => ({
        url: `/movie/${id}`,
        params: {
          language,
        },
      }),
    }),

    getMovieCredits: builder.query({
      query: (id: number) => ({
        url: `/movie/${id}/credits`,
        params: {
          language: 'en-US',
        },
      }),
    }),

    getSimilarMovies: builder.query<MoviesResponse, number>({
      query: (id) => ({
        url: `/movie/${id}/similar`,
        params: {
          language: 'en-US',
          page: 1,
        },
      }),
    }),

    getVideos: builder.query({
      query: (movieId: number) => ({
        url: `/movie/${movieId}/videos`,
        params: {
          language: 'en-US',
        },
      }),
    }),
    getMovieReviews: builder.query({
      query: (movieId: number) => ({
        url: `/movie/${movieId}/reviews`,
        params: {
          language: 'en-US',
        },
      }),
    }),

    getGenres: builder.query<GenresResponse, 'movie' | 'tv'>({
      query: (type = 'movie') => ({
        url: `/genre/${type}/list`,
        params: {
          api_key: API_KEY,
          language: 'en-US',
        },
      }),
    }),

    getTrending: builder.query({
      query: ({ type = 'movie', period = 'day', language }) => ({
        url: `/trending/${type}/${period}`,
        params: { language },
      }),
    }),
    getUpcoming: builder.query({
      query: ({ type = 'movie', page }) => ({
        url: `/${type}/upcoming`,
        params: { language: 'en-US', page },
      }),
    }),
    getNowPlaying: builder.query({
      query: ({ type = 'movie', page }) => ({
        url: `/${type}/now_playing`,
        params: { language: 'en-US', page },
      }),
    }),
    // get by genre
    getByGenre: builder.query<
      any,
      {
        genreId: number;
        type: 'movie' | 'tv';
        page?: number;
        language: string;
      }
    >({
      query: ({ genreId, language, type, page = 1 }) => ({
        url: `/discover/${type}`,
        params: {
          api_key: API_KEY,
          with_genres: genreId,
          page,
          language,
        },
      }),
    }),

    getTopRated: builder.query<any, { type: 'movie' | 'tv'; language: string; page: number }>({
      query: ({ type = 'movie', language = 'en-Us', page = 1 }) => ({
        url: `/${type}/top_rated`,
        params: {
          language,
          page,
        },
      }),
    }),
    getFiltered: builder.query<
      MoviesResponse,
      Partial<FiltersState> & {
        type?: 'movie' | 'tv';
        page?: number;
        language: string;
      }
    >({
      query: ({ type = 'movie', page = 1, language, ...params }) => {
        const dateField = type === 'movie' ? 'primary_release_date' : 'first_air_date';

        return {
          url: `/discover/${type}`,
          params: {
            page,
            ...(params.genres?.length && {
              with_genres: params.genres.join(','),
            }),
            ...(params.minRating &&
              params.minRating > 0 && {
                'vote_average.gte': params.minRating,
              }),
            ...(params.yearFrom && {
              [`${dateField}.gte`]: `${params.yearFrom}-01-01`,
            }),
            ...(params.yearTo && {
              [`${dateField}.lte`]: `${params.yearTo}-12-31`,
            }),
            ...(params.languages?.length && {
              with_original_language: params.languages.join(','),
            }),
            ...(params.countries?.length && {
              with_origin_country: params.countries.join(','),
            }),
            ...(params.sort && { sort_by: params.sort }),
            language,
          },
        };
      },
    }),
  }),
});

export const {
  useGetPopularQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMoviesQuery,
  useGetVideosQuery,
  useGetMovieReviewsQuery,
  useGetGenresQuery,
  useGetTrendingQuery,
  useGetByGenreQuery,
  useGetTopRatedQuery,
  useGetUpcomingQuery,
  useGetNowPlayingQuery,
  useGetFilteredQuery,
} = moviesApi;
