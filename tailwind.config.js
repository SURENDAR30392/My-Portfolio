/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFF8F3',
        'surface-white': '#FFFFFF',
        'section-subtle': '#FCE9DF',
        border: '#F0DED4',
        primary: {
          DEFAULT: '#D98C70',
          hover: '#C5775B',
          light: '#FCE9DF',
        },
        secondary: {
          DEFAULT: '#F4C9B5',
          hover: '#E8B69F',
        },
        text: {
          main: '#613E35',
          body: '#613E35',
          secondary: '#613E35',
          muted: '#613E35',
        },
        accent: {
          blue: '#D98C70',
          sky: '#F4C9B5',
          ice: '#FCE9DF',
        },
        status: {
          green: '#10B981',
          blue: '#D98C70',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        card: '14px',
        hero: '20px',
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(97, 62, 53, 0.04), 0 1px 2px -1px rgba(97, 62, 53, 0.04)',
        card: '0 4px 6px -1px rgba(97, 62, 53, 0.04), 0 2px 4px -2px rgba(97, 62, 53, 0.04)',
        'card-hover': '0 10px 25px -3px rgba(217, 140, 112, 0.12), 0 4px 6px -4px rgba(217, 140, 112, 0.06)',
        glow: '0 0 20px -3px rgba(217, 140, 112, 0.25)',
      }
    },
  },
  plugins: [],
}
