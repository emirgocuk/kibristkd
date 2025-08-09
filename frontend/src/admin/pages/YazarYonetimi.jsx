import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from '@mui/material';
import axios from 'axios';

const YazarYonetimi = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const fetchAuthors = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Yetkiniz yok. Lütfen tekrar giriş yapın.');
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get('/api/yazarlar', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAuthors(res.data);
    } catch (err) {
      setError('Yazarlar yüklenirken bir hata oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        '/api/auth/register',
        { name, email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Yazar başarıyla eklendi.');
      setName('');
      setEmail('');
      setPassword('');
      fetchAuthors();
    } catch (err) {
      setMessage('Yazar eklenirken bir hata oluştu.');
      console.error(err);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Yeni Yazar Ekle
        </Typography>
        {message && (
          <Alert severity={message.includes('başarı') ? 'success' : 'error'} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="İsim"
            fullWidth
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="E-posta"
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Şifre"
            type="password"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Ekle
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Yazar Listesi
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <List>
            {authors.map((author) => (
              <ListItem key={author.id} divider>
                <ListItemText primary={author.name} secondary={author.email} />
              </ListItem>
            ))}
            {authors.length === 0 && (
              <Typography>Yazar bulunamadı.</Typography>
            )}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default YazarYonetimi;
