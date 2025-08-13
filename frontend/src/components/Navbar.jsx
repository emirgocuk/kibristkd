import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Container, MenuItem, IconButton, Drawer, List, ListItemButton, ListItemText, Collapse, Divider, Paper, Popper, Grow, MenuList } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search'; // Arama ikonu import edildi

import logo from '../photos/logo.png';

// Menü verilerini tek bir yerde topluyoruz
const mainNavItems = [
    { 
        text: "Kurumsal", 
        path: "/kurumsal",
        subItems: [
            {text: "Tarihçe", path: "/kurumsal/tarihce"}, 
            {text: "Tüzük", path: "/kurumsal/tuzuk"}, 
            {text: "Üyelik", path: "/kurumsal/uyelik"},
            {text: "Doktor Üyelerimiz", path: "/kurumsal/doktor-uyelerimiz"},
            {text: "Sık Sorulan Sorular", path: "/kurumsal/sss"},
            {text: "Mali Bilgiler", path: "/kurumsal/mali-bilgiler"},
            {text: "Burs İşlemleri", path: "/kurumsal/burs-islemleri"},
        ]
    },
    { 
        text: "Yönetim", 
        path: "/yonetim",
        subItems: [
            { text: "Genel Merkez", path: "/yonetim/genel-merkez" },
            { text: "Antalya", path: "/yonetim/antalya" },
            { text: "İstanbul", path: "/yonetim/istanbul" },
            { text: "İzmir", path: "/yonetim/izmir" },
            { text: "Mersin", path: "/yonetim/mersin" },
        ]
    },
    { 
        text: "Kıbrıs", 
        path: "/kibris",
        subItems: [
            { text: "Kıbrıs Uyuşmazlığı", path: "/kibris/uyusmazlik" },
            { text: "Kültürel Etkinlikler", path: "/kibris/kulturel-etkinlikler" },
            { text: "Kıbrısla İlgili Tavsiyeler", path: "/kibris/tavsiyeler" },
            { text: "Kıbrıs Türk Kültürü", path: "/kibris/kultur" },
            { text: "Önemli Gün ve Haftalar", path: "/kibris/onemli-gunler" },
        ]
    },
    { text: "Yayınlarımız", path: "/yayinlarimiz" },
    { text: "Kütüphanemiz", path: "/kutuphanemiz" },
    { 
        text: "Basın", 
        path: "/basin",
        subItems: [
            {text: "Basın Açıklamaları", path: "/basin/aciklamalar"}, 
            {text: "Basında Biz", path: "/basin/basinda-biz"},
            {text: "Basında KKTC", path: "/basin/basinda-kktc"},
        ]
    },
    { text: "Etkinlikler", path: "/etkinlikler" },
    { text: "Yazarlar", path: "/yazarlar" },
    { 
        text: "İletişim", 
        path: "/iletisim",
        subItems: [
            {text: "Bize Ulaşın", path: "/iletisim/bize-ulasin"}, 
            {text: "Ziyaretçi Defteri", path: "/iletisim/ziyaretci-defteri"},
            {text: "Defterimize Yazın", path: "/iletisim/defterimize-yazin"},
        ]
    },
    { text: "Üyelik Formu", path: "/uyelik-formu" },
];


function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});
  
  // Masaüstü açılır menü için state'ler
  const [openMenu, setOpenMenu] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuTimeoutRef = useRef(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubMenuToggle = (menuName) => {
    setOpenSubMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
  };
  
  const handleMenuEnter = (event, menuName) => {
    clearTimeout(menuTimeoutRef.current);
    setOpenMenu(menuName);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
      setAnchorEl(null);
    }, 200); // Fare menüden listeye geçerken kapanmaması için küçük bir gecikme
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
        {mainNavItems.map((item) => (
          item.subItems ? (
            <React.Fragment key={item.text}>
              <ListItemButton onClick={() => handleSubMenuToggle(item.text)}>
                <ListItemText primary={item.text} />
                {openSubMenus[item.text] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openSubMenus[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton sx={{ pl: 4 }} key={subItem.text} component={Link} to={subItem.path} onClick={handleDrawerToggle}>
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItemButton key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          )
        ))}
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
                <img src={logo} alt="Kıbrıs Türk Kültür Derneği Logosu" style={{ height: '50px', display: 'block' }} />
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center' }}>
              {mainNavItems.map((item) => (
                <Box key={item.text} onMouseLeave={handleMenuLeave}>
                  <Button
                    component={item.subItems ? 'div' : Link} // Alt menüsü varsa Link değil div yap
                    to={item.subItems ? undefined : item.path} // Alt menüsü varsa to prop'unu kaldır
                    sx={getButtonSx(item.path)}
                    endIcon={item.subItems ? <ArrowDropDownIcon /> : null}
                    onMouseEnter={(e) => item.subItems && handleMenuEnter(e, item.text)}
                    onClick={(e) => {
                      if (item.subItems) {
                        e.preventDefault(); // Alt menüsü olan öğelerin tıklanmasını engelle
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                  {item.subItems && (
                     <Popper
                        open={openMenu === item.text}
                        anchorEl={anchorEl}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                        onMouseEnter={() => clearTimeout(menuTimeoutRef.current)}
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}
                          >
                            <Paper sx={{ mt: 1, boxShadow: 3, borderTop: '3px solid', borderColor: 'primary.main', borderRadius: '0 0 4px 4px' }}>
                                <MenuList autoFocusItem={false}>
                                  {item.subItems.map((subItem) => (
                                    <MenuItem 
                                      key={subItem.text} 
                                      component={Link} 
                                      to={subItem.path} 
                                      onClick={() => { setOpenMenu(null); setAnchorEl(null); }}
                                    >
                                      {subItem.text}
                                    </MenuItem>
                                  ))}
                                </MenuList>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                  )}
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <IconButton sx={{ display: { xs: 'none', md: 'inline-flex' }, color: 'text.primary' }}>
                    <SearchIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ display: { md: 'none' }, color: 'text.primary' }}
                >
                  <MenuIcon />
                </IconButton>
            </Box>
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
