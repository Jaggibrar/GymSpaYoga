import React, { createContext, useContext, useMemo } from 'react';

interface OptimizerContextType {
  memoizeComponent: <T>(component: T, deps: any[]) => T;
}

const OptimizerContext = createContext<OptimizerContextType | null>(null);

export const useOptimizer = () => {
  const context = useContext(OptimizerContext);
  if (!context) {
    throw new Error('useOptimizer must be used within OptimizerProvider');
  }
  return context;
};

interface OptimizerProviderProps {
  children: React.ReactNode;
}

export const OptimizerProvider: React.FC<OptimizerProviderProps> = ({ children }) => {
  const memoizeComponent = useMemo(() => {
    return <T,>(component: T, deps: any[]): T => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return useMemo(() => component, deps) as T;
    };
  }, []);

  const value = useMemo(() => ({
    memoizeComponent
  }), [memoizeComponent]);

  return (
    <OptimizerContext.Provider value={value}>
      {children}
    </OptimizerContext.Provider>
  );
};