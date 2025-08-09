import React from 'react';
import { Menu, MenuItem, Box, Fade } from '@mui/material';
import { Link } from 'react-router-dom';

function CascadingMenuItem({ children, submenuItems, onSubMenuClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMouseEnter = (event) => setAnchorEl(event.currentTarget);
  const handleMouseLeave = () => setAnchorEl(null);

  const menuItemSx = {
    color: 'text.primary',
    transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out, color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'primary.main',
      color: 'white',
      transform: 'translateX(5px)',
    }
  };

  return (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} sx={{ position: 'relative' }}>
      <MenuItem selected={Boolean(anchorEl)} sx={{ ...menuItemSx, justifyContent: 'space-between', width: '100%', '&:hover': { backgroundColor: 'primary.main', color: 'white', transform: 'translateX(0)' } }}>
        {children}
        <span style={{ marginLeft: '16px' }}>&rsaquo;</span>
      </MenuItem>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMouseLeave}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        MenuListProps={{ onMouseLeave: handleMouseLeave }}
        TransitionComponent={Fade}
        transitionDuration={200}
        PaperProps={{ sx: { backgroundColor: 'white', boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' } }}
      >
        {submenuItems.map((item) => (
          <MenuItem key={item.text} component={Link} to={item.path} onClick={onSubMenuClick} sx={menuItemSx}>
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
export default CascadingMenuItem;
