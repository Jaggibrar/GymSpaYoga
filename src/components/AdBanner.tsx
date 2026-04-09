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
  const [adServed, setAdServed] = useState(false);

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
      // Check multiple times if iframe was injected
      const checkAd = (attempts: number) => {
        if (attempts <= 0) return;
        setTimeout(() => {
          if (containerRef.current?.querySelector('iframe')) {
            setAdServed(true);
          } else {
            checkAd(attempts - 1);
          }
        }, 1000);
      };
      checkAd(5);
    };
    containerRef.current.appendChild(invokeScript);
  }, [adKey, width, height]);

  return (
    <div
      ref={containerRef}
      className={`flex justify-center items-center overflow-hidden transition-all duration-300 ${className}`}
      style={{
        minHeight: adServed ? height : 0,
        maxWidth: '100%',
        opacity: adServed ? 1 : 0,
        maxHeight: adServed ? height + 10 : 0,
      }}
    />
  );
};

export default AdBanner;
