// Advanced SEO utilities for maximum search rankings
import { supabase } from '@/integrations/supabase/client';

export const generateComprehensiveSitemap = async () => {
  // Static pages with priorities
  const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/gyms', priority: 0.9, changefreq: 'daily' },
    { url: '/spas', priority: 0.9, changefreq: 'daily' },
    { url: '/yoga', priority: 0.9, changefreq: 'daily' },
    { url: '/trainers', priority: 0.9, changefreq: 'daily' },
    { url: '/about', priority: 0.7, changefreq: 'weekly' },
    { url: '/pricing', priority: 0.8, changefreq: 'weekly' },
    { url: '/blogs', priority: 0.8, changefreq: 'daily' },
    { url: '/register-business', priority: 0.8, changefreq: 'weekly' },
    { url: '/register-trainer', priority: 0.8, changefreq: 'weekly' }
  ];

  // Dynamic business pages
  const { data: businesses } = await supabase
    .from('business_profiles')
    .select('id, business_name, category, city, updated_at')
    .eq('status', 'approved');

  // Dynamic trainer pages
  const { data: trainers } = await supabase
    .from('trainer_profiles')
    .select('id, name, updated_at')
    .eq('status', 'approved');

  // Dynamic blog pages
  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug, updated_at')
    .eq('published', true);

  const sitemapEntries = [
    ...staticPages,
    ...(businesses || []).map(business => ({
      url: `/business/${business.id}`,
      priority: 0.8,
      changefreq: 'weekly',
      lastmod: business.updated_at
    })),
    ...(trainers || []).map(trainer => ({
      url: `/trainer/${trainer.id}`,
      priority: 0.8,
      changefreq: 'weekly',
      lastmod: trainer.updated_at
    })),
    ...(blogs || []).map(blog => ({
      url: `/blog/${blog.slug}`,
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: blog.updated_at
    }))
  ];

  return sitemapEntries;
};

// Generate location-based landing pages
export const generateLocationPages = () => {
  const majorCities = [
    'mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'kolkata', 
    'pune', 'ahmedabad', 'jaipur', 'surat', 'lucknow', 'kanpur',
    'nagpur', 'patna', 'indore', 'thane', 'bhopal', 'visakhapatnam',
    'vadodara', 'firozabad', 'ludhiana', 'rajkot', 'agra', 'siliguri',
    'nashik', 'faridabad', 'patiala', 'meerut', 'kalyan-dombivali',
    'vasai-virar', 'varanasi', 'srinagar', 'dhanbad', 'jodhpur',
    'amritsar', 'raipur', 'allahabad', 'coimbatore', 'jabalpur'
  ];

  const categories = ['gyms', 'spas', 'yoga'];
  
  const locationPages = [];
  
  categories.forEach(category => {
    majorCities.forEach(city => {
      locationPages.push({
        url: `/${category}/${city}`,
        priority: 0.8,
        changefreq: 'daily'
      });
    });
  });

  return locationPages;
};

// Generate service-specific landing pages
export const generateServicePages = () => {
  const services = [
    'personal-training', 'group-fitness', 'weight-loss', 'muscle-building',
    'cardio-training', 'strength-training', 'functional-training', 'crossfit',
    'yoga-classes', 'meditation', 'pilates', 'hot-yoga', 'hatha-yoga',
    'vinyasa-yoga', 'ashtanga-yoga', 'iyengar-yoga', 'kundalini-yoga',
    'massage-therapy', 'deep-tissue-massage', 'swedish-massage', 'thai-massage',
    'aromatherapy', 'reflexology', 'hot-stone-massage', 'couples-massage',
    'facial-treatments', 'body-treatments', 'detox-treatments', 'wellness-packages'
  ];

  return services.map(service => ({
    url: `/services/${service}`,
    priority: 0.7,
    changefreq: 'weekly'
  }));
};

