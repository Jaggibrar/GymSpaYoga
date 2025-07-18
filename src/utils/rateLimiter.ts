
interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  keyGenerator?: (context?: any) => string;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  isAllowed(config: RateLimitConfig, context?: any): boolean {
    const key = config.keyGenerator ? config.keyGenerator(context) : 'default';
    const now = Date.now();
    const windowStart = now - config.windowMs;
    
    // Get existing requests for this key
    const keyRequests = this.requests.get(key) || [];
    
    // Filter out requests outside the window
    const validRequests = keyRequests.filter(timestamp => timestamp > windowStart);
    
    // Check if we're within the limit
    if (validRequests.length >= config.maxRequests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }
  
  getRemainingRequests(config: RateLimitConfig, context?: any): number {
    const key = config.keyGenerator ? config.keyGenerator(context) : 'default';
    const now = Date.now();
    const windowStart = now - config.windowMs;
    
    const keyRequests = this.requests.get(key) || [];
    const validRequests = keyRequests.filter(timestamp => timestamp > windowStart);
    
    return Math.max(0, config.maxRequests - validRequests.length);
  }
  
  cleanup() {
    const now = Date.now();
    
    for (const [key, requests] of this.requests.entries()) {
      const validRequests = requests.filter(timestamp => timestamp > now - 300000); // 5 minutes
      
      if (validRequests.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, validRequests);
      }
    }
  }
}

export const rateLimiter = new RateLimiter();

// Use memory manager for safe cleanup
import { memoryManager } from './memoryManager';

// Cleanup old requests every 5 minutes using memory manager
memoryManager.createInterval(() => {
  rateLimiter.cleanup();
}, 300000);
