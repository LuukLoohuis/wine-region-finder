/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        wine: {
          deep:   '#4A1528',
          dark:   '#722F37',
          mid:    '#9B4A5A',
          light:  '#C4818E',
          blush:  '#F2D9DE',
          paper:  '#FAF8F2',
          cream:  '#F5F0E8',
          gold:   '#C9A84C',
          bark:   '#8B7355',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"Crimson Text"', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
