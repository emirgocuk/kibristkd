import React from 'react';
import { Typography, Box } from '@mui/material';

const SectionTitle = ({ children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
      {children}
    </Typography>
    <Box sx={{ height: '3px', width: '60px', backgroundColor: 'secondary.main', mt: 1 }} />
  </Box>
);

export default SectionTitle;