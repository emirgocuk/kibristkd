/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // HeroSlider için
        'kenburns-top': {
          '0%': {
            transform: 'scale(1) translateY(0)',
            'transform-origin': '50% 16%',
          },
          '100%': {
            transform: 'scale(1.15) translateY(-15px)',
            'transform-origin': 'top',
          },
        },
        // GirnePanel için
        'marquee': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'kenburns-top': 'kenburns-top 10s ease-out both',
        'marquee': 'marquee 15s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // HaberDetayPage'deki `prose` sınıfı için eklendi
  ],
}