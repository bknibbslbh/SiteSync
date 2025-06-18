/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF8FF',
          100: '#BEE3F8',
          200: '#90CDF4',
          300: '#63B3ED',
          400: '#4299E1',
          500: '#3182CE',
          600: '#2B77CB',
          700: '#2C5AA0',
          800: '#2A4365',
          900: '#1A365D',
          950: '#0F2A44',
        },
        secondary: {
          50: '#E6FFFA',
          100: '#B2F5EA',
          200: '#81E6D9',
          300: '#4FD1C7',
          400: '#38B2AC',
          500: '#319795',
          600: '#2C7A7B',
          700: '#285E61',
          800: '#234E52',
          900: '#1D4044',
          950: '#0D2021',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        electric: {
          50: '#E0F2FE',
          100: '#BAE6FD',
          200: '#7DD3FC',
          300: '#38BDF8',
          400: '#0EA5E9',
          500: '#0284C7',
          600: '#0369A1',
          700: '#0C4A6E',
          800: '#075985',
          900: '#0C4A6E',
          950: '#082F49',
        },
        success: {
          50: '#ECFDF5',
          500: '#10B981',
          700: '#047857',
        },
        warning: {
          50: '#FFFBEB',
          500: '#F59E0B',
          700: '#B45309',
        },
        error: {
          50: '#FEF2F2',
          500: '#EF4444',
          700: '#B91C1C',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'pulse-slow': 'pulse 3s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'electric-pulse': 'electricPulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #0EA5E9, 0 0 10px #0EA5E9, 0 0 15px #0EA5E9' },
          '100%': { boxShadow: '0 0 10px #0EA5E9, 0 0 20px #0EA5E9, 0 0 30px #0EA5E9' },
        },
        electricPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(14, 165, 233, 0.5)',
            borderColor: '#0EA5E9'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.8), 0 0 30px rgba(14, 165, 233, 0.6)',
            borderColor: '#38BDF8'
          },
        },
      },
      backgroundImage: {
        'electric-gradient': 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 50%, #7DD3FC 100%)',
        'electric-gradient-dark': 'linear-gradient(135deg, #0C4A6E 0%, #0369A1 50%, #0284C7 100%)',
      },
    },
  },
  plugins: [],
};