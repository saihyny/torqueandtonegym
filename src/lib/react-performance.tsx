// PERFORMANCE OPTIMIZED: React performance utilities and patterns
// Provides memoization, lazy loading, and render optimization utilities
// Reduces unnecessary re-renders and improves component performance

import React, { 
  memo, 
  useMemo, 
  useCallback, 
  useState, 
  useEffect, 
  useRef,
  Suspense,
  ComponentType,
  ReactNode,
  PropsWithChildren
} from 'react';

// ============================================================================
// MEMOIZATION UTILITIES
// ============================================================================

// Enhanced memo with deep comparison for complex props
export const deepMemo = <T extends object,>(
  Component: ComponentType<T>,
  areEqual?: (prevProps: T, nextProps: T) => boolean
) => {
  return memo(Component, areEqual || ((prevProps, nextProps) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  }));
};

// Memo for components that only re-render on specific prop changes
export const selectiveMemo = <T extends object,>(
  Component: ComponentType<T>,
  watchProps: (keyof T)[]
) => {
  return memo(Component, (prevProps, nextProps) => {
    return watchProps.every(prop => prevProps[prop] === nextProps[prop]);
  });
};

// ============================================================================
// PERFORMANCE HOOKS
// ============================================================================

// Optimized state hook that prevents unnecessary re-renders
export const useOptimizedState = <T,>(initialValue: T) => {
  const [state, setState] = useState(initialValue);

  const setOptimizedState = useCallback((newValue: T | ((prev: T) => T)) => {
    setState(prev => {
      const nextValue = typeof newValue === 'function'
        ? (newValue as (prev: T) => T)(prev)
        : newValue;

      // Only update if value actually changed
      return Object.is(prev, nextValue) ? prev : nextValue;
    });
  }, []);

  return [state, setOptimizedState] as const;
};

// Debounced state hook for performance-critical inputs
export const useDebouncedState = <T,>(initialValue: T, delay: number = 300) => {
  const [state, setState] = useState(initialValue);
  const [debouncedState, setDebouncedState] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedState(state);
    }, delay);

    return () => clearTimeout(timer);
  }, [state, delay]);

  return [debouncedState, setState] as const;
};

// Memoized callback with dependency optimization
export const useOptimizedCallback = <T extends (...args: any[]) => any,>(
  callback: T,
  deps: React.DependencyList
): T => {
  const memoizedCallback = useCallback(callback, deps);
  
  // Additional optimization: only recreate if dependencies actually changed
  const prevDepsRef = useRef<React.DependencyList>();
  const callbackRef = useRef<T>(memoizedCallback);
  
  const depsChanged = !prevDepsRef.current || 
    deps.some((dep, index) => !Object.is(dep, prevDepsRef.current![index]));
  
  if (depsChanged) {
    prevDepsRef.current = deps;
    callbackRef.current = memoizedCallback;
  }
  
  return callbackRef.current;
};

// Optimized effect hook that skips unnecessary runs
export const useOptimizedEffect = (
  effect: React.EffectCallback,
  deps: React.DependencyList
) => {
  const prevDepsRef = useRef<React.DependencyList>();
  
  useEffect(() => {
    const depsChanged = !prevDepsRef.current || 
      deps.some((dep, index) => !Object.is(dep, prevDepsRef.current![index]));
    
    if (depsChanged) {
      prevDepsRef.current = deps;
      return effect();
    }
  }, deps);
};

// ============================================================================
// LAZY LOADING COMPONENTS
// ============================================================================

interface LazyComponentProps {
  fallback?: ReactNode;
  delay?: number;
  children: ReactNode;
}

// Enhanced lazy wrapper with loading states
export const LazyComponent: React.FC<LazyComponentProps> = ({ 
  fallback = <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />, 
  delay = 0,
  children 
}) => {
  const [showContent, setShowContent] = useState(delay === 0);
  
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setShowContent(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);
  
  if (!showContent) {
    return <>{fallback}</>;
  }
  
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

// Intersection observer based lazy loading
export const useIntersectionLazy = (options?: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      { threshold: 0.1, ...options }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [hasIntersected, options]);
  
  return { ref, isIntersecting, hasIntersected };
};

// ============================================================================
// RENDER OPTIMIZATION COMPONENTS
// ============================================================================

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  overscan?: number;
}

// Simple virtualized list for performance
export const VirtualizedList = <T,>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5
}: VirtualizedListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight),
    items.length - 1
  );
  
  const startIndex = Math.max(0, visibleStart - overscan);
  const endIndex = Math.min(items.length - 1, visibleEnd + overscan);
  
  const visibleItems = items.slice(startIndex, endIndex + 1);
  
  const handleScroll = useOptimizedCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);
  
  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              height: itemHeight,
              width: '100%',
            }}
          >
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

// Hook to measure component render performance
export const useRenderPerformance = (componentName: string) => {
  const renderStartTime = useRef<number>();
  const renderCount = useRef(0);
  
  // Mark render start
  renderStartTime.current = performance.now();
  renderCount.current += 1;
  
  useEffect(() => {
    if (renderStartTime.current) {
      const renderTime = performance.now() - renderStartTime.current;
      
      if (renderTime > 16) { // Longer than one frame (60fps)
        console.warn(
          `Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms (render #${renderCount.current})`
        );
      }
    }
  });
  
  return { renderCount: renderCount.current };
};

// Component wrapper for performance monitoring
export const withPerformanceMonitoring = <P extends object,>(
  Component: ComponentType<P>,
  componentName?: string
) => {
  const WrappedComponent = (props: P) => {
    const name = componentName || Component.displayName || Component.name || 'Unknown';
    useRenderPerformance(name);
    
    return <Component {...props} />;
  };
  
  WrappedComponent.displayName = `withPerformanceMonitoring(${componentName || Component.displayName || Component.name})`;
  
  return memo(WrappedComponent);
};

// ============================================================================
// ERROR BOUNDARIES
// ============================================================================

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback?: (error: Error) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback?.(this.state.error) || (
        <div className="p-4 border border-red-500 rounded bg-red-50">
          <h2 className="text-red-800 font-bold">Something went wrong</h2>
          <p className="text-red-600">{this.state.error.message}</p>
        </div>
      );
    }
    
    return this.props.children;
  }
}

export default {
  deepMemo,
  selectiveMemo,
  useOptimizedState,
  useDebouncedState,
  useOptimizedCallback,
  useOptimizedEffect,
  LazyComponent,
  useIntersectionLazy,
  VirtualizedList,
  useRenderPerformance,
  withPerformanceMonitoring,
  ErrorBoundary
};
