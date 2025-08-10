import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, TextField, Button, Stack, Typography, Alert } from '@mui/material';

export default function GirneLogin() {
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    const res = await login(email, password);
    if (res.ok) nav('/girne/panel', { replace: true });
    else setErr(res.message || 'Giriş başarısız');
  };

  return (
    <Box sx={{ maxWidth: 520, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>Girne — Yönetim Girişi</Typography>
        {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
        <form onSubmit={submit}>
          <Stack spacing={2}>
            <TextField label="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField label="Şifre" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" variant="contained" disabled={loading}>Giriş Yap</Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
