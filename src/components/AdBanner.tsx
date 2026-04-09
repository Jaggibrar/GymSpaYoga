import { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}

const AdBanner = ({ adKey, width, height, className = '' }: AdBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (loadedRef.current || !containerRef.current) return;
    loadedRef.current = true;

    const optionsScript = document.createElement('script');
    optionsScript.textContent = `
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;
    containerRef.current.appendChild(optionsScript);

    const invokeScript = document.createElement('script');
    invokeScript.src = `https://balancedsuppercreed.com/${adKey}/invoke.js`;
    invokeScript.onload = () => {
      // Check if an iframe was injected (ad served)
      setTimeout(() => {
        if (containerRef.current?.querySelector('iframe')) {
          setAdLoaded(true);
        }
      }, 2000);
    };
    containerRef.current.appendChild(invokeScript);
  }, [adKey, width, height]);

  return (
    <div
      ref={containerRef}
      className={`flex justify-center items-center overflow-hidden ${className}`}
      style={{ minHeight: height, maxWidth: '100%' }}
    >
      {!adLoaded && (
        <div
          className="flex items-center justify-center border border-dashed border-primary/30 rounded-lg bg-primary/5 text-muted-foreground text-xs"
          style={{ width, height }}
        >
          <span className="opacity-60">Ad Space • {width}×{height}</span>
        </div>
      )}
    </div>
  );
};

export default AdBanner;
