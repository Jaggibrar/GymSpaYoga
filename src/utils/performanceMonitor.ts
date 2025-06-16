import { supabase } from '@/integrations/supabase/client';
import { errorTracker } from './errorTracking';
import { rateLimiter } from './rateLimiter';
import { performanceMonitor } from './performanceMonitor';

interface ApiRequest {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  rateLimitConfig?: {
    maxRequests: number;
    windowMs: number;
  };
  retries?: number;
  timeout?: number;
}

interface ApiResponse<T = any> {
  data: T | null;
  error: string | null;
  status: number;
  metadata?: {
    responseTime: number;
    retryCount: number;
  };
}

class ApiClient {
  private async makeRequest<T>(request: ApiRequest): Promise<ApiResponse<T>> {
    const timerLabel = `api_${request.endpoint}`;
    performanceMonitor.startTimer(timerLabel);

    let retryCount = 0;
    const maxRetries = request.retries || 0;

    // Rate limiting check
    if (request.rateLimitConfig) {
      const { data: userData } = await supabase.auth.getUser();
      const isAllowed = rateLimiter.isAllowed(request.rateLimitConfig, {
        endpoint: request.endpoint,
        userId: userData?.user?.id
      });

      if (!isAllowed) {
        const error = 'Rate limit exceeded';
        errorTracker.logError(error, 'medium', { endpoint: request.endpoint });

        performanceMonitor.stopTimer(timerLabel);
        return {
          data: null,
          error,
          status: 429,
          metadata: { responseTime: 0, retryCount: 0 }
        };
      }
    }

    while (retryCount <= maxRetries) {
      try {
        const requestStart = performance.now();

        // Simulated API call
        let response;

        switch (request.endpoint) {
          case 'bookings':
            if (request.method === 'GET') {
              response = await supabase.from('bookings').select('*');
            } else if (request.method === 'POST') {
              response = await supabase.from('bookings').insert(request.data);
            } else if (request.method === 'PUT') {
              response = await supabase.from('bookings').update(request.data);
            }
            break;
          default:
            throw new Error(`Unknown endpoint: ${request.endpoint}`);
        }

        const responseTime = performance.now() - requestStart;
        performanceMonitor.stopTimer(timerLabel);

        performanceMonitor.recordMetric(
          `api_response_time_${request.endpoint}`,
          responseTime,
          'timing'
        );

        if (response?.error) {
          throw new Error(response.error.message);
        }

        return {
          data: response?.data || null,
          error: null,
          status: 200,
          metadata: { responseTime, retryCount }
        };

      } catch (error) {
        retryCount++;

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        if (retryCount > maxRetries) {
          errorTracker.logError(errorMessage, 'high', {
            endpoint: request.endpoint,
            method: request.method,
            retryCount,
            data: request.data
          });

          performanceMonitor.stopTimer(timerLabel);
          return {
            data: null,
            error: errorMessage,
            status: 500,
            metadata: { responseTime: 0, retryCount }
          };
        }

        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
      }
    }

    performanceMonitor.stopTimer(timerLabel);
    return {
      data: null,
      error: 'Max retries exceeded',
      status: 500,
      metadata: { responseTime: 0, retryCount }
    };
  }

  async get<T>(endpoint: string, options?: Omit<ApiRequest, 'endpoint' | 'method'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({ ...options, endpoint, method: 'GET' });
  }

  async post<T>(endpoint: string, data: any, options?: Omit<ApiRequest, 'endpoint' | 'method' | 'data'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({ ...options, endpoint, method: 'POST', data });
  }

  async put<T>(endpoint: string, data: any, options?: Omit<ApiRequest, 'endpoint' | 'method' | 'data'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({ ...options, endpoint, method: 'PUT', data });
  }

  async delete<T>(endpoint: string, options?: Omit<ApiRequest, 'endpoint' | 'method'>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({ ...options, endpoint, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
