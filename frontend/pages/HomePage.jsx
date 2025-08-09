import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import axios from 'axios'; // API istekleri için axios'u import ediyoruz

// Bileşenleri (Component) import ediyoruz
import HeroSlider from '../components/HeroSlider';
import MainContentSlider from '../components/MainContentSlider';
import Sidebar from '../components/Sidebar';
import SectionTitle from '../components/SectionTitle';
import HaberKarti from '../components/HaberKarti';

const HomePage = () => {
	// Gelen makaleleri saklamak için bir state (durum) oluşturuyoruz. Başlangıçta boş bir dizi.
	const [makaleler, setMakaleler] = useState([]);
	// Veri yüklenirken veya hata oluştuğunda kullanıcıya bilgi vermek için state'ler
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// useEffect hook'u, bileşen ilk render edildiğinde sadece bir kez çalışır.
	// Backend'den verileri çekmek için en doğru yer burasıdır.
	useEffect(() => {
		const fetchMakaleler = async () => {
			try {
				// Vite proxy ayarı sayesinde sadece '/api/makaleler' yazmamız yeterli.
				// Bu istek otomatik olarak http://localhost:5000/api/makaleler adresine yönlendirilir.
				const response = await axios.get('/api/makaleler');
        
				// Gelen veriyi (sadece "approved" statüsündeki makaleler) state'e kaydediyoruz.
				setMakaleler(response.data);
			} catch (err) {
				// Bir hata oluşursa, hata mesajını state'e kaydediyoruz.
				setError('Makaleler yüklenirken bir sorun oluştu.');
				console.error(err); // Hatanın detayını konsola yazdırıyoruz.
			} finally {
				// İstek başarılı da olsa, hata da olsa yükleme durumunu bitiriyoruz.
				setLoading(false);
			}
		};

		fetchMakaleler();
	}, []); // Köşeli parantezin boş olması, bu etkinin sadece bir kez çalışmasını sağlar.

	return (
		<Box>
			<HeroSlider />
			<Container maxWidth="lg" sx={{ mt: 4 }}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={8}>
						<MainContentSlider />
						<SectionTitle title="Haberler & Makaleler" />

						{/* Yüklenme durumunu kontrol et */}
						{loading && <Typography>Yükleniyor...</Typography>}

						{/* Hata durumunu kontrol et */}
						{error && <Typography color="error">{error}</Typography>}
            
						{/* Yükleme bittiyse ve hata yoksa makaleleri göster */}
						{!loading && !error && (
							<Grid container spacing={2}>
								{makaleler.map((haber) => (
									<Grid item xs={12} sm={6} key={haber.id}>
										<HaberKarti haber={haber} />
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
