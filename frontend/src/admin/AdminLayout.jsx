import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, AppBar, CssBaseline } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';

const drawerWidth = 260;

function AdminLayout() {
  const menuItems = [
    { text: 'Anasayfa', icon: <DashboardIcon />, path: '/girne' },
    { text: 'Makale Yönetimi', icon: <ArticleIcon />, path: '/girne/makaleler' },
    { text: 'Yazar Yönetimi', icon: <PeopleIcon />, path: '/girne/yazarlar' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        position="fixed" 
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Yönetim Paneli
          </Typography>
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
            {menuItems.map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={RouterLink} to={item.path}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          bgcolor: 'grey.50',
          minHeight: '100vh' 
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
