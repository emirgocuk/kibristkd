import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, AppBar, CssBaseline } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 260; // Menüyü biraz genişlettim

function AdminLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline /> {/* Tarayıcı stillerini sıfırlar, daha tutarlı bir görünüm sağlar */}
      
      {/* Üst Başlık Çubuğu */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Girne Yönetim Paneli
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sol Taraftaki Kalıcı Menü */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar /> {/* Bu boşluk, menünün başlık çubuğunun altına itilmesini sağlar */}
        <Box sx={{ overflow: 'auto', p: 1 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/girne">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Anasayfa" />
              </ListItemButton>
            </ListItem>
            {/* Yazar Yönetimi Menü Linki */}
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/girne/yazarlar">
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Yazar Yönetimi" />
              </ListItemButton>
            </ListItem>
            {/* Makale Yönetimi Menü Linki */}
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/girne/makaleler">
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="Makale Yönetimi" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Sağ Taraftaki Ana İçerik Alanı */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          bgcolor: 'grey.50', // İçerik alanına çok açık bir gri tonu
          minHeight: '100vh' 
        }}
      >
        <Toolbar /> {/* Bu da içeriği başlık çubuğunun altına iter */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;