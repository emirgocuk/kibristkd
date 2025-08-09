import React from 'react';
import { Box, Typography } from '@mui/material';

const Sidebar = ({ children }) => (
    <Box sx={{ width: 250, bgcolor: '#f5f5f5', p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
            Yan Menü
        </Typography>
        {children}
    </Box>
);

export default Sidebar;
