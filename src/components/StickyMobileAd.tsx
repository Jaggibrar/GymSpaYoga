import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const StickyMobileAd = () => {
  const isMobile = useIsMobile();
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [adServed, setAdServed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!isMobile || dismissed) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [isMobile, dismissed]);

  useEffect(() => {
    if (!visible || loadedRef.current || !containerRef.current) return;
    loadedRef.current = true;

    const optionsScript = document.createElement('script');
    optionsScript.textContent = `
      atOptions = {
        'key' : '01ab4e84bcc205e5cb18cdecfd4d9409',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;
    containerRef.current.appendChild(optionsScript);

    const invokeScript = document.createElement('script');
    invokeScript.src = 'https://balancedsuppercreed.com/01ab4e84bcc205e5cb18cdecfd4d9409/invoke.js';
    invokeScript.onload = () => {
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
  }, [visible]);

  if (!isMobile || dismissed || !visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg safe-area-bottom transition-all duration-300"
      style={{
        transform: adServed ? 'translateY(0)' : 'translateY(100%)',
        opacity: adServed ? 1 : 0,
      }}
    >
      <div className="relative flex justify-center items-center py-1">
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-8 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-foreground/80 hover:bg-foreground transition-colors"
          aria-label="Close ad"
        >
          <X className="h-3.5 w-3.5 text-background" />
        </button>
        <div ref={containerRef} className="flex justify-center items-center" style={{ minHeight: 50, maxWidth: 320 }} />
      </div>
    </div>
  );
};

export default StickyMobileAd;
