import React from 'react';
import { Link } from 'react-router-dom';

// --- İkon (MUI Icon yerine) ---
const ArrowForwardIcon = () => (
    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
);

// Örnek yazar verileri (değişiklik yok)
const yazarlar = [
    { id: 1, name: 'İsmail Bozkurt', path: '/yazarlar/ismail-bozkurt', bio: 'Kıbrıs Türk edebiyatının önemli isimlerinden, yazar ve politikacı.', lastArticle: 'Annan Planı ve Sonrası' },
    // ...diğer yazarlar
];


// Yazar kartı bileşeni
function YazarKarti({ yazar }) {
  // Yazar adının baş harflerini al
  const initials = yazar.name.split(' ').map(n => n[0]).join('');
  const placeholderImageUrl = `https://placehold.co/200x250/EEEEEE/31343C?text=${encodeURIComponent(initials)}`;

  return (
    <Link to={yazar.path} className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="flex">
        {/* Sol Sütun: Resim */}
        <div 
          className="h-48 w-1/3 flex-shrink-0 border-r border-gray-200 bg-cover bg-center"
          style={{ backgroundImage: `url(${placeholderImageUrl})` }}
        />
        {/* Sağ Sütun: Bilgiler */}
        <div className="flex w-2/3 flex-col justify-between p-4">
          <div>
            <h2 className="mb-1 font-bold text-gray-800">{yazar.name}</h2>
            <p className="text-sm text-gray-600 line-clamp-3" style={{ minHeight: '60px' }}>
              {yazar.bio}
            </p>
          </div>
          <div className="mt-3 flex items-center font-bold text-blue-600">
            <span className="text-sm">{yazar.lastArticle}</span>
            <div className="ml-1">
                <ArrowForwardIcon />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}


function YazarlarPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Yazarlarımız</h1>
      </div>
      
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {yazarlar.map((yazar) => (
          <YazarKarti key={yazar.id} yazar={yazar} />
        ))}
      </div>
    </div>
  );
}

export default YazarlarPage;