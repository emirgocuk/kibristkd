// src/pages/HomePage.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box, Button, Chip, Container, FormControl, Grid, IconButton, InputAdornment,
  InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Paper,
  Select, Skeleton, Stack, TextField, Typography, Avatar, Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import axios from 'axios';

import HeroSlider from '../components/HeroSlider';
import Sidebar from '../components/Sidebar';
import SectionTitle from '../components/SectionTitle';
import HaberKarti from '../components/HaberKarti';

const PAGE_SIZE = 8;

/* — küçük kırmızı şerit başlık — */
function RibbonTitle({ children }) {
  return (
    <Box sx={{ mb: 1.25 }}>
      <Box sx={{
        display: 'inline-block', px: 1.25, py: 0.5, borderRadius: 0.5,
        bgcolor: '#d32f2f', color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: 0.3, textTransform: 'uppercase'
      }}>
        {children}
      </Box>
    </Box>
  );
}

/* — yükleme iskeleti — */
function SkeletonCard({ lines = 2 }) {
  return (
    <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 1, mb: 1.5 }} />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} width={i ? '60%' : '85%'} />
      ))}
    </Box>
  );
}

/* — sağ sütundaki “imgur” benzeri reklam kutusu — */
function AdBox({ height = 250 }) {
  return (
    <Paper variant="outlined" sx={{ p: 1.5, mb: 3 }}>
      <Box sx={{
        height, borderRadius: 1, border: '1px dashed', borderColor: 'divider',
        display: 'grid', placeItems: 'center', textAlign: 'center', px: 2
      }}>
        <Typography variant="caption" color="text.secondary">
          The image you are<br/>requesting does not exist<br/>or is no longer available.
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>imgur.com</Typography>
      </Box>
    </Paper>
  );
}

export default function HomePage() {
  const [makaleler, setMakaleler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  // arama & sıralama
  const [rawQuery, setRawQuery] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest'); // 'newest' | 'oldest'
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loadMoreRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setQuery(rawQuery), 300);
    return () => clearTimeout(t);
  }, [rawQuery]);

  // backend { success, data } döndürüyor → güvenli parse et
  const fetchMakaleler = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get('/api/makaleler');
      const list = Array.isArray(res?.data?.data)
        ? res.data.data
        : (Array.isArray(res?.data) ? res.data : []);
      setMakaleler(list);
    } catch (e) {
      console.error(e);
      setError('Makaleler yüklenirken bir sorun oluştu.');
      setMakaleler([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchMakaleler(); }, []);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const ob = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setVisibleCount((c) => c + PAGE_SIZE);
    }, { rootMargin: '200px' });
    ob.observe(loadMoreRef.current);
    return () => ob.disconnect();
  }, []); // ref.current’ı dependency yapma

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const normalize = (v) => (v || '').toString().toLowerCase();
  const refinedList = useMemo(() => {
    const base = Array.isArray(makaleler) ? makaleler : [];
    let list = [...base];
    if (query.trim()) {
      const q = normalize(query);
      list = list.filter((item) => {
        const title = normalize(item.title || item.baslik);
        const content = normalize(item.content || item.icerik || item.body);
        const tags = (item.tags || []).map(normalize).join(' ');
        return title.includes(q) || content.includes(q) || tags.includes(q);
      });
    }
    list.sort((a, b) => {
      const ta = new Date(a.createdAt || a.updatedAt || a.date || a.tarih || 0).getTime();
      const tb = new Date(b.createdAt || b.updatedAt || b.date || b.tarih || 0).getTime();
      return sort === 'newest' ? tb - ta : ta - tb;
    });
    return list;
  }, [makaleler, query, sort]);

  const featured = refinedList[0];
  const rest = refinedList.slice(1, visibleCount);

  // kategori blokları
  const cat = (m) => (m.category || m.kategori || '').toString().trim();
  const byCat = (name, take = 5) => refinedList.filter((m) => cat(m) === name).slice(0, take);

  const LEFT_BLOCKS = [
    { title: 'Basında KKTC', key: 'Basında KKTC', take: 6, style: 'table' },
    { title: 'Kamu Uygulamaları', key: 'Kamu Uygulamaları', take: 4, style: 'two-col' },
    { title: 'Etkinlikler', key: 'Etkinlikler', take: 3, style: 'events' },
    { title: 'Kıbrıs’la İlgili Tavsiyeler', key: 'Kıbrıs’la İlgili Tavsiyeler', take: 2, style: 'cards' },
    { title: 'Kıbrıs Yemekleri', key: 'Kıbrıs Yemekleri', take: 2, style: 'cards' },
    { title: 'Kıbrıs Türk Kültürü', key: 'Kıbrıs Türk Kültürü', take: 4, style: 'grid4' },
  ];

  const duyurular = [
    { id: 1, title: 'Akredite Üyelik', date: '12 Ağu 2025' },
    { id: 2, title: 'Gece Yarısı Gündemi', date: '09 Ağu 2025' },
  ];
  const yazarlar = [
    { id: 1, name: 'İsmail Berkut' },
    { id: 2, name: 'Bahar İnceal' },
    { id: 3, name: 'Prof. Dr. Ata Asun' },
    { id: 4, name: 'Atila Cilingir' },
    { id: 5, name: 'Ahmet Göksun' },
    { id: 6, name: 'Hüseyin Laplan' },
  ];

  const clearAll = () => { setRawQuery(''); setQuery(''); setSort('newest'); setVisibleCount(PAGE_SIZE); };

  const bannerImg = '/slide1.jpg'; // public/slide1.jpg
  const pickTitle = (m) => (m.title || m.baslik || 'Başlık').toString();

  return (
    <Box>
      <HeroSlider />

      {/* üst geniş görsel (haberler) */}
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Paper
          elevation={0}
          sx={{
            position: 'relative', borderRadius: 2, overflow: 'hidden',
            border: '1px solid', borderColor: 'divider',
            height: { xs: 180, sm: 260, md: 320 },
            backgroundImage: `url(${bannerImg})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        >
          <Box sx={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,.55))' }} />
          <Stack position="absolute" bottom={16} left={16} right={16} spacing={1}>
            <RibbonTitle>Haberler</RibbonTitle>
            <Typography variant="h5" sx={{ color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,.5)' }}>
              Gündemden Öne Çıkanlar
            </Typography>
          </Stack>
        </Paper>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={4}>
          {/* sol sütun */}
          <Grid item xs={12} md={8}>
            {/* arama/sırala */}
            <Box sx={{
              mb: 2, p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider',
              bgcolor: (t) => t.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#fff',
            }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
                <SectionTitle title="Haberler & Makaleler" />
                <Stack direction="row" spacing={2} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' } }}>
                  <TextField
                    fullWidth placeholder="Ara (başlık / içerik / etiket)…" size="small"
                    value={rawQuery} onChange={(e) => setRawQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
                      endAdornment: rawQuery && (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setRawQuery('')}><CloseRoundedIcon /></IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel id="sort-label">Sırala</InputLabel>
                    <Select
                      labelId="sort-label"
                      label="Sırala"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <MenuItem value="newest">En Yeni</MenuItem>
                      <MenuItem value="oldest">En Eski</MenuItem>
                    </Select>
                  </FormControl>
                  <Button onClick={clearAll}>Temizle</Button>
                </Stack>
              </Stack>
            </Box>

            {/* öne çıkan + grid */}
            {loading ? (
              <Grid container spacing={2}>
                <Grid item xs={12}><SkeletonCard lines={3} /></Grid>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Grid item xs={12} sm={6} key={i}><SkeletonCard /></Grid>
                ))}
              </Grid>
            ) : error ? (
              <Paper sx={{ p: 3, border: '1px dashed', borderColor: 'error.light' }}>
                <Typography color="error">{error}</Typography>
                <Button sx={{ mt: 1 }} variant="contained" startIcon={<RefreshRoundedIcon />} onClick={fetchMakaleler}>
                  Tekrar Dene
                </Button>
              </Paper>
            ) : refinedList.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">Sonuç bulunamadı</Typography>
                <Button sx={{ mt: 1 }} onClick={clearAll} startIcon={<CloseRoundedIcon />}>Filtreleri Temizle</Button>
              </Paper>
            ) : (
              <Box>
                {featured && (
                  <Box sx={{ mb: 2, p: 0, borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                    <HaberKarti haber={featured} featured />
                  </Box>
                )}
                <Grid container spacing={2}>
                  {rest.slice(0, 6).map((haber) => (
                    <Grid item xs={12} sm={6} key={haber.id}>
                      <HaberKarti haber={haber} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* kategori blokları */}
            <Box sx={{ mt: 4 }}>
              {LEFT_BLOCKS.map((blk) => {
                const items = byCat(blk.key, blk.take);
                if (loading) {
                  return (
                    <Box key={blk.key} sx={{ mb: 3 }}>
                      <RibbonTitle>{blk.title}</RibbonTitle>
                      <Grid container spacing={2}>
                        {Array.from({ length: blk.style === 'grid4' ? 4 : 3 }).map((_, i) => (
                          <Grid key={i} item xs={12} sm={blk.style === 'two-col' || blk.style === 'cards' ? 6 : 12}>
                            <SkeletonCard />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  );
                }
                if (!items.length) return null;

                return (
                  <Box key={blk.key} sx={{ mb: 3 }}>
                    <RibbonTitle>{blk.title}</RibbonTitle>

                    {blk.style === 'table' && (
                      <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
                        {items.map((m) => (
                          <Box
                            key={m.id}
                            sx={{
                              px: 2, py: 1.25, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center',
                              '&:not(:last-of-type)': { borderBottom: '1px solid', borderColor: 'divider' },
                              '&:hover': { bgcolor: 'action.hover' },
                            }}
                          >
                            <Typography variant="body1" fontWeight={600}>{pickTitle(m)}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {new Date(m.createdAt || m.updatedAt || m.date || m.tarih || Date.now()).toLocaleDateString('tr-TR')}
                            </Typography>
                          </Box>
                        ))}
                      </Paper>
                    )}

                    {blk.style === 'two-col' && (
                      <Grid container spacing={2}>
                        {items.map((m) => (
                          <Grid key={m.id} item xs={12} sm={6}>
                            <HaberKarti haber={m} />
                          </Grid>
                        ))}
                      </Grid>
                    )}

                    {blk.style === 'events' && (
                      <Paper variant="outlined">
                        {items.map((m) => {
                          const d = new Date(m.date || m.createdAt || m.tarih || Date.now());
                          const day = d.toLocaleDateString('tr-TR', { day: '2-digit' });
                          const mon = d.toLocaleDateString('tr-TR', { month: 'short' }).toUpperCase();
                          return (
                            <Box key={m.id} sx={{ display: 'flex', alignItems: 'stretch',
                              '&:not(:last-of-type)': { borderBottom: '1px solid', borderColor: 'divider' } }}>
                              <Box sx={{
                                width: 84, minWidth: 84, textAlign: 'center',
                                borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.default', py: 1.5,
                              }}>
                                <Typography variant="h5" fontWeight={800}>{day}</Typography>
                                <Typography variant="caption" color="text.secondary">{mon}</Typography>
                              </Box>
                              <Box sx={{ p: 1.5, flex: 1 }}>
                                <Typography variant="subtitle1" fontWeight={700}>{pickTitle(m)}</Typography>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                  {(m.content || m.icerik || m.body || '').toString()}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        })}
                      </Paper>
                    )}

                    {blk.style === 'cards' && (
                      <Grid container spacing={2}>
                        {items.map((m) => (
                          <Grid key={m.id} item xs={12} sm={6}>
                            <HaberKarti haber={m} />
                          </Grid>
                        ))}
                      </Grid>
                    )}

                    {blk.style === 'grid4' && (
                      <Grid container spacing={2}>
                        {items.map((m) => (
                          <Grid key={m.id} item xs={12} sm={6}>
                            <HaberKarti haber={m} />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Box>
                );
              })}
            </Box>

            {/* yükleme butonu */}
            {visibleCount < refinedList.length && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    variant="outlined" endIcon={<ExpandMoreRoundedIcon />} sx={{ borderRadius: 2, px: 3 }}
                  >
                    Daha Fazla Yükle
                  </Button>
                </Box>
                <div ref={loadMoreRef} />
              </>
            )}
          </Grid>

          {/* sağ sütun */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: { md: 'sticky' }, top: { md: 24 } }}>
              <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                <RibbonTitle>Duyurular</RibbonTitle>
                <List dense disablePadding>
                  {duyurular.map((d) => (
                    <ListItem key={d.id} sx={{ px: 0 }}>
                      <ListItemText primary={d.title} secondary={d.date} />
                    </ListItem>
                  ))}
                </List>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                <RibbonTitle>Köşe Yazarları</RibbonTitle>
                <List dense disablePadding>
                  {yazarlar.map((y) => (
                    <ListItem key={y.id} sx={{ px: 0 }}>
                      <ListItemAvatar><Avatar>{y.name.split(' ').map(s => s[0]).join('').slice(0,2)}</Avatar></ListItemAvatar>
                      <ListItemText primary={y.name} />
                    </ListItem>
                  ))}
                </List>
              </Paper>

              {/* görüntüdeki siyah “imgur” kutuları */}
              <AdBox height={250} />
              <AdBox height={90} />

              <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                <RibbonTitle>Kitap Tanıtımı</RibbonTitle>
                <Box sx={{
                  borderRadius: 1, overflow: 'hidden', height: 160,
                  backgroundImage: `url(${bannerImg})`, backgroundSize: 'cover', backgroundPosition: 'center', mb: 1.5
                }} />
                <Typography variant="subtitle1" fontWeight={700}>Kıbrıs Üzerine Notlar</Typography>
                <Typography variant="body2" color="text.secondary">Yeni çıkanlar: kültür, siyaset ve tarih okumaları.</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip label="Tarih" size="small" /><Chip label="Kültür" size="small" />
                </Stack>
              </Paper>

              <AdBox height={250} />

              <Sidebar />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* başa dön */}
      {showTop && (
        <Tooltip title="Başa dön">
          <IconButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              position: 'fixed', bottom: { xs: 16, sm: 24 }, right: { xs: 16, sm: 24 },
              bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.dark' }, boxShadow: 4,
            }}
          >
            <ArrowUpwardRoundedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
