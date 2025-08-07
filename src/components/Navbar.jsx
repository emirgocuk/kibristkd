import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Container, MenuItem, IconButton, Drawer, List, ListItemButton, ListItemText, Collapse, Divider, Grid, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import logo from '@/photos/logo.png';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Menü verileri (Eksiksiz)
const kurumsalItems = [
    {text: "Tarihçe", path: "/kurumsal/tarihce"}, 
    {text: "Tüzük", path: "/kurumsal/tuzuk"}, 
    {text: "Üyelik", path: "/kurumsal/uyelik"},
    {text: "Doktor Üyelerimiz", path: "/kurumsal/doktor-uyelerimiz"},
    {text: "Sık Sorulan Sorular", path: "/kurumsal/sss"},
    {text: "Mali Bilgiler", path: "/kurumsal/mali-bilgiler"},
    {text: "Burs İşlemleri", path: "/kurumsal/burs-islemleri"},
];
const yonetimItems = [
    { text: "Genel Merkez", path: "/yonetim/genel-merkez" },
    { text: "Antalya", path: "/yonetim/antalya" },
    { text: "İstanbul", path: "/yonetim/istanbul" },
    { text: "İzmir", path: "/yonetim/izmir" },
    { text: "Mersin", path: "/yonetim/mersin" },
];
const kibrisItems = [
    { text: "Kıbrıs Uyuşmazlığı", path: "/kibris/uyusmazlik" },
    { text: "Kültürel Etkinlikler", path: "/kibris/kulturel-etkinlikler" },
    { text: "Kıbrısla İlgili Tavsiyeler", path: "/kibris/tavsiyeler" },
    { text: "Kıbrıs Türk Kültürü", path: "/kibris/kultur" },
    { text: "Önemli Gün ve Haftalar", path: "/kibris/onemli-gunler" },
];
const basinItems = [
    {text: "Basın Açıklamaları", path: "/basin/aciklamalar"}, 
    {text: "Basında Biz", path: "/basin/basinda-biz"},
    {text: "Basında KKTC", path: "/basin/basinda-kktc"},
];
const yazarlarItems = [
    {text: "İsmail Bozkurt", path: "/yazarlar/ismail-bozkurt"},
    {text: "Kaptanın Seyir Defteri", path: "/yazarlar/kaptanin-seyir-defteri"},
    {text: "Sabahattin İsmail", path: "/yazarlar/sabahattin-ismail"},
    {text: "Prof. Dr. Ata Atun", path: "/yazarlar/ata-atun"},
    {text: "Atilla Çilingir", path: "/yazarlar/atilla-cilingir"},
    {text: "Ahmet Göksan", path: "/yazarlar/ahmet-goksan"},
    {text: "Hüseyin Laptalı", path: "/yazarlar/huseyin-laptali"},
    {text: "Hasan İkizer", path: "/yazarlar/hasan-ikizer"},
    {text: "Ali Fikret Atun", path: "/yazarlar/ali-fikret-atun"},
    {text: "Yusuf Kanlı", path: "/yazarlar/yusuf-kanli"},
];
const iletisimItems = [
    {text: "Bize Ulaşın", path: "/iletisim/bize-ulasin"}, 
    {text: "Ziyaretçi Defteri", path: "/iletisim/ziyaretci-defteri"},
    {text: "Defterimize Yazın", path: "/iletisim/defterimize-yazin"},
];


