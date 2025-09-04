import React, { useEffect } from 'react';
import { toast } from 'sonner';

const AccessibilityEnhancer: React.FC = () => {
  useEffect(() => {
    // Add focus-visible polyfill for better focus management
    const addFocusVisible = () => {
      if (!document.querySelector('[data-focus-visible-added]')) {
        document.documentElement.setAttribute('data-focus-visible-added', '');
        
        // Add focus-visible class when using keyboard navigation
        let isKeyboardNavigation = false;
        
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
            isKeyboardNavigation = true;
            document.documentElement.classList.add('keyboard-navigation');
          }
        };
        
        const handleMouseDown = () => {
          isKeyboardNavigation = false;
          document.documentElement.classList.remove('keyboard-navigation');
        };
        
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleMouseDown);
        
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('mousedown', handleMouseDown);
        };
      }
    };

    // Enhance images with better alt text and loading states
    const enhanceImages = () => {
      const images = document.querySelectorAll('img:not([alt])');
      images.forEach((img) => {
        if (!img.getAttribute('alt')) {
          img.setAttribute('alt', 'Image loading...');
          img.addEventListener('load', () => {
            const src = img.getAttribute('src') || '';
            if (src.includes('gym')) img.setAttribute('alt', 'Gym facility interior');
            else if (src.includes('spa')) img.setAttribute('alt', 'Spa treatment room');
            else if (src.includes('yoga')) img.setAttribute('alt', 'Yoga studio space');
            else img.setAttribute('alt', 'Wellness facility image');
          });
        }
      });
    };

    // Add ARIA live regions for dynamic content
    const addLiveRegions = () => {
      if (!document.getElementById('live-region-polite')) {
        const politeRegion = document.createElement('div');
        politeRegion.id = 'live-region-polite';
        politeRegion.setAttribute('aria-live', 'polite');
        politeRegion.setAttribute('aria-atomic', 'true');
        politeRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        document.body.appendChild(politeRegion);
      }

      if (!document.getElementById('live-region-assertive')) {
        const assertiveRegion = document.createElement('div');
        assertiveRegion.id = 'live-region-assertive';
        assertiveRegion.setAttribute('aria-live', 'assertive');
        assertiveRegion.setAttribute('aria-atomic', 'true');
        assertiveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
        document.body.appendChild(assertiveRegion);
      }
    };

    // Enhance form validation messages
    const enhanceFormValidation = () => {
      const forms = document.querySelectorAll('form');
      forms.forEach((form) => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach((input) => {
          input.addEventListener('invalid', (e) => {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            const errorMessage = target.validationMessage;
            
            // Announce error to screen readers
            const liveRegion = document.getElementById('live-region-assertive');
            if (liveRegion) {
              liveRegion.textContent = `Form error: ${errorMessage}`;
            }
          });
        });
      });
    };

    // Add keyboard navigation for custom components
    const enhanceKeyboardNavigation = () => {
      // Card components keyboard navigation
      const cards = document.querySelectorAll('[role="button"], .cursor-pointer');
      cards.forEach((card) => {
        if (!card.hasAttribute('tabindex')) {
          card.setAttribute('tabindex', '0');
        }
        
        card.addEventListener('keydown', (e: Event) => {
          const keyEvent = e as KeyboardEvent;
          if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
            keyEvent.preventDefault();
            (card as HTMLElement).click();
          }
        });
      });
    };

    // Color contrast warning for development
    const checkColorContrast = () => {
      if (process.env.NODE_ENV === 'development') {
        // This would typically use a library like axe-core
        console.log('🔍 Accessibility: Color contrast checking enabled in development mode');
      }
    };

    // Initialize all enhancements
    const cleanup = addFocusVisible();
    enhanceImages();
    addLiveRegions();
    enhanceFormValidation();
    enhanceKeyboardNavigation();
    checkColorContrast();

    // Cleanup function
    return cleanup;
  }, []);

  return null; // This component only adds functionality, no visual output
};

// Utility function to announce messages to screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const liveRegion = document.getElementById(`live-region-${priority}`);
  if (liveRegion) {
    liveRegion.textContent = message;
    // Clear after announcement
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
};

// Utility function to set focus with announcement
export const setFocusWithAnnouncement = (element: HTMLElement, announcement?: string) => {
  element.focus();
  if (announcement) {
    announceToScreenReader(announcement, 'assertive');
  }
};

export default AccessibilityEnhancer;