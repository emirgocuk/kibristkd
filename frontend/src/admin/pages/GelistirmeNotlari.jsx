import React, { useEffect, useState } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const GelistirmeNotlari = () => {
        const [notes, setNotes] = useState([]);
        const [title, setTitle] = useState('');
        const [content, setContent] = useState('');

        const fetchNotes = async () => {
                try {
                        const res = await axios.get('/api/dev-notes');
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
                try {
                        await axios.post('/api/dev-notes', { title, content });
                        setTitle('');
                        setContent('');
                        fetchNotes();
                } catch (err) {
                        console.error(err);
                }
        };

        return (
                <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                                Geliştirme Notları
                        </Typography>
                        <form onSubmit={handleSubmit}>
                                <TextField
                                        label="Başlık"
                                        fullWidth
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        margin="normal"
                                />
                                <TextField
                                        label="İçerik"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        margin="normal"
                                />
                                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                                        Not Ekle
                                </Button>
                        </form>
                        <List sx={{ mt: 4 }}>
                                {notes.map((note, index) => (
                                        <ListItem key={index} alignItems="flex-start">
                                                <ListItemText primary={note.title} secondary={note.content} />
                                        </ListItem>
                                ))}
                        </List>
                </Paper>
        );
};

export default GelistirmeNotlari;
