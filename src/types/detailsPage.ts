export interface HeroSectionProps {
  data: any;
  type: 'movie' | 'tv';
}

export interface InfoSectionProps {
  data: any;
  type: 'movie' | 'tv';
}

export interface CrewMember {
  id: number;
  job: string;
  name: string;
}

export interface CrewSectionProps {
  crew: CrewMember[];
}

export interface NotesSectionProps {
  id: number;
  type: 'movie' | 'tv';
}

export interface Note {
  id: string;
  text: string;
  date: string;
}

export interface UserActionsProps {
  id: number;
  type: 'movie' | 'tv';
}

export interface Review {
  id: string;
  author: string;
  content: string;
  author_details?: {
    avatar_path: string | null;
    rating?: number;
  };
}

export interface ReviewsSectionProps {
  reviews: Review[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CastSectionProps {
  cast: CastMember[];
}

export interface ActionBarProps {
  id: number;
  type: 'movie' | 'tv';
}
export type StoredState = {
  favorites: number[];
  watchlist: number[];
  ratings: Record<number, number>;
  watched: number[];
};

export interface Video {
  id: string;
  name: string;
  key: string;
  site: string;
  type: string;
}
