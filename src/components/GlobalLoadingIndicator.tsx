import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const GlobalLoadingIndicator: React.FC = () => {
  const { loading } = useAuth();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center opacity-100">
      <div className="text-center">
        <LoadingSpinner size="sm" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoadingIndicator;