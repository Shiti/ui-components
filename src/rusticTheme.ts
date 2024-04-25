/* eslint-disable no-magic-numbers */
import type { Shadows } from '@mui/material/styles'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const whiteColor = '#FFFFFF'
const SecondaryMainColor = '#FF6928'
const SecondaryDarkColor = '#E54500'
const actionActiveColor = '#5F5C5A'
const actionFocusColor = '#FDFDFD'
const actionDisabledBackgroundColor = '#E5E5E5'
const actionDisabledColor = '#A7A19E'
const actionSelectedColor = '#D6D0D0'
const dividerColor = '#D0C4BE'

const baseTheme = createTheme({
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Inter',
    h1: {
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '94px',
      lineHeight: 1.167,
      letterSpacing: '-1.5px',
    },
    h2: {
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '59px',
      letterSpacing: '-0.5px',
      lineHeight: 1.2,
    },
    h3: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '47px',
      letterSpacing: '0px',
      lineHeight: 1.167,
    },
    h4: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '33px',
      letterSpacing: '0.25px',
      lineHeight: 1.235,
    },
    h5: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '24px',
      letterSpacing: '0px',
      lineHeight: 1.334,
    },
    h6: {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '20px',
      letterSpacing: '0.15px',
      lineHeight: 1.6,
    },
    body1: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      letterSpacing: '0.5px',
      lineHeight: 1.5,
    },
    body2: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      letterSpacing: '0.25px',
      lineHeight: 1.43,
    },
    subtitle1: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      letterSpacing: '0.15px',
      lineHeight: 1.75,
    },
    subtitle2: {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      letterSpacing: '0.1px',
      lineHeight: 1.57,
    },
    overline: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '10px',
      letterSpacing: '1.5px',
      lineHeight: 1.5,
      textTransform: 'uppercase',
    },
    caption: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      letterSpacing: '0.4px',
      lineHeight: 1.66,
    },
  },
  palette: {
    common: {
      black: '#000000',
      white: whiteColor,
    },
    error: {
      main: '#F82A43',
    },
    warning: {
      main: '#FFB800',
    },
    info: {
      main: '#0094FF',
    },
    success: {
      main: '#35A700',
    },
  },
  shadows: [
    ...createTheme({}).shadows.map((shadow, i) => {
      if (i === 1) {
        return '0 4px 5px rgba(0, 0, 0, 0.05)'
      } else if (i === 2) {
        return '0 4px 10px rgba(0, 0, 0, 0.1)'
      } else if (i === 3) {
        return '0 4px 15px rgba(0, 0, 0, 0.15)'
      } else {
        return 'none'
      }
    }),
  ] as Shadows,
})

const lightModePrimaryMainColor = '#3D3834'
const lightModeBackgroundDefaultColor = '#F4F0EF'
let rusticLightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    divider: dividerColor,
    text: {
      primary: '#1E0C04',
      secondary: '#4E443F',
      disabled: '#9C9795',
    },
    primary: {
      main: lightModePrimaryMainColor,
      dark: '#2D2825',
      light: '#716865',
    },
    secondary: {
      main: SecondaryMainColor,
      light: '#FFDBCC',
      dark: SecondaryDarkColor,
    },
    background: {
      default: lightModeBackgroundDefaultColor,
      paper: whiteColor,
    },
    action: {
      active: actionActiveColor,
      hover: '#EFEAEA',
      selected: actionSelectedColor,
      disabledBackground: actionDisabledBackgroundColor,
      focus: actionFocusColor,
      disabled: actionDisabledColor,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: lightModePrimaryMainColor,
          color: whiteColor,
        },
      },
    },
  },
})

const darkModePaperColor = '#2F2F2F'
const darkModePrimaryMainColor = '#FFFCFB'
let rusticDarkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    divider: dividerColor,
    primary: {
      main: darkModePrimaryMainColor,
      dark: SecondaryDarkColor,
      light: '#FFDBCC',
    },
    secondary: {
      main: SecondaryMainColor,
      light: '#FFA983',
      dark: SecondaryDarkColor,
    },
    background: {
      default: '#040404',
      paper: darkModePaperColor,
    },
    text: {
      primary: whiteColor,
      secondary: '#EBEBEB',
      disabled: '#C1C1C1',
    },
    action: {
      active: actionActiveColor,
      hover: '#9A9A9A',
      selected: actionSelectedColor,
      focus: actionFocusColor,
      disabledBackground: actionDisabledBackgroundColor,
      disabled: actionDisabledColor,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: darkModePrimaryMainColor,
          color: darkModePaperColor,
        },
      },
    },
  },
})

rusticLightTheme = responsiveFontSizes(rusticLightTheme)
rusticDarkTheme = responsiveFontSizes(rusticDarkTheme)
export default rusticLightTheme
export { rusticDarkTheme, rusticLightTheme }
