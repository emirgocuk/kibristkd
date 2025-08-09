// ...existing code...

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Box, Typography } from '@mui/material';

// Örnek slider verileri
const slideData = [
		{
				image: 'https://via.placeholder.com/1200x500/8d6e63/ffffff?text=Kıbrıs+Kültürü',
				title: 'Kıbrıs Kültürünü Yaşatıyoruz',
				subtitle: 'Derneğimiz, Kıbrıs Türk kültürünü ve geleneklerini yaşatmayı amaçlar.'
		},
		{
				image: 'https://via.placeholder.com/1200x500/5d4037/ffffff?text=Etkinliklerimiz',
				title: 'Kültürel Etkinlikler ve Festivaller',
				subtitle: 'Yıl boyunca düzenlediğimiz etkinliklerle bir araya geliyoruz.'
		},
		{
				image: 'https://via.placeholder.com/1200x500/6d4c41/ffffff?text=Yayınlarımız',
				title: 'Yayınlarımız ve Arşivimiz',
				subtitle: 'Kültürel mirasımızı yazılı ve görsel eserlerle geleceğe taşıyoruz.'
		}
];

const HeroSlider = () => {
	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay, EffectFade]}
			spaceBetween={0}
			slidesPerView={1}
			navigation
			pagination={{ clickable: true }}
			loop={true}
			autoplay={{
				delay: 5000,
				disableOnInteraction: false,
			}}
			effect="fade"
			style={{ width: '100%', height: '500px' }}
		>
			{slideData.map((slide, index) => (
				<SwiperSlide key={index}>
					<Box
						sx={{
							width: '100%',
							height: '100%',
							backgroundImage: `url(${slide.image})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column',
							color: 'white',
							textAlign: 'center',
							padding: '20px',
							backgroundColor: 'rgba(0, 0, 0, 0.5)'
						}}
					>
						<Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
							{slide.title}
						</Typography>
						<Typography variant="h5" sx={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
							{slide.subtitle}
						</Typography>
					</Box>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default HeroSlider;
