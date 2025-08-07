import React from 'react';
import { Box, Typography, TextField, IconButton, List, ListItem, ListItemText, Divider, Avatar, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Yazarlar için ikon

// Başlıklar için ortak stil
const SectionTitle = ({ children }) => (
  <Typography
    variant="h6"
    component="h2"
    sx={{
      fontWeight: 'bold',
      mb: 2,
      pb: 1,
      borderBottom: '1px solid #ddd'
    }}
  >
    {children}
  </Typography>
);

// Örnek veriler
const announcements = [
  { title: 'KIBRIS TÜRK KÜLTÜR DERNEĞİ GENEL MERKEZİ 55.OLAĞAN GENEL KURUL TOPLANTISI ERTELEME TUTANAĞI', date: '25 Temmuz 2025' },
  { title: 'YENİ ÜYELİK DUYURUSU', date: '15 Temmuz 2025' },
];

const columnists = [
    { name: 'İsmail Bozkurt', path: '/yazarlar/ismail-bozkurt' },
    { name: 'Prof. Dr. Ata Atun', path: '/yazarlar/ata-atun' },
    { name: 'Hüseyin Laptalı', path: '/yazarlar/huseyin-laptali' },
];

function Sidebar() {
  return (
    <Box component={Paper} elevation={0} variant="outlined" sx={{ p: 3 }}>
      {/* Site İçi Arama */}
      <Box sx={{ mb: 4 }}>
        <SectionTitle>Site İçi Arama</SectionTitle>
        <Box component="form" sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Aradığınız kelime..."
            fullWidth
            sx={{ mr: 1 }}
          />
          <IconButton type="submit" sx={{ p: '10px', backgroundColor: 'primary.main', color: 'white', '&:hover': {backgroundColor: '#b71c1c'} }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Duyurular */}
      <Box sx={{ mb: 4 }}>
        <SectionTitle>Duyurular</SectionTitle>
        <List disablePadding>
          {announcements.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start" sx={{px: 0, py: 1.5}}>
                <ListItemText
                  primary={
                    <Typography component="span" variant="body1" color="text.primary" fontWeight="medium">
                      {item.title}
                    </Typography>
                  }
                  secondary={item.date}
                />
              </ListItem>
              {index < announcements.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Köşe Yazarları */}
      <Box>
        <SectionTitle>Köşe Yazarları</SectionTitle>
        <List disablePadding>
          {columnists.map((item, index) => (
             <React.Fragment key={index}>
                <ListItem button component="a" href={item.path} alignItems="center" sx={{px: 0, py: 1.5}}>
                    <Avatar sx={{ mr: 2, bgcolor: 'grey.300' }}>
                        <AccountCircleIcon color="action" />
                    </Avatar>
                    <ListItemText primary={item.name} />
                </ListItem>
                {index < columnists.length - 1 && <Divider component="li" />}
             </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;