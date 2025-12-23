import {
  useGetNowPlayingQuery,
  useGetPopularQuery,
  useGetTopRatedQuery,
  useGetUpcomingQuery,
} from '../api/tmdb/moviesApi';
import {
  useGetAiringTodayQuery,
  useGetOnTheAirQuery,
  useGetPopularTVQuery,
} from '../api/tmdb/tvApi';

export const MOVIE_ENDPOINTS = {
  popular: useGetPopularQuery,
  upcoming: useGetUpcomingQuery,
  'now-playing': useGetNowPlayingQuery,
  'top-rated': useGetTopRatedQuery,
};

export const TV_ENDPOINTS = {
  popular: useGetPopularTVQuery,
  'airing-today': useGetAiringTodayQuery,
  'on-the-air': useGetOnTheAirQuery,
  'top-rated': useGetTopRatedQuery,
};
