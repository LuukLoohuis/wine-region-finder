import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Wine-Chart/',   // GitHub Pages serveert op /<repo-naam>/
  optimizeDeps: {
    exclude: ['mapbox-gl'],
  },
});
