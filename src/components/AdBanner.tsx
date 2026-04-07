import { useEffect, useRef } from 'react';

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}

const AdBanner = ({ adKey, width, height, className = '' }: AdBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

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
    containerRef.current.appendChild(invokeScript);
  }, [adKey, width, height]);

  return (
    <div
      ref={containerRef}
      className={`flex justify-center items-center overflow-hidden ${className}`}
      style={{ minHeight: height, maxWidth: '100%' }}
    />
  );
};

export default AdBanner;
