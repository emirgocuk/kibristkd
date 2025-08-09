import React, { useState, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import axios from 'axios';

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
                const response = await axios.get('/api/makaleler');
                setMakaleler(response.data);
            } catch (err) {
                setError('Makaleler yüklenirken bir sorun oluştu.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMakaleler();
    }, []);

    return (
        <Box>
            <HeroSlider />
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
