import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Paper, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

function GelistirmeNotlari() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await axios.get('/api/devnotes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token || !content.trim()) return;
    setLoading(true);
    try {
      await axios.post('/api/devnotes', { content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContent('');
      fetchNotes();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Geliştirme Notları</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Yeni Not"
          fullWidth
          multiline
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" disabled={loading}>Not Ekle</Button>
      </form>
      <List sx={{ mt: 2 }}>
        {notes.map((note) => (
          <ListItem key={note.id} alignItems="flex-start" divider>
            <ListItemText
              primary={new Date(note.createdAt).toLocaleString()}
              secondary={note.content}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default GelistirmeNotlari;
