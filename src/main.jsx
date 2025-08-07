import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Temel Layout ve Sayfalar
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import HakkimizdaPage from './pages/HakkimizdaPage.jsx';
import TarihcePage from './pages/TarihcePage.jsx';
import YonetimKuruluPage from './pages/YonetimKuruluPage.jsx';
import HaberDetayPage from './pages/HaberDetayPage.jsx';
import PlaceholderPage from './pages/PlaceholderPage.jsx';

// Admin Paneli Bileşenleri (EKSİK OLAN IMPORT'LAR BURADA)
import AdminLayout from './admin/AdminLayout.jsx';
import AdminDashboard from './admin/pages/AdminDashboard.jsx';
import LoginPage from './admin/pages/LoginPage.jsx';
import MakaleYonetimi from './admin/pages/MakaleYonetimi.jsx';
import YazarYonetimi from './admin/pages/YazarYonetimi.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "kurumsal/hakkimizda", element: <HakkimizdaPage /> },
      { path: "kurumsal/tarihce", element: <TarihcePage /> },
      { path: "kurumsal/yonetim-kurulu", element: <YonetimKuruluPage /> },
      { path: "haberler/:id", element: <HaberDetayPage /> },
      { path: "kurumsal/uyelik", element: <PlaceholderPage title="Üyelik" /> },
    ]
  },
  {
    path: "/girne",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "makaleler", element: <MakaleYonetimi /> },
      { path: "yazarlar", element: <YazarYonetimi /> },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);