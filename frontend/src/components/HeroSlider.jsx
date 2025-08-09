import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Parallax, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/parallax';
import { Box, Typography } from '@mui/material';
import slideImage1 from '@/photos/slide1.jpg';
import slideImage2 from '@/photos/slide2.jpg';
import slideImage3 from '@/photos/slide3.jpg';

const sliderData = [
  { image: slideImage1, title: 'KIBRIS', subtitle: 'TÜRK KÜLTÜR DERNEĞİ' },
  { image: slideImage2, title: 'TARİHİMİZ', subtitle: 'KÖKLÜ BİR MİRAS' },
  { image: slideImage3, title: 'KÜLTÜRÜMÜZ', subtitle: 'NESİLDEN NESİLE' },
];

function HeroSlider() {
  return (
    <Box sx={{ position: 'relative', height: '60vh' }}>
      <Swiper
        modules={[Navigation, Parallax, Autoplay]}
        spaceBetween={0} slidesPerView={1} navigation loop={true} parallax={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff', height: '100%' }}
      >
        <Box slot="container-start" className="parallax-bg" sx={{ position: 'absolute', left: 0, top: 0, width: '130%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center' }} data-swiper-parallax="-23%"></Box>
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index} style={{ overflow: 'hidden' }}>
            <Box sx={{ width: '100%', height: '100%', backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} data-swiper-parallax="-600"></Box>
            <Box sx={{ position: 'absolute', top: '50%', left: '10%', transform: 'translateY(-50%)', color: 'white' }}>
              <Typography variant="h1" component="h2" fontWeight="bold" data-swiper-parallax="-300">{slide.title}</Typography>
              <Typography variant="h4" component="p" sx={{ display: 'inline-block', mt: 1 }} data-swiper-parallax="-100"><span style={{ backgroundColor: '#D32F2F', padding: '4px 8px' }}>{slide.subtitle}</span></Typography>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
export default HeroSlider;
