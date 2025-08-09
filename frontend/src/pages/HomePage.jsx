import React, { useState, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import axios from 'axios';

import HeroSlider from '@/components/HeroSlider';
import MainContentSlider from '@/components/MainContentSlider';
import Sidebar from '@/components/Sidebar';
import SectionTitle from '@/components/SectionTitle';
import HaberKarti from '@/components/HaberKarti';

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
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <MainContentSlider />
                        <SectionTitle>Haberler & Makaleler</SectionTitle>

                        {loading && <p>Yükleniyor...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        
                        {!loading && !error && (
                            <Grid container spacing={2}>
                                {makaleler.map((makale) => (
                                    <Grid item xs={12} sm={6} key={makale.id}>
                                        <HaberKarti 
                                            id={makale.id}
                                            title={makale.title}
                                            date={new Date(makale.createdAt).toLocaleDateString('tr-TR')}
                                            summary={makale.content.substring(0, 100) + '...'}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
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
