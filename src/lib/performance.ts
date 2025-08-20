// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Measure LCP (Largest Contentful Paint)
  measureLCP(): void {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.set('LCP', lastEntry.startTime);
      console.log('LCP:', lastEntry.startTime);
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  // Measure FID (First Input Delay)
  measureFID(): void {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        this.metrics.set('FID', entry.processingStart - entry.startTime);
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
  }

  // Measure CLS (Cumulative Layout Shift)
  measureCLS(): void {
    if (typeof window === 'undefined') return;

    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.metrics.set('CLS', clsValue);
      console.log('CLS:', clsValue);
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  }

  // Measure TTFB (Time to First Byte)
  measureTTFB(): void {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.name === window.location.href) {
          this.metrics.set('TTFB', entry.responseStart - entry.requestStart);
          console.log('TTFB:', entry.responseStart - entry.requestStart);
        }
      });
    });

    observer.observe({ entryTypes: ['navigation'] });
  }

  // Measure component render time
  measureComponentRender(componentName: string, startTime: number): void {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    this.metrics.set(`${componentName}_render`, renderTime);
    console.log(`${componentName} render time:`, renderTime);
  }

  // Get all metrics
  getMetrics(): Map<string, number> {
    return this.metrics;
  }

  // Initialize all measurements
  init(): void {
    this.measureLCP();
    this.measureFID();
    this.measureCLS();
    this.measureTTFB();
  }
}

// Hook for measuring component performance
export const usePerformanceMonitor = (componentName: string) => {
  const startTime = performance.now();
  
  return {
    measureRender: () => {
      PerformanceMonitor.getInstance().measureComponentRender(componentName, startTime);
    }
  };
};

// Utility to measure bundle size impact
export const measureBundleSize = () => {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    let totalSize = 0;
    
    entries.forEach((entry: any) => {
      if (entry.name.includes('.js') || entry.name.includes('.css')) {
        totalSize += entry.transferSize || 0;
      }
    });
    
    console.log('Total bundle size:', totalSize, 'bytes');
  });

  observer.observe({ entryTypes: ['resource'] });
};
