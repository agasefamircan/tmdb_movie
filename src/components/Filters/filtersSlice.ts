import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FiltersState } from '../../types/filters';

const CURRENT_YEAR = new Date().getFullYear();
export const defaultFilters: FiltersState = {
  genres: [],
  yearFrom: 1900,
  yearTo: CURRENT_YEAR + 2,
  minRating: 0,
  contentType: 'both',
  releaseStatus: [],
  countries: [],
  languages: ['en'],
  durationMin: 0,
  durationMax: 300,
  seasonsMin: 1,
  seasonsMax: 20,
  studio: null,
  sort: 'popularity.desc',
  companies: [],
};

const slice = createSlice({
  name: 'filters',
  initialState: defaultFilters as FiltersState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FiltersState>>) {
      return { ...state, ...action.payload } as FiltersState;
    },
    setField<K extends keyof FiltersState>(
      state: any,
      action: PayloadAction<{ key: K; value: FiltersState[K] }>
    ) {
      state[action.payload.key] = action.payload.value;
    },
    toggleGenre(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.genres = state.genres.includes(id)
        ? state.genres.filter((g) => g !== id)
        : [...state.genres, id];
    },
    resetFilters() {
      return { ...defaultFilters };
    },
    clearGenre(state, action: PayloadAction<number>) {
      state.genres = state.genres.filter((g) => g !== action.payload);
    },
  },
});

export const { setFilters, setField, toggleGenre, resetFilters, clearGenre } = slice.actions;
export default slice.reducer;
