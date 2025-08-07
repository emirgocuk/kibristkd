import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Link'i import et
// import HaberKarti from '@/components/HaberKarti'; // Kendi kendini import etme kaldırıldı

// Component artık 'id'yi de prop olarak alıyor
function HaberKarti({ id, title, date, summary }) {
  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {date}
        </Typography>
        <Typography variant="body2" paragraph>
          {summary}
        </Typography>
      </CardContent>
      <CardActions>
        {/* Butonu Link'e çevirip, dinamik 'to' adresi veriyoruz */}
        <Button size="small" variant="outlined" component={Link} to={`/haber/${id}`}>
          Devamını Oku
        </Button>
      </CardActions>
    </Card>
  );
}

export default HaberKarti;
