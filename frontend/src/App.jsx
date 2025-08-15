import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlobalContent from './components/GlobalContent';

// --- İkon (MUI Icon yerine) ---
const KeyboardArrowUpIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
);

// --- Yukarı Çık Düğmesi (MUI Fab ve useScrollTrigger yerine) ---
function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Sayfa aşağı kaydırıldığında butonu göster
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Component kaldırıldığında event listener'ı temizle
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Sayfanın en üstüne yumuşak bir şekilde kaydır
  const scrollToTop = () => {
    const anchor = document.querySelector('#back-to-top-anchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[1200]">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="scroll back to top"
        className={`
          flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg
          transition-opacity duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:ring-offset-2
          ${isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}
        `}
      >
        <KeyboardArrowUpIcon />
      </button>
    </div>
  );
}


export default function App() {
  return (
    // Box -> div, sx -> className
    // `bg-gray-50` MUI'nin `background.default` rengine benzer.
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div id="back-to-top-anchor" className="absolute top-0" />
      
      <Navbar />
      
      {/* GlobalContent UI render etmediği için aynı kalır */}
      <GlobalContent />
      
      {/* Ana içerik alanı, flex-grow ile mevcut boşluğu doldurur */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />

      <ScrollTop />
    </div>
  );
}