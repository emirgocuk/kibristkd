import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme.js';
import './index.css';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import TarihcePage from './pages/TarihcePage.jsx';
import YonetimKuruluPage from './pages/YonetimKuruluPage.jsx';
import HaberDetayPage from './pages/HaberDetayPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';

import GirneLogin from './pages/GirneLogin';
import GirnePanel from './pages/GirnePanel';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="kurumsal/tarihce" element={<TarihcePage />} />
              <Route path="kurumsal/yonetim-kurulu" element={<YonetimKuruluPage />} />
              <Route path="haber/:id" element={<HaberDetayPage />} />
              <Route path="*" element={<PlaceholderPage title="Sayfa Hazırlanıyor" />} />
            </Route>

            <Route path="/girne" element={<GirneLogin />} />

            <Route element={<ProtectedRoute requireAdmin />}> 
              <Route path="/girne/panel" element={<GirnePanel />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
