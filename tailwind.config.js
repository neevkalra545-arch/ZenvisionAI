/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep Space Background Colors
        space: {
          900: '#060816',
          800: '#0A1020',
          700: '#101728',
          600: '#151D35',
          500: '#1A2440',
        },
        // Electric Blues & Cyans
        electric: {
          blue: '#00D4FF',
          cyan: '#00F5D4',
          purple: '#7B68EE',
          soft: '#A8B4CE',
        },
        // Accent Colors
        accent: {
          primary: '#00D4FF',
          secondary: '#00F5D4',
          tertiary: '#7B68EE',
          glow: '#00D4FF40',
        },
        // Glass and UI
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.1)',
          strong: 'rgba(255, 255, 255, 0.15)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spinReverse 15s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scan': 'scan 2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'border-dance': 'borderDance 2s linear infinite',
        'particle': 'particle 20s linear infinite',
        'star-twinkle': 'starTwinkle 3s ease-in-out infinite',
        'orbit': 'orbit 10s linear infinite',
        'ripple': 'ripple 0.6s linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        borderDance: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
        particle: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-100vh) translateX(20px)', opacity: '0' },
        },
        starTwinkle: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        'space-gradient': 'linear-gradient(180deg, #060816 0%, #0A1020 50%, #101728 100%)',
        'glow-gradient': 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 212, 255, 0.3)',
        'glow-md': '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-lg': '0 0 40px rgba(0, 212, 255, 0.5)',
        'glow-xl': '0 0 60px rgba(0, 212, 255, 0.6)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'neon': '0 0 5px #00D4FF, 0 0 20px #00D4FF, 0 0 40px #00D4FF',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
};
