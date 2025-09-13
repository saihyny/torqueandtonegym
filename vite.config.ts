import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      'X-Frame-Options': 'SAMEORIGIN',
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    ViteImageOptimizer({
      /* pass your config */
    }),
    // OPTIMIZATION: Add compression for production builds.
    // This will generate .gz and .br files for your assets.
    mode === 'production' && viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // Don't compress files smaller than 10kb
      algorithm: 'gzip',
      ext: '.gz',
    }),
    mode === 'production' && viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ].filter(Boolean),
   assetsInclude: ['**/*.MP4', '**/*.ARW'],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
