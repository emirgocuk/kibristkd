import React, { useState, useEffect } from 'react';
import { Outlet, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, AppBar, CssBaseline, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { jwtDecode } from 'jwt-decode';

const drawerWidth = 260;

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
        navigate('/login');
    }
  }, [navigate]);

  return user;
};

function AdminLayout() {
  const user = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    handleClose();
  };

  if (!user) {
    return <Typography>Yükleniyor veya yönlendiriliyor...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Girne Yönetim Paneli
          </Typography>
          {user && (
            <div>
              <IconButton
                size="large"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ bgcolor: 'secondary.main' }}>{user.name.charAt(0).toUpperCase()}</Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>{user.name} ({user.role})</MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Çıkış Yap
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 1 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/girne">
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary="Anasayfa" />
              </ListItemButton>
            </ListItem>
            {(user.role === 'admin' || user.role === 'superadmin') && (
              <ListItem disablePadding>
                <ListItemButton component={RouterLink} to="/girne/yazarlar">
                  <ListItemIcon><PeopleIcon /></ListItemIcon>
                  <ListItemText primary="Yazar Yönetimi" />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/girne/makaleler">
                <ListItemIcon><ArticleIcon /></ListItemIcon>
                <ListItemText primary="Makale Yönetimi" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;