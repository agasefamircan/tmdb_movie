import SearchResultsPage from './SearchResultPage';
import { Box, Typography } from '@mui/material';

const CollectionPage = () => {
  return (
    <SearchResultsPage type="collection">
      {(collections) => (
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          }}
        >
          {collections.map((c: any) => (
            <Box
              key={c.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                p: 1,
              }}
            >
              <img
                src={c.poster_path ? `https://image.tmdb.org/t/p/w300${c.poster_path}` : undefined}
                style={{
                  width: '100%',
                  borderRadius: 10,
                  objectFit: 'cover',
                }}
              />
              <Typography fontWeight={600}>{c.name}</Typography>
              <Typography sx={{ opacity: 0.7, fontSize: 14 }}>
                {c.overview?.slice(0, 90)}...
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </SearchResultsPage>
  );
};

export default CollectionPage;
