import SearchResultsPage from './SearchResultPage';
import MediaCard from '../../components/Cards/MediaCard';
import { Box } from '@mui/material';
import { SkeletonCard } from '../../components/common/SkeletonCard.';

const TV = () => {
  return (
    <SearchResultsPage type="tv">
      {(tvs) => {
        if (!tvs.length) {
          return <SkeletonCard />;
        }

        return (
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            }}
          >
            {tvs.map((tv: any) => (
              <MediaCard
                key={tv.id}
                id={tv.id}
                title={tv.name}
                posterPath={tv.poster_path}
                rating={tv.vote_average}
                releaseDate={tv.first_air_date}
                type="tv"
              />
            ))}
          </Box>
        );
      }}
    </SearchResultsPage>
  );
};

export default TV;
