/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-purple': {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        'divine-gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        'midnight': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'accent': ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'divine-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        'purple-gradient': 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
        'celestial': 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        'radial-purple': 'radial-gradient(circle at top right, #7c3aed, transparent)',
        'radial-gold': 'radial-gradient(circle at bottom left, #fbbf24, transparent)',
      },
      boxShadow: {
        'divine': '0 20px 60px -15px rgba(168, 85, 247, 0.3)',
        'gold': '0 20px 60px -15px rgba(251, 191, 36, 0.3)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.5)',
        'glow-gold': '0 0 30px rgba(251, 191, 36, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(251, 191, 36, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}