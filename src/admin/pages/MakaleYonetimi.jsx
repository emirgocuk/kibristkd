import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Select, MenuItem, FormControl, InputLabel, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function MakaleYonetimi() {
  const [makaleler, setMakaleler] = useState([]);
  const [yazarlar, setYazarlar] = useState([]);
  const [yeniMakaleBaslik, setYeniMakaleBaslik] = useState('');
  const [yeniMakaleIcerik, setYeniMakaleIcerik] = useState('');
  const [secilenYazarId, setSecilenYazarId] = useState('');

  const fetchData = async () => {
    try {
      const [makalelerRes, yazarlarRes] = await Promise.all([
        fetch('/api/makaleler'),
        fetch('/api/yazarlar')
      ]);
      const makalelerData = await makalelerRes.json();
      const yazarlarData = await yazarlarRes.json();
      setMakaleler(makalelerData);
      setYazarlar(yazarlarData);
    } catch (error) {
      console.error("Veri çekilirken hata:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMakaleEkle = async (e) => {
    e.preventDefault();
    if (!yeniMakaleBaslik || !secilenYazarId) {
      alert('Başlık ve Yazar alanları zorunludur.');
      return;
    }
    try {
      await fetch('/api/makaleler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: yeniMakaleBaslik,
          content: yeniMakaleIcerik,
          author_id: secilenYazarId
        }),
      });
      setYeniMakaleBaslik('');
      setYeniMakaleIcerik('');
      setSecilenYazarId('');
      fetchData();
    } catch (error) {
      console.error("Makale eklenirken hata:", error);
    }
  };

  const handleMakaleSil = async (id) => {
    if (window.confirm('Bu makaleyi silmek istediğinize emin misiniz?')) {
        try {
            await fetch(`/api/makaleler/${id}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            console.error("Makale silinirken hata:", error);
        }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Makale Yönetimi</Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Yeni Makale Ekle</Typography>
        <Box component="form" onSubmit={handleMakaleEkle} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Yazar</InputLabel>
            <Select
              value={secilenYazarId}
              label="Yazar"
              onChange={(e) => setSecilenYazarId(e.target.value)}
            >
              {yazarlar.map((yazar) => (
                <MenuItem key={yazar.id} value={yazar.id}>{yazar.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Makale Başlığı" variant="outlined" size="small" value={yeniMakaleBaslik} onChange={(e) => setYeniMakaleBaslik(e.target.value)} required />
          <TextField label="Makale İçeriği" variant="outlined" size="small" multiline rows={4} value={yeniMakaleIcerik} onChange={(e) => setYeniMakaleIcerik(e.target.value)} />
          <Box sx={{ alignSelf: 'flex-end' }}>
            <Button type="submit" variant="contained" startIcon={<AddIcon />}>Ekle</Button>
          </Box>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow><TableCell>Başlık</TableCell><TableCell>Yazar</TableCell><TableCell>Tarih</TableCell><TableCell align="right">İşlemler</TableCell></TableRow>
          </TableHead>
          <TableBody>
            {makaleler.map((makale) => (
              <TableRow key={makale.id}>
                <TableCell>{makale.title}</TableCell>
                <TableCell>{makale.author ? makale.author.name : 'Bilinmiyor'}</TableCell>
                <TableCell>{new Date(makale.created_at).toLocaleDateString('tr-TR')}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="error" onClick={() => handleMakaleSil(makale.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MakaleYonetimi;
