import React from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import LoadingSpinner from './LoadingSpinner';

const GlobalLoadingIndicator: React.FC = () => {
  const { isAnyLoading } = useLoading();

  if (!isAnyLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary/10 backdrop-blur-sm">
      <div className="h-1 bg-gradient-to-r from-primary via-primary-foreground to-primary animate-pulse"></div>
      <div className="flex items-center justify-center p-2 bg-background/95 border-b shadow-sm">
        <LoadingSpinner size="sm" text="Loading..." />
      </div>
    </div>
  );
};

export default GlobalLoadingIndicator;