function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubMenuToggle = (menuName) => {
    setOpenSubMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  const getButtonSx = (path) => {
    const isPageActive = location.pathname.startsWith(path);
    return {
      py: 1.5, px: 2, mx: 0, borderRadius: 0,
      position: 'relative', overflow: 'hidden',
      color: isPageActive ? 'white' : 'text.primary',
      transition: 'color 0.4s ease-in-out', whiteSpace: 'nowrap', zIndex: 1,
      '&::before': {
        content: '""', position: 'absolute', bottom: 0, left: 0,
        width: '100%', height: isPageActive ? '100%' : '3px',
        backgroundColor: 'primary.main', zIndex: -1,
        transition: 'height 0.4s ease-in-out',
      },
      '&:hover': { color: 'white', '&::before': { height: '100%' } },
    };
  };

  // Mobil menü içeriği
  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <Divider />
        
        <ListItemButton onClick={() => handleSubMenuToggle('kurumsal')}>
          <ListItemText primary="Kurumsal" />
          {openSubMenus['kurumsal'] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSubMenus['kurumsal']} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {kurumsalItems.map((item) => (
              <ListItemButton sx={{ pl: 4 }} key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        
        <ListItemButton onClick={() => handleSubMenuToggle('yonetim')}><ListItemText primary="Yönetim" />{openSubMenus['yonetim'] ? <ExpandLess /> : <ExpandMore />}</ListItemButton>
        <Collapse in={openSubMenus['yonetim']} timeout="auto" unmountOnExit><List component="div" disablePadding>{yonetimItems.map(item => <ListItemButton sx={{pl: 4}} key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}><ListItemText primary={item.text} /></ListItemButton>)}</List></Collapse>
        
        <ListItemButton onClick={() => handleSubMenuToggle('kibris')}><ListItemText primary="Kıbrıs" />{openSubMenus['kibris'] ? <ExpandLess /> : <ExpandMore />}</ListItemButton>
        <Collapse in={openSubMenus['kibris']} timeout="auto" unmountOnExit><List component="div" disablePadding>{kibrisItems.map(item => <ListItemButton sx={{pl: 4}} key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}><ListItemText primary={item.text} /></ListItemButton>)}</List></Collapse>

        <ListItemButton component={Link} to="/yayinlarimiz" onClick={handleDrawerToggle}><ListItemText primary="Yayınlarımız" /></ListItemButton>
        <ListItemButton component={Link} to="/kutuphanemiz" onClick={handleDrawerToggle}><ListItemText primary="Kütüphanemiz" /></ListItemButton>

        <ListItemButton onClick={() => handleSubMenuToggle('basin')}><ListItemText primary="Basın" />{openSubMenus['basin'] ? <ExpandLess /> : <ExpandMore />}</ListItemButton>
        <Collapse in={openSubMenus['basin']} timeout="auto" unmountOnExit><List component="div" disablePadding>{basinItems.map(item => <ListItemButton sx={{pl: 4}} key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}><ListItemText primary={item.text} /></ListItemButton>)}</List></Collapse>
        
        <ListItemButton component={Link} to="/etkinlikler" onClick={handleDrawerToggle}><ListItemText primary="Etkinlikler" /></ListItemButton>

        <ListItemButton onClick={() => handleSubMenuToggle('yazarlar')}><ListItemText primary="Yazarlar" />{openSubMenus['yazarlar'] ? <ExpandLess /> : <ExpandMore />}</ListItemButton>
        <Collapse in={openSubMenus['yazarlar']} timeout="auto" unmountOnExit><List component="div" disablePadding>{yazarlarItems.map(item => <ListItemButton sx={{pl: 4}} key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}><ListItemText primary={item.text} /></ListItemButton>)}</List></Collapse>

        <ListItemButton onClick={() => handleSubMenuToggle('iletisim')}><ListItemText primary="İletişim" />{openSubMenus['iletisim'] ? <ExpandLess /> : <ExpandMore />}</ListItemButton>
        <Collapse in={openSubMenus['iletisim']} timeout="auto" unmountOnExit><List component="div" disablePadding>{iletisimItems.map(item => <ListItemButton sx={{pl: 4}} key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}><ListItemText primary={item.text} /></ListItemButton>)}</List></Collapse>
        
        <Divider />
        <ListItemButton component={Link} to="/uyelik-formu" onClick={handleDrawerToggle}><ListItemText primary="Üyelik Formu" /></ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      {/* GÜNCELLENDİ: AppBar'a "sticky" pozisyonu eklendi */}
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white', py: 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: { xs: 1, md: 0 } }}>
              <Link to="/">
                <img src={logo} alt="Kıbrıs Türk Kültür Derneği Logosu" style={{ height: '50px', display: 'block' }} />
              </Link>
            </Box>

            {/* Masaüstü Menüsü (Mobil'de gizli) */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
              <Button component={Link} to="/kurumsal" sx={getButtonSx('/kurumsal')}>Kurumsal</Button>
              <Button component={Link} to="/yonetim" sx={getButtonSx('/yonetim')}>Yönetim</Button>
              <Button component={Link} to="/kibris" sx={getButtonSx('/kibris')}>Kıbrıs</Button>
              <Button component={Link} to="/yayinlarimiz" sx={getButtonSx('/yayinlarimiz')}>Yayınlarımız</Button>
              <Button component={Link} to="/kutuphanemiz" sx={getButtonSx('/kutuphanemiz')}>Kütüphanemiz</Button>
              <Button component={Link} to="/basin" sx={getButtonSx('/basin')}>Basın</Button>
              <Button component={Link} to="/etkinlikler" sx={getButtonSx('/etkinlikler')}>Etkinlikler</Button>
              <Button component={Link} to="/yazarlar" sx={getButtonSx('/yazarlar')}>Yazarlar</Button>
              <Button component={Link} to="/iletisim" sx={getButtonSx('/iletisim')}>İletişim</Button>
              <Button component={Link} to="/uyelik-formu" sx={getButtonSx('/uyelik-formu')}>Üyelik Formu</Button>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 } }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}

export default Navbar;
