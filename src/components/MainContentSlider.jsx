import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Box, Typography } from '@mui/material';

// slide1.png dosyasını photos klasöründen import ediyoruz
import slideImage1 from '@/photos/slide1.jpg'; // Uzantıyı .jpg olarak düzeltin

// Örnek haber verileri
const newsData = [
  {
    image: slideImage1,
    category: 'Basında KKTC',
    title: 'BASIN AÇIKLAMASI',
  },
  {
    image: slideImage1,
    category: 'Duyurular',
    title: 'YENİ BURS BAŞVURULARI',
  },
];

// Başlıklar için ortak stil
const SectionTitle = ({ children }) => (
  <Typography
    variant="body2"
    component="h2"
    sx={{
      display: 'inline-block',
      backgroundColor: 'primary.main',
      color: 'white',
      px: 2,
      py: 0.5,
      mb: 2,
      fontWeight: 'bold',
    }}
  >
    {children}
  </Typography>
);

function MainContentSlider() {
  return (
    <Box>
      <SectionTitle>Haberler</SectionTitle>
      <Box sx={{ position: 'relative' }}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation
          loop={true}
          style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-navigation-size': '30px',
          }}
        >
          {newsData.map((item, index) => (
            <SwiperSlide key={index}>
              <Box sx={{ position: 'relative', height: '400px' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    color: 'white',
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#ffcdd2' }}>
                    {item.category}
                  </Typography>
                  <Typography variant="h6" component="p" fontWeight="bold">
                    {item.title}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

export default MainContentSlider;
