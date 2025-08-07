import React from 'react';
import { Menu, MenuItem, Box, Fade } from '@mui/material';
import { Link } from 'react-router-dom';

function CascadingMenuItem({ children, submenuItems, onSubMenuClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMouseEnter = (event) => setAnchorEl(event.currentTarget);
  const handleMouseLeave = () => setAnchorEl(null);

  // GÜNCELLENDİ: Menü elemanları için yeni stil objesi
  const menuItemSx = {
    color: 'text.primary', // Varsayılan yazı rengi siyah
    transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out, color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'primary.main', // Üzerine gelince arkaplan kırmızı
      color: 'white', // Üzerine gelince yazı beyaz
      transform: 'translateX(5px)', // Üzerine gelince sağa kaydır
    }
  };

  return (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} sx={{ position: 'relative' }}>
      <MenuItem
        selected={Boolean(anchorEl)}
        sx={{
          ...menuItemSx, // Temel stilleri uygula
          justifyContent: 'space-between',
          width: '100%',
          // Ana menü elemanının kendisi sağa kaymasın, sadece rengi değişsin
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
            transform: 'translateX(0)',
          }
        }}
      >
        {children}
        <span style={{ marginLeft: '16px' }}>&rsaquo;</span>
      </MenuItem>
      
      {/* Alt Menü */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMouseLeave}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        MenuListProps={{ onMouseLeave: handleMouseLeave }}
        TransitionComponent={Fade}
        transitionDuration={200}
        // GÜNCELLENDİ: Arkaplanı beyaz yapmak ve gölge eklemek için PaperProps kullanıldı
        PaperProps={{
          sx: {
            backgroundColor: 'white',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
          }
        }}
      >
        {submenuItems.map((item) => (
          <MenuItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={onSubMenuClick}
            sx={menuItemSx} // Stil objesini alt menü elemanlarına uygula
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default CascadingMenuItem;
