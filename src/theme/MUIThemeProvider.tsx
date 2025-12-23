import { createTheme } from '@mui/material/styles';

const MUIThemeProvider = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#063970' },
    secondary: { main: '#00bcd4' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default MUIThemeProvider;
