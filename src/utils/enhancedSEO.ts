// Enhanced SEO utilities for better search engine optimization

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'business';
  canonical?: string;
  noindex?: boolean;
}

export const generateSEOTitle = (pageName: string, category?: string): string => {
  const baseTitle = 'GymSpaYoga - India\'s Premium Wellness Marketplace';
  
  if (!pageName || pageName === 'Home') {
    return `Find Premium Gyms, Luxury Spas & Yoga Studios | ${baseTitle}`;
  }
  
  const categoryPrefix = category ? `${category} ` : '';
  return `${categoryPrefix}${pageName} | ${baseTitle}`;
};

export const generateMetaDescription = (
  pageName: string, 
  location?: string, 
  customDescription?: string
): string => {
  if (customDescription) return customDescription;
  
  const locationSuffix = location ? ` in ${location}` : ' across India';
  
  const descriptions: Record<string, string> = {
    gyms: `Find premium gyms and fitness centers${locationSuffix}. State-of-the-art equipment, expert trainers, flexible memberships. Book instantly with verified reviews.`,
    spas: `Book luxury spa treatments and wellness services${locationSuffix}. Professional massage therapy, facial treatments, and holistic wellness experiences.`,
    yoga: `Discover authentic yoga studios${locationSuffix}. Certified instructors, traditional practices, meditation sessions, and spiritual wellness programs.`,
    trainers: `Connect with certified personal trainers${locationSuffix}. Customized workout plans, nutrition guidance, and expert fitness coaching.`,
    blogs: `Expert wellness tips, fitness guides, and health insights from certified professionals. Transform your wellness journey with proven strategies.`,
    about: `Learn about India's leading wellness marketplace connecting you with premium gyms, spas, yoga studios, and certified trainers nationwide.`,
    pricing: `Transparent pricing for premium wellness services. Compare gym memberships, spa treatments, yoga classes, and personal training rates.`,
    support: `Get help with bookings, payments, and wellness services. 24/7 customer support for your fitness and wellness journey.`
  };
  
  const baseDescription = '🏋️‍♂️ Find & book premium gyms, luxury spas & authentic yoga studios across India. ⭐ 50,000+ happy members, 1000+ locations. Book instantly with verified reviews.';
  
  return descriptions[pageName.toLowerCase()] || baseDescription;
};

export const generateStructuredData = (
  type: 'business' | 'article' | 'service' | 'faq',
  data: any
) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@id': `https://gymspayoga.com${data.url || '/'}`,
    url: `https://gymspayoga.com${data.url || '/'}`,
  };

  switch (type) {
    case 'business':
      return {
        ...baseData,
        '@type': 'HealthAndBeautyBusiness',
        name: data.name || 'GymSpaYoga',
        description: data.description,
        image: data.image || 'https://gymspayoga.com/og-image.jpg',
        telephone: '+91-7596958097',
        email: 'gymspayoga@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
          addressRegion: data.region || 'India'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: data.latitude || '20.5937',
          longitude: data.longitude || '78.9629'
        },
        areaServed: {
          '@type': 'Country',
          name: 'India'
        },
        serviceType: data.services || ['Fitness Center', 'Spa', 'Yoga Studio', 'Personal Training'],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '12500',
          bestRating: '5'
        }
      };

    case 'article':
      return {
        ...baseData,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image,
        author: {
          '@type': 'Organization',
          name: 'GymSpaYoga'
        },
        publisher: {
          '@type': 'Organization',
          name: 'GymSpaYoga',
          logo: {
            '@type': 'ImageObject',
            url: 'https://gymspayoga.com/logo.png'
          }
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified || data.datePublished
      };

    case 'service':
      return {
        ...baseData,
        '@type': 'Service',
        name: data.name,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: 'GymSpaYoga'
        },
        areaServed: {
          '@type': 'Country',
          name: 'India'
        },
        serviceType: data.serviceType,
        offers: data.offers || {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          price: data.price,
          priceCurrency: 'INR'
        }
      };

    case 'faq':
      return {
        ...baseData,
        '@type': 'FAQPage',
        mainEntity: data.questions.map((q: any) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer
          }
        }))
      };

    default:
      return baseData;
  }
};

export const optimizePageForSEO = (page: string, location?: string) => {
  const title = generateSEOTitle(page);
  const description = generateMetaDescription(page, location);
  
  // Update document title
  document.title = title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  if (metaDescription) {
    metaDescription.content = description;
  }
  
  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
  const ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
  const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
  
  if (ogTitle) ogTitle.content = title;
  if (ogDescription) ogDescription.content = description;
  if (ogUrl) ogUrl.content = window.location.href;
  
  return { title, description };
};

export const trackSEOMetrics = (pageName: string) => {
  // Track Core Web Vitals
  if ('web-vital' in window) {
    // @ts-ignore
    window.webVitals?.getCLS?.(console.log);
    // @ts-ignore  
    window.webVitals?.getFID?.(console.log);
    // @ts-ignore
    window.webVitals?.getFCP?.(console.log);
    // @ts-ignore
    window.webVitals?.getLCP?.(console.log);
    // @ts-ignore
    window.webVitals?.getTTFB?.(console.log);
  }
  
  // Track page view for analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      send_to: 'GA_MEASUREMENT_ID'
    });
  }
};

export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/css/critical.css', as: 'style' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' },
    { href: '/js/critical.js', as: 'script' }
  ];

  criticalResources.forEach(({ href, as }) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    }
  });
};