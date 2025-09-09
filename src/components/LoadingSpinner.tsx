import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
      aria-label="Loading"
    />
  );
};

export const LoadingCard: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <div className="flex items-center gap-2 text-muted-foreground">
      <LoadingSpinner />
      <span>Loading...</span>
    </div>
  </div>
);

export const LoadingPage: React.FC = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-4 text-muted-foreground">
      <LoadingSpinner size="lg" />
      <span className="text-lg">Loading page...</span>
    </div>
  </div>
);