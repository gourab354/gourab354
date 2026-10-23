/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00ffff',
        'neon-pink': '#ff00aa',
        'neon-green': '#39ff14',
        'neon-purple': '#cc66ff',
        'neon-orange': '#ffaa33',
        'dark-bg': '#080b14',
      },
      fontFamily: {
        'mono': ['Space Mono', 'monospace'],
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
