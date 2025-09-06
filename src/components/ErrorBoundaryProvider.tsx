import React from 'react';
import ErrorBoundary from './ErrorBoundary';

interface ErrorBoundaryProviderProps {
  children: React.ReactNode;
  name?: string;
}

export const ErrorBoundaryProvider: React.FC<ErrorBoundaryProviderProps> = ({ 
  children, 
  name = "Component" 
}) => {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryProvider;