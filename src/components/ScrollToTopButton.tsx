
import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const shouldShow = scrollTop > 300;
    
    if (isVisible !== shouldShow) {
      setIsVisible(shouldShow);
    }
  }, [isVisible]);

  useEffect(() => {
    // Throttled scroll handler to improve performance
    let timeoutId: NodeJS.Timeout;
    
    const throttledScrollHandler = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(handleScroll, 16); // ~60fps
    };

    // Add scroll listener
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    try {
      // Multiple scroll methods for maximum compatibility
      const scrollOptions = {
        top: 0,
        left: 0,
        behavior: 'smooth' as ScrollBehavior
      };

      // Primary method
      window.scrollTo(scrollOptions);
      
      // Backup methods for older browsers
      if (document.documentElement.scrollTop > 0) {
        document.documentElement.scrollTo(scrollOptions);
      }
      
      if (document.body.scrollTop > 0) {
        document.body.scrollTo(scrollOptions);
      }
      
    } catch (error) {
      console.warn('Smooth scroll failed, using fallback:', error);
      // Fallback to instant scroll
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-bounce"
      size="icon"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-6 w-6 text-white animate-pulse" />
    </Button>
  );
};

export default ScrollToTopButton;
