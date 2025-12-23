import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ContentType = 'movie' | 'tv' | 'both';

export type DiscoverFilters = {
  genres: number[];
  yearFrom: number;
  yearTo: number;
  minRating: number;
  contentType: ContentType;
  releaseStatus: string[];
  countries: string[];
  languages: string[];
  durationMin: number;
  durationMax: number;
  seasonsMin: number;
  seasonsMax: number;
  studio: string | null;
  sort: string;
};

const CURRENT_YEAR = new Date().getFullYear();
export const defaultDiscoverFilters: DiscoverFilters = {
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
};

const slice = createSlice({
  name: 'discover',
  initialState: defaultDiscoverFilters as DiscoverFilters,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<DiscoverFilters>>) {
      return { ...state, ...action.payload };
    },
    setField<K extends keyof DiscoverFilters>(
      state: any,
      action: PayloadAction<{ key: K; value: DiscoverFilters[K] }>
    ) {
      state[action.payload.key] = action.payload.value;
    },
    toggleGenre(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.genres = state.genres.includes(id)
        ? state.genres.filter((g) => g !== id)
        : [...state.genres, id];
    },
    clearGenre(state, action: PayloadAction<number>) {
      state.genres = state.genres.filter((g) => g !== action.payload);
    },
    resetFilters() {
      return { ...defaultDiscoverFilters };
    },
  },
});

export const { setFilters, setField, toggleGenre, clearGenre, resetFilters } = slice.actions;
export default slice.reducer;
