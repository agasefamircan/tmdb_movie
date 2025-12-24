import { useState } from 'react';
import { Box, Container, Typography, Grid, Dialog, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import type { Video } from '../../../types/detailsPage';

const VideoSection = ({ videos }: { videos: Video[] }) => {
  const [open, setOpen] = useState(false);
  const [currentKey, setCurrentKey] = useState<string>('');

  const handleOpen = (key: string) => {
    setCurrentKey(key);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentKey('');
  };

  if (!videos || videos.length === 0) return null;

  const trailers = videos.filter((v) => v.type === 'Trailer' && v.site === 'YouTube');

  if (!trailers.length) return null;

  return (
    <Box sx={{ py: 5 }}>
      <Container maxWidth="lg">
        <Typography variant="h5" gutterBottom>
          Trailers
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            py: 1,
            '&::-webkit-scrollbar': { height: 8 },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
          }}
        >
          {trailers.map((video) => (
            <Grid item key={video.id} sx={{ minWidth: 250, flex: '0 0 auto' }}>
              <Box
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                }}
                onClick={() => handleOpen(video.key)}
              >
                <Box
                  component="img"
                  src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                  alt={video.name}
                  sx={{ width: '100%', display: 'block' }}
                />
                <IconButton
                  aria-label="Play video"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#fff',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                  }}
                >
                  <PlayArrowIcon fontSize="large" />
                </IconButton>
              </Box>
              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                {video.name}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          {currentKey && (
            <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${currentKey}`}
                title="Trailer"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </Box>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default VideoSection;
