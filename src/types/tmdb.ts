export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  tagline?: string;
  overview: string;
  status: string;
  genres: Genre[];
}

export interface Cast {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Credits {
  cast: Cast[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface VideoResponse {
  results: Video[];
}

export interface SimilarMoviesResponse {
  results: Movie[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}
