import React, { useState } from 'react';
import logo from '../../photos/logo.png';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';

// Bu component, 'title' adında bir prop alarak sayfa başlığını dinamik olarak yazar.
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // Bu kısım Vite proxy ayarı sayesinde çalışacaktır.
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Bir hata oluştu.');
      }

      console.log('Giriş Başarılı:', data);
      localStorage.setItem('token', data.token);
      
      // Giriş başarılı olunca /girne (admin anasayfasına) yönlendir
      navigate('/girne'); 

    } catch (err) {
      setError(err.message);
      console.error('Giriş hatası:', err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* LOGO EKLENDİ */}
        <Box
          component="img"
          sx={{
            height: 60,
            mb: 2,
          }}
          alt="Logo"
          src={logo}
        />
        <Typography component="h1" variant="h5">
          Yönetim Paneli Girişi
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-posta Adresi"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Giriş Yap
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

// EN ÖNEMLİ KISIM: Bu satır bileşeni dışa aktarır.
export default LoginPage;