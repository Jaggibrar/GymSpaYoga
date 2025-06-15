
import { useState } from 'react';

export const useLoadingState = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setLoading = (key: string, loading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [key]: loading }));
  };

  const isLoading = (key?: string) => {
    if (key) return loadingStates[key] || false;
    return Object.values(loadingStates).some(Boolean);
  };

  const withLoading = async <T,>(key: string, fn: () => Promise<T>): Promise<T> => {
    setLoading(key, true);
    try {
      return await fn();
    } finally {
      setLoading(key, false);
    }
  };

  return { setLoading, isLoading, withLoading };
};
