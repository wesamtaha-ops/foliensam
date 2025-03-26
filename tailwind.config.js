/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Almarai', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          dark: '#000000',    // Pure Black
          silver: '#94A3B8',  // Refined Silver
        },
        accent: {
          purple: '#8B0000',   // Dark Red
          gold: '#660000',     // Deeper Dark Red
          cream: '#1A1A1A',    // Dark Gray
          charcoal: '#2C3444', // Rich Charcoal
          red: '#8B0000',      // Dark Red
          darkRed: '#4A0000'   // Very Dark Red
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      gradientColorStops: {
        'accent-gold': '#660000',
      }
    },
  },
  plugins: [],
};