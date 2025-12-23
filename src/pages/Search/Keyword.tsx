import SearchResultsPage from './SearchResultPage';
import { Box, Typography } from '@mui/material';

const KeywordPage = () => {
  return (
    <SearchResultsPage type="keyword">
      {(keywords) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            p: 1,
          }}
        >
          {keywords.map((k: any) => (
            <Box
              key={k.id}
              sx={{
                p: 1.2,
                borderRadius: 8,
                bgcolor: 'action.hover',
              }}
            >
              <Typography fontWeight={500}>{k.name}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </SearchResultsPage>
  );
};

export default KeywordPage;
