
import { useState, useEffect, useCallback } from 'react';

interface UseLoadingTimeoutOptions {
  timeout?: number;
  onTimeout?: () => void;
  retryAttempts?: number;
}

export const useLoadingTimeout = (options: UseLoadingTimeoutOptions = {}) => {
  const { timeout = 15000, onTimeout, retryAttempts = 3 } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const executeWithTimeout = useCallback(async <T>(
    operation: () => Promise<T>,
    operationName = 'Operation'
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`${operationName} timed out after ${timeout}ms`));
        }, timeout);
      });

      const result = await Promise.race([operation(), timeoutPromise]);
      setLoading(false);
      setRetryCount(0);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`${operationName} failed:`, errorMessage);
      
      if (retryCount < retryAttempts) {
        console.log(`Retrying ${operationName} (attempt ${retryCount + 1}/${retryAttempts})`);
        setRetryCount(prev => prev + 1);
        
        // Exponential backoff
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return executeWithTimeout(operation, operationName);
      }
      
      setError(errorMessage);
      setLoading(false);
      onTimeout?.();
      return null;
    }
  }, [timeout, onTimeout, retryAttempts, retryCount]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setRetryCount(0);
  }, []);

  return { executeWithTimeout, loading, error, retryCount, reset };
};
