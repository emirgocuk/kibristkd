import React, { useEffect, useState } from 'react';
import { Paper, Typography, FormControlLabel, Switch, Alert } from '@mui/material';
import axios from 'axios';

const Ayarlar = () => {
        const [allowAppPublishing, setAllowAppPublishing] = useState(true);
        const [message, setMessage] = useState('');

        useEffect(() => {
                const fetchSettings = async () => {
                        const token = localStorage.getItem('token');
                        try {
                                const res = await axios.get('/api/settings', {
                                        headers: { Authorization: `Bearer ${token}` },
                                });
                                setAllowAppPublishing(res.data.allowAppPublishing);
                        } catch (err) {
                                setMessage('Ayarlar yüklenemedi.');
                                console.error(err);
                        }
                };
                fetchSettings();
        }, []);

        const handleToggle = async (e) => {
                const value = e.target.checked;
                setAllowAppPublishing(value);
                const token = localStorage.getItem('token');
                try {
                        await axios.put(
                                '/api/settings',
                                { allowAppPublishing: value },
                                { headers: { Authorization: `Bearer ${token}` } },
                        );
                        setMessage('Ayar güncellendi.');
                } catch (err) {
                        setMessage('Ayar güncellenemedi.');
                        console.error(err);
                }
        };

        return (
                <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                                Ayarlar
                        </Typography>
                        {message && (
                                <Alert severity={message.includes('güncellendi') ? 'success' : 'error'} sx={{ mb: 2 }}>
                                        {message}
                                </Alert>
                        )}
                        <FormControlLabel
                                control={<Switch checked={allowAppPublishing} onChange={handleToggle} />}
                                label="Uygulamadan yayınlamaya izin ver"
                        />
                </Paper>
        );
};

export default Ayarlar;
