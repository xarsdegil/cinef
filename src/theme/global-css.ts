export const globalCss = {
  extend: {
    '*': {
      '--global-color-border': 'colors.border',
      '--global-color-placeholder': 'colors.fg.subtle',
      '--global-color-selection': 'colors.colorPalette.subtle.bg',
      '--global-color-focus-ring': 'colors.colorPalette.solid.bg',
      boxSizing: 'border-box',
    },
    html: {
      colorPalette: 'gray',
      background: 'bg.canvas',
      colorScheme: 'dark',
      minHeight: '100%',
    },
    body: {
      background: 'bg.canvas',
      color: 'fg.default',
      minHeight: '100vh',
      backgroundImage:
        'radial-gradient(circle at top, rgba(251, 191, 36, 0.14), transparent 28%), radial-gradient(circle at 85% 15%, rgba(14, 165, 233, 0.10), transparent 22%), linear-gradient(180deg, rgba(2, 6, 23, 0.96) 0%, rgba(3, 7, 18, 1) 100%)',
      backgroundAttachment: 'fixed',
      textRendering: 'optimizeLegibility',
    },
    '::selection': {
      background: 'amber.subtle.bg',
      color: 'amber.subtle.fg',
    },
    a: {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
}
