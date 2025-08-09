import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Box, Typography, GlobalStyles } from '@mui/material';

import slideImage1 from '../../photos/slide1.jpg';
import slideImage2 from '../../photos/slide2.jpg';
import slideImage3 from '../../photos/slide3.jpg';
import slideImage4 from '../../photos/slide4.jpg';

const sliderData = [
  { image: slideImage1, title: 'KIBRIS', subtitle: 'TÜRK KÜLTÜR DERNEĞİ' },
  { image: slideImage2, title: 'TARİHİMİZ', subtitle: 'KÖKLÜ BİR MİRAS' },
  { image: slideImage3, title: 'KÜLTÜRÜMÜZ', subtitle: 'NESİLDEN NESİLE' },
  { image: slideImage4, title: 'KIYMETİMİZ', subtitle: 'PAHA BİÇİLEMEZ' },
];

const kenburnsKeyframes = `
  @keyframes kenburns-top {
    0% {
      transform: scale(1) translateY(0);
      transform-origin: 50% 16%;
    }
    100% {
      transform: scale(1.15) translateY(-15px);
      transform-origin: top;
    }
  }
`;

function HeroSlider() {
  return (
    <>
      <GlobalStyles styles={kenburnsKeyframes} />
      <Box sx={{ position: 'relative', height: '60vh', overflow: 'hidden' }}>
        <Swiper
          modules={[Navigation, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          style={{ '--swiper-navigation-color': '#fff', height: '100%' }}
        >
          {sliderData.map((slide, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <>
                  <Box
                    sx={{
                      width: '100%', height: '100%',
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      animation: isActive ? 'kenburns-top 10s ease-out both' : 'none',
                    }}
                  ></Box>
                  <Box sx={{
                    position: 'absolute', top: '50%', left: '10%',
                    transform: 'translateY(-50%)', color: 'white', zIndex: 10,
                  }}>
                    <Box sx={{ overflow: 'hidden' }}>
                      <Typography
                        variant="h1" component="h2" fontWeight="bold"
                        sx={{
                          transform: isActive ? 'translateY(0)' : 'translateY(100%)',
                          transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        }}
                      >
                        {slide.title}
                      </Typography>
                    </Box>
                     <Box sx={{ overflow: 'hidden', mt: 1 }}>
                       <Typography
                        variant="h4" component="p"
                        sx={{
                          display: 'inline-block',
                          transform: isActive ? 'translateY(0)' : 'translateY(100%)',
                          transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
                        }}
                       >
                        <span style={{ backgroundColor: '#D32F2F', padding: '4px 8px' }}>
                          {slide.subtitle}
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
export default HeroSlider;