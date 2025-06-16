
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Keyboard, Volume2, MousePointer, Check, X } from 'lucide-react';

interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info';
  element: string;
  message: string;
  suggestion: string;
}

const AccessibilityHelper = () => {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  useEffect(() => {
    const checkAccessibility = () => {
      const foundIssues: AccessibilityIssue[] = [];

      // Check for missing alt text
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        if (!img.alt || img.alt.trim() === '') {
          foundIssues.push({
            type: 'error',
            element: `Image ${index + 1}`,
            message: 'Missing alt text',
            suggestion: 'Add descriptive alt text for screen readers'
          });
        }
      });

      // Check for missing form labels
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach((input, index) => {
        const hasLabel = input.id && document.querySelector(`label[for="${input.id}"]`);
        const hasAriaLabel = input.getAttribute('aria-label');
        
        if (!hasLabel && !hasAriaLabel) {
          foundIssues.push({
            type: 'error',
            element: `Form input ${index + 1}`,
            message: 'Missing label or aria-label',
            suggestion: 'Add a label or aria-label for screen readers'
          });
        }
      });

      // Check for missing heading structure
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (headings.length === 0) {
        foundIssues.push({
          type: 'warning',
          element: 'Page structure',
          message: 'No headings found',
          suggestion: 'Add proper heading structure (h1, h2, etc.)'
        });
      }

      // Check for low contrast (simplified check)
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button, index) => {
        const styles = window.getComputedStyle(button);
        const bgColor = styles.backgroundColor;
        const textColor = styles.color;
        
        if (bgColor === 'rgba(0, 0, 0, 0)' || textColor === 'rgba(0, 0, 0, 0)') {
          foundIssues.push({
            type: 'warning',
            element: `Button ${index + 1}`,
            message: 'Potential contrast issue',
            suggestion: 'Ensure sufficient color contrast'
          });
        }
      });

      // Check for missing focus indicators
      const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
      let hasCustomFocus = false;
      focusableElements.forEach((element) => {
        const styles = window.getComputedStyle(element, ':focus');
        if (styles.outline !== 'none' || styles.boxShadow !== 'none') {
          hasCustomFocus = true;
        }
      });

      if (!hasCustomFocus && focusableElements.length > 0) {
        foundIssues.push({
          type: 'info',
          element: 'Focus indicators',
          message: 'Consider custom focus styles',
          suggestion: 'Add visible focus indicators for keyboard users'
        });
      }

      setIssues(foundIssues);
    };

    const observer = new MutationObserver(() => {
      setTimeout(checkAccessibility, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    checkAccessibility();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setKeyboardNavigation(true);
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMousedown = () => {
      setKeyboardNavigation(false);
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('mousedown', handleMousedown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('mousedown', handleMousedown);
    };
  }, []);

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <X className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <Volume2 className="h-4 w-4 text-yellow-500" />;
      default:
        return <Check className="h-4 w-4 text-blue-500" />;
    }
  };

  const getIssueCount = (type: string) => {
    return issues.filter(issue => issue.type === type).length;
  };

  if (!isVisible && process.env.NODE_ENV === 'production') {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors z-50"
        title="Show Accessibility Helper"
        aria-label="Show Accessibility Helper"
      >
        <Eye className="h-4 w-4" />
      </button>
    );
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80">
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Accessibility Helper
            </CardTitle>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close accessibility helper"
            >
              ×
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-red-50 rounded">
                <div className="text-lg font-bold text-red-600">{getIssueCount('error')}</div>
                <div className="text-xs text-red-600">Errors</div>
              </div>
              <div className="p-2 bg-yellow-50 rounded">
                <div className="text-lg font-bold text-yellow-600">{getIssueCount('warning')}</div>
                <div className="text-xs text-yellow-600">Warnings</div>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <div className="text-lg font-bold text-blue-600">{getIssueCount('info')}</div>
                <div className="text-xs text-blue-600">Info</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded bg-gray-50">
              <Keyboard className="h-4 w-4" />
              <span className="text-sm">Keyboard Navigation:</span>
              <span className={`text-sm font-medium ${keyboardNavigation ? 'text-green-600' : 'text-gray-600'}`}>
                {keyboardNavigation ? 'Active' : 'Inactive'}
              </span>
            </div>

            {issues.length > 0 && (
              <div className="border-t pt-3">
                <div className="text-sm font-medium mb-2">Issues Found:</div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {issues.slice(0, 5).map((issue, index) => (
                    <div key={index} className="p-2 border rounded text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        {getIssueIcon(issue.type)}
                        <span className="font-medium">{issue.element}</span>
                      </div>
                      <div className="text-gray-600 mb-1">{issue.message}</div>
                      <div className="text-blue-600">{issue.suggestion}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-3">
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('https://wave.webaim.org/', '_blank')}
              >
                Run WAVE Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityHelper;