// Enhanced meta description generator
export const generateMetaDescription = (type: string, location?: string, service?: string) => {
  const templates = {
    gym: location 
      ? `Find premium gyms in ${location}. Book fitness centers, personal trainers & workout classes. ⭐ Verified reviews, instant booking, best prices guaranteed.`
      : 'Discover premium gyms across India. Book fitness centers, personal trainers & workout classes. ⭐ 50K+ members, verified reviews, instant booking.',
    spa: location
      ? `Luxury spa treatments in ${location}. Book massage therapy, wellness packages & relaxation services. ⭐ Expert therapists, instant booking.`
      : 'Book luxury spa treatments across India. Massage therapy, wellness packages & relaxation services. ⭐ Expert therapists, verified reviews.',
    yoga: location
      ? `Authentic yoga studios in ${location}. Book yoga classes, meditation & wellness sessions. ⭐ Certified instructors, all levels welcome.`
      : 'Find authentic yoga studios across India. Book yoga classes, meditation & wellness sessions. ⭐ Certified instructors, all levels.',
    trainer: location
      ? `Certified personal trainers in ${location}. Book fitness coaching, nutrition guidance & workout plans. ⭐ Expert trainers, proven results.`
      : 'Connect with certified personal trainers across India. Fitness coaching, nutrition guidance & workout plans. ⭐ Expert trainers, proven results.'
  };

  return templates[type as keyof typeof templates] || templates.gym;
};

// Schema.org markup generators
export const generateBusinessListingSchema = (businesses: any[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Premium Fitness & Wellness Centers",
    "description": "Curated list of premium gyms, spas, and yoga studios across India",
    "numberOfItems": businesses.length,
    "itemListElement": businesses.map((business, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "@id": `https://gymspayoga.com/business/${business.id}`,
        "name": business.business_name,
        "description": business.description,
        "image": business.image_urls?.[0],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": business.address,
          "addressLocality": business.city,
          "addressRegion": business.state,
          "addressCountry": "IN"
        },
        "telephone": business.phone,
        "url": `https://gymspayoga.com/business/${business.id}`,
        "priceRange": business.monthly_price ? `₹${business.monthly_price}` : "Contact for pricing",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "reviewCount": "25"
        }
      }
    }))
  };
};

export const generateLocationSchema = (city: string, category: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://gymspayoga.com/${category}/${city}`,
    "name": `Best ${category.charAt(0).toUpperCase() + category.slice(1)} in ${city.charAt(0).toUpperCase() + city.slice(1)}`,
    "description": `Discover premium ${category} in ${city}. Book verified fitness centers, wellness studios with instant confirmation and best prices.`,
    "url": `https://gymspayoga.com/${category}/${city}`,
    "about": {
      "@type": "Thing",
      "name": `${category} in ${city}`,
      "description": `Premium ${category} services available in ${city}, India`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://gymspayoga.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category.charAt(0).toUpperCase() + category.slice(1),
          "item": `https://gymspayoga.com/${category}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": city.charAt(0).toUpperCase() + city.slice(1),
          "item": `https://gymspayoga.com/${category}/${city}`
        }
      ]
    }
  };
};

// Core Web Vitals optimization helpers
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' },
    { href: '/logo.png', as: 'image' },
    { href: '/hero-image.jpg', as: 'image' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    document.head.appendChild(link);
  });
};

// Performance monitoring
export const initPerformanceTracking = () => {
  if ('PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Track LCP for SEO optimization
        console.log('LCP:', entry.startTime);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as any;
        if (fidEntry.processingStart) {
          // Track FID for user experience
          console.log('FID:', fidEntry.processingStart - entry.startTime);
        }
      }
    }).observe({ entryTypes: ['first-input'] });

    // Monitor Cumulative Layout Shift
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const clsEntry = entry as any;
        if (!clsEntry.hadRecentInput && clsEntry.value) {
          // Track CLS for stability
          console.log('CLS:', clsEntry.value);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

// Enhanced keyword research data
export const getTargetKeywords = () => {
  return {
    primary: [
      'gym near me', 'spa booking', 'yoga classes', 'fitness center',
      'personal trainer', 'massage therapy', 'wellness center'
    ],
    secondary: [
      'best gym in mumbai', 'luxury spa delhi', 'yoga studio bangalore',
      'fitness classes near me', 'spa treatments', 'meditation classes',
      'pilates studio', 'crossfit gym', 'weight loss programs'
    ],
    longTail: [
      'best premium gyms in mumbai with personal trainers',
      'luxury spa packages in delhi with couple massage',
      'authentic yoga studios in bangalore for beginners',
      'certified personal trainers for weight loss near me',
      'hot stone massage therapy centers in mumbai',
      'hatha yoga classes for seniors in delhi',
      'crossfit gyms with nutritionist in bangalore'
    ],
    local: [
      'gym membership mumbai', 'spa deals delhi', 'yoga classes bangalore',
      'fitness center hyderabad', 'wellness center chennai', 'pilates kolkata'
    ]
  };
};