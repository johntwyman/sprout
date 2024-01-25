import { alpha, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007236',
      dark: '#005221',
      light: '#00A04E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#662D91',
      dark: '#440E62',
      light: '#93268F',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D32F2F',
      dark: '#C62828',
      light: '#EF5350',
    },
    info: {
      main: '#0288D1',
      dark: '#01579B',
      light: '#03A9F4',
    },
    success: {
      main: '#0288D1',
      dark: '#01579B',
      light: '#03A9F4',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: { color: 'secondary' },
    },
    MuiToggleButtonGroup: {
      defaultProps: { color: 'secondary' },
    },
    MuiCheckbox: {
      defaultProps: { color: 'secondary' },
    },
    MuiSelect: {
      defaultProps: { color: 'secondary' },
    },
    MuiSwitch: {
      defaultProps: { color: 'secondary' },
    },
    MuiFormControl: {
      defaultProps: { color: 'secondary' },
    },
    MuiMenuItem: {
      // Setting defaultProps for color on MenuItem does not work, so update manually
      styleOverrides: {
        root: ({ theme: origTheme }) => ({
          '&.Mui-selected': {
            backgroundColor: alpha(
              origTheme.palette.secondary.main,
              origTheme.palette.action.selectedOpacity
            ),
            '&:hover': {
              backgroundColor: alpha(
                origTheme.palette.secondary.main,
                origTheme.palette.action.selectedOpacity
              ),
            },
            '&.Mui-focusVisible': {
              backgroundColor: alpha(
                origTheme.palette.secondary.main,
                origTheme.palette.action.focusOpacity
              ),
            },
          },
        }),
      },
    },
  },
});

export default theme;