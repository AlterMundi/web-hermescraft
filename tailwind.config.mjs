/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        // === Minecraft daytime palette ===
        sky: {
          light: '#A4D9F7',
          DEFAULT: '#7EC0EE',
          deep: '#4FA3D6',
        },
        grass: {
          light: '#94C95C',
          DEFAULT: '#7CAC50',
          dark: '#5A7F3A',
          side: '#8FA352',
        },
        dirt: {
          light: '#A88255',
          DEFAULT: '#8B5A3C',
          dark: '#6B4423',
        },
        stone: {
          light: '#B5B5B5',
          DEFAULT: '#8A8A8A',
          dark: '#555555',
        },
        wood: {
          light: '#C8A165',
          DEFAULT: '#9E6B3D',
          dark: '#6B4423',
        },
        cloud: '#FFFFFF',
        // Dorado Hermes — acento principal
        hermes: {
          DEFAULT: '#F5C542',
          light: '#FCDC6E',
          dark: '#C79A1E',
        },
        // Navy/cream para modo oscuro opcional
        night: {
          DEFAULT: '#1A1E2E',
          deep: '#0E1220',
        },
        cream: '#FAF7F0',
        ink: '#1F2933',
        // Alias daemon -> hermes para compatibilidad con componentes nuevos
        daemon: {
          DEFAULT: '#F5C542',
          light: '#FCDC6E',
          dark: '#C79A1E',
          glow: 'rgba(245,197,66,0.4)',
        },
        cyan: {
          DEFAULT: '#00E5FF',
          light: '#80EAFF',
          dark: '#00B8D4',
          glow: 'rgba(0,229,255,0.3)',
        },
        void: {
          DEFAULT: '#1A1E2E',
          light: '#252a3d',
          deep: '#0E1220',
        },
      },
      fontFamily: {
        display: ['"Press Start 2P"', 'monospace'],
        mono: ['"Monocraft"', '"JetBrains Mono"', 'monospace'],
        sans: ['"Nunito"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Fredoka"', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'pixel': '4px 4px 0 0 rgba(0,0,0,0.25)',
        'pixel-lg': '6px 6px 0 0 rgba(0,0,0,0.3)',
        'block': 'inset 0 -4px 0 0 rgba(0,0,0,0.25), inset 0 4px 0 0 rgba(255,255,255,0.25)',
        'block-gold': 'inset 0 -4px 0 0 #C79A1E, inset 0 4px 0 0 #FCDC6E',
        'block-grass': 'inset 0 -4px 0 0 #5A7F3A, inset 0 4px 0 0 #94C95C',
        'glow-daemon': '0 0 20px rgba(245,197,66,0.3)',
        'glow-cyan': '0 0 20px rgba(0,229,255,0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'cloud-drift': 'cloud-drift 60s linear infinite',
        'cloud-drift-slow': 'cloud-drift 90s linear infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'bob': 'bob 2s ease-in-out infinite',
        'pulse-daemon': 'pulse-daemon 2s ease-in-out infinite',
        'flicker': 'flicker 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'cloud-drift': {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110vw)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'pulse-daemon': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(245,197,66,0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(245,197,66,0.6)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
          '75%': { opacity: '0.95' },
        },
      },
    },
  },
  plugins: [],
};
