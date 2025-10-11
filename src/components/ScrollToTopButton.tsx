
import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    const shouldShow = scrollTop > 300;
    
    setScrollProgress(progress);
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

  const circumference = 2 * Math.PI * 18; // radius = 18
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      <svg className="absolute inset-0 w-14 h-14 -rotate-90 transform">
        <circle
          cx="28"
          cy="28"
          r="18"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          className="text-muted"
        />
        <circle
          cx="28"
          cy="28"
          r="18"
          stroke="url(#progress-gradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-150"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>
      <Button
        onClick={scrollToTop}
        className="relative w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent hover:scale-110 shadow-strong transition-all duration-300"
        size="icon"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5 text-primary-foreground" />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
