/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: '#2e1a52',
          light: '#3d2569',
          active: '#5b3fa8',
        },
        brand: {
          50: '#f4f1fb',
          100: '#e8e1f7',
          200: '#c9b8ec',
          400: '#8f68d4',
          500: '#6d3fc7',
          600: '#5b2fb3',
          700: '#4a2593',
        },
        ink: {
          900: '#1a1625',
          700: '#3f3a4d',
          500: '#6b6478',
          300: '#a8a2b8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 10, 40, 0.06), 0 1px 3px rgba(20, 10, 40, 0.08)',
      },
    },
  },
  plugins: [],
};
