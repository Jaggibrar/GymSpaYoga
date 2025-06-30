
interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  type: 'api' | 'render' | 'user_action' | 'navigation';
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];
  private isEnabled: boolean = true;
  private timers: Map<string, number> = new Map();

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    try {
      // Observe long tasks
      if ('PerformanceObserver' in window && 'PerformanceLongTaskTiming' in window) {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.warn('Long task detected:', entry.duration + 'ms');
            this.addMetric({
              name: 'long-task',
              duration: entry.duration,
              timestamp: entry.startTime,
              type: 'render',
              metadata: { entryType: entry.entryType }
            });
          });
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
        this.observers.push(longTaskObserver);
      }

      // Observe navigation timing
      if ('PerformanceObserver' in window) {
        const navigationObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const navEntry = entry as PerformanceNavigationTiming;
            this.addMetric({
              name: 'page-load',
              duration: navEntry.loadEventEnd - navEntry.fetchStart,
              timestamp: navEntry.fetchStart,
              type: 'navigation',
              metadata: {
                domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.fetchStart,
                firstPaint: this.getFirstPaint(),
                firstContentfulPaint: this.getFirstContentfulPaint()
              }
            });
          });
        });
        navigationObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navigationObserver);
      }
    } catch (error) {
      console.warn('Performance monitoring setup failed:', error);
    }
  }

  private getFirstPaint(): number | null {
    try {
      const paintEntries = performance.getEntriesByType('paint');
      const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
      return firstPaint ? firstPaint.startTime : null;
    } catch {
      return null;
    }
  }

  private getFirstContentfulPaint(): number | null {
    try {
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      return fcp ? fcp.startTime : null;
    } catch {
      return null;
    }
  }

  startTimer(name: string): void {
    this.timers.set(name, Date.now());
  }

  stopTimer(name: string): number {
    const startTime = this.timers.get(name);
    if (!startTime) return 0;
    
    const duration = Date.now() - startTime;
    this.timers.delete(name);
    return duration;
  }

  recordMetric(name: string, duration: number, type: PerformanceMetric['type'] = 'api'): void {
    this.addMetric({
      name,
      duration,
      timestamp: Date.now(),
      type,
    });
  }

  addMetric(metric: PerformanceMetric) {
    if (!this.isEnabled) return;

    this.metrics.push(metric);

    // Log slow operations
    if (metric.duration > 1000) {
      console.warn(`Slow ${metric.type} operation detected:`, metric);
    }

    // Keep only last 100 metrics to prevent memory leaks
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }

  trackApiCall(endpoint: string, startTime: number, metadata?: Record<string, any>) {
    const duration = Date.now() - startTime;
    this.addMetric({
      name: `api-${endpoint}`,
      duration,
      timestamp: startTime,
      type: 'api',
      metadata: {
        endpoint,
        ...metadata
      }
    });

    // Log slow API calls
    if (duration > 3000) {
      console.warn(`Slow API call to ${endpoint}: ${duration}ms`);
    }
  }

  trackUserAction(action: string, startTime: number, metadata?: Record<string, any>) {
    const duration = Date.now() - startTime;
    this.addMetric({
      name: `user-${action}`,
      duration,
      timestamp: startTime,
      type: 'user_action',
      metadata: {
        action,
        ...metadata
      }
    });
  }

  trackRenderTime(component: string, startTime: number, metadata?: Record<string, any>) {
    const duration = Date.now() - startTime;
    this.addMetric({
      name: `render-${component}`,
      duration,
      timestamp: startTime,
      type: 'render',
      metadata: {
        component,
        ...metadata
      }
    });
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getSlowMetrics(threshold: number = 1000): PerformanceMetric[] {
    return this.metrics.filter(metric => metric.duration > threshold);
  }

  getAverageMetric(name: string): number {
    const relevantMetrics = this.metrics.filter(metric => metric.name === name);
    if (relevantMetrics.length === 0) return 0;
    
    const sum = relevantMetrics.reduce((acc, metric) => acc + metric.duration, 0);
    return sum / relevantMetrics.length;
  }

  exportMetrics(): string {
    return JSON.stringify({
      metrics: this.metrics,
      summary: {
        totalMetrics: this.metrics.length,
        slowOperations: this.getSlowMetrics().length,
        averageApiTime: this.getAverageMetric('api'),
        averageRenderTime: this.getAverageMetric('render')
      },
      timestamp: new Date().toISOString()
    }, null, 2);
  }

  clear() {
    this.metrics = [];
  }

  clearMetrics() {
    this.clear();
  }

  disable() {
    this.isEnabled = false;
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  enable() {
    this.isEnabled = true;
    this.initializeObservers();
  }

  // Web Vitals tracking
  getCLS(): Promise<number> {
    return new Promise((resolve) => {
      try {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          });
          resolve(clsValue);
        });
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Resolve after 5 seconds if no layout shifts
        setTimeout(() => resolve(clsValue), 5000);
      } catch {
        resolve(0);
      }
    });
  }

  getLCP(): Promise<number> {
    return new Promise((resolve) => {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Resolve after 10 seconds
        setTimeout(() => resolve(0), 10000);
      } catch {
        resolve(0);
      }
    });
  }

  getFID(): Promise<number> {
    return new Promise((resolve) => {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            resolve((entry as any).processingStart - entry.startTime);
          });
        });
        observer.observe({ entryTypes: ['first-input'] });
        
        // Resolve after 30 seconds if no input
        setTimeout(() => resolve(0), 30000);
      } catch {
        resolve(0);
      }
    });
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Helper functions for common tracking scenarios
export const trackAsyncOperation = async <T>(
  operation: () => Promise<T>,
  name: string,
  type: PerformanceMetric['type'] = 'api'
): Promise<T> => {
  const startTime = Date.now();
  try {
    const result = await operation();
    performanceMonitor.addMetric({
      name,
      duration: Date.now() - startTime,
      timestamp: startTime,
      type,
      metadata: { success: true }
    });
    return result;
  } catch (error) {
    performanceMonitor.addMetric({
      name,
      duration: Date.now() - startTime,
      timestamp: startTime,
      type,
      metadata: { success: false, error: (error as Error).message }
    });
    throw error;
  }
};

export const withPerformanceTracking = <T extends (...args: any[]) => any>(
  fn: T,
  name: string,
  type: PerformanceMetric['type'] = 'user_action'
): T => {
  return ((...args: Parameters<T>) => {
    const startTime = Date.now();
    try {
      const result = fn(...args);
      
      if (result instanceof Promise) {
        return result.finally(() => {
          performanceMonitor.addMetric({
            name,
            duration: Date.now() - startTime,
            timestamp: startTime,
            type,
            metadata: { args: args.length }
          });
        });
      } else {
        performanceMonitor.addMetric({
          name,
          duration: Date.now() - startTime,
          timestamp: startTime,
          type,
          metadata: { args: args.length }
        });
        return result;
      }
    } catch (error) {
      performanceMonitor.addMetric({
        name,
        duration: Date.now() - startTime,
        timestamp: startTime,
        type,
        metadata: { args: args.length, error: (error as Error).message }
      });
      throw error;
    }
  }) as T;
};
