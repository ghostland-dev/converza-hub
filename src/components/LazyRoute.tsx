import React, { Suspense } from 'react';
import { LoadingPage } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface LazyRouteProps {
  children: React.ReactNode;
}

export const LazyRoute: React.FC<LazyRouteProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

// Higher-order component for lazy loading routes
export function withLazyLoading<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ComponentType
) {
  return function LazyLoadedComponent(props: T) {
    const FallbackComponent = fallback || LoadingPage;
    
    return (
      <ErrorBoundary>
        <Suspense fallback={<FallbackComponent />}>
          <Component {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}