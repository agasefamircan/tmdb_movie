import { useContext, useEffect, useState, type ReactNode } from 'react';
import { Box, Pagination } from '@mui/material';
import { SearchContext } from './SearchPage';
import { useI18n } from '../../app/providers/I18nProvider';
import { getApiLanguage } from '../../helper/getApiLang';
import { useGetSearchQuery } from '../../api/tmdb/searchApi';

interface Props {
  type: 'movie' | 'tv' | 'person' | 'company' | 'keyword' | 'collection';
  children: (items: any) => ReactNode;
}

const SearchResultsPage = ({ type, children }: Props) => {
  const { query, setTotalResults } = useContext(SearchContext);

  const [page, setPage] = useState(1);
  const { language } = useI18n()!;
  const apiLanguage = getApiLanguage(language);

  const { data, isLoading } = useGetSearchQuery({
    type,
    query,
    page,
    language: apiLanguage,
  });

  useEffect(() => {
    if (data?.total_results !== undefined) {
      setTotalResults(type, data.total_results);
    }
  }, [data, type, setTotalResults]);

  if (isLoading) return null;

  const totalPages = Math.min(data?.total_pages || 1, 500);

  return (
    <>
      {children(data?.results || [])}

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, num) => setPage(num)}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default SearchResultsPage;
