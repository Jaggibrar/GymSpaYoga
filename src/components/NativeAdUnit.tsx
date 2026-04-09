import { useEffect, useRef, useState } from 'react';

/**
 * Native in-content ad unit — blends with content, high CTR.
 * Collapses to zero height if ad doesn't serve.
 */
const NativeAdUnit = ({ className = '' }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const [adServed, setAdServed] = useState(false);

  useEffect(() => {
    if (loadedRef.current || !containerRef.current) return;
    loadedRef.current = true;

    // 300x250 rectangle — highest CTR format for in-content
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://balancedsuppercreed.com/63ea8901ac9107699d7a29bf13c19e92/invoke.js';
    containerRef.current.appendChild(script);

    const container = document.createElement('div');
    container.id = 'container-63ea8901ac9107699d7a29bf13c19e92';
    containerRef.current.appendChild(container);

    script.onload = () => {
      const checkAd = (attempts: number) => {
        if (attempts <= 0) return;
        setTimeout(() => {
          if (containerRef.current?.querySelector('iframe') || containerRef.current?.querySelector('[id^="container-"] > *')) {
            setAdServed(true);
          } else {
            checkAd(attempts - 1);
          }
        }, 1000);
      };
      checkAd(5);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex justify-center items-center overflow-hidden transition-all duration-500 ${className}`}
      style={{
        minHeight: adServed ? 250 : 0,
        opacity: adServed ? 1 : 0,
        maxHeight: adServed ? 260 : 0,
      }}
    />
  );
};

export default NativeAdUnit;
