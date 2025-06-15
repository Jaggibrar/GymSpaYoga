
import { useState, useCallback } from 'react';
import { errorTracker } from '@/utils/errorTracking';

interface LoadingState {
  [key: string]: boolean;
}

interface LoadingManager {
  loading: LoadingState;
  setLoading: (key: string, isLoading: boolean) => void;
  isLoading: (key?: string) => boolean;
  withLoading: <T>(key: string, fn: () => Promise<T>) => Promise<T>;
}

export const useLoadingState = (initialState: LoadingState = {}): LoadingManager => {
  const [loading, setLoadingState] = useState<LoadingState>(initialState);
  
  const setLoading = useCallback((key: string, isLoading: boolean) => {
    setLoadingState(prev => ({
      ...prev,
      [key]: isLoading
    }));
  }, []);
  
  const isLoading = useCallback((key?: string) => {
    if (key) {
      return loading[key] || false;
    }
    return Object.values(loading).some(Boolean);
  }, [loading]);
  
  const withLoading = useCallback(async <T,>(key: string, fn: () => Promise<T>): Promise<T> => {
    try {
      setLoading(key, true);
      const result = await fn();
      return result;
    } catch (error) {
      errorTracker.logError(
        error instanceof Error ? error : 'Unknown error',
        'medium',
        { loadingKey: key }
      );
      throw error;
    } finally {
      setLoading(key, false);
    }
  }, [setLoading]);
  
  return {
    loading,
    setLoading,
    isLoading,
    withLoading
  };
};
