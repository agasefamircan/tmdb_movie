import { configureStore } from '@reduxjs/toolkit';
import { tmdbBaseApi } from '../api/tmdb/tmdbBaseApi';
import filtersReducer from '../components/Filters/filtersSlice';
import { authApi } from '../api/tmdb/authApi';
import { accountApi } from '../api/tmdb/accountApi';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    auth: authReducer,
    [tmdbBaseApi.reducerPath]: tmdbBaseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tmdbBaseApi.middleware,
      authApi.middleware,
      accountApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
