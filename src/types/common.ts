export interface PaginationParams {
  page: number;
  limit?: number;
}

export interface ApiResponse<T> {
  data: T;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface MediaCardProps {
  id: number;
  title: string;
  posterPath?: string | null;
  rating?: number;
  releaseDate: string | null;
  type?: 'movie' | 'tv' | 'person' | 'collection' | 'company' | 'keyword';
  onClick?: (id: number) => void;
}

export type UpcomingCardProps = {
  id: number;
  title: string;
  type?: 'movie' | 'tv';
  backdropPath: string | null;
  releaseDate?: string;
  onHover: (image: string | null) => void;
};

export type ContentListPageProps = {
  title: string;
  type: 'movie' | 'tv';
  fetchDefault: any;
  fetchFiltered: any;
  fetchGenres: any;
  language: string;
};

export type AccountSection = 'favorites' | 'ratings' | 'watchlist';


export interface AccountMediaProps {
  movieData?: { results: any[] };
  tvData?: { results: any[] };
  section: AccountSection;
}

export type MediaIdsByType = {
  movie: number[];
  tv: number[];
};

export type MediaItem = {
  id: number;
};
