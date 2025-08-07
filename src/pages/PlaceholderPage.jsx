import React from 'react';
import { Container, Typography, Box } from '@mui/material';

// Bu component, 'title' adında bir prop alarak sayfa başlığını dinamik olarak yazar.
function PlaceholderPage({ title }) {
  return (
    <Container sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Bu sayfanın içeriği yakında eklenecektir.
        </Typography>
      </Box>
    </Container>
  );
}

export default PlaceholderPage;