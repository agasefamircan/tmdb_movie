import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TMDB_BASE_URL } from './config';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_BASE_URL,
  }),
  endpoints: (builder) => ({
    createRequestToken: builder.query<{ request_token: string }, void>({
      query: () => `/authentication/token/new?api_key=${API_KEY}`,
    }),

    createSession: builder.mutation<{ session_id: string }, { request_token: string }>({
      query: (body) => ({
        url: `/authentication/session/new?api_key=${API_KEY}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateRequestTokenQuery, useCreateSessionMutation } = authApi;
