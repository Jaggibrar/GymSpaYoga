export interface PerformanceMonitor {
  startTimer: (label: string) => void;
  stopTimer: (label: string) => void;
  recordMetric: (metric: string, value: number, type: string) => void;
  getMetrics: () => Record<string, number[]>;
  getAverageMetric: (metric: string) => number;
  clearMetrics: () => void;
  trackApiCall: (metric: string, duration: number) => void;
}

const metrics: Record<string, number[]> = {};

export const performanceMonitor: PerformanceMonitor = {
  startTimer: (label) => {
    console.time(label);
  },
  stopTimer: (label) => {
    console.timeEnd(label);
  },
  recordMetric: (metric, value, type) => {
    if (!metrics[metric]) {
      metrics[metric] = [];
    }
    metrics[metric].push(value);
    console.log(`[Metric] ${metric} (${type}): ${value.toFixed(2)}ms`);
  },
  getMetrics: () => {
    return metrics;
  },
  getAverageMetric: (metricName: string) => {
    const values = metrics[metricName] || [];
    if (values.length === 0) return 0;
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
  },
  clearMetrics: () => {
    Object.keys(metrics).forEach((key) => {
      metrics[key] = [];
    });
  },
  trackApiCall: (metric, duration) => {
    performanceMonitor.recordMetric(metric, duration, 'timing');
  }
};
