import React, { createContext, useContext, useState, useCallback } from 'react';

interface LoadingState {
  [key: string]: boolean;
}

interface LoadingContextType {
  loadingStates: LoadingState;
  setLoading: (key: string, loading: boolean) => void;
  isAnyLoading: boolean;
  isLoading: (key?: string) => boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => {
      if (prev[key] === loading) return prev; // Prevent unnecessary re-renders
      
      const newState = { ...prev };
      if (loading) {
        newState[key] = true;
      } else {
        delete newState[key];
      }
      return newState;
    });
  }, []);

  const isLoading = useCallback((key?: string) => {
    if (key) return loadingStates[key] || false;
    return Object.keys(loadingStates).length > 0;
  }, [loadingStates]);

  const isAnyLoading = Object.keys(loadingStates).length > 0;

  return (
    <LoadingContext.Provider value={{ loadingStates, setLoading, isAnyLoading, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};