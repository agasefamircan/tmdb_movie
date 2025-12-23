import SearchResultsPage from './SearchResultPage';
import { Box, Typography } from '@mui/material';

const Person = () => {
  return (
    <SearchResultsPage type="person">
      {(people) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {people.map((person: any) => (
            <Box key={person.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                    : undefined
                }
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  objectFit: 'cover',
                }}
              />

              <Typography fontWeight={600}>{person.name}</Typography>
              <Typography fontWeight={400}>{person.known_for_department}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </SearchResultsPage>
  );
};

export default Person;
