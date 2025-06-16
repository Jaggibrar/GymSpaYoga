interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: string;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  
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
    // Largest Contentful Paint
    if ('web-vital' in window) {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            this.addMetric('lcp', entry.startTime, 'web-vitals');
          }
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });
      
      // First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.addMetric('fid', entry.processingStart - entry.startTime, 'web-vitals');
        }
      }).observe({ entryTypes: ['first-input'] });
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Initialize web vitals tracking
if (typeof window !== 'undefined') {
  performanceMonitor.trackWebVitals();
}
