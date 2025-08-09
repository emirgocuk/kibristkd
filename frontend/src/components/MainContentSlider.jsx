import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Box, Typography } from '@mui/material';
import HaberKarti from './HaberKarti';

function MainContentSlider({ makaleler }) {
  if (!makaleler || makaleler.length === 0) {
    return <Typography>Gösterilecek haber bulunmuyor.</Typography>;
  }

  return (
    <Box>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        loop={true}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
      >
        {makaleler.map((makale) => (
          <SwiperSlide key={makale.id}>
            <HaberKarti
              id={makale.id}
              title={makale.title}
              date={new Date(makale.createdAt).toLocaleDateString('tr-TR')}
              summary={makale.content.substring(0, 100) + '...'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default MainContentSlider;