import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TMDB_TOKEN, TMDB_BASE_URL } from './config';

export const tmdbBaseApi = createApi({
  reducerPath: 'tmdbBaseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: TMDB_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${TMDB_TOKEN}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
