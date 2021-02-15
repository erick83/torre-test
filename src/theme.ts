import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: {
    50: '#f1f8e8',
    100: '#ddeec5',
    200: '#c6e39f',
    300: '#afd779',
    400: '#9ecf5c',
    500: '#8dc63f',
    600: '#85c039',
    700: '#7ab931',
    800: '#70b129',
    900: '#5da41b',
    A100: '#ebffdb',
    A200: '#cfffa8',
    A400: '#b3ff75',
    A700: '#a5ff5c',
    A800: '#7ed321',
    contrast: {
      50: '#000',
      100: '#000',
      200: '#000',
      300: '#000',
      400: '#000',
      500: '#000',
      600: '#000',
      700: '#000',
      800: '#000',
      900: '#fff',
      A100: '#000',
      A200: '#000',
      A400: '#000',
      A700: '#000',
    }
  },

  accent: {
    50: '#e6e6e6',
    100: '#bfbfbf',
    200: '#959595',
    300: '#6b6b6b',
    400: '#4b4b4b',
    500: '#2b2b2b',
    600: '#262626',
    700: '#202020',
    800: '#1a1a1a',
    900: '#101010',
    A100: '#ee6969',
    A200: '#e93b3b',
    A400: '#f10000',
    A700: '#d80000',
    contrast: {
      50: '#000',
      100: '#000',
      200: '#000',
      300: '#fff',
      400: '#fff',
      500: '#fff',
      600: '#fff',
      700: '#fff',
      800: '#fff',
      900: '#fff',
      A100: '#000',
      A200: '#fff',
      A400: '#fff',
      A700: '#fff',
    }
  },

  statusColors: {
    light: '#c4c4c4',
    purple: '#7660ff',
    yellow: '#ffdb43',
    red: '#eb5757',
    green: '#27ae60',
    lightBlue: '#56ccf2',
    blue: '#2f80ed',
    orange: '#f2994a',
    lightGreen: '#6fcf97',
    lightPurple: '#7f22fd',
    dark: '#21293a',
  },

  black: {
    100: '#2b2b2b',
    5: '#f9f9fa',
    10: '#f2f3f2',
    20: '#e0e0e0',
    40: '#d8d8d8',
    60: '#8d8d8d',
    80: '#4f4f4f',
  }
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
    // warning: {
    //   light: '#f9cdcd',
    //   main: '#eb5757',
    //   dark: '#eb5757',
    //   contrastText: '#ffffff',
    // },
    // error: {
    //   light: '#f9cdcd',
    //   main: '#eb5757',
    //   dark: '#eb5757',
    //   contrastText: '#ffffff',
    // },
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
      default: palette.black[5],
      paper: '#ffffff',
    }
    // background: {
    //   default: palette.black[5],
    //   paper: '#ffffff',
    // }
    // info?: PaletteColorOptions;
    // success?: PaletteColorOptions;
    // type?: PaletteType;
    // tonalOffset?: PaletteTonalOffset;
    // contrastThreshold?: number;
    // divider?: string;
    // action?: Partial<TypeAction>;
  },
});

export default mainTheme
