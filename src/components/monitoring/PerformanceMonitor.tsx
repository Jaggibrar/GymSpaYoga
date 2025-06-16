
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, Zap, AlertTriangle } from 'lucide-react';

interface PerformanceMetrics {
  pageLoadTime: number;
  renderTime: number;
  networkRequests: number;
  memoryUsage: number;
  errors: string[];
}

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageLoadTime: 0,
    renderTime: 0,
    networkRequests: 0,
    memoryUsage: 0,
    errors: []
  });
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Monitor performance metrics
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          setMetrics(prev => ({
            ...prev,
            pageLoadTime: navEntry.loadEventEnd - navEntry.loadEventStart
          }));
        }
        
        if (entry.entryType === 'measure') {
          setMetrics(prev => ({
            ...prev,
            renderTime: entry.duration
          }));
        }
      });
    });

    observer.observe({ entryTypes: ['navigation', 'measure'] });

    // Monitor network requests
    const originalFetch = window.fetch;
    let requestCount = 0;
    
    window.fetch = function(...args) {
      requestCount++;
      setMetrics(prev => ({ ...prev, networkRequests: requestCount }));
      return originalFetch.apply(this, args);
    };

    // Monitor memory usage
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory;
      setMetrics(prev => ({
        ...prev,
        memoryUsage: memoryInfo.usedJSHeapSize / (1024 * 1024) // Convert to MB
      }));
    }

    // Monitor errors
    const errorHandler = (event: ErrorEvent) => {
      setMetrics(prev => ({
        ...prev,
        errors: [...prev.errors, event.message].slice(-5) // Keep last 5 errors
      }));
    };

    window.addEventListener('error', errorHandler);

    return () => {
      observer.disconnect();
      window.fetch = originalFetch;
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  const getPerformanceStatus = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.warning) return 'warning';
    return 'poor';
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      good: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      poor: 'bg-red-100 text-red-800'
    };
    
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  // Only show in development or when specifically enabled
  if (!isVisible && process.env.NODE_ENV === 'production') {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors z-50"
        title="Show Performance Monitor"
      >
        <Activity className="h-4 w-4" />
      </button>
    );
  }

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Performance Monitor
            </CardTitle>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Page Load</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono">{formatTime(metrics.pageLoadTime)}</span>
                {getStatusBadge(getPerformanceStatus(metrics.pageLoadTime, { good: 1000, warning: 3000 }))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Render Time</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono">{formatTime(metrics.renderTime)}</span>
                {getStatusBadge(getPerformanceStatus(metrics.renderTime, { good: 100, warning: 500 }))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-sm">Network Requests</span>
              </div>
              <span className="text-sm font-mono">{metrics.networkRequests}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-purple-500" />
                <span className="text-sm">Memory Usage</span>
              </div>
              <span className="text-sm font-mono">{metrics.memoryUsage.toFixed(1)} MB</span>
            </div>

            {metrics.errors.length > 0 && (
              <div className="border-t pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">Recent Errors</span>
                </div>
                <div className="space-y-1">
                  {metrics.errors.slice(-3).map((error, index) => (
                    <div key={index} className="text-xs text-red-600 truncate">
                      {error}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;
