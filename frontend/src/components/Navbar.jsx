import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import logo from '../photos/logo.png';

// --- İkonlar ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
);
const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);

// Menü verileri (değişiklik yok)
const mainNavItems = [
    // ... (menü verileriniz buraya gelecek, önceki kodla aynı)
    {
        text: "Kurumsal",
        path: "/kurumsal",
        subItems: [
            {text: "Tarihçe", path: "/kurumsal/tarihce"},
            {text: "Tüzük", path: "/kurumsal/tuzuk"},
        ]
    },
    { text: "Yayınlarımız", path: "/yayinlarimiz" },
    // ... diğer menü elemanları
];


// --- Mobil Menü İçin Alt Menü ---
function MobileSubMenu({ item, closeMobileMenu }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between px-4 py-2 text-left text-gray-700">
                <span>{item.text}</span>
                <ArrowDownIcon />
            </button>
            {isOpen && (
                <div className="pl-4">
                    {item.subItems.map(subItem => (
                        <Link key={subItem.text} to={subItem.path} onClick={closeMobileMenu} className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                            {subItem.text}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}

// --- Ana Navbar Bileşeni ---
export default function Navbar() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const timeoutRef = useRef(null);

    const handleMouseEnter = (menuText) => {
        clearTimeout(timeoutRef.current);
        setOpenDropdown(menuText);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 200); // 200ms bekleme süresi
    };
    
    // Sayfa değiştiğinde mobil menüyü kapat
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Aktif link stilini belirleyen fonksiyon
    const getLinkClassName = (path, hasSubItems = false) => {
        const isActive = location.pathname.startsWith(path);
        const baseClasses = `relative flex items-center whitespace-nowrap px-3 py-4 text-sm font-medium transition-colors duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600 after:transition-transform after:duration-300 after:ease-out`;
        
        if (isActive) {
            return `${baseClasses} text-blue-600 after:scale-x-100`;
        }
        return `${baseClasses} text-gray-700 hover:text-blue-600 after:scale-x-0 hover:after:scale-x-100`;
    };


    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
            <div className="container mx-auto max-w-screen-xl px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 py-2">
                        <img src={logo} alt="Logo" className="h-10" />
                    </Link>

                    {/* Masaüstü Navigasyon */}
                    <nav className="hidden items-center justify-center lg:flex">
                        {mainNavItems.map(item => (
                            <div key={item.text} className="relative" onMouseLeave={handleMouseLeave}>
                                <Link
                                    to={item.path}
                                    className={getLinkClassName(item.path, !!item.subItems)}
                                    onMouseEnter={() => item.subItems && handleMouseEnter(item.text)}
                                >
                                    {item.text}
                                    {item.subItems && <ArrowDownIcon />}
                                </Link>
                                
                                {item.subItems && openDropdown === item.text && (
                                    <div 
                                        className="absolute left-0 top-full mt-1 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                                        onMouseEnter={() => handleMouseEnter(item.text)} // menü üzerinde kalındığında kapanmasını engelle
                                    >
                                        <div className="py-1">
                                            {item.subItems.map(subItem => (
                                                <Link key={subItem.text} to={subItem.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    {subItem.text}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Arama Kutusu */}
                        <div className="relative ml-4 flex items-center py-4 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600">
                           <SearchIcon />
                           <input type="text" placeholder="Ara..." className="w-16 rounded py-1 pl-2 text-sm transition-all duration-300 focus:w-32 focus:outline-none" />
                        </div>
                    </nav>

                    {/* Mobil Menü Butonu */}
                    <div className="lg:hidden">
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-gray-700">
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobil Menü (Drawer) */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    {/* Arka plan karartma */}
                    <div className="absolute inset-0 bg-black opacity-25" onClick={() => setMobileOpen(false)}></div>
                    {/* Menü içeriği */}
                    <div className="relative h-full w-64 max-w-[calc(100%-3rem)] bg-white shadow-xl">
                       <nav className="pt-8">
                           {mainNavItems.map(item => (
                               item.subItems ? (
                                   <MobileSubMenu key={item.text} item={item} closeMobileMenu={() => setMobileOpen(false)} />
                               ) : (
                                   <Link key={item.text} to={item.path} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                       {item.text}
                                   </Link>
                               )
                           ))}
                       </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
=======
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
>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)
