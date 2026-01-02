import { tmdbBaseApi } from './tmdbBaseApi';

export const tvApi = tmdbBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrendingTV: builder.query({
      query: () => `/trending/tv/week`,
    }),

    getPopularTV: builder.query({
      query: ({ page }) => ({
        url: `/tv/popular`,
        params: { language: 'en-US', page },
      }),
    }),
    getAiringToday: builder.query({
      query: ({ page }) => ({
        url: `/tv/airing_today`,
        params: { language: 'en-US', page },
      }),
    }),
    getOnTheAir: builder.query({
      query: ({ page }) => ({
        url: `/tv/on_the_air`,
        params: { language: 'en-US', page },
      }),
    }),
    getTopRatedTv: builder.query({
      query: ({ page }) => ({
        url: `/tv/top_rated`,
        params: { language: 'en-US', page },
      }),
    }),

    getTvDetails: builder.query({
      query: (movieId: number) => ({
        url: `/tv/${movieId}`,
        params: { language: 'en-US' },
      }),
    }),
    getTvCredits: builder.query({
      query: (movieId: number) => ({
        url: `/tv/${movieId}/credits`,
        params: { language: 'en-US' },
      }),
    }),
    getTvVideos: builder.query({
      query: (movieId: number) => ({
        url: `/tv/${movieId}/videos`,
        params: { language: 'en-US' },
      }),
    }),
    getTvReviews: builder.query({
      query: (movieId: number) => ({
        url: `/tv/${movieId}/reviews`,
        params: {
          language: 'en-US',
        },
      }),
    }),
    getSimilarTv: builder.query({
      query: (movieId: number) => ({
        url: `/tv/${movieId}/similar`,
        params: { language: 'en-US', page: 1 },
      }),
    }),
  }),
});

export const {
  useGetTrendingTVQuery,
  useGetPopularTVQuery,
  useGetAiringTodayQuery,
  useGetOnTheAirQuery,
  useGetTopRatedTvQuery,
  useGetTvDetailsQuery,
  useGetTvCreditsQuery,
  useGetTvVideosQuery,
  useGetTvReviewsQuery,
  useGetSimilarTvQuery,
} = tvApi;
