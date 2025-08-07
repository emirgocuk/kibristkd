import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, Paper, styled, List, ListItem, ListItemText, ListItemAvatar, Avatar, TextField, Card, CardMedia, CardContent, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import SearchIcon from '@mui/icons-material/Search';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { fullScreenSlides, newsSliderItems, pressLinks, conflictLinks, columnists, sidebarAnnouncements, sidebarBook, recommendations, cultureItems, books } from '../data/mockData';

// --- STİL BİLEŞENLERİ (RENKLER DÜZELTİLDİ) ---

const SectionHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // <-- DOĞRU KIRMIZI: '#D32F2F' yerine tema rengi kullanıldı
  color: theme.palette.common.white,
  padding: theme.spacing(0.5, 2),
  marginBottom: theme.spacing(2),
  display: 'inline-block',
}));

const SidebarBox = styled(Box)(({ theme }) => ({
  border: '1px dashed #ccc',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

// --- BÜYÜK SLIDER (EN ÜSTTEKİ) İÇİN BİLEŞENLER ---
const TopSliderContainer = styled(Box)({
  position: 'relative', width: '100%', height: '80vh', overflow: 'hidden',
});

const TopSliderTrack = styled(Box)(({ activeIndex }) => ({
  display: 'flex', height: '100%', transform: `translateX(-${activeIndex * 100}%)`,
  transition: 'transform 1s cubic-bezier(0.86, 0, 0.07, 1)',
}));

const TopSlideItem = styled(Box)(({ image }) => ({
  position: 'relative', minWidth: '100%', height: '100%',
  backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center',
  '&::after': {
    content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  }
}));

const TopTextContainer = styled(Box)(({ theme, active }) => ({
    position: 'relative', zIndex: 2, height: '100%', display: 'flex',
    flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center',
    textAlign: 'left', color: 'white', paddingLeft: theme.spacing(20), paddingRight: theme.spacing(10),
    [theme.breakpoints.down('md')]: { paddingLeft: theme.spacing(6), paddingRight: theme.spacing(6) },
    opacity: active ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s',
}));

const MainText = styled(Typography)(({ theme }) => ({
  fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)', textTransform: 'uppercase',
}));

const SupplementaryTextContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main, // <-- DOĞRU KIRMIZI: 'error.main' yerine tema rengi kullanıldı
    color: theme.palette.common.white,
    padding: theme.spacing(1.5, 4), marginTop: theme.spacing(2), display: 'inline-block',
}));

const SupplementaryText = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold', fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    textTransform: 'uppercase', letterSpacing: '1px',
}));

const ArrowButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
  color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.2)', width: 50, height: 50,
  transition: 'background-color 0.3s ease', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  '&.left': { left: theme.spacing(3) }, '&.right': { right: theme.spacing(3) },
}));

const newsSliderSettings = {
  dots: true, infinite: true, speed: 500,
  slidesToShow: 1, slidesToScroll: 1, autoplay: true, arrows: true,
};

