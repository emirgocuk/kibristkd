import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, Divider, IconButton, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SectionTitle from '/src/components/SectionTitle.jsx';

// Örnek Ziyaretçi Defteri Mesajları
const sampleMessages = [
  { id: 1, name: 'Ahmet Yılmaz', message: 'Derneğinizin çalışmalarını uzun yıllardır takip ediyorum. Kıbrıs kültürünü yaşatma konusundaki emekleriniz için minnettarım.', date: '12 Ağustos 2025', likes: 152 },
  { id: 2, name: 'Ayşe Kaya', message: 'Geçen ayki kültür etkinliğiniz harikaydı! Özellikle gençlerin katılımı beni çok umutlandırdı. Teşekkürler.', date: '11 Ağustos 2025', likes: 98 },
  { id: 3, name: 'Hasan Veli', message: 'Ankara\'da Kıbrıs\'tan bir köşe bulmak çok güzel. Başarılarınızın devamını dilerim.', date: '10 Ağustos 2025', likes: 210 },
  { id: 4, name: 'Fatma Özdemir', message: 'Web siteniz çok güzel ve bilgilendirici olmuş. Emeği geçen herkesi tebrik ederim.', date: '9 Ağustos 2025', likes: 75 },
  { id: 5, name: 'Mustafa Arslan', message: 'Burs programınız sayesinde eğitim hayatıma devam edebildim. Size ve tüm bağışçılara ne kadar teşekkür etsem az.', date: '8 Ağustos 2025', likes: 350 },
  { id: 6, name: 'Zeynep Çelik', message: 'Kıbrıs uyuşmazlığı hakkındaki yayınlarınız, konuyu anlamak isteyenler için paha biçilmez bir kaynak.', date: '7 Ağustos 2025', likes: 120 },
  { id: 7, name: 'Mehmet Öztürk', message: 'Dernek binanızdaki kütüphaneden çok faydalandım. Böyle bir arşivi bizlere sunduğunuz için teşekkürler.', date: '6 Ağustos 2025', likes: 45 },
  { id: 8, name: 'Elif Aydın', message: 'Londra\'dan selamlar! Yurt dışındaki Kıbrıs Türkleri olarak çalışmalarınızı gururla takip ediyoruz.', date: '5 Ağustos 2025', likes: 188 },
  { id: 9, name: 'Ali Can', message: 'Genç bir Kıbrıslı olarak, köklerimizi ve kültürümüzü bu denli sahiplenmeniz beni çok mutlu ediyor.', date: '4 Ağustos 2025', likes: 66 },
  { id: 10, name: 'Meryem Şahin', message: 'Her zaman yanınızdayız!', date: '3 Ağustos 2025', likes: 82 },
  { id: 11, name: 'Kemal Yıldız', message: 'Milli mücadele ruhunu her zaman canlı tutuyorsunuz, var olun!', date: '2 Ağustos 2025', likes: 199 },
  { id: 12, name: 'Yasemin Demir', message: 'Anılarımızı ve kültürümüzü gelecek nesillere aktarmak çok önemli. Bu misyonu üstlendiğiniz için teşekkürler.', date: '1 Ağustos 2025', likes: 143 },
];

const MESSAGES_PER_PAGE = 6;

function ZiyaretciDefteriPage() {
  const [messages, setMessages] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(MESSAGES_PER_PAGE);

  useEffect(() => {
    // Mesajları en çok beğenilenden en aza doğru sırala
    const sortedMessages = [...sampleMessages].sort((a, b) => b.likes - a.likes);
    setMessages(sortedMessages);
    setDisplayedMessages(sortedMessages.slice(0, MESSAGES_PER_PAGE));
  }, []);

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + MESSAGES_PER_PAGE;
    setVisibleCount(newVisibleCount);
    setDisplayedMessages(messages.slice(0, newVisibleCount));
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Mesaj Yazma Alanı */}
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, mb: 6 }}>
        <SectionTitle>Ziyaretçi Defteri</SectionTitle>
        <Box>
          <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', mb: 1 }}>
            Siz de anınızı bırakın.
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Anı defterinde sizi de okuyalım.
          </Typography>
          
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Adınız Soyadınız"
              variant="outlined"
              required
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Mesajınız"
              variant="outlined"
              required
              multiline
              rows={8}
              sx={{ mb: 3 }}
            />
            <Button variant="contained" color="primary" size="large" type="submit">
              Gönder
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Mesaj Listeleme Alanı */}
      <Box>
        <SectionTitle>Anılar</SectionTitle>
        {displayedMessages.map((item, index) => (
          <React.Fragment key={item.id}>
            <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.date}
                  </Typography>
                </Box>
                <Chip
                    icon={<FavoriteIcon />}
                    label={item.likes}
                    variant="outlined"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                />
              </Box>
              <Typography variant="body1" color="text.secondary">
                {item.message}
              </Typography>
            </Paper>
            {index < displayedMessages.length - 1 && <Divider sx={{ my: 1 }} />}
          </React.Fragment>
        ))}

        {displayedMessages.length < messages.length && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="outlined" size="large" onClick={handleLoadMore}>
              Daha Fazla Yükle
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default ZiyaretciDefteriPage;