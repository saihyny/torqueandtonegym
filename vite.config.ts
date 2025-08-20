import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from "vite-plugin-compression";

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
    // PERFORMANCE: Add compression plugins for production
    mode === 'production' && viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false,
    }),
    mode === 'production' && viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable advanced minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
        passes: 2, // Multiple passes for better compression
      },
      mangle: {
        safari10: true, // Fix Safari 10 issues
      },
    },
    // Optimize chunk splitting for better caching and loading
    rollupOptions: {
      output: {
        // Aggressive manual chunk splitting for optimal loading
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-core';
          }

          // Router (small, separate chunk)
          if (id.includes('react-router-dom')) {
            return 'router';
          }

          // Split GSAP and Framer Motion into separate chunks
          if (id.includes('gsap')) {
            return 'gsap';
          }
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
            return 'framer-motion';
          }
          if (id.includes('lenis')) {
            return 'lenis';
          }

          // UI libraries - split by usage frequency
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          if (id.includes('@radix-ui')) {
            return 'radix-ui';
          }

          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
            return 'forms';
          }

          // Swiper (heavy component)
          if (id.includes('swiper')) {
            return 'swiper';
          }

          // Intersection Observer and other utilities
          if (id.includes('react-intersection-observer')) {
            return 'utils';
          }

          // Node modules that aren't specifically chunked above
          if (id.includes('node_modules')) {
            return 'vendor';
          }
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
