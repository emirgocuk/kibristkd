import React from 'react';
import { Link } from 'react-router-dom';

// Slider için Swiper bileşenleri
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Daha önce dönüştürülmüş bileşenler
import HeroSlider from '../components/HeroSlider';
import Sidebar from '../components/Sidebar';
import SectionTitle from '/src/components/SectionTitle.jsx';

// --- Örnek Veriler (Değişiklik yok) ---
const featuredArticle = { /* ...veri... */ };
const otherArticles = [ /* ...veri... */ ];
const galleryData = [ /* ...veri... */ ];
const conflictData = [ /* ...veri... */ ];
const bookData = [ /* ...veri... */ ];

// --- ALT BİLEŞENLER (TAILWIND İLE YENİDEN YAZILMIŞ) ---

// Diğer makaleler için kart bileşeni
function ArticleCard({ article }) {
  return (
    <Link to={article.slug} className="group flex h-full overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="flex w-full items-center justify-between space-x-4">
        <div className="flex flex-grow flex-col justify-between">
          <h3 className="mb-2 font-bold text-gray-800 group-hover:text-blue-600">{article.title}</h3>
          <div>
            <span className="text-xs font-bold text-gray-700">{article.author}</span>
            <span className="text-xs text-gray-500"> ・ {article.date}</span>
          </div>
        </div>
        <div 
          className="h-20 w-20 flex-shrink-0 rounded bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
        />
      </div>
    </Link>
  );
}

// Galeri Slider Bileşeni
function GallerySlider() {
    return (
        <section className="bg-white py-12">
            <div className="container mx-auto max-w-screen-lg px-4">
                <SectionTitle>Kıbrıs'tan Manzaralar</SectionTitle>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    loop={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    style={{ '--swiper-navigation-color': '#fff', '--swiper-navigation-size': '30px' }}
                >
                    {galleryData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="group relative h-80 overflow-hidden rounded-lg">
                                <img src={item.image} alt={item.text.substring(0, 20)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-0 p-4 text-white">
                                    <p className="text-sm">{item.text}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

// Kitap Tanıtım Bileşeni
function BookPromotionSection() {
    return (
        <section className="bg-gray-50 py-12">
            <div className="container mx-auto max-w-screen-lg px-4">
                <SectionTitle>Kitap Tanıtımı</SectionTitle>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {bookData.map((book) => (
                        <div key={book.id} className="text-center">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="mx-auto h-96 w-auto max-w-[250px] rounded-md object-cover shadow-lg"
                            />
                            <div className="mt-4">
                                <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
                                <p className="text-gray-600">{book.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- ANA SAYFA BİLEŞENİ ---
export default function HomePage() {
  return (
    <main>
      <HeroSlider />

      {/* Haberler ve Sidebar Bölümü */}
      <div className="container mx-auto my-8 max-w-screen-lg px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Sol Sütun: Makaleler */}
          <div className="md:col-span-8">
            <SectionTitle>Haberler</SectionTitle>
            
            {/* Öne Çıkan Makale */}
            <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                        <h2 className="mb-2 text-2xl font-extrabold text-gray-900">
                            <Link to={featuredArticle.slug} className="hover:text-blue-600 hover:underline">{featuredArticle.title}</Link>
                        </h2>
                        <p className="mb-4 text-gray-600">{featuredArticle.excerpt}</p>
                        <div>
                            <span className="text-sm font-bold text-gray-800">{featuredArticle.author}</span>
                            <span className="text-sm text-gray-500"> ・ {featuredArticle.date}</span>
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <img src={featuredArticle.image} alt={featuredArticle.title} className="aspect-square h-auto w-full rounded-md object-cover"/>
                    </div>
                </div>
            </div>

            {/* Diğer Makaleler */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {otherArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Sağ Sütun: Sidebar */}
          <div className="md:col-span-4">
            <div className="sticky top-6">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
      
      {/* Kıbrıs Uyuşmazlığı Bölümü */}
      <section className="py-12">
        <div className="container mx-auto max-w-screen-lg px-4">
          <SectionTitle>Kıbrıs Uyuşmazlığı</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {conflictData.map((item, index) => (
              <a href="#" key={index} className="group block h-full rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-lg">
                <h3 className="mb-1 font-bold text-gray-800 group-hover:text-blue-600">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.author && `${item.author} ・ `}{item.date}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <GallerySlider />
      <BookPromotionSection />
    </main>
  );
}