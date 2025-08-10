// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import './index.css';

import App from './App';
import HomePage from './pages/HomePage';
import TarihcePage from './pages/TarihcePage';
import YonetimKuruluPage from './pages/YonetimKuruluPage';
import HaberDetayPage from './pages/HaberDetayPage';
import PlaceholderPage from './pages/PlaceholderPage';

import GirneLogin from './pages/GirneLogin';
import GirnePanel from './pages/GirnePanel';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Layout */}
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="kurumsal/tarihce" element={<TarihcePage />} />
            <Route path="kurumsal/yonetim-kurulu" element={<YonetimKuruluPage />} />
            <Route path="haber/:slug" element={<HaberDetayPage />} />
            <Route path="*" element={<PlaceholderPage title="Sayfa Hazırlanıyor" />} />
          </Route>

          {/* Gizli giriş kapısı — ProtectedRoute DIŞINDA */}
          <Route path="/girne" element={<GirneLogin />} />

          {/* Korumalı bölge — sadece admin */}
          <Route element={<ProtectedRoute requireAdmin />}>
            <Route path="/girne/panel" element={<GirnePanel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);
