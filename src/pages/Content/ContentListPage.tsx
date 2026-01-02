import { useEffect, useMemo, useState, type FC } from 'react';
import {
  Container,
  Box,
  Typography,
  Chip,
  Grid,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';

import FiltersSidebar from '../../components/Filters/FiltersSidebar';
import MediaCard from '../../components/Cards/MediaCard';
import { SkeletonCard } from '../../components/common/SkeletonCard.';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { defaultFilters, resetFilters, setField } from '../../components/Filters/filtersSlice';
import type { ContentListPageProps } from '../../types/common';
import { useI18n } from '../../app/providers/I18nProvider';
import { getApiLanguage } from '../../helper/getApiLang';
import { usePageTitle } from '../../hooks/usePageTitle';

type SortKey =
  | 'popularity_desc'
  | 'popularity_asc'
  | 'rating_desc'
  | 'rating_asc'
  | 'date_desc'
  | 'date_asc'
  | 'title_asc'
  | 'title_desc';

type ViewKey = 'grid' | 'list';

const SKELETON_COUNT = 15;

const ContentListPage: FC<ContentListPageProps> = ({
  title,
  type,
  fetchDefault,
  fetchFiltered,
  fetchGenres,
}) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.filters);

  const { language } = useI18n()!;
  const apiLanguage = getApiLanguage(language);

  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewKey>('grid');
  const [sort, setSort] = useState<SortKey>('popularity_desc');

  useEffect(() => {
    setPage(1);
  }, [filters]);

  usePageTitle(title);
  const isFiltering = useMemo(() => {
    return (Object.keys(defaultFilters) as (keyof typeof defaultFilters)[]).some((key) => {
      const current = filters[key];
      const initial = defaultFilters[key];

      if (Array.isArray(current) && Array.isArray(initial)) {
        return current.length !== initial.length || current.some((value, index) => value !== initial[index]);
      }

      return current !== initial;
    });
  }, [filters]);

  const { data: filteredData, isFetching: loadingFiltered } = fetchFiltered(
    { ...filters, page, language: apiLanguage },
    { skip: !isFiltering }
  );

  const { data: defaultData, isFetching: loadingDefault } = fetchDefault(
    { page },
    { skip: isFiltering }
  );

  const loading = loadingFiltered || loadingDefault;
  const data = isFiltering ? filteredData : defaultData;

  const results = data?.results || [];
  const totalPages = Math.min(data?.total_pages || 1, 500);
  const totalResults = data?.total_results || 0;

  const { data: genresData } = fetchGenres();
  const genres = genresData?.genres || [];

  const activeChips = [
    ...filters.genres.map((g) => ({
      key: `genre-${g}`,
      label: genres.find((x: any) => x.id === g)?.name || `Genre ${g}`,
      onDelete: () =>
        dispatch(
          setField({
            key: 'genres',
            value: filters.genres.filter((id: number) => id !== g),
          })
        ),
    })),
    ...(filters.minRating > 0
      ? [
          {
            key: 'rating',
            label: `Rating ≥ ${filters.minRating}`,
            onDelete: () => dispatch(setField({ key: 'minRating', value: 0 })),
          },
        ]
      : []),
    ...(filters.studio
      ? [
          {
            key: 'studio',
            label: `Studio: ${filters.studio}`,
            onDelete: () => dispatch(setField({ key: 'studio', value: null })),
          },
        ]
      : []),
  ];

  // sorting section
  const sortedResults = useMemo(() => {
    if (!results.length) return [];

    const getTitle = (i: any) => (i.title || i.name || '').toLowerCase();
    const getDate = (i: any) => new Date(i.release_date || i.first_air_date || 0).getTime();

    const copy = [...results];

    switch (sort) {
      case 'popularity_desc':
        return copy.sort((a, b) => b.popularity - a.popularity);
      case 'popularity_asc':
        return copy.sort((a, b) => a.popularity - b.popularity);

      case 'rating_desc':
        return copy.sort((a, b) => b.vote_average - a.vote_average);
      case 'rating_asc':
        return copy.sort((a, b) => a.vote_average - b.vote_average);

      case 'date_desc':
        return copy.sort((a, b) => getDate(b) - getDate(a));
      case 'date_asc':
        return copy.sort((a, b) => getDate(a) - getDate(b));

      case 'title_asc':
        return copy.sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
      case 'title_desc':
        return copy.sort((a, b) => getTitle(b).localeCompare(getTitle(a)));

      default:
        return copy;
    }
  }, [results, sort]);

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <FiltersSidebar type={type} />

        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {loading ? 'Loading...' : `${totalResults} results`}
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 2,
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <ToggleButtonGroup
              aria-label="View Mode"
              size="small"
              value={viewMode}
              exclusive
              onChange={(_, v) => v && setViewMode(v)}
            >
              <ToggleButton aria-label="Grid view" value="grid">
                <GridViewIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton aria-label="List view" value="list">
                <ViewListIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>

            <Select size="small" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              <MenuItem value="popularity_desc">Popularity ↓</MenuItem>
              <MenuItem value="popularity_asc">Popularity ↑</MenuItem>
              <MenuItem value="rating_desc">Rating ↓</MenuItem>
              <MenuItem value="rating_asc">Rating ↑</MenuItem>
              <MenuItem value="date_desc">Release date ↓</MenuItem>
              <MenuItem value="date_asc">Release date ↑</MenuItem>
              <MenuItem value="title_asc">Title A–Z</MenuItem>
              <MenuItem value="title_desc">Title Z–A</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {activeChips.map((chips) => (
              <Chip key={chips.key} label={chips.label} onDelete={chips.onDelete} />
            ))}

            {activeChips.length > 0 && (
              <Chip
                label="Reset"
                color="secondary"
                onClick={() => {
                  dispatch(resetFilters());
                  setPage(1);
                }}
              />
            )}
          </Box>

          {loading ? (
            <Grid container spacing={2}>
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <Grid
                  component="div"
                  key={i}
                  sx={{
                    flexBasis: {
                      xs: '50%',
                      sm: '33.33%',
                      md: '25%',
                      lg: '20%',
                    },
                    maxWidth: {
                      xs: '50%',
                      sm: '33.33%',
                      md: '25%',
                      lg: '20%',
                    },
                    display: 'flex',
                  }}
                >
                  <SkeletonCard />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {sortedResults.map((item: any) => (
                <Grid
                  component="div"
                  key={item.id}
                  sx={{
                    flexBasis:
                      viewMode === 'grid'
                        ? { xs: '50%', sm: '33.33%', md: '25%', lg: '20%' }
                        : '100%',
                    maxWidth:
                      viewMode === 'grid'
                        ? { xs: '50%', sm: '33.33%', md: '25%', lg: '20%' }
                        : '100%',
                    display: 'flex',
                  }}
                >
                  <MediaCard
                    id={item.id}
                    title={item.title || item.name}
                    posterPath={item.poster_path}
                    rating={item.vote_average}
                    releaseDate={item.release_date || item.first_air_date}
                    type={type}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, num) => setPage(num)}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ContentListPage;
