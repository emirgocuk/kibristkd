import React from 'react';
import { Box, Typography } from '@mui/material';

const AdminSidebar = ({ children }) => (
    <Box sx={{ width: 250, bgcolor: '#e0e0e0', p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
            Admin Menü
        </Typography>
        {children}
    </Box>
);

export default AdminSidebar;
