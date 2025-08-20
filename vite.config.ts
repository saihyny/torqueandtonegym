import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Enable compression in dev mode
    compress: true,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
        // Optimize chunk file names with better hashing
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name || 'chunk';
          return `assets/js/${name}-[hash:8].js`;
        },
        entryFileNames: 'assets/js/[name]-[hash:8].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash:8].[ext]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash:8].[ext]`;
          }
          return `assets/[ext]/[name]-[hash:8].[ext]`;
        },
      },
      // External dependencies that should not be bundled
      external: (id) => {
        // Keep all dependencies bundled for now, but this can be used for CDN optimization later
        return false;
      },
    },
    // Reduce chunk size warning limit to catch bloated chunks
    chunkSizeWarningLimit: 500,
    // Disable source maps in production for smaller bundles
    sourcemap: mode === 'development',
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
    // Optimize asset inlining threshold
    assetsInlineLimit: 4096, // 4KB threshold for inlining assets
    // CSS minification options (using default esbuild for compatibility)
    cssMinify: true,
  },

  // Optimize dependencies with better pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      // Only include essential animation libraries in pre-bundling
      'react-intersection-observer',
    ],
    exclude: [
      '@vite/client',
      '@vite/env',
      // Exclude heavy libraries from pre-bundling to allow better chunking
      'framer-motion',
      'gsap',
      'lenis',
      'swiper',
    ],
  },

  // Performance optimizations
  esbuild: {
    // Remove unused imports in production
    treeShaking: true,
    // Optimize for modern browsers
    target: 'es2020',
  },
}));
