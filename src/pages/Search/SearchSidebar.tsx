import { Paper, Typography, Box } from '@mui/material';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { SearchContext } from './SearchPage';
import { useI18n } from '../../app/providers/I18nProvider';

interface Props {
  query: string;
  total?: Record<string, number>;
}

const items = [
  { path: 'movie', label: 'searchPage.movies' },
  { path: 'tv', label: 'searchPage.tvshows' },
  { path: 'person', label: 'searchPage.people' },
  { path: 'collection', label: 'searchPage.collections' },
  { path: 'company', label: 'searchPage.companies' },
  { path: 'keyword', label: 'searchPage.keywords' },
];

const SearchSidebar = ({ query }: Props) => {
  const { t } = useI18n()!;
  const { totalResult } = useContext(SearchContext);
  return (
    <Paper
      sx={{
        width: { xs: '100%', md: 250 },
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 600,
          bgcolor: '#03a9f4',
          color: '#fff',
          p: 2,
        }}
      >
        {t('searchPage.searchResults')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {items.map((item) => {
          return (
            <Box
              key={item.path}
              component={NavLink}
              to={`/search/${item.path}?query=${query}`}
              style={{ textDecoration: 'none' }}
              className="nav-item"
              sx={{
                px: 2,
                py: 1.5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'text.primary',
                '&.active': {
                  fontWeight: 700,
                  bgcolor: 'action.hover',
                },
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Typography>{t(item.label)}</Typography>
              <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
                {totalResult[item.path] ?? 0}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default SearchSidebar;
