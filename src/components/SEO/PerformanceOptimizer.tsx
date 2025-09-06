import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PerformanceOptimizer: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Only run optimizations once per session to avoid performance issues
    const hasOptimized = sessionStorage.getItem('performance-optimized');
    if (hasOptimized) return;

    const optimizePerformance = () => {
      try {
        // Lightweight optimizations only
        optimizeImages();
        addResourceHints();
        
        // Mark as optimized
        sessionStorage.setItem('performance-optimized', 'true');
      } catch (error) {
        console.warn('Performance optimization error:', error);
      }
    };

    const optimizeImages = () => {
      const images = document.querySelectorAll('img:not([data-optimized])');
      images.forEach(img => {
        img.setAttribute('data-optimized', 'true');
        if (!img.getAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.getAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });
    };

    const addResourceHints = () => {
      const head = document.head;
      const dnsPrefetchDomains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com'
      ];

      dnsPrefetchDomains.forEach(domain => {
        if (!document.querySelector(`link[href="//${domain}"]`)) {
          const link = document.createElement('link');
          link.rel = 'dns-prefetch';
          link.href = `//${domain}`;
          head.appendChild(link);
        }
      });
    };

    // Run once with a small delay
    setTimeout(optimizePerformance, 100);

  }, []); // Only run once on mount

  return null;
};

// Performance types are handled globally

export default PerformanceOptimizer;