
import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Select, MenuItem, FormControl, InputLabel, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function MakaleYonetimi() {
  const [yeniMakaleBaslik, setYeniMakaleBaslik] = useState('');
  const [yeniMakaleIcerik, setYeniMakaleIcerik] = useState('');
  const [secilenYazarId, setSecilenYazarId] = useState('');

  // Not: Bu sayfanın API bağlantıları henüz tamamlanmamış.
  // Şimdilik sadece statik tasarım ve temel işlevsellik yer alıyor.
  
  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 3 }}>Makale Yönetimi</Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Yeni Makale Ekle</Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Yazar</InputLabel>
            <Select
              value={secilenYazarId}
              label="Yazar"
              onChange={(e) => setSecilenYazarId(e.target.value)}
            >
              {/* Burası /api/yazarlar'dan gelen veriyle dolacak */}
              <MenuItem value={10}>İsmail Bozkurt</MenuItem>
              <MenuItem value={20}>Ata Atun</MenuItem>
            </Select>
          </FormControl>
          <TextField 
            label="Makale Başlığı" 
            variant="outlined" 
            value={yeniMakaleBaslik} 
            onChange={(e) => setYeniMakaleBaslik(e.target.value)} 
            required 
          />
          <TextField 
            label="Makale İçeriği" 
            variant="outlined" 
            multiline 
            rows={5} 
            value={yeniMakaleIcerik} 
            onChange={(e) => setYeniMakaleIcerik(e.target.value)} 
          />
          <Box sx={{ alignSelf: 'flex-end' }}>
            <Button type="submit" variant="contained" startIcon={<AddIcon />}>Ekle</Button>
          </Box>
        </Box>
      </Paper>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Başlık</TableCell>
                <TableCell>Yazar</TableCell>
                <TableCell>Tarih</TableCell>
                <TableCell align="right">İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Örnek veri, burası API'den gelecek */}
              <TableRow>
                <TableCell>Örnek Makale Başlığı</TableCell>
                <TableCell>İsmail Bozkurt</TableCell>
                <TableCell>08.08.2025</TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default MakaleYonetimi;
