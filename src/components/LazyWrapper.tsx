import { Suspense, ComponentType } from 'react';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const DefaultFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

export const LazyWrapper = ({ children, fallback = <DefaultFallback /> }: LazyWrapperProps) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

// Higher-order component for lazy loading
export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>,
  fallback?: React.ReactNode
) => {
  return (props: P) => (
    <LazyWrapper fallback={fallback}>
      <Component {...props} />
    </LazyWrapper>
  );
};

export default LazyWrapper;
