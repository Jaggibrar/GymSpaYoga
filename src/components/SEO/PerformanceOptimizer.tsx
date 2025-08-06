import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PerformanceOptimizer: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Core Web Vitals optimization
    const optimizePerformance = () => {
      // Optimize images
      optimizeImages();
      
      // Add resource hints
      addResourceHints();
      
      // Optimize fonts
      optimizeFonts();
      
      // Implement intersection observer for lazy loading
      implementLazyLoading();
      
      // Add critical CSS
      addCriticalCSS();
      
      // Optimize JavaScript loading
      optimizeJavaScript();
      
      // Service Worker for caching
      registerServiceWorker();
      
      // Preload critical resources
      preloadCriticalResources();
    };

    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Add loading attribute if not present
        if (!img.getAttribute('loading')) {
          // First few images should be eager, rest lazy
          const rect = img.getBoundingClientRect();
          const isAboveFold = rect.top < window.innerHeight;
          img.setAttribute('loading', isAboveFold ? 'eager' : 'lazy');
        }

        // Add decoding attribute
        if (!img.getAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }

        // Optimize image dimensions
        if (!img.width && !img.height && !img.style.width && !img.style.height) {
          img.style.width = 'auto';
          img.style.height = 'auto';
        }

        // Add fetchpriority for hero images
        if (img.classList.contains('hero-image') || img.closest('.hero')) {
          img.setAttribute('fetchpriority', 'high');
        }
      });
    };

    const addResourceHints = () => {
      const head = document.head;
      
      // DNS prefetch for external domains
      const dnsPrefetchDomains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'www.google-analytics.com',
        'www.googletagmanager.com',
        'pihmoaogjjiicfnkmpbe.supabase.co'
      ];

      dnsPrefetchDomains.forEach(domain => {
        if (!document.querySelector(`link[href="//${domain}"]`)) {
          const link = document.createElement('link');
          link.rel = 'dns-prefetch';
          link.href = `//${domain}`;
          head.appendChild(link);
        }
      });

      // Preconnect to critical origins
      const preconnectOrigins = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://pihmoaogjjiicfnkmpbe.supabase.co'
      ];

      preconnectOrigins.forEach(origin => {
        if (!document.querySelector(`link[href="${origin}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = origin;
          if (origin.includes('fonts.gstatic.com')) {
            link.crossOrigin = 'anonymous';
          }
          head.appendChild(link);
        }
      });
    };

    const optimizeFonts = () => {
      // Add font-display swap to improve loading performance
      const style = document.getElementById('font-optimization');
      if (!style) {
        const fontOptimization = document.createElement('style');
        fontOptimization.id = 'font-optimization';
        fontOptimization.textContent = `
          @font-face {
            font-family: 'Inter';
            font-display: swap;
          }
          @font-face {
            font-family: 'Poppins';
            font-display: swap;
          }
        `;
        document.head.appendChild(fontOptimization);
      }
    };

    const implementLazyLoading = () => {
      // Lazy load components that are below the fold
      const lazyElements = document.querySelectorAll('.lazy-load, [data-lazy]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              
              // Load images
              if (element.tagName === 'IMG') {
                const img = element as HTMLImageElement;
                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) {
                  img.src = dataSrc;
                  img.removeAttribute('data-src');
                }
              }
              
              // Load other content
              const dataSrc = element.getAttribute('data-src');
              if (dataSrc) {
                element.setAttribute('src', dataSrc);
                element.removeAttribute('data-src');
              }
              
              element.classList.remove('lazy-load');
              imageObserver.unobserve(element);
            }
          });
        }, {
          rootMargin: '50px'
        });

        lazyElements.forEach(el => imageObserver.observe(el));
      }
    };

    const addCriticalCSS = () => {
      // Inline critical CSS for above-the-fold content
      const criticalCSSId = 'critical-css';
      if (!document.getElementById(criticalCSSId)) {
        const criticalCSS = document.createElement('style');
        criticalCSS.id = criticalCSSId;
        criticalCSS.textContent = `
          /* Critical CSS for above-the-fold content */
          body {
            margin: 0;
            font-family: Inter, system-ui, sans-serif;
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
          }
          
          .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          /* Prevent layout shift */
          img {
            max-width: 100%;
            height: auto;
          }
          
          /* Loading skeleton */
          .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `;
        document.head.appendChild(criticalCSS);
      }
    };

    const optimizeJavaScript = () => {
      // Add loading strategies for non-critical scripts
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        const src = script.getAttribute('src');
        if (src && !script.hasAttribute('async') && !script.hasAttribute('defer')) {
          // Non-critical third-party scripts should be deferred
          if (src.includes('analytics') || src.includes('gtm') || src.includes('facebook')) {
            script.setAttribute('defer', '');
          }
        }
      });
    };

    const registerServiceWorker = () => {
      if ('serviceWorker' in navigator && location.pathname !== '/') {
        // Only register on production builds
        if (import.meta.env.PROD) {
          navigator.serviceWorker.register('/sw.js').catch(() => {
            // Fail silently
          });
        }
      }
    };

    const preloadCriticalResources = () => {
      const currentPath = location.pathname;
      
      // Preload critical resources based on route
      const criticalResources: Record<string, string[]> = {
        '/': ['/api/businesses/featured', '/api/trainers/featured'],
        '/gyms': ['/api/businesses?category=gym'],
        '/spas': ['/api/businesses?category=spa'],
        '/yoga': ['/api/businesses?category=yoga'],
        '/trainers': ['/api/trainers']
      };

      const resources = criticalResources[currentPath];
      if (resources) {
        resources.forEach(resource => {
          if (!document.querySelector(`link[href="${resource}"]`)) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource;
            document.head.appendChild(link);
          }
        });
      }
    };

    // Implement performance monitoring
    const monitorPerformance = () => {
      // Measure Core Web Vitals
      if ('web-vital' in window) {
        // This would typically use the web-vitals library
        // For now, we'll use the Performance API
        
        // Measure Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          // Send to analytics
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'LCP',
              value: lastEntry.startTime,
              event_category: 'Performance'
            });
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Performance monitoring simplified to avoid type conflicts
      }
    };

    // Add viewport meta tag if missing
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1, maximum-scale=5';
      document.head.appendChild(viewport);
    }

    // Run optimizations
    setTimeout(optimizePerformance, 0);
    setTimeout(monitorPerformance, 1000);

  }, [location.pathname]);

  return null;
};

// Performance types are handled globally

export default PerformanceOptimizer;