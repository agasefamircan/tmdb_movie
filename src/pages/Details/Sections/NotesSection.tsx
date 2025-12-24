import { type FC, useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Note, NotesSectionProps } from '../../../types/detailsPage';

const NotesSection: FC<NotesSectionProps> = ({ id, type }) => {
  const STORAGE_KEY = `notes-${type}-${id}`;
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setNotes(JSON.parse(saved));
  }, [STORAGE_KEY]);

  const saveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes));
  };

  const handleAdd = () => {
    if (!text.trim()) return;
    const newNote: Note = {
      id: Date.now().toString(),
      text: text.trim(),
      date: new Date().toISOString(),
    };
    saveNotes([newNote, ...notes]);
    setText('');
  };

  const handleDelete = (noteId: string) => {
    saveNotes(notes.filter((n) => n.id !== noteId));
  };

  const handleEdit = (noteId: string, newText: string) => {
    saveNotes(notes.map((n) => (n.id === noteId ? { ...n, text: newText } : n)));
  };

  return (
    <Box sx={{ py: 5 }} maxWidth="md">
      <Container maxWidth="md">
        <Typography variant="h5" gutterBottom>
          Your Notes
        </Typography>

        <Stack spacing={2} mb={2}>
          <TextField
            multiline
            minRows={2}
            placeholder="Write your note..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
          <Button aria-label="Save Note" variant="contained" onClick={handleAdd}>
            Save Note
          </Button>
        </Stack>

        <Stack spacing={2}>
          {notes.map((note) => (
            <Box
              key={note.id}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 1,
              }}
            >
              <TextField
                multiline
                minRows={2}
                value={note.text}
                fullWidth
                onChange={(e) => handleEdit(note.id, e.target.value)}
              />
              <IconButton color="error" onClick={() => handleDelete(note.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default NotesSection;
