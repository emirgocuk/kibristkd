import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

// Şimdilik aynı sahte veriyi burada da kullanacağız.
// NOT: Normalde bu veri merkezi bir yerden veya API'den gelir. Bir sonraki adımda bunu düzelteceğiz.
const haberlerData = [
    { id: 1, title: 'Genel Kurul Toplantısı Duyurusu', date: '28 Temmuz 2025', summary: 'Derneğimizin yıllık olağan genel kurul toplantısı, belirtilen tarihte genel merkezimizde yapılacaktır. Tüm üyelerimiz davetlidir.', content: 'Toplantı gündemi ve detayları üyelere e-posta yoluyla iletilmiştir. Katılımınız derneğimizin geleceği için büyük önem arz etmektedir.' },
    { id: 2, title: 'Kültürel Miras Semineri Gerçekleşti', date: '15 Temmuz 2025', summary: 'Prof. Dr. Ata Atun\'un katılımıyla düzenlediğimiz "Kıbrıs Türk Kültürel Mirası" konulu seminerimiz yoğun ilgi gördü.', content: 'Seminerde, Kıbrıs Türk kültürünün kökenleri, gelişimi ve korunması gereken değerler hakkında önemli bilgiler paylaşıldı. Katılımcılara teşekkür ederiz.' },
    { id: 3, title: 'Yeni Yayınımız: Kıbrıs Mektubu Dergisi', date: '01 Temmuz 2025', summary: 'Derneğimizin üç ayda bir yayınladığı Kıbrıs Mektubu dergisinin yeni sayısı çıktı. Dergimize web sitemizden ulaşabilirsiniz.', content: 'Dergimizin bu sayısında özel röportajlar, makaleler ve kültürel analizler yer almaktadır. Keyifli okumalar dileriz.' },
];

function HaberDetayPage() {
  // useParams hook'u ile URL'deki dinamik parametreyi yakalıyoruz (örn: /haber/1 ise haberId = '1' olur)
  const { haberId } = useParams();

  // URL'den gelen id ile eşleşen haberi veri dizisinden buluyoruz.
  // URL'den gelen parametre string olduğu için, Number() ile sayıya çeviriyoruz.
  const haber = haberlerData.find(h => h.id === Number(haberId));

  // Eğer o id'ye sahip bir haber bulunamazsa, bir uyarı gösterelim.
  if (!haber) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Haber Bulunamadı</Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
          Ana Sayfaya Dön
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }} maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        {haber.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Yayın Tarihi: {haber.date}
      </Typography>
      <Box sx={{ mt: 4 }}>
        {/* Detay sayfasında summary yerine 'content' (tam içerik) gösteriyoruz */}
        <Typography paragraph>{haber.summary}</Typography>
        <Typography paragraph>{haber.content}</Typography> 
      </Box>
      <Button component={Link} to="/" variant="outlined" sx={{ mt: 4 }}>
        &larr; Tüm Haberlere Geri Dön
      </Button>
    </Container>
  );
}

export default HaberDetayPage;