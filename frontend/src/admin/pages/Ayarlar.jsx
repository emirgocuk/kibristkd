import React, { useEffect, useState } from 'react';
import { Paper, Typography, FormControlLabel, Switch, Alert, TextField, Button } from '@mui/material';
import axios from 'axios';

const Ayarlar = () => {
        const [allowAppPublishing, setAllowAppPublishing] = useState(true);
        const [message, setMessage] = useState('');
        const [globalContent, setGlobalContent] = useState('');

        useEffect(() => {
                const fetchSettings = async () => {
                        const token = localStorage.getItem('token');
                        try {
                                const res = await axios.get('/api/settings', {
                                        headers: { Authorization: `Bearer ${token}` },
                                });
                                setAllowAppPublishing(res.data.allowAppPublishing);
                                setGlobalContent(res.data.globalContent || '');
                        } catch (err) {
                                setMessage('Ayarlar yüklenemedi.');
                                console.error(err);
                        }
                };
                fetchSettings();
        }, []);

        const saveSettings = async (allowValue, contentValue) => {
                const token = localStorage.getItem('token');
                try {
                        await axios.put(
                                '/api/settings',
                                { allowAppPublishing: allowValue, globalContent: contentValue },
                                { headers: { Authorization: `Bearer ${token}` } },
                        );
                        setMessage('Ayar güncellendi.');
                } catch (err) {
                        setMessage('Ayar güncellenemedi.');
                        console.error(err);
                }
        };

        const handleToggle = async (e) => {
                const value = e.target.checked;
                setAllowAppPublishing(value);
                await saveSettings(value, globalContent);
        };

        const handleContentSave = async () => {
                await saveSettings(allowAppPublishing, globalContent);
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
                        <TextField
                                label="Ortak Sayfa İçeriği"
                                multiline
                                minRows={4}
                                value={globalContent}
                                onChange={(e) => setGlobalContent(e.target.value)}
                                fullWidth
                                sx={{ mt: 2 }}
                        />
                        <Button variant="contained" sx={{ mt: 2 }} onClick={handleContentSave}>
                                Kaydet
                        </Button>
                </Paper>
        );
};

export default Ayarlar;
