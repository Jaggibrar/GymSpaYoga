import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const StickyMobileAd = () => {
  const isMobile = useIsMobile();
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  // Show after 3 seconds of scrolling
  useEffect(() => {
    if (!isMobile || dismissed) return;
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, [isMobile, dismissed]);

  // Inject ad script
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
    containerRef.current.appendChild(invokeScript);
  }, [visible]);

  if (!isMobile || dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg safe-area-bottom">
      <div className="relative flex justify-center items-center py-1">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-1 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
          aria-label="Close ad"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
        <div ref={containerRef} className="flex justify-center items-center" style={{ minHeight: 50, maxWidth: 320 }}>
          <div className="flex items-center justify-center text-muted-foreground text-[10px] opacity-50" style={{ width: 320, height: 50 }}>
            Ad
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileAd;
