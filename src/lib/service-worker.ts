// PERFORMANCE OPTIMIZED: Service Worker registration and management
// Provides offline support and advanced caching for better performance

export class ServiceWorkerManager {
  private static instance: ServiceWorkerManager;
  private registration: ServiceWorkerRegistration | null = null;

  static getInstance(): ServiceWorkerManager {
    if (!ServiceWorkerManager.instance) {
      ServiceWorkerManager.instance = new ServiceWorkerManager();
    }
    return ServiceWorkerManager.instance;
  }

  // Register service worker
  async register(): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none', // Always check for updates
      });

      console.log('Service Worker registered successfully');

      // Handle updates
      this.registration.addEventListener('updatefound', () => {
        this.handleUpdate();
      });

      // Check for updates periodically
      this.scheduleUpdateCheck();

    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  // Handle service worker updates
  private handleUpdate(): void {
    if (!this.registration) return;

    const newWorker = this.registration.installing;
    if (!newWorker) return;

    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // New version available
        this.showUpdateNotification();
      }
    });
  }

  // Show update notification to user
  private showUpdateNotification(): void {
    // You can customize this notification
    if (confirm('A new version is available. Refresh to update?')) {
      window.location.reload();
    }
  }

  // Schedule periodic update checks
  private scheduleUpdateCheck(): void {
    setInterval(() => {
      if (this.registration) {
        this.registration.update();
      }
    }, 60000); // Check every minute
  }

  // Clean up old caches
  async cleanCache(): Promise<void> {
    if (!this.registration || !this.registration.active) return;

    this.registration.active.postMessage({
      type: 'CLEAN_CACHE'
    });
  }

  // Preload critical resources
  async preloadCriticalResources(urls: string[]): Promise<void> {
    if (!('caches' in window)) return;

    try {
      const cache = await caches.open('critical-resources');
      await cache.addAll(urls);
      console.log('Critical resources preloaded');
    } catch (error) {
      console.error('Failed to preload critical resources:', error);
    }
  }

  // Get cache status
  async getCacheStatus(): Promise<{
    size: number;
    entries: number;
  }> {
    if (!('caches' in window)) {
      return { size: 0, entries: 0 };
    }

    try {
      const cacheNames = await caches.keys();
      let totalSize = 0;
      let totalEntries = 0;

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        totalEntries += requests.length;

        // Estimate size (rough calculation)
        for (const request of requests) {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            totalSize += blob.size;
          }
        }
      }

      return { size: totalSize, entries: totalEntries };
    } catch (error) {
      console.error('Failed to get cache status:', error);
      return { size: 0, entries: 0 };
    }
  }
}

// Cache management utilities
export const cacheUtils = {
  // Preload image with caching
  preloadImage: async (src: string): Promise<void> => {
    if (!('caches' in window)) return;

    try {
      const cache = await caches.open('images');
      const response = await fetch(src);
      if (response.ok) {
        await cache.put(src, response);
      }
    } catch (error) {
      console.error('Failed to preload image:', error);
    }
  },

  // Preload CSS with caching
  preloadCSS: async (href: string): Promise<void> => {
    if (!('caches' in window)) return;

    try {
      const cache = await caches.open('styles');
      const response = await fetch(href);
      if (response.ok) {
        await cache.put(href, response);
      }
    } catch (error) {
      console.error('Failed to preload CSS:', error);
    }
  },

  // Clear specific cache
  clearCache: async (cacheName: string): Promise<void> => {
    if (!('caches' in window)) return;

    try {
      await caches.delete(cacheName);
      console.log(`Cache ${cacheName} cleared`);
    } catch (error) {
      console.error(`Failed to clear cache ${cacheName}:`, error);
    }
  },

  // Get cache size
  getCacheSize: async (cacheName: string): Promise<number> => {
    if (!('caches' in window)) return 0;

    try {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      let size = 0;

      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const blob = await response.blob();
          size += blob.size;
        }
      }

      return size;
    } catch (error) {
      console.error('Failed to get cache size:', error);
      return 0;
    }
  }
};

// HTTP cache headers utility
export const cacheHeaders = {
  // Generate cache headers for different asset types
  getHeaders: (assetType: 'static' | 'dynamic' | 'image' | 'font') => {
    const headers: Record<string, string> = {};

    switch (assetType) {
      case 'static':
        // Static assets (JS, CSS) - cache for 1 year
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
        headers['ETag'] = `"${Date.now()}"`;
        break;

      case 'dynamic':
        // Dynamic content - cache for 5 minutes
        headers['Cache-Control'] = 'public, max-age=300, must-revalidate';
        headers['ETag'] = `"${Date.now()}"`;
        break;

      case 'image':
        // Images - cache for 1 month
        headers['Cache-Control'] = 'public, max-age=2592000';
        headers['ETag'] = `"${Date.now()}"`;
        break;

      case 'font':
        // Fonts - cache for 1 year
        headers['Cache-Control'] = 'public, max-age=31536000, immutable';
        headers['ETag'] = `"${Date.now()}"`;
        break;
    }

    return headers;
  },

  // Check if resource should be cached
  shouldCache: (url: string): boolean => {
    const uncacheablePatterns = [
      /\/api\//,
      /\?nocache/,
      /\/admin\//,
      /\/auth\//,
    ];

    return !uncacheablePatterns.some(pattern => pattern.test(url));
  }
};

// Initialize service worker
export const initServiceWorker = async (): Promise<void> => {
  const swManager = ServiceWorkerManager.getInstance();
  await swManager.register();

  // Preload critical resources
  const criticalResources = [
    '/',
    '/index.html',
    // Add other critical resources
  ];

  await swManager.preloadCriticalResources(criticalResources);

  // Clean cache periodically
  setInterval(() => {
    swManager.cleanCache();
  }, 24 * 60 * 60 * 1000); // Daily cleanup
};

export default ServiceWorkerManager;
