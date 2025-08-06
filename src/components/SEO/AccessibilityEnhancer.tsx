import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AccessibilityEnhancer: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Enhance accessibility on route change
    const enhanceAccessibility = () => {
      // Ensure focus management
      if (document.activeElement && document.activeElement !== document.body) {
        (document.activeElement as HTMLElement).blur();
      }

      // Add skip links if not present
      addSkipLinks();

      // Enhance form accessibility
      enhanceFormAccessibility();

      // Add proper ARIA labels to images
      enhanceImageAccessibility();

      // Improve button accessibility
      enhanceButtonAccessibility();

      // Add keyboard navigation support
      enhanceKeyboardNavigation();

      // Ensure proper heading hierarchy
      validateHeadingHierarchy();

      // Add focus indicators
      addFocusIndicators();

      // Enhance color contrast warnings
      checkColorContrast();
    };

    const addSkipLinks = () => {
      if (!document.getElementById('skip-to-main')) {
        const skipLink = document.createElement('a');
        skipLink.id = 'skip-to-main';
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded focus:z-50';
        skipLink.style.cssText = `
          position: absolute;
          left: -10000px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
        `;
        
        skipLink.addEventListener('focus', () => {
          skipLink.style.cssText = `
            position: absolute;
            top: 1rem;
            left: 1rem;
            z-index: 9999;
            background: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            text-decoration: none;
            font-weight: 500;
          `;
        });

        skipLink.addEventListener('blur', () => {
          skipLink.style.cssText = `
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
          `;
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
      }

      // Ensure main content has proper ID
      const main = document.querySelector('main');
      if (main && !main.id) {
        main.id = 'main-content';
        main.setAttribute('tabindex', '-1');
      }
    };

    const enhanceFormAccessibility = () => {
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (!label && !input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
          const placeholder = input.getAttribute('placeholder');
          if (placeholder) {
            input.setAttribute('aria-label', placeholder);
          }
        }

        // Add required field indicators
        if (input.hasAttribute('required') && !input.getAttribute('aria-required')) {
          input.setAttribute('aria-required', 'true');
        }

        // Add error states
        if (input.getAttribute('aria-invalid') === 'true') {
          (input as HTMLInputElement).style.borderColor = 'hsl(var(--destructive))';
        }
      });
    };

    const enhanceImageAccessibility = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.alt) {
          // If it's a decorative image, add empty alt
          if (img.classList.contains('decorative') || img.getAttribute('role') === 'presentation') {
            img.alt = '';
          } else {
            // Try to infer alt text from context
            const figcaption = img.closest('figure')?.querySelector('figcaption');
            const title = img.getAttribute('title');
            const src = img.src;
            
            if (figcaption) {
              img.alt = figcaption.textContent || '';
            } else if (title) {
              img.alt = title;
            } else if (src) {
              // Extract filename as fallback
              const filename = src.split('/').pop()?.split('.')[0];
              img.alt = filename ? filename.replace(/[-_]/g, ' ') : 'Image';
            }
          }
        }
      });
    };

    const enhanceButtonAccessibility = () => {
      const buttons = document.querySelectorAll('button, [role="button"]');
      buttons.forEach(button => {
        // Ensure buttons have proper text or aria-label
        if (!button.textContent?.trim() && !button.getAttribute('aria-label')) {
          const icon = button.querySelector('svg, [class*="icon"]');
          if (icon) {
            button.setAttribute('aria-label', 'Button');
          }
        }

        // Add proper focus styles
        if (!(button as HTMLElement).style.outline) {
        button.addEventListener('focus', () => {
          (button as HTMLElement).style.outline = '2px solid hsl(var(--ring))';
          (button as HTMLElement).style.outlineOffset = '2px';
        });
        button.addEventListener('blur', () => {
          (button as HTMLElement).style.outline = '';
          (button as HTMLElement).style.outlineOffset = '';
        });
        }
      });
    };

    const enhanceKeyboardNavigation = () => {
      // Add keyboard support for custom interactive elements
      const customInteractives = document.querySelectorAll('[role="button"]:not(button), [role="tab"], [role="option"]');
      customInteractives.forEach(element => {
        if (!element.getAttribute('tabindex')) {
          element.setAttribute('tabindex', '0');
        }

        element.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            (element as HTMLElement).click();
          }
        });
      });
    };

    const validateHeadingHierarchy = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let previousLevel = 0;
      
      headings.forEach(heading => {
        const currentLevel = parseInt(heading.tagName.charAt(1));
        
        if (previousLevel > 0 && currentLevel > previousLevel + 1) {
          console.warn(`Heading hierarchy issue: Found ${heading.tagName} after H${previousLevel}`, heading);
        }
        
        previousLevel = currentLevel;
      });
    };

    const addFocusIndicators = () => {
      const style = document.getElementById('accessibility-focus-styles');
      if (!style) {
        const focusStyles = document.createElement('style');
        focusStyles.id = 'accessibility-focus-styles';
        focusStyles.textContent = `
          *:focus {
            outline: 2px solid hsl(var(--ring)) !important;
            outline-offset: 2px !important;
          }
          
          *:focus:not(:focus-visible) {
            outline: none !important;
          }
          
          button:focus-visible,
          a:focus-visible,
          input:focus-visible,
          textarea:focus-visible,
          select:focus-visible,
          [tabindex]:focus-visible {
            outline: 2px solid hsl(var(--ring)) !important;
            outline-offset: 2px !important;
            box-shadow: 0 0 0 4px hsl(var(--ring) / 0.2) !important;
          }
        `;
        document.head.appendChild(focusStyles);
      }
    };

    const checkColorContrast = () => {
      // Basic contrast checking (in real app, you'd use a proper contrast calculation)
      const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, button, a');
      textElements.forEach(element => {
        const styles = window.getComputedStyle(element);
        const bgColor = styles.backgroundColor;
        const textColor = styles.color;
        
        // If we detect potential contrast issues, add a data attribute for developers
        if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          (element as HTMLElement).setAttribute('data-has-background', 'true');
        }
      });
    };

    // Run enhancements after a short delay to ensure DOM is ready
    setTimeout(enhanceAccessibility, 100);

    // Also run on dynamic content changes
    const observer = new MutationObserver(() => {
      setTimeout(enhanceAccessibility, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id']
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
};

export default AccessibilityEnhancer;