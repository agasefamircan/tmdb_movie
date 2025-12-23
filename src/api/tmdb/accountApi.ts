import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TMDB_BASE_URL } from './config';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const accountApi = createApi({
  reducerPath: 'accountApi',
  tagTypes: ['Account', 'Favorites', 'Watchlist', 'Ratings', 'AccountStates'],
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAccount: builder.query<any, string>({
      query: (sessionId) => ({
        url: '/account',
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      }),
      providesTags: ['Account'],
    }),

    getFavorites: builder.query<
      any,
      { accountId: number; sessionId: string; type: 'movie' | 'tv' }
    >({
      query: ({ accountId, sessionId, type }) => ({
        url: `/account/${accountId}/favorite/${type === 'movie' ? 'movies' : 'tv'}`,
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      }),
      providesTags: ['Favorites'],
    }),

    getWatchlist: builder.query<
      any,
      { accountId: number; sessionId: string; type: 'movie' | 'tv' }
    >({
      query: ({ accountId, sessionId, type }) => ({
        url: `/account/${accountId}/watchlist/${type === 'movie' ? 'movies' : 'tv'}`,
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      }),
      providesTags: ['Watchlist'],
    }),

    getRatings: builder.query<any, { accountId: number; sessionId: string; type: 'movie' | 'tv' }>({
      query: ({ accountId, sessionId, type }) => ({
        url: `/account/${accountId}/rated/${type === 'movie' ? 'movies' : 'tv'}`,
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      }),
      providesTags: ['Ratings'],
    }),

    // Mutation section
    addFavorite: builder.mutation<
      any,
      {
        accountId: number;
        sessionId: string;
        mediaType: 'movie' | 'tv';
        mediaId: number;
        favorite: boolean;
      }
    >({
      query: ({ accountId, sessionId, mediaType, mediaId, favorite }) => ({
        url: `/account/${accountId}/favorite`,
        method: 'POST',
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
        body: {
          media_type: mediaType,
          media_id: mediaId,
          favorite,
        },
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'AccountStates', id: `${arg.mediaType}-${arg.mediaId}` },
        'Favorites',
      ],
    }),

    addWatchlist: builder.mutation<
      any,
      {
        accountId: number;
        sessionId: string;
        mediaType: 'movie' | 'tv';
        mediaId: number;
        watchlist: boolean;
      }
    >({
      query: ({ accountId, sessionId, mediaType, mediaId, watchlist }) => ({
        url: `/account/${accountId}/watchlist`,
        method: 'POST',
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
        body: {
          media_type: mediaType,
          media_id: mediaId,
          watchlist,
        },
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'AccountStates', id: `${arg.mediaType}-${arg.mediaId}` },
        'Watchlist',
      ],
    }),

    rateMedia: builder.mutation<
      any,
      {
        type: 'movie' | 'tv';
        mediaId: number;
        sessionId: string;
        value: number;
      }
    >({
      query: ({ type, mediaId, sessionId, value }) => ({
        url: `/${type}/${mediaId}/rating`,
        method: 'POST',
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
        body: {
          value,
        },
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'AccountStates', id: `${arg.type}-${arg.mediaId}` },
        'Ratings',
      ],
    }),

    // when i want to know i add it to fav/watch/rate or not
    getAccountStates: builder.query<
      {
        favorite: boolean;
        watchlist: boolean;
        rated: { value: number } | false;
      },
      {
        mediaId: number;
        type: 'movie' | 'tv';
        sessionId: string;
      }
    >({
      query: ({ mediaId, type, sessionId }) => ({
        url: `/${type}/${mediaId}/account_states`,
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      }),
      providesTags: (_r, _e, arg) => [{ type: 'AccountStates', id: `${arg.type}-${arg.mediaId}` }],
    }),
  }),
});

export const {
  useGetAccountQuery,
  useGetFavoritesQuery,
  useGetWatchlistQuery,
  useGetRatingsQuery,
  //Mutations
  useAddFavoriteMutation,
  useAddWatchlistMutation,
  useRateMediaMutation,
  useGetAccountStatesQuery,
} = accountApi;
