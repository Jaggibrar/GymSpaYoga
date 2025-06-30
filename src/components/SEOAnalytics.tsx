
import { useEffect } from 'react';

interface SEOAnalyticsProps {
  pageTitle: string;
  pageUrl: string;
  pageType?: string;
  userId?: string;
}

const SEOAnalytics = ({ pageTitle, pageUrl, pageType = 'page', userId }: SEOAnalyticsProps) => {
  useEffect(() => {
    // Google Analytics 4 (GA4) tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: pageTitle,
        page_location: pageUrl,
        user_id: userId
      });

      // Track page view
      (window as any).gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: pageUrl,
        page_type: pageType
      });
    }

    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView', {
        content_name: pageTitle,
        content_category: pageType
      });
    }

    // Custom analytics tracking
    trackPageView(pageTitle, pageUrl, pageType);
  }, [pageTitle, pageUrl, pageType, userId]);

  const trackPageView = async (title: string, url: string, type: string) => {
    try {
      // Send analytics data to your backend
      await fetch('/api/analytics/pageview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          url,
          type,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          userId
        }),
      });
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  };

  return null; // This component doesn't render anything
};

export default SEOAnalytics;