// --- ANA SAYFA BİLEŞENİ (DEĞİŞİKLİK YOK) ---
function HomePage() {
  const [topSliderIndex, setTopSliderIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTopSliderIndex((current) => (current + 1) % fullScreenSlides.length);
    }, 8000);
    return () => clearTimeout(timer);
  }, [topSliderIndex]);

  const goToNextTopSlide = () => setTopSliderIndex((prev) => (prev + 1) % fullScreenSlides.length);
  const goToPrevTopSlide = () => setTopSliderIndex((prev) => (prev - 1 + fullScreenSlides.length) % fullScreenSlides.length);

  return (
    <>
      <TopSliderContainer>
        <TopSliderTrack activeIndex={topSliderIndex}>
          {fullScreenSlides.map((slide, index) => (
            <TopSlideItem key={index} image={slide.image}>
              <TopTextContainer active={index === topSliderIndex}>
                <MainText>{slide.mainText}</MainText>
                <SupplementaryTextContainer>
                    <SupplementaryText>{slide.supplementaryText}</SupplementaryText>
                </SupplementaryTextContainer>
              </TopTextContainer>
            </TopSlideItem>
          ))}
        </TopSliderTrack>
        <ArrowButton className="left" onClick={goToPrevTopSlide}><NavigateBeforeIcon fontSize="large" /></ArrowButton>
        <ArrowButton className="right" onClick={goToNextTopSlide}><NavigateNextIcon fontSize="large" /></ArrowButton>
      </TopSliderContainer>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* ... sayfanın geri kalanında değişiklik yok ... */}
            <Box mb={5}>
              <SectionHeader><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Haberler</Typography></SectionHeader>
              <Paper variant="outlined" sx={{ p: 0.5 }}>
                <Slider {...newsSliderSettings}>
                    {newsSliderItems.map((haber, index) => (
                        <Box key={index} component={Link} to={haber.path}>
                            <img src={haber.image} alt="" style={{ width: '100%', display: 'block' }} />
                        </Box>
                    ))}
                </Slider>
              </Paper>
            </Box>
            <Box mb={5}>
              <SectionHeader><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Basında KKTC</Typography></SectionHeader>
              <List sx={{ p: 0 }}>
                {pressLinks.map((item, index) => (
                  <ListItem key={index} divider sx={{ flexDirection: 'column', alignItems: 'flex-start', px: 0, py: 1.5 }}>
                    <MuiLink component={Link} to="#" color="inherit" underline="hover"><Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item.title}</Typography></MuiLink>
                    <Typography variant="body2" color="text.secondary">{item.subtitle}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box mb={5}>
              <SectionHeader><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Kıbrıs Uyuşmazlığı</Typography></SectionHeader>
              <Grid container spacing={3}>
                {conflictLinks.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <MuiLink component={Link} to="#" color="inherit" underline="hover"><Typography variant="body1">{item.title}</Typography></MuiLink>
                    <Typography variant="caption" color="text.secondary">{item.date}</Typography>
                    <Divider sx={{ mt: 1.5 }} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box mb={5}>
              <SectionHeader><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Etkinlikler</Typography></SectionHeader>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2, border: '1px solid #eee' }}>
                <Box sx={{ bgcolor: '#333', color: 'white', p: 2, textAlign: 'center', mr: 2 }}>
                  <Typography variant="h4" fontWeight="bold">03</Typography>
                  <Typography variant="body1">AUG</Typography>
                </Box>
                <Typography variant="h6">Yaklaşan Etkinlik Bulunmamaktadır</Typography>
              </Box>
            </Box>
            <Grid container spacing={4} mb={5}>
                {recommendations.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <SectionHeader><Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item.title}</Typography></SectionHeader>
                        <Card variant="outlined" sx={{ boxShadow: 'none' }}>
                            <CardMedia component="img" height="180" image={item.image} alt={item.title} />
                            <CardContent><Typography variant="body2" color="text.secondary">{item.description}</Typography></CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box>
              <SectionHeader><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Kıbrıs Türk Kültürü</Typography></SectionHeader>
              <Grid container spacing={2}>
                {cultureItems.map(item => (
                  <Grid item xs={6} sm={3} key={item.title}>
                    <Card variant="outlined" sx={{ textAlign: 'center', boxShadow: 'none' }}>
                      <CardMedia component="img" height="120" image={item.image} alt={item.title} />
                      <CardContent sx={{ p: 1 }}><Typography variant="body2">{item.title}</Typography></CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <SidebarBox>
              <SectionHeader><Typography variant="body2" component="h3" sx={{ fontWeight: 'bold' }}>Site İçi Arama</Typography></SectionHeader>
              <Box component="form" sx={{ display: 'flex' }}><TextField fullWidth variant="outlined" size="small" placeholder="Aradığınız Kelime" /><IconButton type="submit" sx={{ ml: 0.5 }}><SearchIcon /></IconButton></Box>
            </SidebarBox>
            <SidebarBox>
              <SectionHeader><Typography variant="body2" component="h3" sx={{ fontWeight: 'bold' }}>Duyurular</Typography></SectionHeader>
              <MuiLink component={Link} to={sidebarAnnouncements.path} underline="none">
                <img src={sidebarAnnouncements.image} alt={sidebarAnnouncements.title} style={{ width: '100%', marginBottom: '8px' }} />
                <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>{sidebarAnnouncements.title}</Typography>
              </MuiLink>
            </SidebarBox>
            <SidebarBox>
              <SectionHeader><Typography variant="body2" component="h3" sx={{ fontWeight: 'bold' }}>Köşe Yazarları</Typography></SectionHeader>
              <List sx={{ p: 0 }}>
                {columnists.map((author, index) => (
                  <ListItem key={index} divider sx={{ alignItems: 'center', px: 0, py: 1 }}>
                    <ListItemAvatar><MuiLink component={Link} to={author.path}><Avatar alt={author.name} src={author.avatar} sx={{ width: 50, height: 50 }} /></MuiLink></ListItemAvatar>
                    <ListItemText primary={<MuiLink component={Link} to={author.path} color="inherit" underline="hover"><Typography variant="body1" fontWeight="bold">{author.name}</Typography></MuiLink>} />
                  </ListItem>
                ))}
              </List>
            </SidebarBox>
            <SidebarBox>
              <SectionHeader><Typography variant="body2" component="h3" sx={{ fontWeight: 'bold' }}>Kitap Tanıtımı</Typography></SectionHeader>
              <MuiLink component={Link} to={sidebarBook.path} underline="none"><img src={sidebarBook.image} alt="" style={{ width: '100%' }} /></MuiLink>
            </SidebarBox>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default HomePage;