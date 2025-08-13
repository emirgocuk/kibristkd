import React from 'react';
import { Container, Typography, Grid, Paper, TextField, Button, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

function IletisimPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Bize Ulaşın
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 6 }}>
        Görüş, öneri ve sorularınız için bizimle iletişime geçebilirsiniz.
      </Typography>

      <Grid container spacing={4}>
        {/* İletişim Bilgileri */}
        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>İletişim Bilgileri</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>Halk Sokak No:17/2 Yenişehir Çankaya Ankara</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>0 (312) 434 14 12</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography>info@kibristkd.org.tr</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* İletişim Formu */}
        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Mesaj Gönderin</Typography>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Adınız Soyadınız" variant="outlined" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="E-posta Adresiniz" variant="outlined" required type="email" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Konu" variant="outlined" required />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mesajınız"
                    variant="outlined"
                    required
                    multiline
                    rows={6}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" size="large" type="submit">
                    Gönder
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default IletisimPage;
