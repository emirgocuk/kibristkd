import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import http, { unwrap } from '../api/http';

import HeroSlider from '@/components/HeroSlider';
import MainContentSlider from '@/components/MainContentSlider';
import Sidebar from '@/components/Sidebar';
import SectionTitle from '@/components/SectionTitle';

const HomePage = () => {
    const [makaleler, setMakaleler] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMakaleler = async () => {
            try {
                const r = await http.get('/api/makaleler');
                const items = unwrap(r, []);
                setMakaleler(Array.isArray(items) ? items : []);
            } catch (err) {
                setError('Makaleler yüklenirken bir sorun oluştu.');
                console.error(err);
                setMakaleler([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMakaleler();
    }, []);

    return (
        <Box>
            <HeroSlider />
            <Box sx={{ textAlign: 'center', py: 4, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                <Typography variant="h3">Derneğimize Hoş Geldiniz</Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    Kıbrıs Türk kültürünü yaşatmak için çalışıyoruz.
                </Typography>
            </Box>
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <SectionTitle>Öne Çıkan Haberler</SectionTitle>
                        
                        {loading && <p>Yükleniyor...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        
                        {!loading && !error && <MainContentSlider makaleler={makaleler} />}

                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Sidebar />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage;
