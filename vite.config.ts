import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });



export default defineConfig({
  server: {
    host: true, // 👈 allows external access (0.0.0.0)
    port: 5173,
    watch: {
      usePolling: true, // Optional for Docker compatibility
    },
  },
})


