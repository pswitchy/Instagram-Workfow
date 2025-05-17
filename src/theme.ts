import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007FFF', // A blue color, adjust as needed
    },
    background: {
      default: '#FFFFFF', // Main app background
      paper: '#FFFFFF',   // Left panel background
    },
    text: {
        secondary: '#8e8e8e', // Instagram's secondary text color
    }
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    button: {
      textTransform: 'none',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        }
      }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                boxShadow: 'none', // Remove default shadows if not desired
            }
        }
    }
  }
});

export default theme;