import { createStitches } from '@stitches/react'

export const {
  config,
  createTheme,
  css,
  styled,
  theme,
  getCssText,
  keyframes,
  globalCss,
} = createStitches({
  theme: {
    colors: {
      white: '#fff',
      gray900: '#121214',
      gray800: '#202024',
      gray300: '#c4c4cc',
      gray400: '#8D8D99',

      gray100: '#e1e1e6',

      green500: '#00875f',
      green300: '#00b37e',
    },
    fontSizes: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
  },
})
