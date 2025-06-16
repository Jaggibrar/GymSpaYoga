export interface PerformanceMonitor {
  startTimer: (label: string) => void;
  stopTimer: (label: string) => void;
  recordMetric: (metric: string, value: number, type: string) => void;
}

export const performanceMonitor: PerformanceMonitor = {
  startTimer: (label) => {
    console.time(label);
  },
  stopTimer: (label) => {
    console.timeEnd(label);
  },
  recordMetric: (metric, value, type) => {
    console.log(`[Metric] ${metric} (${type}): ${value.toFixed(2)}ms`);
  }
};
