/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        'surface-white': '#FFFFFF',
        'section-subtle': '#EFF6FF',
        border: '#E2E8F0',
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#EFF6FF',
        },
        secondary: {
          DEFAULT: '#60A5FA',
          hover: '#3B82F6',
        },
        text: {
          main: '#172554',
          body: '#334155',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
        accent: {
          blue: '#2563EB',
          sky: '#60A5FA',
          ice: '#EFF6FF',
        },
        status: {
          green: '#10B981',
          blue: '#2563EB',
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
        subtle: '0 1px 3px 0 rgba(23, 37, 84, 0.04), 0 1px 2px -1px rgba(23, 37, 84, 0.04)',
        card: '0 4px 6px -1px rgba(23, 37, 84, 0.04), 0 2px 4px -2px rgba(23, 37, 84, 0.04)',
        'card-hover': '0 10px 25px -3px rgba(37, 99, 235, 0.08), 0 4px 6px -4px rgba(37, 99, 235, 0.04)',
        glow: '0 0 20px -3px rgba(37, 99, 235, 0.25)',
      }
    },
  },
  plugins: [],
}
