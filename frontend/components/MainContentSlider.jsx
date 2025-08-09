import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, Typography } from '@mui/material';

const MainContentSlider = ({ slides }) => {
    if (!Array.isArray(slides)) {
        return null;
    }

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            style={{ width: '100%', height: '350px' }}
        >
            {slides.map((slide, index) => (
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
                            backgroundColor: 'rgba(0, 0, 0, 0.4)'
                        }}
                    >
                        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                            {slide.title}
                        </Typography>
                        <Typography variant="body1" sx={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                            {slide.description}
                        </Typography>
                    </Box>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MainContentSlider;
