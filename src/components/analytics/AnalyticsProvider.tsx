import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsContextType {
  trackEvent: (action: string, category: string, label?: string, value?: number) => void;
  trackPageView: (page: string) => void;
  trackBooking: (businessType: string, businessId: string, amount?: number) => void;
  trackSearch: (query: string, location?: string, results?: number) => void;
  trackUserAction: (action: string, details?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const location = useLocation();

  // Track page views automatically
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-PLACEHOLDER123', {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
  }, [location]);

  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        page_path: location.pathname
      });
    }
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', { action, category, label, value });
    }
  };

  const trackPageView = (page: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: page
      });
    }
  };

  const trackBooking = (businessType: string, businessId: string, amount?: number) => {
    trackEvent('booking_initiated', 'ecommerce', `${businessType}_${businessId}`, amount);
    
    if (typeof window !== 'undefined' && window.gtag && amount) {
      window.gtag('event', 'purchase', {
        transaction_id: `booking_${Date.now()}`,
        value: amount,
        currency: 'INR',
        items: [{
          item_id: businessId,
          item_name: businessType,
          category: businessType,
          quantity: 1,
          price: amount
        }]
      });
    }
  };

  const trackSearch = (query: string, location?: string, results?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search', {
        search_term: query,
        location: location,
        results_count: results
      });
    }
    trackEvent('search', 'engagement', `${query}_${location || 'all'}`, results);
  };

  const trackUserAction = (action: string, details?: Record<string, any>) => {
    trackEvent(action, 'user_interaction', JSON.stringify(details));
  };

  const value: AnalyticsContextType = {
    trackEvent,
    trackPageView,
    trackBooking,
    trackSearch,
    trackUserAction
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// Global analytics functions for window object
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    trackEvent: (action: string, category: string, label?: string, value?: number) => void;
  }
}

export default AnalyticsProvider;