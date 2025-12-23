import SearchResultsPage from './SearchResultPage';
import { Box, Typography } from '@mui/material';

const CompanyPage = () => {
  return (
    <SearchResultsPage type="company">
      {(companies) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {companies.map((c: any) => (
            <Box
              key={c.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1,
                borderRadius: 2,
              }}
            >
              <Typography fontWeight={500}>{c.name}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </SearchResultsPage>
  );
};

export default CompanyPage;
