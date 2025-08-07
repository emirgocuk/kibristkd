import React from 'react';
import { Typography, Container } from '@mui/material';

function HakkimizdaPage() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3">Hakkımızda</Typography>
      <Typography paragraph>
        Bu alan derneğin tarihçesi ve kurumsal bilgileri ile dolacak.
      </Typography>
    </Container>
  );
}

export default HakkimizdaPage;