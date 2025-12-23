import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../types/auth';
import type { MediaIdsByType } from '../types/common';

const storedAccountId = localStorage.getItem('account_id');

const initialState: AuthState = {
  sessionId: localStorage.getItem('session_id'),
  accountId: storedAccountId ? Number(storedAccountId) : null,
  account: null,

  favoriteIds: { movie: [], tv: [] },
  watchlistIds: { movie: [], tv: [] },
  ratedMap: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccount(state, action: PayloadAction<any>) {
      state.account = action.payload;
      state.accountId = action.payload.id;
      localStorage.setItem('account_id', String(action.payload.id));
    },
    setSessionId(state, action: PayloadAction<string>) {
      state.sessionId = action.payload;
      localStorage.setItem('session_id', action.payload);
    },
    logout(state) {
      state.sessionId = null;
      state.accountId = null;
      localStorage.removeItem('session_id');
      localStorage.removeItem('account_id');
    },
    setFavorites(state, action: PayloadAction<MediaIdsByType>) {
      state.favoriteIds = action.payload;
    },
    setWatchlist(state, action: PayloadAction<MediaIdsByType>) {
      state.watchlistIds = action.payload;
    },
    setRatings(state, action: PayloadAction<Record<number, number>>) {
      state.ratedMap = action.payload;
    },
  },
});

export const { setAccount, setSessionId, logout, setFavorites, setWatchlist, setRatings } =
  authSlice.actions;
export default authSlice.reducer;
