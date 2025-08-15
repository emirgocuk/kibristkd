import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

// Swiper stillerini import etmeye devam ediyoruz
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import slideImage1 from '../photos/slide1.jpg';
import slideImage2 from '../photos/slide2.jpg';
import slideImage3 from '../photos/slide3.jpg';
import slideImage4 from '../photos/slide4.jpg';

const sliderData = [
  { image: slideImage1, title: 'KIBRIS', subtitle: 'TÜRK KÜLTÜR DERNEĞİ' },
  { image: slideImage2, title: 'TARİHİMİZ', subtitle: 'KÖKLÜ BİR MİRAS' },
  { image: slideImage3, title: 'KÜLTÜRÜMÜZ', subtitle: 'NESİLDEN NESİLE' },
  { image: slideImage4, title: 'KIYMETİMİZ', subtitle: 'PAHA BİÇİLEMEZ' },
];

function HeroSlider() {
  return (
    // Box -> div, sx -> className
    // h: '60vh' -> h-[60vh] (keyfi değer)
    <div className="relative h-[60vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full"
        style={{ '--swiper-navigation-color': '#fff' }}
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <>
                <div
                  style={{ backgroundImage: `url(${slide.image})` }}
                  className={`h-full w-full bg-cover bg-center ${isActive ? 'animate-kenburns-top' : ''}`}
                ></div>

                {/* Text Overlay */}
                <div className="absolute left-[10%] top-1/2 z-10 -translate-y-1/2 text-white">
                  <div className="overflow-hidden">
                    <h2
                      className={`transform text-6xl font-bold transition-transform duration-700 ease-in-out md:text-8xl ${
                        isActive ? 'translate-y-0' : 'translate-y-full'
                      }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
                    >
                      {slide.title}
                    </h2>
                  </div>
                  <div className="mt-1 overflow-hidden">
                    <p
                      className={`transform text-2xl transition-transform duration-700 ease-in-out md:text-4xl ${
                        isActive ? 'translate-y-0' : 'translate-y-full'
                      }`}
                       style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', transitionDelay: '200ms' }}
                    >
                      <span className="bg-[#D32F2F] px-2 py-1">
                        {slide.subtitle}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlider;