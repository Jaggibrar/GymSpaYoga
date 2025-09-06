import React, { useEffect } from 'react';

interface PerformanceWrapperProps {
  children: React.ReactNode;
}

const PerformanceWrapper: React.FC<PerformanceWrapperProps> = ({ children }) => {
  useEffect(() => {
    // Optimize initial page load
    const optimizeInitialLoad = () => {
      // Preload critical resources
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = '/assets/index.css';
      document.head.appendChild(link);

      // Remove unused CSS classes after initial render
      setTimeout(() => {
        const unusedClasses = document.querySelectorAll('.animate-pulse');
        unusedClasses.forEach(el => el.classList.remove('animate-pulse'));
      }, 2000);

      // Add performance observer for loading time
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming;
              console.log('Page load time:', navEntry.loadEventEnd - navEntry.loadEventStart);
            }
          });
        });
        
        try {
          observer.observe({ entryTypes: ['navigation'] });
        } catch (e) {
          // Fallback for browsers that don't support this
        }
      }
    };

    optimizeInitialLoad();
  }, []);

  return <>{children}</>;
};

export default PerformanceWrapper;