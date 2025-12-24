import React, { useMemo, useCallback } from 'react';
import {
  Paper,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Stack,
  TextField,
  Select,
  MenuItem,
  Divider,
  OutlinedInput,
  Button,
} from '@mui/material';

import { useGetGenresQuery } from '../../api/tmdb/moviesApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetFilters, setField, toggleGenre } from './filtersSlice';
import type { FiltersState } from '../../types/filters';
import { useI18n } from '../../app/providers/I18nProvider';

const countryOptions = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'JP', name: 'Japan' },
  { code: 'AZ', name: 'Azerbaijan' },
];
interface FiltersSidebarProps {
  type: 'movie' | 'tv';
}
const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.filters);

  const mediaType: 'movie' | 'tv' = type;

  const { data: genresData } = useGetGenresQuery(mediaType);
  const genres = genresData?.genres || [];
  console.log('genres', genres);

  const { t } = useI18n()!;

  const toggleG = useCallback((id: number) => dispatch(toggleGenre(id)), [dispatch]);

  const setFieldCb = useCallback(
    (key: keyof FiltersState, value: any) => dispatch(setField({ key, value })),
    [dispatch]
  );

  const resetAll = useCallback(() => dispatch(resetFilters()), [dispatch]);

  const languages = useMemo(
    () => [
      { code: 'en', name: 'English' },
      { code: 'az', name: 'Azerbaijani' },
    ],
    []
  );

  return (
    <Paper
      sx={{
        width: { xs: '100%', sm: 280, md: 300 },
        p: 2,
        position: 'sticky',
        top: 12,
        maxHeight: 'calc(100vh - 24px)',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t('filter.filters')}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">{t('filter.genres')}</Typography>
        <FormGroup>
          {genres.map((g) => (
            <FormControlLabel
              key={g.id}
              control={
                <Checkbox
                  size="small"
                  checked={filters.genres.includes(g.id)}
                  onChange={() => toggleG(g.id)}
                />
              }
              label={g.name}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">{t('filter.releaseYear')}</Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <TextField
            size="small"
            type="number"
            label={t('filter.from')}
            value={filters.yearFrom}
            onChange={(e) => setFieldCb('yearFrom', Number(e.target.value || 1900))}
            fullWidth
          />
          <TextField
            size="small"
            type="number"
            label={t('filter.to')}
            value={filters.yearTo}
            onChange={(e) => setFieldCb('yearTo', Number(e.target.value))}
            fullWidth
          />
        </Stack>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">
          {t('filter.minimumRating')}: {filters.minRating.toFixed(1)}
        </Typography>
        <Slider
          min={0}
          max={10}
          step={0.5}
          value={filters.minRating}
          onChange={(_, v) => setFieldCb('minRating', v as number)}
          valueLabelDisplay="auto"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">{t('filter.contentType')}</Typography>
        <Select
          size="small"
          fullWidth
          value={filters.contentType}
          onChange={(e) => setFieldCb('contentType', e.target.value)}
        >
          <MenuItem value="both">{t('filter.both')}</MenuItem>
          <MenuItem value="movie">{t('filter.movies')}</MenuItem>
          <MenuItem value="tv">{t('filter.tvShows')}</MenuItem>
        </Select>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">{t('filter.countryOfOrigin')}</Typography>
        <Select
          multiple
          size="small"
          fullWidth
          value={filters.countries}
          onChange={(e) => setFieldCb('countries', e.target.value)}
          input={<OutlinedInput />}
        >
          {countryOptions.map((c) => (
            <MenuItem key={c.code} value={c.code}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">{t('filter.originLanguage')}</Typography>
        <Select
          multiple
          size="small"
          fullWidth
          value={filters.languages}
          onChange={(e) => setFieldCb('languages', e.target.value)}
          input={<OutlinedInput />}
        >
          {languages.map((l) => (
            <MenuItem key={l.code} value={l.code}>
              {l.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">{t('filter.duration')}</Typography>
        <Slider
          min={0}
          max={300}
          step={5}
          value={[filters.durationMin, filters.durationMax]}
          onChange={(_, v) => {
            const [min, max] = v as number[];
            setFieldCb('durationMin', min);
            setFieldCb('durationMax', max);
          }}
          valueLabelDisplay="auto"
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">{t('filter.sort')}</Typography>
        <Select
          size="small"
          fullWidth
          value={filters.sort}
          onChange={(e) => setFieldCb('sort', e.target.value)}
        >
          <MenuItem value="popularity.desc">{t('filter.popularity')}</MenuItem>
          <MenuItem value="vote_average.desc">{t('filter.rating')}</MenuItem>
          <MenuItem value="release_date.desc">{t('filter.releaseDateNew')}</MenuItem>
          <MenuItem value="release_date.asc">{t('filter.releaseDateOld')}</MenuItem>
        </Select>
      </Box>

      <Button aria-label="Reset All" fullWidth variant="outlined" onClick={resetAll}>
        {t('filter.resetAll')}
      </Button>
    </Paper>
  );
};

export default React.memo(FiltersSidebar);
