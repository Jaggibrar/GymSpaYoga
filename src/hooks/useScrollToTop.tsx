
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately on route change
    const scrollToTop = () => {
      try {
        // Try multiple methods to ensure scroll works
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        
        // Fallback for browsers that don't support smooth scrolling
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } catch (error) {
        console.warn('Scroll to top failed:', error);
        // Ultimate fallback
        window.scrollTo(0, 0);
      }
    };

    // Execute immediately
    scrollToTop();

    // Also execute after a small delay to handle any layout shifts
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  // Also scroll to top on component mount (initial page load)
  useEffect(() => {
    const handleInitialLoad = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // Use auto for initial load to be immediate
      });
    };

    handleInitialLoad();
  }, []);
};
