import React from 'react';
import { Box, Container, Grid, Paper, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

// Slider için Swiper bileşenlerini import ediyoruz
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import HeroSlider from '../components/HeroSlider';
import Sidebar from '../components/Sidebar';

// Örnek Makale Verileri
const featuredArticle = {
  id: 1,
  title: 'Kıbrıs\'ın Tarihi Limanı: Girne Kalesi ve Batık Gemi Müzesi',
  excerpt: 'Girne\'nin simgesi haline gelen tarihi kalesi, içerisinde barındırdığı ve dünyanın en eski batık gemilerinden biri olarak kabul edilen Batık Gemi Müzesi ile ziyaretçilerini binlerce yıllık bir tarih yolculuğuna çıkarıyor.',
  author: 'Prof. Dr. Ata Atun',
  date: '13 Ağustos 2025',
  image: 'https://images.unsplash.com/photo-1623625345933-1a91393623a6?q=80&w=2070&auto=format&fit=crop',
  slug: '/haber/girne-kalesi-ve-batik-gemi-muzesi'
};

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

// Diğer makaleler için kart bileşeni
function ArticleCard({ article }) {
  return (
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
  );
}

// Galeri Slider Bileşeni
function GallerySlider() {
    return (
        <Box sx={{ py: 6, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h2" fontWeight="bold" align="center" gutterBottom>
                    Kıbrıs'tan Manzaralar
                </Typography>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    loop={true}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    breakpoints={{
                        600: { slidesPerView: 2 },
                        900: { slidesPerView: 3 },
                    }}
                    style={{ '--swiper-navigation-color': '#fff', '--swiper-navigation-size': '30px' }}
                >
                    {galleryData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', height: 350 }}>
                                <Box
                                    component="img"
                                    src={item.image}
                                    alt={item.text.substring(0, 20)}
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    p: 2,
                                    color: 'white',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                                }}>
                                    <Typography variant="body2">{item.text}</Typography>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </Box>
    );
}


export default function HomePage() {
  return (
    <Box>
      <HeroSlider />

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
              {otherArticles.map((article) => (
                <Grid item xs={12} sm={6} key={article.id}>
                  <ArticleCard article={article} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Sağ Sütun: Sidebar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 24 } }}>
              <Sidebar />
            </Box>
          </Grid>
        </Grid>
      </Container>
      
      {/* Yeni Galeri Slider Bölümü */}
      <GallerySlider />

    </Box>
  );
}
