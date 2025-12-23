import { Box, Container } from '@mui/material';
import { Outlet, useSearchParams } from 'react-router-dom';
import SearchSidebar from './SearchSidebar';
import { createContext, useState, useCallback } from 'react';
import type { SearchContextProps } from '../../types/search';
import { usePageTitle } from '../../hooks/usePageTitle';

export const SearchContext = createContext<SearchContextProps>({
  query: '',
  page: 1,
  totalResult: {},
  setTotalResults: () => {},
});

const SearchPage = () => {
  const [params] = useSearchParams();
  const query = params.get('query') || '';
  usePageTitle(`Searching ${query}`);
  const page = Number(params.get('page') || 1);

  const [totalResult, setTotalResult] = useState<Record<string, number>>({});

  const setTotalResults = useCallback((type: string, count: number) => {
    setTotalResult((prev) => {
      if (prev[type] === count) return prev;
      return { ...prev, [type]: count };
    });
  }, []);

  return (
    <SearchContext.Provider value={{ query, page, totalResult, setTotalResults }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            px: 2,
            py: 4,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <SearchSidebar query={query} />
          <Box sx={{ flex: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Container>
    </SearchContext.Provider>
  );
};

export default SearchPage;
