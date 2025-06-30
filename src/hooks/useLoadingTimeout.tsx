
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseLoadingTimeoutOptions {
  timeout?: number;
  onTimeout?: () => void;
  retryAttempts?: number;
  retryDelay?: number;
}

export const useLoadingTimeout = (options: UseLoadingTimeoutOptions = {}) => {
  const { 
    timeout = 15000, 
    onTimeout, 
    retryAttempts = 3,
    retryDelay = 1000 
  } = options;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const executeWithTimeout = useCallback(async <T,>(
    operation: (signal?: AbortSignal) => Promise<T>,
    operationName = 'Operation'
  ): Promise<T | null> => {
    // Cleanup any existing operation
    cleanup();
    
    setLoading(true);
    setError(null);

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutRef.current = setTimeout(() => {
          reject(new Error(`${operationName} timed out after ${timeout}ms`));
        }, timeout);
      });

      // Race between operation and timeout
      const result = await Promise.race([
        operation(signal),
        timeoutPromise
      ]);

      // Success - cleanup and return result
      cleanup();
      setLoading(false);
      setRetryCount(0);
      return result;
      
    } catch (err) {
      cleanup();
      
      // Handle abort
      if (signal.aborted) {
        console.log(`${operationName} was aborted`);
        setLoading(false);
        return null;
      }

      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`${operationName} failed:`, errorMessage);
      
      // Retry logic
      if (retryCount < retryAttempts && !errorMessage.includes('aborted')) {
        console.log(`Retrying ${operationName} (attempt ${retryCount + 1}/${retryAttempts})`);
        setRetryCount(prev => prev + 1);
        
        // Exponential backoff with jitter
        const delay = retryDelay * Math.pow(2, retryCount) + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Retry if not aborted
        if (!signal.aborted) {
          return executeWithTimeout(operation, operationName);
        }
      }
      
      // Final failure
      setError(errorMessage);
      setLoading(false);
      onTimeout?.();
      return null;
    }
  }, [timeout, onTimeout, retryAttempts, retryDelay, retryCount, cleanup]);

  const reset = useCallback(() => {
    cleanup();
    setLoading(false);
    setError(null);
    setRetryCount(0);
  }, [cleanup]);

  const abort = useCallback(() => {
    cleanup();
    setLoading(false);
    setError('Operation cancelled');
  }, [cleanup]);

  return { 
    executeWithTimeout, 
    loading, 
    error, 
    retryCount, 
    reset,
    abort
  };
};
