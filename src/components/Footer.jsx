import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import logo from '@/photos/logo.png';

// Başlıklar için ortak stil
const FooterTitle = ({ children }) => (
  <Typography
    variant="h6"
    component="h3"
    sx={{
      fontWeight: 'bold',
      mb: 2,
      pb: 1,
      borderBottom: '2px solid',
      borderColor: 'primary.main',
    }}
  >
    {children}
  </Typography>
);

// Örnek veriler
const recentNews = [
    { title: 'İHALE SÜRE UZATILMASI', date: '2025-04-22', path: '/haber/1' },
    { title: 'Basın Duyurusu', date: '2025-04-21', path: '/haber/2' },
    { title: 'KIBRIS TÜRK KÜLTÜR DERNEĞİ GENEL MERKEZİ İHALE DUYURUSU', date: '2025-04-15', path: '/haber/3' },
];

const footerLinks = [
    { text: 'Genel Başkanımızın TV Konuşması', path: '/link/1' },
    { text: 'Kıbrıs Gazetesi', path: '/link/2' },
    { text: 'Kıbrıs Postası', path: '/link/3' },
    { text: 'Kıbrıs Hava Durumu', path: '/link/4' },
    { text: 'Doktor Rehberi', path: '/link/5' },
    { text: 'Avukat Rehberi', path: '/link/6' },
];

function Footer() {
  return (
    <Box sx={{ bgcolor: '#2d2d2d', color: 'grey.400', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          {/* Sütun 1: İletişim */}
          <Grid item xs={12} md={3}>
            <img src={logo} alt="Logo" style={{ height: '50px', marginBottom: '24px', marginTop: '10px' }} />
            
            {/* GÜNCELLENDİ: İletişim bilgileri daha modern bir liste yapısıyla sunuldu */}
            <List disablePadding>
                <ListItem disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: '40px', color: 'primary.main' }}>
                        <LocationOnIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="Halk Sokak No:17/2 Yenişehir Çankaya Ankara" 
                        primaryTypographyProps={{ variant: 'body1', color: 'grey.300' }} 
                    />
                </ListItem>
                <ListItem disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: '40px', color: 'primary.main' }}>
                        <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="0 (312) 434 14 12" 
                        primaryTypographyProps={{ variant: 'body1', color: 'grey.300' }} 
                    />
                </ListItem>
                <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: '40px', color: 'primary.main' }}>
                        <EmailIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary="kibristkd@gmail.com" 
                        primaryTypographyProps={{ variant: 'body1', color: 'grey.300' }} 
                    />
                </ListItem>
            </List>

            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>Sosyal Hesaplar</Typography>
            <Box>
              <IconButton sx={{ color: 'white', bgcolor: '#3b5998', mr: 1, '&:hover': { bgcolor: '#2d4373' } }}><FacebookIcon /></IconButton>
              <IconButton sx={{ color: 'white', bgcolor: '#1DA1F2', mr: 1, '&:hover': { bgcolor: '#0c85d0' } }}><TwitterIcon /></IconButton>
              <IconButton sx={{ color: 'white', bgcolor: '#FF0000', '&:hover': { bgcolor: '#c40000' } }}><YouTubeIcon /></IconButton>
            </Box>
          </Grid>

          {/* Sütun 2: Haberler */}
          <Grid item xs={12} md={3}>
            <FooterTitle>Haberler</FooterTitle>
            <List disablePadding>
                {recentNews.map((news, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 2 }}>
                        <ListItemAvatar sx={{ minWidth: '60px' }}>
                            <Avatar variant="square" src={logo} />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={<MuiLink component={Link} to={news.path} color="inherit" underline="hover">{news.title}</MuiLink>}
                            secondary={news.date}
                            secondaryTypographyProps={{ color: 'grey.500' }}
                        />
                    </ListItem>
                ))}
            </List>
          </Grid>

          {/* Sütun 3: Bağlantılar */}
          <Grid item xs={12} md={3}>
            <FooterTitle>Bağlantılar</FooterTitle>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                {footerLinks.map((link, index) => (
                    <Box component="li" key={index} sx={{ mb: 1.5, borderBottom: '1px solid #444', pb: 1.5 }}>
                        <MuiLink component={Link} to={link.path} color="inherit" underline="hover">{link.text}</MuiLink>
                    </Box>
                ))}
            </Box>
          </Grid>

          {/* Sütun 4: Galeriler */}
          <Grid item xs={12} md={3}>
            <FooterTitle>Galeriler</FooterTitle>
             <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 1.5, borderBottom: '1px solid #444', pb: 1.5 }}>
                    <MuiLink component={Link} to="/foto-galeri" color="inherit" underline="hover">Foto Galeri</MuiLink>
                </Box>
                 <Box component="li" sx={{ mb: 1.5, borderBottom: '1px solid #444', pb: 1.5 }}>
                    <MuiLink component={Link} to="/video-galeri" color="inherit" underline="hover">Video Galeri</MuiLink>
                </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
