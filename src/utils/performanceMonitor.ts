
interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  type: 'timing' | 'counter' | 'gauge';
  tags?: Record<string, string>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];
  
  constructor() {
    this.initializeObservers();
  }
  
  private initializeObservers() {
    // Observe Core Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(entry.name, entry.value, 'gauge', {
            entryType: entry.entryType
          });
        }
      });
      
      observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });
      this.observers.push(observer);
    }
  }
  
  recordMetric(name: string, value: number, type: PerformanceMetric['type'] = 'gauge', tags?: Record<string, string>) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      type,
      tags,
    };
    
    this.metrics.push(metric);
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance metric:', metric);
    }
  }
  
  startTimer(name: string) {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      this.recordMetric(name, endTime - startTime, 'timing');
    };
  }
  
  getMetrics() {
    return this.metrics;
  }
  
  clearMetrics() {
    this.metrics = [];
  }
  
  getAverageMetric(name: string) {
    const relevantMetrics = this.metrics.filter(m => m.name === name);
    if (relevantMetrics.length === 0) return 0;
    
    const sum = relevantMetrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / relevantMetrics.length;
  }
}

export const performanceMonitor = new PerformanceMonitor();
