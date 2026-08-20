import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      emptyOutDir: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            // Auth only: every page checks sign-in state on load. Firestore and
            // Messaging (visitor tracking, admin push) are dynamically imported
            // from firebaseExtras.ts instead, so they form their own lazy chunk
            // rather than shipping to every anonymous visitor.
            firebase: ['firebase/app', 'firebase/auth'],
            motion: ['motion/react'],
            ui: ['lucide-react', 'react-icons', 'react-hot-toast']
          }
        }
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify, file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

