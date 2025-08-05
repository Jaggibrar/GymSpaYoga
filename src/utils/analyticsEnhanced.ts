// Enhanced analytics and tracking utilities

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    dataLayer: any[];
    fbq: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}

export class EnhancedAnalytics {
  private static isInitialized = false;
  
  // Initialize all tracking services
  static init() {
    if (this.isInitialized) return;
    
    this.initGoogleAnalytics();
    this.initGoogleTagManager();
    this.initMicrosoftClarity();
    this.initFacebookPixel();
    this.isInitialized = true;
  }
  
  // Google Analytics 4
  private static initGoogleAnalytics() {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script1);
    
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(command: string, targetId: string, config?: any) {
      window.dataLayer.push(arguments);
    } as any;
    (window.gtag as any)('js', new Date());
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    });
  }
  
  // Google Tag Manager
  private static initGoogleTagManager() {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM_CONTAINER_ID');
    `;
    document.head.appendChild(script);
  }
  
  // Microsoft Clarity
  private static initMicrosoftClarity() {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
    `;
    document.head.appendChild(script);
  }
  
  // Facebook Pixel
  private static initFacebookPixel() {
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'FACEBOOK_PIXEL_ID');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  }
  
  // Track page views
  static trackPageView(url: string, title: string) {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: title,
        page_location: url,
      });
    }
    
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'PageView');
    }
  }
  
  // Track business views
  static trackBusinessView(businessId: string, businessType: string, businessName: string) {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'view_item', {
        item_id: businessId,
        item_name: businessName,
        item_category: businessType,
        currency: 'INR'
      });
    }
    
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'ViewContent', {
        content_type: 'business',
        content_ids: [businessId],
        content_name: businessName
      });
    }
  }
  
  // Track bookings
  static trackBooking(bookingData: {
    businessId: string;
    businessName: string;
    businessType: string;
    amount: number;
    currency: string;
  }) {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'purchase', {
        transaction_id: bookingData.businessId,
        value: bookingData.amount,
        currency: bookingData.currency,
        items: [{
          item_id: bookingData.businessId,
          item_name: bookingData.businessName,
          item_category: bookingData.businessType,
          quantity: 1,
          price: bookingData.amount
        }]
      });
    }
    
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Purchase', {
        value: bookingData.amount,
        currency: bookingData.currency,
        content_type: 'booking',
        content_ids: [bookingData.businessId]
      });
    }
  }
  
  // Track search queries
  static trackSearch(searchTerm: string, category?: string, location?: string) {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'search', {
        search_term: searchTerm,
        search_category: category,
        search_location: location
      });
    }
    
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Search', {
        search_string: searchTerm,
        content_category: category
      });
    }
  }
  
  // Track user engagement
  static trackEngagement(action: string, category: string, label?: string) {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  }
  
  // Track conversions
  static trackConversion(conversionType: string, value?: number) {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        value: value,
        currency: 'INR'
      });
    }
  }
}