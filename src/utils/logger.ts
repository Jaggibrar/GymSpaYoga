/**
 * Production-safe logging utility
 * Only logs in development, sends errors to monitoring in production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
  component?: string;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  private createLogEntry(level: LogLevel, message: string, data?: any, component?: string): LogEntry {
    return {
      level,
      message,
      data,
      component,
      timestamp: new Date().toISOString(),
    };
  }

  private addLog(entry: LogEntry) {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  debug(message: string, data?: any, component?: string) {
    const entry = this.createLogEntry('debug', message, data, component);
    this.addLog(entry);
    
    if (this.isDevelopment) {
      console.log(`[DEBUG${component ? ` ${component}` : ''}]`, message, data || '');
    }
  }

  info(message: string, data?: any, component?: string) {
    const entry = this.createLogEntry('info', message, data, component);
    this.addLog(entry);
    
    if (this.isDevelopment) {
      console.info(`[INFO${component ? ` ${component}` : ''}]`, message, data || '');
    }
  }

  warn(message: string, data?: any, component?: string) {
    const entry = this.createLogEntry('warn', message, data, component);
    this.addLog(entry);
    
    console.warn(`[WARN${component ? ` ${component}` : ''}]`, message, data || '');
  }

  error(message: string, error?: any, component?: string) {
    const entry = this.createLogEntry('error', message, error, component);
    this.addLog(entry);
    
    console.error(`[ERROR${component ? ` ${component}` : ''}]`, message, error || '');
    
    // In production, you could send this to an error monitoring service
    if (!this.isDevelopment) {
      this.sendToMonitoring(entry);
    }
  }

  private async sendToMonitoring(entry: LogEntry) {
    // Here you would send to your monitoring service (e.g., Sentry, LogRocket, etc.)
    try {
      // Example: await fetch('/api/log-error', { method: 'POST', body: JSON.stringify(entry) });
    } catch (err) {
      // Silently fail - don't want logging to break the app
    }
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }

  // Utility method for tracking user actions
  trackUserAction(action: string, data?: any, component?: string) {
    this.info(`User action: ${action}`, data, component);
    
    // In production, you could send this to analytics
    if (!this.isDevelopment) {
      this.sendToAnalytics(action, data);
    }
  }

  private async sendToAnalytics(action: string, data?: any) {
    // Here you would send to your analytics service
    try {
      // Example: analytics.track(action, data);
    } catch (err) {
      // Silently fail
    }
  }
}

export const logger = new Logger();

// React hook for component-specific logging
export const useLogger = (componentName: string) => {
  return {
    debug: (message: string, data?: any) => logger.debug(message, data, componentName),
    info: (message: string, data?: any) => logger.info(message, data, componentName),
    warn: (message: string, data?: any) => logger.warn(message, data, componentName),
    error: (message: string, error?: any) => logger.error(message, error, componentName),
    trackAction: (action: string, data?: any) => logger.trackUserAction(action, data, componentName),
  };
};