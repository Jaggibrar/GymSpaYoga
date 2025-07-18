interface MemoryManagerConfig {
  maxSize: number;
  cleanupInterval?: number;
}

class MemoryManager {
  private static instance: MemoryManager;
  private intervals: Set<NodeJS.Timeout> = new Set();
  private watchers: Map<string, any> = new Map();

  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  // Safe interval management
  createInterval(callback: () => void, delay: number): NodeJS.Timeout {
    const interval = setInterval(callback, delay);
    this.intervals.add(interval);
    return interval;
  }

  clearInterval(interval: NodeJS.Timeout): void {
    clearInterval(interval);
    this.intervals.delete(interval);
  }

  // Cleanup all intervals
  cleanup(): void {
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();
    this.watchers.clear();
  }

  // Circular buffer implementation
  createCircularBuffer<T>(maxSize: number): {
    add: (item: T) => void;
    getAll: () => T[];
    size: () => number;
    clear: () => void;
  } {
    let buffer: T[] = [];
    let pointer = 0;

    return {
      add: (item: T) => {
        if (buffer.length < maxSize) {
          buffer.push(item);
        } else {
          buffer[pointer] = item;
          pointer = (pointer + 1) % maxSize;
        }
      },
      getAll: () => {
        if (buffer.length < maxSize) {
          return [...buffer];
        }
        return [...buffer.slice(pointer), ...buffer.slice(0, pointer)];
      },
      size: () => buffer.length,
      clear: () => {
        buffer = [];
        pointer = 0;
      }
    };
  }

  // Memory usage monitoring
  getMemoryUsage(): {
    used: number;
    total: number;
    percentage: number;
  } {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / (1024 * 1024)), // MB
        total: Math.round(memory.totalJSHeapSize / (1024 * 1024)), // MB
        percentage: Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
      };
    }
    return { used: 0, total: 0, percentage: 0 };
  }

  // Watch memory usage and warn if high
  startMemoryWatcher(threshold: number = 80): void {
    const checkMemory = () => {
      const usage = this.getMemoryUsage();
      if (usage.percentage > threshold) {
        console.warn(`High memory usage detected: ${usage.percentage}% (${usage.used}MB/${usage.total}MB)`);
      }
    };

    const interval = this.createInterval(checkMemory, 30000); // Check every 30 seconds
    this.watchers.set('memory', interval);
  }

  stopMemoryWatcher(): void {
    const interval = this.watchers.get('memory');
    if (interval) {
      this.clearInterval(interval);
      this.watchers.delete('memory');
    }
  }
}

export const memoryManager = MemoryManager.getInstance();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    memoryManager.cleanup();
  });
}

// Enhanced error tracker with memory management
export class SafeErrorTracker {
  private errors;

  constructor(maxSize: number = 100) {
    this.errors = memoryManager.createCircularBuffer<{
      message: string;
      stack?: string;
      url: string;
      timestamp: number;
      severity: 'low' | 'medium' | 'high' | 'critical';
      context?: Record<string, any>;
    }>(maxSize);
  }

  logError(error: Error | string, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium', context?: Record<string, any>): void {
    const errorReport = {
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error === 'string' ? undefined : error.stack,
      url: window.location.href,
      timestamp: Date.now(),
      severity,
      context,
    };
    
    this.errors.add(errorReport);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', errorReport);
    }
  }

  getErrors() {
    return this.errors.getAll();
  }

  clearErrors() {
    this.errors.clear();
  }

  getErrorCount() {
    return this.errors.size();
  }
}

// Enhanced rate limiter with proper cleanup
export class SafeRateLimiter {
  private requests: Map<string, number[]> = new Map();
  private cleanupInterval?: NodeJS.Timeout;

  constructor() {
    // Use memory manager for safe interval handling
    this.cleanupInterval = memoryManager.createInterval(() => {
      this.cleanup();
    }, 300000); // Clean every 5 minutes
  }

  isAllowed(config: { maxRequests: number; windowMs: number; keyGenerator?: (context?: any) => string }, context?: any): boolean {
    const key = config.keyGenerator ? config.keyGenerator(context) : 'default';
    const now = Date.now();
    const windowStart = now - config.windowMs;
    
    const keyRequests = this.requests.get(key) || [];
    const validRequests = keyRequests.filter(timestamp => timestamp > windowStart);
    
    if (validRequests.length >= config.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }

  private cleanup(): void {
    const now = Date.now();
    const cutoff = now - 300000; // 5 minutes ago
    
    for (const [key, requests] of this.requests.entries()) {
      const validRequests = requests.filter(timestamp => timestamp > cutoff);
      
      if (validRequests.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, validRequests);
      }
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      memoryManager.clearInterval(this.cleanupInterval);
    }
    this.requests.clear();
  }
}

export default memoryManager;