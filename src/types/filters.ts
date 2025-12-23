export type ContentType = 'movie' | 'tv' | 'both';

export interface FilterOption {
  id: string | number;
  name: string;
}

export type FiltersState = {
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
  companies: number[];
};
