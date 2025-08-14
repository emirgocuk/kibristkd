import React from 'react';
<<<<<<< HEAD
=======
import { Box, Container, Grid, Paper, Typography, Link as MuiLink } from '@mui/material';
>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)
import { Link } from 'react-router-dom';

// Slider için Swiper bileşenleri
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Daha önce dönüştürülmüş bileşenler
import HeroSlider from '../components/HeroSlider';
import Sidebar from '../components/Sidebar';

// --- Örnek Veriler (Değişiklik yok) ---
const featuredArticle = { /* ...veri... */ };
const otherArticles = [ /* ...veri... */ ];
const galleryData = [ /* ...veri... */ ];
const conflictData = [ /* ...veri... */ ];
const bookData = [ /* ...veri... */ ];

<<<<<<< HEAD
// --- ALT BİLEŞENLER (TAILWIND İLE YENİDEN YAZILMIŞ) ---
=======
const otherArticles = [
  { id: 2, title: 'Lefkoşa\'nın Tarihi Dokusu: Büyük Han ve Selimiye Camii', author: 'Sabahattin İsmail', date: '11 Ağustos 2025', image: 'https://images.unsplash.com/photo-1601754593399-6316b8a7f722?q=80&w=1974&auto=format&fit=crop', slug: '/haber/lefkosanin-tarihi-dokusu' },
  { id: 3, title: 'Karpaz\'ın Altın Kumları ve Özgür Eşekleri', author: 'Ayşe Güler', date: '9 Ağustos 2025', image: 'https://images.unsplash.com/photo-1599834562135-b6fc90e642ca?q=80&w=1935&auto=format&fit=crop', slug: '/haber/karpazin-altin-kumlari' },
  { id: 4, title: 'Bellapais Manastırı: Gotik Mimarinin Eşsiz Örneği', author: 'Hasan İkizer', date: '7 Ağustos 2025', image: 'https://images.unsplash.com/photo-1562601579-599dec174238?q=80&w=1964&auto=format&fit=crop', slug: '/haber/bellapais-manastiri' },
  { id: 5, title: 'Gazimağusa Surları ve Othello Kalesi\'nin Hikayesi', author: 'İsmail Bozkurt', date: '5 Ağustos 2025', image: 'https://images.unsplash.com/photo-1618503934778-3fe36304595a?q=80&w=2070&auto=format&fit=crop', slug: '/haber/gazimagusa-surlari' },
];

// Galeri Slider Verileri
const galleryData = [
    { id: 1, image: 'https://images.unsplash.com/photo-1628013835882-c6514a6ac050?q=80&w=1974&auto=format&fit=crop', text: "Kıbrıs'ın tescilli lezzeti Hellim, keçi ve koyun sütünden yapılan, hem taze hem de kızartılarak tüketilebilen eşsiz bir peynirdir." },
    { id: 2, image: 'https://images.unsplash.com/photo-1551990872-6d55d7b09f1a?q=80&w=2070&auto=format&fit=crop', text: "Kıbrıs, Akdeniz'in en önemli Caretta Caretta ve Yeşil Kaplumbağa yuvalama alanlarından biridir." },
    { id: 3, image: 'https://plus.unsplash.com/premium_photo-1679435434389-c58a8a4cff62?q=80&w=1974&auto=format&fit=crop', text: "UNESCO Somut Olmayan Kültürel Miras listesindeki Lefkara işi, Venedikliler döneminden beri süregelen geleneksel bir el sanatıdır." },
    { id: 4, image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=1974&auto=format&fit=crop', text: "Sadece Kıbrıs'ta yetişen endemik bir bitki olan Medoş Lalesi, her yıl Mart ve Nisan aylarında açar." },
    { id: 5, image: 'https://images.unsplash.com/photo-1622879539804-54145718e47d?q=80&w=2070&auto=format&fit=crop', text: "Beşparmak Dağları'ndaki St. Hilarion Kalesi'nin, Walt Disney'in Uyuyan Güzel şatosuna ilham verdiği söylenir." },
];
>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)

// Diğer makaleler için kart bileşeni
function ArticleCard({ article }) {
  return (
<<<<<<< HEAD
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
=======
    <Paper variant="outlined" sx={{ height: '100%', display: 'flex', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 2 } }}>
      <MuiLink component={Link} to={article.slug} underline="none" sx={{ display: 'flex', width: '100%', p: 2, color: 'inherit' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1" component="h3" fontWeight="700" sx={{ color: 'text.primary' }}>
                {article.title}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography component="span" variant="caption" fontWeight="bold">{article.author}</Typography>
                <Typography component="span" variant="caption" color="text.secondary"> ・ {article.date}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                width: '100%',
                paddingTop: '100%', // 1:1 Aspect Ratio
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${article.image})`,
                borderRadius: 0.5,
              }}
            />
          </Grid>
        </Grid>
      </MuiLink>
    </Paper>
>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)
  );
}

// Galeri Slider Bileşeni
function GallerySlider() {
    return (
<<<<<<< HEAD
        <section className="bg-white py-12">
            <div className="container mx-auto max-w-screen-lg px-4">
                <SectionTitle>Kıbrıs'tan Manzaralar</SectionTitle>
=======
        <Box sx={{ py: 6, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h2" fontWeight="bold" align="center" gutterBottom>
                    Kıbrıs'tan Manzaralar
                </Typography>
>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)
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

<<<<<<< HEAD
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
=======
>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)

// --- ANA SAYFA BİLEŞENİ ---
export default function HomePage() {
  return (
    <main>
      <HeroSlider />

<<<<<<< HEAD
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
=======
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {/* Sol Sütun: Makaleler */}
          <Grid item xs={12} md={8}>
            {/* Öne Çıkan Makale */}
            <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <Typography variant="h4" component="h2" fontWeight="800" gutterBottom>
                    <MuiLink component={Link} to={featuredArticle.slug} color="inherit" underline="hover">
                      {featuredArticle.title}
                    </MuiLink>
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {featuredArticle.excerpt}
                  </Typography>
                  <Box>
                    <Typography component="span" variant="body2" fontWeight="bold">{featuredArticle.author}</Typography>
                    <Typography component="span" variant="body2" color="text.secondary"> ・ {featuredArticle.date}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    component="img"
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '1 / 1',
                      objectFit: 'cover',
                      borderRadius: 1,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Diğer Makaleler */}
            <Grid container spacing={3}>
>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)
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
      
<<<<<<< HEAD
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
=======
      {/* Yeni Galeri Slider Bölümü */}
      <GallerySlider />

    </Box>
>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)
  );
}
