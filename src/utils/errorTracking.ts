
interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userId?: string;
  timestamp: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: Record<string, any>;
}

import { memoryManager } from './memoryManager';

class ErrorTracker {
  private errors;
  
  constructor() {
    // Use circular buffer to prevent memory leaks (max 100 errors)
    this.errors = memoryManager.createCircularBuffer<ErrorReport>(100);
  }
  
  logError(error: Error | string, severity: ErrorReport['severity'] = 'medium', context?: Record<string, any>) {
    const errorReport: ErrorReport = {
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
    
    // In production, you would send to an external service like Sentry
    if (process.env.NODE_ENV === 'production') {
      this.sendToExternalService(errorReport);
    }
  }
  
  private async sendToExternalService(errorReport: ErrorReport) {
    try {
      // Simulate sending to external error tracking service
      console.log('Sending error report to external service:', errorReport);
    } catch (e) {
      console.error('Failed to send error report:', e);
    }
  }
  
  getErrors() {
    return this.errors.getAll();
  }
  
  clearErrors() {
    this.errors.clear();
  }
}

export const errorTracker = new ErrorTracker();

// Global error handler
window.addEventListener('error', (event) => {
  errorTracker.logError(event.error || event.message, 'high', {
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  errorTracker.logError(
    event.reason || 'Unhandled promise rejection',
    'critical',
    { type: 'unhandledRejection' }
  );
});
