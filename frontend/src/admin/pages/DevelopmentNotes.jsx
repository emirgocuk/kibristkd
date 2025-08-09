import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Alert,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

function DevelopmentNotes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotes = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('/api/dev-notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      setError('Notlar yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        '/api/dev-notes',
        { content: newNote },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNotes((prev) => [...prev, res.data]);
      setNewNote('');
    } catch (err) {
      setError('Not eklenirken bir hata oluştu.');
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
  }

  return (
    <Box>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Geliştirme Notları
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <List>
          {notes.map((note) => (
            <ListItem key={note.id} divider>
              <ListItemText primary={note.content || note.text || note.note} />
            </ListItem>
          ))}
        </List>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Yeni Not"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            fullWidth
            multiline
          />
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Ekle
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default DevelopmentNotes;

