import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AccessibilityEnhancer: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Lightweight accessibility enhancements
    const enhanceAccessibility = () => {
      try {
        addSkipLinks();
        addFocusIndicators();
      } catch (error) {
        console.warn('Accessibility enhancement error:', error);
      }
    };

    const addSkipLinks = () => {
      if (!document.getElementById('skip-to-main')) {
        const skipLink = document.createElement('a');
        skipLink.id = 'skip-to-main';
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'fixed -top-40 left-6 z-50 px-4 py-2 bg-primary text-primary-foreground rounded focus:top-6';
        document.body.insertBefore(skipLink, document.body.firstChild);
      }

      const main = document.querySelector('main');
      if (main && !main.id) {
        main.id = 'main-content';
        main.setAttribute('tabindex', '-1');
      }
    };

    const addFocusIndicators = () => {
      const style = document.getElementById('accessibility-focus-styles');
      if (!style) {
        const focusStyles = document.createElement('style');
        focusStyles.id = 'accessibility-focus-styles';
        focusStyles.textContent = `
          *:focus-visible {
            outline: 2px solid hsl(var(--ring)) !important;
            outline-offset: 2px !important;
          }
        `;
        document.head.appendChild(focusStyles);
      }
    };

    enhanceAccessibility();
  }, [location.pathname]);

  return null;
};

export default AccessibilityEnhancer;