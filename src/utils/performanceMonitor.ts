
interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: string;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private timers: Map<string, number> = new Map();
  
  addMetric(name: string, value: number, category: string = 'general') {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
      category
    });
    
    // Keep only last 100 metrics to prevent memory issues
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }
  }
  
  startTimer(name: string) {
    this.timers.set(name, Date.now());
  }
  
  endTimer(name: string, category: string = 'timing') {
    const startTime = this.timers.get(name);
    if (startTime) {
      const duration = Date.now() - startTime;
      this.addMetric(name, duration, category);
      this.timers.delete(name);
      return duration;
    }
    return 0;
  }
  
  recordMetric(name: string, value: number, category: string = 'general') {
    this.addMetric(name, value, category);
  }
  
  getMetrics() {
    return this.metrics;
  }
  
  getAverageMetric(name: string): number {
    const relevantMetrics = this.metrics.filter(m => m.name === name);
    if (relevantMetrics.length === 0) return 0;
    
    const sum = relevantMetrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / relevantMetrics.length;
  }
  
  clearMetrics() {
    this.metrics = [];
  }
  
  // Track API response times
  trackApiCall(endpoint: string, startTime: number) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    this.addMetric('api_response_time', duration, 'api');
    console.log(`API call to ${endpoint} took ${duration}ms`);
  }
  
  // Track Core Web Vitals
  trackWebVitals() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              this.addMetric('lcp', entry.startTime, 'web-vitals');
            }
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer not supported');
      }
      
      // First Input Delay
      try {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fidEntry = entry as any;
            if (fidEntry.processingStart) {
              this.addMetric('fid', fidEntry.processingStart - entry.startTime, 'web-vitals');
            }
          }
        }).observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observer not supported');
      }
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Initialize web vitals tracking
if (typeof window !== 'undefined') {
  performanceMonitor.trackWebVitals();
}
