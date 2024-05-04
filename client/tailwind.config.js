/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  darkMode: ['class'],
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}', './app/**/*.{js,jsx}', './src/**/*.{js,jsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        'background': 'rgba(248, 247, 250, 1)',
        'color': 'rgba(47, 43, 61, 0.9)',
        'form': 'rgba(69, 90, 100, 1)',
        'border': 'rgba(176, 190, 197, 1)',
        'primary': 'rgba(0, 188, 212, 1)',
      },
      borderRadius: {
        'lg': '0.5rem',
        'md': 'calc(0.5rem - 2px)',
        'sm': 'calc(0.5rem - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
});
