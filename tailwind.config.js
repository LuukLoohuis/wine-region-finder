/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wine: {
          bg:     '#1a0a0a',
          panel:  '#2a1010',
          card:   '#3a1a1a',
          border: '#4a2a2a',
          red:    '#722F37',
          mid:    '#9B4A5A',
          light:  '#c8b8a2',
          cream:  '#f0e8d8',
          gold:   '#C9A84C',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Crimson Text"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
