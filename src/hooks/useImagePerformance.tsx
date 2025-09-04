import { useEffect } from 'react';

export const useImagePerformance = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            // Track LCP
            if (window.trackEvent) {
              window.trackEvent('lcp_measured', 'performance', '', Math.round(entry.startTime));
            }
            console.log('🚀 LCP:', Math.round(entry.startTime), 'ms');
          }
          
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            const loadTime = navEntry.loadEventEnd - navEntry.fetchStart;
            
            if (window.trackEvent) {
              window.trackEvent('page_load_time', 'performance', '', Math.round(loadTime));
            }
            console.log('📊 Page Load Time:', Math.round(loadTime), 'ms');
          }
        }
      });

      // Observe LCP and navigation timing
      observer.observe({ entryTypes: ['largest-contentful-paint', 'navigation'] });

      // Also observe images specifically
      const imageObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name.includes('image') || entry.name.includes('.jpg') || entry.name.includes('.png') || entry.name.includes('.webp')) {
            const resourceEntry = entry as PerformanceResourceTiming;
            const loadTime = resourceEntry.responseEnd - resourceEntry.startTime;
            if (loadTime > 500) { // Only track slow images
              if (window.trackEvent) {
                window.trackEvent('slow_image', 'performance', entry.name, Math.round(loadTime));
              }
              console.warn('🐌 Slow image load:', entry.name, Math.round(loadTime), 'ms');
            }
          }
        }
      });

      imageObserver.observe({ entryTypes: ['resource'] });

      return () => {
        observer.disconnect();
        imageObserver.disconnect();
      };
    }
  }, []);
};

export default useImagePerformance;