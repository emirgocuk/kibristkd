import React from 'react';
import { Typography } from '@mui/material';

function AdminDashboard() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Paneli Anasayfa
      </Typography>
      <Typography variant="body1">
        İçerik yönetim sistemine hoş geldiniz. Soldaki menüden işlem yapmak istediğiniz bölümü seçebilirsiniz.
      </Typography>
    </div>
  );
}

export default AdminDashboard;