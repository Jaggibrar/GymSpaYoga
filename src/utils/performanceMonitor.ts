export interface PerformanceMonitor {
  startTimer: (label: string) => void;
  stopTimer: (label: string) => void;
  recordMetric: (metric: string, value: number, type: string) => void;
  getMetrics: () => Record<string, number[]>;
  getAverageMetric: (metric: string) => number | null;
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
  getAverageMetric: (metric) => {
    const data = metrics[metric];
    if (!data || data.length === 0) return null;
    const sum = data.reduce((a, b) => a + b, 0);
    return sum / data.length;
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
