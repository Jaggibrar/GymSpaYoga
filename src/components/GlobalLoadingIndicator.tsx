import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const GlobalLoadingIndicator: React.FC = () => {
  const { loading } = useAuth();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="sm" text="Loading..." />
      </div>
    </div>
  );
};

export default GlobalLoadingIndicator;