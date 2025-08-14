import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SectionTitle from '/src/components/SectionTitle.jsx';

// Örnek Etkinlik Verileri
const eventsData = [
  {
    title: 'Kıbrıs Kültür Gecesi ve Fotoğraf Sergisi',
    description: 'Kıbrıs\'ın zengin tarihini ve kültürünü yansıtan fotoğrafların sergileneceği, yerel sanatçıların canlı performanslarıyla renklenecek unutulmaz bir geceye davetlisiniz. Gecede Kıbrıs mutfağından eşsiz lezzetler de sunulacaktır.',
    location: 'Dernek Genel Merkezi, Ankara',
    date: '25 Ekim 2025 - 19:00',
    imageUrl: 'https://images.unsplash.com/photo-1549492423-4002122c3855?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Tarih Söyleşileri: Annan Planı\'nın Perde Arkası',
    description: 'Dönemin önemli isimlerinin ve uzman akademisyenlerin katılımıyla, Kıbrıs\'ın yakın tarihine damga vuran Annan Planı sürecini tüm detaylarıyla masaya yatırıyoruz. Soru-cevap bölümüyle interaktif bir söyleşi sizleri bekliyor.',
    location: 'Milli Kütüphane Konferans Salonu',
    date: '12 Kasım 2025 - 14:00',
    imageUrl: 'https://images.unsplash.com/photo-1587825140708-df876c12b44e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Geleneksel Lefkara El Sanatları Atölyesi',
    description: 'UNESCO Somut Olmayan Kültür Miras listesinde yer alan Lefkara işinin inceliklerini ustalarından öğrenme fırsatı. Kendi el emeğinizle bu asırlık sanata dokunmak için atölyemize katılın.',
    location: 'İstanbul Şubesi Etkinlik Salonu',
    date: '05 Aralık 2025 - 10:00',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop'
  }
];

// Tek bir etkinlik kartı bileşeni
function EventCard({ event }) {
  return (
    // Bu Box artık sadece kartlar arası boşluk sağlar
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{
          p: { xs: 2, md: 4 },
          // KARTIN KENDİSİNE MİNİMUM YÜKSEKLİK VERİLDİ
          minHeight: { md: '70vh' },
          display: 'flex',
          width: '100%'
        }}>
          <Grid container spacing={4} alignItems="stretch">
            {/* Sol Taraf: Metin İçerikleri */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <SectionTitle>{event.title}</SectionTitle>
                <Typography variant="body1" color="text.secondary" paragraph sx={{ flexGrow: 1, my: 2 }}>
                  {event.description}
                </Typography>
                <Box sx={{ mt: 'auto', textAlign: 'right' }}>
                  <Typography variant="subtitle1" sx={{ display: 'inline-flex', alignItems: 'center', color: 'primary.main', fontWeight: 'bold' }}>
                    <LocationOnIcon sx={{ mr: 1 }} /> {event.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.date}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {/* Sağ Taraf: Görsel */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={event.imageUrl}
                alt={event.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 2
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

function EtkinliklerPage() {
  return (
    <Box>
      {eventsData.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </Box>
  );
}

export default EtkinliklerPage;
