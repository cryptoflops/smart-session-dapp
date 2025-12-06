/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Cosmic Precision Palette
        background: '#0B0C15',
        surface: '#151621',
        'surface-elevated': '#1A1B2E',
        primary: '#00F0FF',
        'primary-dark': '#00C4D4',
        secondary: '#7000FF',
        'secondary-light': '#8B2CFF',
        success: '#00FF94',
        'success-dark': '#00CC75',
        warning: '#FFC200',
        'warning-dark': '#CC9B00',
        danger: '#FF0055',
        'danger-dark': '#CC0044',
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0B0',
          muted: '#505060'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Outfit', 'sans-serif']
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #0B0C15 0%, #151621 100%)',
        'glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'glow-primary': 'radial-gradient(circle at center, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
        'glow-secondary': 'radial-gradient(circle at center, rgba(112, 0, 255, 0.15) 0%, transparent 70%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(112, 0, 255, 0.1) 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      borderColor: {
        glass: 'rgba(255, 255, 255, 0.1)'
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 240, 255, 0.3)',
        'glow': '0 0 20px rgba(0, 240, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 240, 255, 0.4)',
        'glow-secondary': '0 0 20px rgba(112, 0, 255, 0.3)',
        'glow-success': '0 0 20px rgba(0, 255, 148, 0.3)',
        'glow-danger': '0 0 20px rgba(255, 0, 85, 0.3)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'card': '0 4px 24px -1px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 32px -4px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        'shimmer': 'shimmer 1.5s infinite',
        'countdown': 'countdown linear forwards',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        countdown: {
          from: { strokeDashoffset: '0' },
          to: { strokeDashoffset: '283' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    }
  },
  plugins: []
};