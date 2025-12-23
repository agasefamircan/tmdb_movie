import type { MediaIdsByType } from './common';

export interface AuthState {
  sessionId: string | null;
  accountId: number | null;
  account: any | null;
  favoriteIds: MediaIdsByType;
  watchlistIds: MediaIdsByType;
  ratedMap: Record<number, number>;
}
