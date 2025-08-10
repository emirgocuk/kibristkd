import React, { useEffect, useState } from 'react';
import http, { unwrap } from '../api/http';
import { useAuth } from '../context/AuthContext';
import {
  Box, Paper, TextField, Button, Stack, Typography, Alert, Grid, Chip, IconButton, Tooltip
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PublishIcon from '@mui/icons-material/Publish';
import UndoIcon from '@mui/icons-material/Undo';

const statusColor = (s) => {
  if (s === 'published') return 'success';
  if (s === 'pending') return 'warning';
  return 'default'; // draft
};

export default function GirnePanel() {
  const { user } = useAuth();
  const [baslik, setBaslik] = useState('');
  const [icerik, setIcerik] = useState('');
  const [kategori, setKategori] = useState('');
  const [kapakResmi, setKapakResmi] = useState('');
  const [ok, setOk] = useState('');
  const [err, setErr] = useState('');
  const [list, setList] = useState([]);

  const load = async () => {
    try {
      const data = await unwrap(http.get('/api/makaleler/admin'));
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Liste yüklenemedi');
    }
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setOk(''); setErr('');
    try {
      const body = { baslik, icerik, kategori, kapakResmi: kapakResmi || undefined };
      const { data } = await http.post('/api/makaleler', body);
      if (data?.success) {
        setOk('Makale eklendi (onay bekliyor)');
        setBaslik(''); setIcerik(''); setKategori(''); setKapakResmi('');
        load();
      } else setErr(data?.message || 'Hata');
    } catch (e) {
      setErr(e?.response?.data?.message || 'Hata');
    }
  };

  const doPublish = async (id) => {
    setErr(''); setOk('');
    try {
      const { data } = await http.post(`/api/makaleler/${id}/publish`);
      if (data?.success) { setOk('Yayımlandı'); load(); }
      else setErr(data?.message || 'Hata');
    } catch (e) { setErr(e?.response?.data?.message || 'Hata'); }
  };

  const doDraft = async (id) => {
    setErr(''); setOk('');
    try {
      const { data } = await http.post(`/api/makaleler/${id}/draft`);
      if (data?.success) { setOk('Taslağa alındı'); load(); }
      else setErr(data?.message || 'Hata');
    } catch (e) { setErr(e?.response?.data?.message || 'Hata'); }
  };

  const doDelete = async (id) => {
    if (!confirm('Silmek istediğine emin misin?')) return;
    setErr(''); setOk('');
    try {
      const { data } = await http.delete(`/api/makaleler/${id}`);
      if (data?.success) { setOk('Silindi'); load(); }
      else setErr(data?.message || 'Hata');
    } catch (e) { setErr(e?.response?.data?.message || 'Hata'); }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>Merhaba {user?.name}</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>Yeni Makale</Typography>
        {ok && <Alert severity="success" sx={{ mb: 2 }}>{ok}</Alert>}
        {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}

        <form onSubmit={submit}>
          <Stack spacing={2}>
            <TextField label="Başlık" value={baslik} onChange={(e) => setBaslik(e.target.value)} required />
            <TextField label="Kategori" value={kategori} onChange={(e) => setKategori(e.target.value)} />
            <TextField label="Kapak Görseli (URL)" value={kapakResmi} onChange={(e) => setKapakResmi(e.target.value)} />
            <TextField label="İçerik" value={icerik} onChange={(e) => setIcerik(e.target.value)} multiline minRows={6} required />
            <Button type="submit" variant="contained">Kaydet</Button>
          </Stack>
        </form>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Makaleler</Typography>
        <Grid container spacing={2}>
          {list.map((m) => (
            <Grid item xs={12} key={m.id}>
              <Box sx={{ p: 1.5, border: '1px solid', borderColor: 'divider', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight={700}>{m.baslik}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {m.kategori || '—'} • {new Date(m.createdAt || m.updatedAt || Date.now()).toLocaleString('tr-TR')}
                  </Typography>
                </Box>
                <Chip label={m.status} color={statusColor(m.status)} variant="outlined" />
                <Tooltip title="Yayımla">
                  <span>
                    <IconButton onClick={() => doPublish(m.id)} disabled={m.status === 'published'}>
                      <PublishIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Taslağa al">
                  <span>
                    <IconButton onClick={() => doDraft(m.id)} disabled={m.status === 'draft'}>
                      <UndoIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Sil">
                  <IconButton color="error" onClick={() => doDelete(m.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
