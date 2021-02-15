import { createMuiTheme } from '@material-ui/core/styles';

const black = {
  100: '#2b2b2b',
  5: '#f9f9fa',
  10: '#f2f3f2',
  20: '#e0e0e0',
  40: '#d8d8d8',
  60: '#8d8d8d',
  80: '#4f4f4f',
}

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#201e1f',
      light: '#6d6d6d',
      dark: '#1b1b1b',
      contrastText: '#cddd33',
    },
    secondary: {
      main: '#879128',
      light: '#fff350',
      dark: '#879128',
      contrastText: '#000000',
    },
    grey: {
      50: '#f9f9fa',
      100: '#f2f3f2',
      200: '#e0e0e0',
      400: '#d8d8d8',
      600: '#8d8d8d',
      800: '#4f4f4f',
      A100: '#2b2b2b',
    },
    common: {
      black: '#2b2b2b',
      white: '#ffffff',
    },
    text: {
      primary: '#2b2b2b',
      secondary: '#2b2b2b',
      disabled: '#8d8d8d',
      hint: '#2b2b2b',
    },
    background: {
      default: black[5],
      paper: '#ffffff',
    }
  },
});

export default mainTheme
