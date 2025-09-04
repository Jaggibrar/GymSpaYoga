import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = 'empty',
  fallback = '/placeholder.svg',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState('');

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate optimized image source
  useEffect(() => {
    if (!isInView) return;

    const generateOptimizedSrc = (originalSrc: string) => {
      // For Unsplash images, add optimization parameters
      if (originalSrc.includes('unsplash.com')) {
        const url = new URL(originalSrc);
        if (width) url.searchParams.set('w', width.toString());
        if (height) url.searchParams.set('h', height.toString());
        url.searchParams.set('q', quality.toString());
        url.searchParams.set('auto', 'format');
        url.searchParams.set('fit', 'crop');
        return url.toString();
      }

      // For other images, return as-is (could add more optimization services here)
      return originalSrc;
    };

    setCurrentSrc(generateOptimizedSrc(src));
  }, [src, width, height, quality, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
    
    // Track image load performance
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('image_loaded', 'performance', src);
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
    
    // Fallback to placeholder
    if (imgRef.current && fallback) {
      imgRef.current.src = fallback;
    }

    // Track image errors
    if (typeof window !== 'undefined' && window.trackEvent) {
      window.trackEvent('image_error', 'performance', src);
    }
  };

  const baseClasses = `transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`;
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <div className="relative overflow-hidden">
      {placeholder === 'blur' && !isLoaded && (
        <div className={`absolute inset-0 ${className}`}>
          <Skeleton className="w-full h-full" />
        </div>
      )}
      
      <img
        ref={imgRef}
        src={isInView ? currentSrc : ''}
        alt={alt}
        className={combinedClasses}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : 'auto',
          aspectRatio: width && height ? `${width}/${height}` : 'auto'
        }}
      />
      
      {!isLoaded && !hasError && isInView && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} />
      )}
    </div>
  );
};

// WebP support detection hook
export const useWebPSupport = () => {
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      setSupportsWebP(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }, []);

  return supportsWebP;
};

// Performance monitoring for images
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
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      return () => observer.disconnect();
    }
  }, []);
};

export default OptimizedImage;