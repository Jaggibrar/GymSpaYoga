
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  webpSrc?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc,
  webpSrc,
  priority = false,
  sizes,
  quality = 80,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inView, setInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate optimized URLs
  const getOptimizedUrl = (originalSrc: string, w?: number, h?: number, q = quality) => {
    if (originalSrc.includes('unsplash.com')) {
      let url = originalSrc;
      if (w && h) {
        url += `&w=${w}&h=${h}`;
      } else if (w) {
        url += `&w=${w}`;
      }
      url += `&q=${q}&auto=format`;
      return url;
    }
    return originalSrc;
  };

  const optimizedSrc = getOptimizedUrl(src, width, height);
  const optimizedWebpSrc = webpSrc ? getOptimizedUrl(webpSrc, width, height) : undefined;
  const currentFallback = fallbackSrc || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Placeholder while loading
  const placeholder = (
    <div 
      className={cn(
        "bg-gray-200 animate-pulse flex items-center justify-center",
        className
      )}
      style={{ width, height }}
      aria-label="Loading image..."
    >
      <svg 
        className="w-8 h-8 text-gray-400" 
        fill="currentColor" 
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path 
          fillRule="evenodd" 
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
          clipRule="evenodd" 
        />
      </svg>
    </div>
  );

  if (!inView) {
    return <div ref={imgRef}>{placeholder}</div>;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!isLoaded && placeholder}
      
      <picture>
        {optimizedWebpSrc && (
          <source 
            srcSet={optimizedWebpSrc} 
            type="image/webp"
            sizes={sizes}
          />
        )}
        <img
          ref={imgRef}
          src={hasError ? currentFallback : optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "transition-opacity duration-300 w-full h-full object-cover",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          sizes={sizes}
          {...props}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
