export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  popularity: number;
  genre_ids?: number[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  status: string;
  genres: { id: number; name: string }[];
  production_companies: ProductionCompany[];
  budget: number;
  revenue: number;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
  type: 'movie' | 'tv';
}

export interface GenresResponse {
  genres: Genre[];
}
