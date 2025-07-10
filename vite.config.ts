import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('@supabase/supabase-js')) return 'supabase';
            if (id.includes('lucide-react')) return 'icons';
            if (id.includes('@radix-ui')) return 'radix-ui';
            if (id.includes('@tanstack/react-query')) return 'react-query';
            if (id.includes('react-router-dom')) return 'router';
            if (id.includes('react-hook-form') || id.includes('@hookform'))
              return 'forms';
          }
        },
      },
    },
  },
}));
