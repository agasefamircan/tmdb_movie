export type SearchApiParams = {
  type?: string | null;
  currentType?: string | null;
  query?: string | null;
  page?: number;
  language?: string;
  includeAdult?: boolean;
};

export interface SearchContextProps {
  query: string;
  page: number;
  totalResult: Record<string, number>;
  setTotalResults: (type: string, count: number) => void;
}
