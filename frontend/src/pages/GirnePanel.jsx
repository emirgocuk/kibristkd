// frontend/src/pages/GirnePanel.jsx
import React, { useState } from 'react';
import { Container, Paper, Typography, Stack, Button, TextField, Alert } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function GirnePanel() {
  const { user, logout } = useAuth();

  const [baslik, setBaslik] = useState('');
  const [icerik, setIcerik] = useState('');
  const [kategori, setKategori] = useState('');
  const [kapakResmi, setKapakResmi] = useState('');
  const [ok, setOk] = useState(null);
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setOk(null); setErr(null);
    try {
      const token = localStorage.getItem('token');
      const body = {
        baslik,
        icerik,
        kategori,
        kapakResmi: kapakResmi || undefined,
        // tarih sunucuda otomatikse gerek yok; istersen gönder:
        // tarih: new Date().toISOString(),
      };
      const res = await axios.post('/api/makaleler', body, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const saved = res?.data?.data || res?.data || {};
      setOk(`Makale kaydedildi (id: ${saved.id ?? '—'})`);
      setBaslik(''); setIcerik(''); setKategori(''); setKapakResmi('');
    } catch (e2) {
      setErr(e2?.response?.data?.message || e2.message || 'Kayıt başarısız');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Yönetim Paneli
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Hoş geldin {user?.name} ({(user?.role || '').toLowerCase()})
        </Typography>

        <Stack component="form" onSubmit={submit} spacing={2} sx={{ mt: 2 }}>
          {ok && <Alert severity="success">{ok}</Alert>}
          {err && <Alert severity="error">{err}</Alert>}
          <TextField label="Başlık" value={baslik} onChange={(e)=>setBaslik(e.target.value)} required />
          <TextField label="İçerik" value={icerik} onChange={(e)=>setIcerik(e.target.value)} multiline minRows={6} required />
          <TextField label="Kategori" value={kategori} onChange={(e)=>setKategori(e.target.value)} />
          <TextField label="Kapak Resmi URL" value={kapakResmi} onChange={(e)=>setKapakResmi(e.target.value)} />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">Makale Ekle</Button>
            <Button variant="outlined" onClick={logout}>Çıkış</Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
