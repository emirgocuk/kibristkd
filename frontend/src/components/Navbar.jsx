import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Container, MenuItem, IconButton, Drawer, List, ListItemButton, ListItemText, Collapse, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import logo from '@/photos/logo.png';

const kurumsalItems = [
    {text: "Tarihçe", path: "/kurumsal/tarihce"}, 
    {text: "Tüzük", path: "/kurumsal/tuzuk"}, 
    {text: "Üyelik", path: "/kurumsal/uyelik"},
];
const yonetimItems = [
    { text: "Genel Merkez", path: "/yonetim/genel-merkez" },
    { text: "Antalya", path: "/yonetim/antalya" },
];
const kibrisItems = [
    { text: "Kıbrıs Uyuşmazlığı", path: "/kibris/uyusmazlik" },
    { text: "Kültürel Etkinlikler", path: "/kibris/kulturel-etkinlikler" },
];
const basinItems = [
    {text: "Basın Açıklamaları", path: "/basin/aciklamalar"}, 
    {text: "Basında Biz", path: "/basin/basinda-biz"},
];
const yazarlarItems = [
    {text: "İsmail Bozkurt", path: "/yazarlar/ismail-bozkurt"},
    {text: "Prof. Dr. Ata Atun", path: "/yazarlar/ata-atun"},
];
const iletisimItems = [
    {text: "Bize Ulaşın", path: "/iletisim/bize-ulasin"}, 
    {text: "Ziyaretçi Defteri", path: "/iletisim/ziyaretci-defteri"},
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

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <Divider />
        <ListItemButton onClick={() => handleSubMenuToggle('kurumsal')}><ListItemText primary="Kurumsal" />{openSubMenus['kurumsal'] ? <ExpandLess /> : <ExpandMore />}</ListItemButton>
        <Collapse in={openSubMenus['kurumsal']} timeout="auto" unmountOnExit><List component="div" disablePadding>{kurumsalItems.map(item => <ListItemButton sx={{pl: 4}} key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}><ListItemText primary={item.text} /></ListItemButton>)}</List></Collapse>
        <ListItemButton onClick={() => handleSubMenuToggle('yonetim')}><ListItemText primary="Yönetim" />{openSubMenus['yonetim'] ? <ExpandLess /> : <ExpandMore />}</ListItemButton>
        <Collapse in={openSubMenus['yonetim']} timeout="auto" unmountOnExit><List component="div" disablePadding>{yonetimItems.map(item => <ListItemButton sx={{pl: 4}} key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}><ListItemText primary={item.text} /></ListItemButton>)}</List></Collapse>
        <Divider />
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white', py: 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: { xs: 1, md: 0 } }}>
              <Link to="/">
                <img src={logo} alt="Logo" style={{ height: '50px', display: 'block' }} />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
              <Button component={Link} to="/kurumsal" sx={getButtonSx('/kurumsal')}>Kurumsal</Button>
              <Button component={Link} to="/yonetim" sx={getButtonSx('/yonetim')}>Yönetim</Button>
            </Box>
            <IconButton color="inherit" aria-label="open drawer" edge="end" onClick={handleDrawerToggle} sx={{ display: { md: 'none' }, color: 'text.primary' }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer variant="temporary" anchor="right" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 } }}>
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}
export default Navbar;
