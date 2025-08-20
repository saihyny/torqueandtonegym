import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
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
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
