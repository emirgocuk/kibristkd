import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import { BrowserRouter as Router } from 'react-router-dom';
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material'; // HATA DÜZELTMESİ: Eksik import eklendi
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import './index.css';

import App from './App';
import HomePage from './pages/HomePage';
import HaberDetayPage from './pages/HaberDetayPage';
import IletisimPage from './pages/IletisimPage';
import YazarlarPage from './pages/YazarlarPage';
import GenericTextPage from './pages/GenericTextPage'; // Yeni genel sayfa bileşenini import et

import GirneLogin from './pages/GirneLogin';
import GirnePanel from './pages/GirnePanel';
import ProtectedRoute from './components/ProtectedRoute';
>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './index.css'; // Tailwind'i ekleyeceğimiz dosya

ReactDOM.createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
=======
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Ana Layout */}
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            {/* Kurumsal Sayfalar */}
            <Route path="kurumsal/tarihce" element={<GenericTextPage title="Tarihçe" />} />
            <Route path="kurumsal/tuzuk" element={<GenericTextPage title="Tüzük" />} />
            <Route path="kurumsal/uyelik" element={<GenericTextPage title="Üyelik" />} />
            <Route path="kurumsal/doktor-uyelerimiz" element={<GenericTextPage title="Doktor Üyelerimiz" />} />
            <Route path="kurumsal/sss" element={<GenericTextPage title="Sık Sorulan Sorular" />} />
            <Route path="kurumsal/mali-bilgiler" element={<GenericTextPage title="Mali Bilgiler" />} />
            <Route path="kurumsal/burs-islemleri" element={<GenericTextPage title="Burs İşlemleri" />} />
            
            {/* Yönetim Sayfaları */}
            <Route path="yonetim/genel-merkez" element={<GenericTextPage title="Yönetim - Genel Merkez" />} />
            <Route path="yonetim/antalya" element={<GenericTextPage title="Yönetim - Antalya" />} />
            <Route path="yonetim/istanbul" element={<GenericTextPage title="Yönetim - İstanbul" />} />
            <Route path="yonetim/izmir" element={<GenericTextPage title="Yönetim - İzmir" />} />
            <Route path="yonetim/mersin" element={<GenericTextPage title="Yönetim - Mersin" />} />

            {/* Kıbrıs Sayfaları */}
            <Route path="kibris/uyusmazlik" element={<GenericTextPage title="Kıbrıs Uyuşmazlığı" />} />
            <Route path="kibris/kulturel-etkinlikler" element={<GenericTextPage title="Kültürel Etkinlikler" />} />
            <Route path="kibris/tavsiyeler" element={<GenericTextPage title="Kıbrıs’la İlgili Tavsiyeler" />} />
            <Route path="kibris/kultur" element={<GenericTextPage title="Kıbrıs Türk Kültürü" />} />
            <Route path="kibris/onemli-gunler" element={<GenericTextPage title="Önemli Gün ve Haftalar" />} />

            {/* Diğer Ana Sayfalar */}
            <Route path="yayinlarimiz" element={<GenericTextPage title="Yayınlarımız" />} />
            <Route path="kutuphanemiz" element={<GenericTextPage title="Kütüphanemiz" />} />
            <Route path="etkinlikler" element={<GenericTextPage title="Etkinlikler" />} />
            <Route path="uyelik-formu" element={<GenericTextPage title="Üyelik Formu" />} />

            {/* Basın Sayfaları */}
            <Route path="basin/aciklamalar" element={<GenericTextPage title="Basın Açıklamaları" />} />
            <Route path="basin/basinda-biz" element={<GenericTextPage title="Basında Biz" />} />
            <Route path="basin/basinda-kktc" element={<GenericTextPage title="Basında KKTC" />} />

            {/* İletişim Alt Sayfaları */}
            <Route path="iletisim/ziyaretci-defteri" element={<GenericTextPage title="Ziyaretçi Defteri" />} />
            <Route path="iletisim/defterimize-yazin" element={<GenericTextPage title="Defterimize Yazın" />} />

            {/* Daha Önce Oluşturulan Özel Sayfalar */}
            <Route path="haber/:slug" element={<HaberDetayPage />} />
            <Route path="iletisim/bize-ulasin" element={<IletisimPage />} />
            <Route path="yazarlar" element={<YazarlarPage />} />
            
            {/* Eşleşmeyen Rotalar için 404 Sayfası */}
            <Route path="*" element={<GenericTextPage title="Sayfa Bulunamadı" content={<Typography>Aradığınız sayfa mevcut değil veya henüz hazırlanmadı.</Typography>} />} />
          </Route>

          {/* Admin Paneli Rotaları */}
          <Route path="/girne" element={<GirneLogin />} />
          <Route element={<ProtectedRoute requireAdmin />}>
            <Route path="/girne/panel" element={<GirnePanel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);
>>>>>>> parent of 43808ce (Navbardaki sayfalar tasarlandı)
