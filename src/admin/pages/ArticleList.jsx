import React from 'react';
import { Typography } from '@mui/material';

function ArticleList() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Makale Yönetimi
      </Typography>
      <Typography variant="body1">
        Yazarlar tarafından gönderilen ve onay bekleyen makaleler bu bölümde listelenecektir.
      </Typography>
    </div>
  );
}

// En önemli kısım: Bu satır, bileşeni dışa aktararak App.jsx'in onu bulmasını sağlar.
export default ArticleList;