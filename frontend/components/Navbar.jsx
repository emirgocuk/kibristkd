import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import CascadingMenuItem from '@/components/CascadingMenuItem.jsx'; 
import logo from '@/photos/logo.png';

const Navbar = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const kurumsalMenuItems = [
		{ title: 'Tarihçe', path: '/tarihce' },
		{ title: 'Yönetim Kurulu', path: '/yonetim-kurulu' },
		{ title: 'Tüzük', path: '/tuzuk' },
	];

	return (
		<AppBar position="sticky" sx={{ bgcolor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', color: '#333' }}>
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
						<img src={logo} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
					</Link>
				</Typography>
                
				<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
					<Button color="inherit" component={Link} to="/">Ana Sayfa</Button>
					<Button color="inherit" onClick={handleMenu}>Kurumsal</Button>
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
					>
						{kurumsalMenuItems.map((item) => (
							<MenuItem key={item.title} onClick={handleClose} component={Link} to={item.path}>{item.title}</MenuItem>
						))}
					</Menu>
					<Button color="inherit" component={Link} to="/yayinlarimiz">Yayınlarımız</Button>
					<Button color="inherit" component={Link} to="/etkinlikler">Etkinlikler</Button>
					<Button color="inherit" component={Link} to="/iletisim">İletişim</Button>
				</Box>

				<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleMenu}
					>
						<MenuIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
// ...existing code...
