import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)
import logo from '../photos/logo.png';

// --- İkonlar ---
// SVG içerikleri eklenmiş ve yazım hatası düzeltilmiş ikonlar
const LocationOnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
    </svg>
);
const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.791 4.649-.562.152-1.158.22-1.757.149.581 1.85 2.266 3.198 4.258 3.234-2.083 1.628-4.723 2.6-7.59 2.25 2.684 1.726 5.875 2.734 9.245 2.734 11.09 0 17.153-9.176 17.032-17.165.94-.678 1.758-1.523 2.423-2.508z" />
    </svg>
);
const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.28-.059-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z" />
    </svg>
);


// --- Alt Başlık ---
const FooterTitle = ({ children }) => (
  <h3 className="mb-4 border-b-2 border-blue-500 pb-2 text-xl font-bold">
    {children}
  </h3>
);

// --- Veriler ---
const recentNews = [
    { title: 'İHALE SÜRE UZATILMASI', date: '2025-04-22', path: '/haber/1' },
    { title: 'Basın Duyurusu', date: '2025-04-21', path: '/haber/2' },
];

const footerLinks = [
    { text: 'Genel Başkanımızın TV Konuşması', path: '/link/1' },
    { text: 'Kıbrıs Gazetesi', path: '/link/2' },
];

function Footer() {
  return (
<<<<<<< HEAD
    <footer className="bg-[#2d2d2d] py-12 text-gray-400">
      <div className="container mx-auto max-w-screen-lg px-4">
        {/* Ana Izgara Yapısı */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Sütun 1: İletişim ve Sosyal Medya */}
          <div>
            <img src={logo} alt="Logo" className="mb-6 mt-2.5 h-12" />
            <ul>
              <li className="mb-3 flex items-start">
                <span className="mr-3 shrink-0 text-blue-500"><LocationOnIcon /></span>
                <span className="text-gray-300">Halk Sokak No:17/2 Yenişehir Çankaya Ankara</span>
              </li>
              <li className="mb-3 flex items-center">
                <span className="mr-3 shrink-0 text-blue-500"><PhoneIcon /></span>
                <span className="text-gray-300">0 (312) 434 14 12</span>
              </li>
            </ul>
            <h4 className="mb-2 mt-6 font-bold text-white">Sosyal Hesaplar</h4>
            <div className="flex space-x-2">
              <a href="#" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3b5998] text-white transition-colors duration-300 hover:bg-[#2d4373]"><FacebookIcon /></a>
              <a href="#" aria-label="Twitter" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DA1F2] text-white transition-colors duration-300 hover:bg-[#0c85d0]"><TwitterIcon /></a>
              <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E1306C] text-white transition-colors duration-300 hover:bg-[#c13584]"><InstagramIcon /></a>
            </div>
          </div>
          
          {/* Sütun 2: Haberler */}
          <div>
=======
    <Box sx={{ bgcolor: '#2d2d2d', color: 'grey.400', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <img src={logo} alt="Logo" style={{ height: '50px', marginBottom: '24px', marginTop: '10px' }} />
            <List disablePadding>
                <ListItem disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: '40px', color: 'primary.main' }}><LocationOnIcon /></ListItemIcon>
                    <ListItemText primary="Halk Sokak No:17/2 Yenişehir Çankaya Ankara" primaryTypographyProps={{ variant: 'body1', color: 'grey.300' }} />
                </ListItem>
                <ListItem disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: '40px', color: 'primary.main' }}><PhoneIcon /></ListItemIcon>
                    <ListItemText primary="0 (312) 434 14 12" primaryTypographyProps={{ variant: 'body1', color: 'grey.300' }} />
                </ListItem>
            </List>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 3 }}>Sosyal Hesaplar</Typography>
            <Box>
              <IconButton sx={{ color: 'white', bgcolor: '#3b5998', mr: 1, '&:hover': { bgcolor: '#2d4373' } }}><FacebookIcon /></IconButton>
              <IconButton sx={{ color: 'white', bgcolor: '#1DA1F2', mr: 1, '&:hover': { bgcolor: '#0c85d0' } }}><TwitterIcon /></IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)
            <FooterTitle>Haberler</FooterTitle>
            <ul className="space-y-4">
              {recentNews.map((news, index) => (
                <li key={index} className="flex items-center">
                  <img src={logo} alt="Haber" className="mr-4 h-14 w-14 shrink-0 rounded object-cover" />
                  <div>
                    <Link to={news.path} className="text-gray-300 transition-colors duration-300 hover:text-white hover:underline">
                      {news.title}
                    </Link>
                    <p className="text-sm text-gray-500">{news.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Sütun 3: Bağlantılar */}
          <div>
            <FooterTitle>Bağlantılar</FooterTitle>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index} className="border-b border-gray-700 pb-3">
                  <Link to={link.path} className="transition-colors duration-300 hover:text-white hover:underline">{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sütun 4: Galeriler */}
          <div>
            <FooterTitle>Galeriler</FooterTitle>
<<<<<<< HEAD
            <ul className="space-y-3">
              <li className="border-b border-gray-700 pb-3">
                <Link to="/foto-galeri" className="transition-colors duration-300 hover:text-white hover:underline">Foto Galeri</Link>
              </li>
              <li className="border-b border-gray-700 pb-3">
                <Link to="/video-galeri" className="transition-colors duration-300 hover:text-white hover:underline">Video Galeri</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Alt Telif Hakkı Bölümü */}
      <div className="mt-10 bg-[#1e1e1e] py-3 text-gray-500">
        <div className="container mx-auto flex max-w-screen-lg items-center justify-between px-4 text-sm">
          <p>© Kıbrıs Türk Kültür Derneği 1948 - 2025 Tüm Hakları Saklıdır</p>
          <a href="https://pizzadijital.com" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-white hover:underline">
            Pizza Dijital
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
=======
             <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ mb: 1.5, borderBottom: '1px solid #444', pb: 1.5 }}><MuiLink component={Link} to="/foto-galeri" color="inherit" underline="hover">Foto Galeri</MuiLink></Box>
                 <Box component="li" sx={{ mb: 1.5, borderBottom: '1px solid #444', pb: 1.5 }}><MuiLink component={Link} to="/video-galeri" color="inherit" underline="hover">Video Galeri</MuiLink></Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default Footer;
>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)
