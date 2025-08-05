import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const preloadLink1 = document.createElement('link');
      preloadLink1.rel = 'preload';
      preloadLink1.href = '/fonts/inter-var.woff2';
      preloadLink1.as = 'font';
      preloadLink1.type = 'font/woff2';
      preloadLink1.crossOrigin = 'anonymous';
      document.head.appendChild(preloadLink1);

      // Preload hero images
      const heroImages = [
        '/hero-gym.webp',
        '/hero-spa.webp', 
        '/hero-yoga.webp'
      ];

      heroImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    // Lazy load non-critical CSS
    const loadNonCriticalCSS = () => {
      const nonCriticalCSS = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
      ];

      nonCriticalCSS.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        link.onload = function() {
          (this as HTMLLinkElement).media = 'all';
        };
        document.head.appendChild(link);
      });
    };

    // Initialize performance optimizations
    preloadCriticalResources();
    loadNonCriticalCSS();

    // Service Worker for caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Resource hints for external domains
    const resourceHints = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
      { rel: 'dns-prefetch', href: '//www.googletagmanager.com' },
      { rel: 'preconnect', href: 'https://pihmoaogjjiicfnkmpbe.supabase.co' }
    ];

    resourceHints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.rel === 'preconnect') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });

  }, []);

  return (
    <Helmet>
      {/* Critical CSS inlined for above-the-fold content */}
      <style>
        {`
          /* Critical path CSS */
          body { font-family: system-ui, -apple-system, sans-serif; }
          .hero-section { min-height: 100vh; display: flex; align-items: center; }
          .loading-spinner { animation: spin 1s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
          
          /* Optimize font loading */
          @font-face {
            font-family: 'Inter';
            src: url('/fonts/inter-var.woff2') format('woff2');
            font-weight: 100 900;
            font-display: swap;
          }
        `}
      </style>

      {/* Preload critical assets */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/hero-gym.webp" as="image" />
      
      {/* Prefetch likely next pages */}
      <link rel="prefetch" href="/gyms" />
      <link rel="prefetch" href="/spas" />
      <link rel="prefetch" href="/yoga" />
      <link rel="prefetch" href="/trainers" />
      
      {/* Resource hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Optimize images */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-tap-highlight" content="no" />
      
      {/* PWA optimizations */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Optimize loading */}
      <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
    </Helmet>
  );
};