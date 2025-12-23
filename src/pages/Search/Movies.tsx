import MediaCard from '../../components/Cards/MediaCard';
import { SkeletonCard } from '../../components/common/SkeletonCard.';
import SearchResultsPage from './SearchResultPage';
import { Box } from '@mui/material';

const MoviePage = () => {
  return (
    <SearchResultsPage type="movie">
      {(movies) => {
        if (!movies.length) {
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
            {movies.map((movie: any) => (
              <MediaCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                rating={movie.vote_average}
                releaseDate={movie.release_date}
                type="movie"
              />
            ))}
          </Box>
        );
      }}
    </SearchResultsPage>
  );
};
export default MoviePage;
