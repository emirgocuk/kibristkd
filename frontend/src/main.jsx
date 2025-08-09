import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.js';
import App from './App.jsx';

// Genel Sayfaları Import Et
import HomePage from './pages/HomePage.jsx';
import HaberDetayPage from './pages/HaberDetayPage.jsx';
import HakkimizdaPage from './pages/HakkimizdaPage.jsx';
import TarihcePage from './pages/TarihcePage.jsx';
import YonetimKuruluPage from './pages/YonetimKuruluPage.jsx';

// Admin Sayfalarını ve Bileşenlerini Import Et
import AdminLayout from './admin/AdminLayout.jsx';
import AdminDashboard from './admin/pages/AdminDashboard.jsx';
import MakaleYonetimi from './admin/pages/MakaleYonetimi.jsx';
import YazarYonetimi from './admin/pages/YazarYonetimi.jsx';
import LoginPage from './admin/pages/LoginPage.jsx';
import RegisterPage from './admin/pages/RegisterPage.jsx';

// Uygulamayı render et ve Rotaları Tanımla
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Genel Site Rotaları (Navbar ve Footer içerir) */}
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="haber/:id" element={<HaberDetayPage />} />
            <Route path="hakkimizda" element={<HakkimizdaPage />} />
            <Route path="tarihce" element={<TarihcePage />} />
            <Route path="yonetim-kurulu" element={<YonetimKuruluPage />} />
          </Route>

          {/* Tam Sayfa Admin Rotaları (Navbar ve Footer içermez) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Paneli Rotaları (Admin kenar çubuğunu içerir) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="makale-yonetimi" element={<MakaleYonetimi />} />
            <Route path="yazar-yonetimi" element={<YazarYonetimi />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
