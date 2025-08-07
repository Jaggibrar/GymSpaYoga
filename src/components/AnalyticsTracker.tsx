
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname,
      });
    }
  }, [location]);

  // Track conversion events
  const trackEvent = (eventName: string, parameters?: any) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, parameters);
    }
  };

  // Track booking attempts
  useEffect(() => {
    const trackBookingStart = () => {
      trackEvent('booking_start', {
        event_category: 'engagement',
        event_label: 'booking_modal_open'
      });
    };

    const trackSignup = () => {
      trackEvent('sign_up', {
        event_category: 'engagement',
        event_label: 'user_registration'
      });
    };

    // Add event listeners for tracking
    document.addEventListener('booking_start', trackBookingStart);
    document.addEventListener('user_signup', trackSignup);

    return () => {
      document.removeEventListener('booking_start', trackBookingStart);
      document.removeEventListener('user_signup', trackSignup);
    };
  }, []);

  return null;
};

export default AnalyticsTracker;
