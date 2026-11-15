/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7FAFA',
        'surface-alt': '#EEF4F3',
        border: '#DDE7E5',
        primary: {
          DEFAULT: '#0F766E',
          hover: '#0B5C56',
        },
        accent: {
          mint: '#7CC7BD',
          ice: '#E6F4F2',
        },
        text: {
          main: '#102A28',
          body: '#4B5F5C',
          muted: '#8A9B98',
        },
        status: {
          green: '#15803D',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        card: '12px',
        hero: '20px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(16, 42, 40, 0.05)',
        card: '0 4px 20px -2px rgba(16, 42, 40, 0.05)',
      }
    },
  },
  plugins: [],
}

