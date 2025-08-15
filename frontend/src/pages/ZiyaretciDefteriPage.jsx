import React, { useState, useEffect } from 'react';
import SectionTitle from '/src/components/SectionTitle.jsx';

// --- İkon (MUI Icon yerine) ---
const FavoriteIcon = () => (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
);

// Form girdileri için yeniden kullanılabilir bileşenler
const FormInput = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.id} className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
        <input {...props} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
    </div>
);

const FormTextarea = ({ label, ...props }) => (
     <div>
        <label htmlFor={props.id} className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
        <textarea {...props} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
    </div>
);


// Örnek Ziyaretçi Defteri Mesajları (değişiklik yok)
const sampleMessages = [
    { id: 1, name: 'Ahmet Yılmaz', message: 'Derneğinizin çalışmalarını uzun yıllardır takip ediyorum. Kıbrıs kültürünü yaşatma konusundaki emekleriniz için minnettarım.', date: '12 Ağustos 2025', likes: 152 },
    // ...diğer mesajlar
];

const MESSAGES_PER_PAGE = 6;

function ZiyaretciDefteriPage() {
  const [messages, setMessages] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(MESSAGES_PER_PAGE);

  useEffect(() => {
    const sortedMessages = [...sampleMessages].sort((a, b) => b.likes - a.likes);
    setMessages(sortedMessages);
    setDisplayedMessages(sortedMessages.slice(0, MESSAGES_PER_PAGE));
  }, []);

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + MESSAGES_PER_PAGE;
    setVisibleCount(newVisibleCount);
    setDisplayedMessages(messages.slice(0, newVisibleCount));
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      {/* Mesaj Yazma Alanı */}
      <div className="mb-12 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <SectionTitle>Ziyaretçi Defteri</SectionTitle>
        <div className="mt-4">
          <h2 className="mb-1 text-2xl font-bold text-gray-800">Siz de anınızı bırakın.</h2>
          <p className="mb-6 text-gray-600">Anı defterinde sizi de okuyalım.</p>
          
          <form noValidate autoComplete="off" className="space-y-6">
            <FormInput id="name" label="Adınız Soyadınız" type="text" required />
            <FormTextarea id="message" label="Mesajınız" required rows={8} />
            <div>
              <button type="submit" className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Gönder
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mesaj Listeleme Alanı */}
      <div>
        <SectionTitle>Anılar</SectionTitle>
        <div className="mt-4 space-y-4">
          {displayedMessages.map((item) => (
            <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
                {/* Chip -> div */}
                <div className="inline-flex items-center space-x-1 rounded-full border border-blue-500 px-2 py-1 text-sm font-bold text-blue-600">
                  <FavoriteIcon />
                  <span>{item.likes}</span>
                </div>
              </div>
              <p className="text-gray-700">{item.message}</p>
            </div>
          ))}

          {displayedMessages.length < messages.length && (
            <div className="pt-6 text-center">
              <button onClick={handleLoadMore} className="rounded-md border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Daha Fazla Yükle
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ZiyaretciDefteriPage;