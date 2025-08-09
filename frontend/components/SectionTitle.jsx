import React from 'react';
import { Typography, Box } from '@mui/material';

const SectionTitle = ({ title, subtitle }) => (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
            {title}
        </Typography>
        {subtitle && (
            <Typography variant="subtitle1" color="text.secondary">
                {subtitle}
            </Typography>
        )}
    </Box>
);

export default SectionTitle;
