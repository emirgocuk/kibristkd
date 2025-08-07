import { createTheme } from '@mui/material/styles';

// Renk paleti güncellendi
const theme = createTheme({
  palette: {
    primary: {
      main: '#C62828', // Göz yormayan, daha koyu ve profesyonel bir kırmızı tonu
    },
    secondary: {
      main: '#D32F2F', // İkincil renk olarak biraz daha canlı bir ton
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1B263B',
      secondary: '#415A77',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700, color: '#1B263B' },
    h5: { fontWeight: 600, color: '#1B263B' },
    h6: { fontWeight: 600, color: '#415A77' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        // Admin panelindeki üst barın rengini de temadan almasını sağlıyoruz
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
        }),
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;