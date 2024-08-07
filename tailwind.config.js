/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F2F2F2',
        primary: {
          DEFAULT: '#880E4F',
          DARK: '#560027',
          LIGHT: '#BC477B'
        },
        valid: {
          DEFAULT: '#4CAF50',
          DARK: '#087f23',
          LIGHT: '#8BC34A'
        },
        invalid: {
          DEFAULT: '#EF5350',
          DARK: '#B71C1C',
          LIGHT: '#FFCDD2'
        },
        disabled: {
          background: '#CCC',
          text: '#666'
        }
      },
      keyframes: {
        ldsEllipsis1: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' }
        },
        ldsEllipsis2: {
          '0%': {
            transform: 'translate(0, 0)'
          },
          '100%': {
            transform: 'translate(24px, 0)'
          }
        },
        ldsEllipsis3: {
          '0%': {
            transform: 'scale(1)'
          },
          '100%': {
            transform: 'scale(0)'
          }
        }
      },
      animation: {
        ldsEllipsis1: 'ldsEllipsis1 0.6s infinite',
        ldsEllipsis2: 'ldsEllipsis2 0.6s infinite',
        ldsEllipsis3: 'ldsEllipsis3 0.6s infinite'
      }
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif']
    }
  },
  plugins: []
}
