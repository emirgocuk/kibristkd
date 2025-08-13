import React from 'react';
import { Container, Typography, Grid, Card, CardActionArea, CardContent, Box, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Örnek yazar verileri (biyografi ve son yazı bilgisi eklendi)
const yazarlar = [
    { id: 1, name: 'İsmail Bozkurt', path: '/yazarlar/ismail-bozkurt', bio: 'Kıbrıs Türk edebiyatının önemli isimlerinden, yazar ve politikacı.', lastArticle: 'Annan Planı ve Sonrası' },
    { id: 2, name: 'Kaptanın Seyir Defteri', path: '/yazarlar/kaptanin-seyir-defteri', bio: 'Denizcilik anılarını ve Kıbrıs tarihini kaleme alan usta bir yazar.', lastArticle: 'Limasol Hatıraları' },
    { id: 3, name: 'Sabahattin İsmail', path: '/yazarlar/sabahattin-ismail', bio: 'Kıbrıs konusunda araştırmaları ve analizleriyle tanınan gazeteci-yazar.', lastArticle: 'Müzakerelerde Son Durum' },
    { id: 4, name: 'Prof. Dr. Ata Atun', path: '/yazarlar/ata-atun', bio: 'Uluslararası ilişkiler ve Kıbrıs sorunu üzerine akademik çalışmaları bulunmaktadır.', lastArticle: 'Doğu Akdeniz Enerji Politikaları' },
    { id: 5, name: 'Atilla Çilingir', path: '/yazarlar/atilla-cilingir', bio: 'Askeri tarih ve strateji konularında uzmanlaşmış bir yazar.', lastArticle: 'Barış Harekatı\'nın Bilinmeyenleri' },
    { id: 6, name: 'Ahmet Göksan', path: '/yazarlar/ahmet-goksan', bio: 'Kıbrıs Türk toplumunun sosyal ve kültürel yapısını inceler.', lastArticle: 'Lefkoşa\'da Bir Gün' },
    { id: 7, name: 'Hüseyin Laptalı', path: '/yazarlar/huseyin-laptali', bio: 'Yerel tarih ve folklor üzerine yaptığı çalışmalarla tanınır.', lastArticle: 'Lapta\'nın Folklorik Değerleri' },
    { id: 8, name: 'Hasan İkizer', path: '/yazarlar/hasan-ikizer', bio: 'Güncel siyasi yorumları ve köşe yazılarıyla dikkat çeker.', lastArticle: 'Ekonomide Yeni Ufuklar' },
    { id: 9, name: 'Ali Fikret Atun', path: '/yazarlar/ali-fikret-atun', bio: 'Kıbrıs\'ın yakın tarihi ve siyasi gelişmeleri üzerine yazar.', lastArticle: 'Toplumlararası Görüşmeler' },
    { id: 10, name: 'Yusuf Kanlı', path: '/yazarlar/yusuf-kanli', bio: 'Deneyimli gazeteci, dış politika ve Kıbrıs üzerine analizler sunar.', lastArticle: 'Diplomatik Süreç Nereye Gidiyor?' },
    { id: 11, name: 'Ayşe Güler', path: '/yazarlar/ayse-guler', bio: 'Toplumsal cinsiyet ve kültür sanat üzerine yazılarıyla bilinir.', lastArticle: 'Kadın ve Sanat' },
    { id: 12, name: 'Mehmet Ali Talat', path: '/yazarlar/mehmet-ali-talat', bio: '2. Cumhurbaşkanı, siyasi anılarını ve tecrübelerini paylaşır.', lastArticle: 'Cumhurbaşkanlığı Yılları' },
    { id: 13, name: 'Mustafa Akıncı', path: '/yazarlar/mustafa-akinci', bio: '4. Cumhurbaşkanı, çözüm süreci ve anılarına dair yazılar kaleme alır.', lastArticle: 'Müzakere Masasından Notlar' },
    { id: 14, name: 'Sami Özuslu', path: '/yazarlar/sami-ozuslu', bio: 'Gazeteci ve yazar, Kıbrıs\'ın sosyal ve politik hayatını yorumlar.', lastArticle: 'Medyada Bugün' },
    { id: 15, name: 'Tufan Erhürman', path: '/yazarlar/tufan-erhurman', bio: 'Akademisyen ve siyasetçi, hukuk ve siyaset üzerine yazar.', lastArticle: 'Anayasal Tartışmalar' },
    { id: 16, name: 'Zeki Beşiktepeli', path: '/yazarlar/zeki-besiktepeli', bio: 'Kıbrıs Türk tiyatrosu ve edebiyatı üzerine değerli bir kalem.', lastArticle: 'Sahnedeki Hayatlar' },
    { id: 17, name: 'Neriman Cahit', path: '/yazarlar/neriman-cahit', bio: 'Kıbrıs Türk şiirinin öncü kadın şairlerinden ve yazarlarından.', lastArticle: 'Hasret Şiirleri' },
    { id: 18, name: 'Urkiye Mine Balman', path: '/yazarlar/urkiye-mine-balman', bio: 'Şiirleri ve yazılarıyla Kıbrıs Türk kültürüne katkı sağlamıştır.', lastArticle: 'Bir Ada Hikayesi' },
    { id: 19, name: 'Özker Özgür', path: '/yazarlar/ozker-ozgur', bio: 'Siyasetçi ve yazar, Kıbrıs\'ın politik tarihi üzerine önemli eserler vermiştir.', lastArticle: 'Demokrasi Mücadelesi' },
    { id: 20, name: 'Fazıl Küçük', path: '/yazarlar/fazil-kucuk', bio: 'Kıbrıs Türk halkının lideri, mücadelesini ve düşüncelerini aktarır.', lastArticle: 'Varoluş Mücadelemiz' },
];

// Yazar kartı bileşeni
function YazarKarti({ yazar }) {
  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex' }}>
      <CardActionArea component={Link} to={yazar.path} sx={{ display: 'flex', p: 0 }}>
        <Grid container spacing={0} sx={{ height: '100%' }}>
          {/* Sol Sütun: Resim */}
          <Grid item xs={4}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                minHeight: 180,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://placehold.co/200x250/EEEEEE/31343C?text=${encodeURIComponent(yazar.name.split(' ').map(n => n[0]).join(''))})`,
                borderRight: '1px solid',
                borderColor: 'divider'
              }}
            />
          </Grid>
          {/* Sağ Sütun: Bilgiler */}
          <Grid item xs={8}>
            <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <Box>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {yazar.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minHeight: '60px'
                }}>
                  {yazar.bio}
                </Typography>
              </Box>
              <MuiLink
                component="div"
                variant="body2"
                sx={{ 
                  mt: 2, 
                  fontWeight: 'bold', 
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {yazar.lastArticle}
                <ArrowForwardIcon sx={{ fontSize: '1rem', ml: 0.5 }} />
              </MuiLink>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

function YazarlarPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
        Yazarlarımız
      </Typography>
      <Grid container spacing={4}>
        {yazarlar.map((yazar) => (
          <Grid item key={yazar.id} xs={12} sm={6} md={4}>
            <YazarKarti yazar={yazar} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default YazarlarPage;
