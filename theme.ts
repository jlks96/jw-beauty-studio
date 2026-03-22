import { createTheme } from '@mui/material/styles';

export const beautyTheme = createTheme({
  palette: {
    primary: {
      main: '#C5735A',    // Rose Gold / Terracotta
      contrastText: '#FFFBF5',
    },
    secondary: {
      main: '#D4BFAD',    // Champagne
      contrastText: '#5D4037',
    },
    background: {
      default: '#FFFBF5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C', // Charcoal
      secondary: '#5D4037', // Brown
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Noto Sans SC", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      color: '#2C2C2C',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      color: '#2C2C2C',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      color: '#2C2C2C',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      color: '#2C2C2C',
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      color: '#2C2C2C',
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      color: '#2C2C2C',
    },
    button: {
      textTransform: 'none',
      letterSpacing: '0.05em',
      fontWeight: 500,
    },
    body1: {
      color: '#2C2C2C',
    },
    body2: {
      color: '#5D4037',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});
