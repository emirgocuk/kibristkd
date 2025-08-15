import React from 'react';
import SectionTitle from '/src/components/SectionTitle.jsx'; // Daha önce dönüştürdüğümüz bileşen

// --- İkon ---
// LocationOnIcon yerine geçecek basit SVG
const LocationOnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

// Örnek Etkinlik Verileri (değişiklik yok)
const eventsData = [
  {
    title: 'Kıbrıs Kültür Gecesi ve Fotoğraf Sergisi',
    description: 'Kıbrıs\'ın zengin tarihini ve kültürünü yansıtan fotoğrafların sergileneceği, yerel sanatçıların canlı performanslarıyla renklenecek unutulmaz bir geceye davetlisiniz. Gecede Kıbrıs mutfağından eşsiz lezzetler de sunulacaktır.',
    location: 'Dernek Genel Merkezi, Ankara',
    date: '25 Ekim 2025 - 19:00',
    imageUrl: 'https://images.unsplash.com/photo-1549492423-4002122c3855?q=80&w=2070&auto=format&fit=crop'
  },
  // ...diğer etkinlikler
];

// Tek bir etkinlik kartı bileşeni
function EventCard({ event }) {
  return (
    // Ana sarmalayıcı, kartlar arasına dikey boşluk ekler
    <section className="py-8">
      <div className="container mx-auto max-w-screen-lg px-4">
        {/* Paper -> div, elevation -> shadow, p -> p */}
        <div className="flex w-full flex-col overflow-hidden rounded-lg bg-white p-4 shadow-lg md:min-h-[70vh] md:flex-row md:p-8">
          
          {/* Sol Taraf: Metin İçerikleri */}
          {/* Grid item -> div */}
          <div className="flex w-full flex-col md:w-1/2">
            <SectionTitle>{event.title}</SectionTitle>
            <p className="my-2 flex-grow text-base text-gray-600">
              {event.description}
            </p>
            <div className="mt-auto text-right">
              <p className="inline-flex items-center font-bold text-blue-600">
                <LocationOnIcon /> 
                <span className="ml-2">{event.location}</span>
              </p>
              <p className="text-sm text-gray-500">
                {event.date}
              </p>
            </div>
          </div>
          
          {/* Sağ Taraf: Görsel */}
          <div className="mt-6 w-full md:mt-0 md:w-1/2 md:pl-8">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Ana Sayfa Bileşeni
function EtkinliklerPage() {
  return (
    // Box -> div
    <div>
      {eventsData.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
}

export default EtkinliklerPage;