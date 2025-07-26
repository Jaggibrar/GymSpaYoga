import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AdvancedSEOManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Performance optimizations for Core Web Vitals
    const optimizeImages = () => {
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach((img) => {
        // Add lazy loading for better performance
        img.setAttribute('loading', 'lazy');
        
        // Add proper alt tags if missing
        if (!img.hasAttribute('alt')) {
          const src = img.getAttribute('src') || '';
          if (src.includes('gym')) {
            img.setAttribute('alt', 'Premium gym facility for fitness training');
          } else if (src.includes('spa')) {
            img.setAttribute('alt', 'Luxury spa treatment and wellness services');
          } else if (src.includes('yoga')) {
            img.setAttribute('alt', 'Authentic yoga studio for meditation and wellness');
          } else if (src.includes('trainer')) {
            img.setAttribute('alt', 'Certified personal trainer for fitness coaching');
          } else {
            img.setAttribute('alt', 'GymSpaYoga wellness and fitness services');
          }
        }
      });
    };

    // Add structured data for better search results
    const addPageSpecificStructuredData = () => {
      const path = location.pathname;
      let structuredData = {};

      if (path === '/') {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://gymspayoga.com/#webpage",
          "url": "https://gymspayoga.com/",
          "name": "GymSpaYoga - India's Premium Wellness Marketplace",
          "description": "Find and book premium gyms, luxury spas, yoga studios and certified trainers across India",
          "mainEntity": {
            "@type": "WebSite",
            "@id": "https://gymspayoga.com/#website"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://gymspayoga.com/"
              }
            ]
          }
        };
      } else if (path.startsWith('/gyms')) {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `https://gymspayoga.com${path}#webpage`,
          "url": `https://gymspayoga.com${path}`,
          "name": "Find Premium Gyms Near You - GymSpaYoga",
          "description": "Discover and book premium gym memberships across India with verified reviews and expert trainers",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Premium Gyms in India",
            "description": "Curated list of premium fitness centers and gyms"
          }
        };
      } else if (path.startsWith('/spas')) {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `https://gymspayoga.com${path}#webpage`,
          "url": `https://gymspayoga.com${path}`,
          "name": "Luxury Spa Treatments & Wellness Services - GymSpaYoga",
          "description": "Book premium spa treatments, massage therapy and wellness services at luxury spas across India",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Luxury Spas in India",
            "description": "Premium spa and wellness centers offering professional treatments"
          }
        };
      } else if (path.startsWith('/yoga')) {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `https://gymspayoga.com${path}#webpage`,
          "url": `https://gymspayoga.com${path}`,
          "name": "Authentic Yoga Studios & Classes - GymSpaYoga",
          "description": "Find authentic yoga studios and certified instructors for traditional yoga practices and meditation",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Yoga Studios in India",
            "description": "Authentic yoga centers with certified instructors"
          }
        };
      } else if (path.startsWith('/trainers')) {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `https://gymspayoga.com${path}#webpage`,
          "url": `https://gymspayoga.com${path}`,
          "name": "Certified Personal Trainers - GymSpaYoga",
          "description": "Connect with certified personal trainers and fitness experts for personalized workout plans",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Personal Trainers in India",
            "description": "Certified fitness trainers and wellness coaches"
          }
        };
      }

      // Remove existing page-specific structured data
      const existingScript = document.querySelector('script[data-page-schema]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      if (Object.keys(structuredData).length > 0) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-page-schema', 'true');
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    };

    // Optimize meta descriptions based on page
    const optimizeMetaDescriptions = () => {
      const path = location.pathname;
      let metaDescription = '';

      if (path === '/') {
        metaDescription = '🏋️‍♂️ Find & book premium gyms, luxury spas & authentic yoga studios across India. ⭐ 50,000+ happy members, 1000+ locations. Book instantly with verified reviews, expert trainers & exclusive wellness packages.';
      } else if (path.startsWith('/gyms')) {
        metaDescription = 'Find premium gyms near you with state-of-the-art equipment, expert trainers, and flexible memberships. Book instantly with verified reviews and competitive pricing across India.';
      } else if (path.startsWith('/spas')) {
        metaDescription = 'Book luxury spa treatments and wellness services at premium spas across India. Professional massage therapy, facial treatments, and holistic wellness experiences await.';
      } else if (path.startsWith('/yoga')) {
        metaDescription = 'Discover authentic yoga studios with certified instructors offering traditional yoga practices, meditation sessions, and spiritual wellness programs across India.';
      } else if (path.startsWith('/trainers')) {
        metaDescription = 'Connect with certified personal trainers and fitness experts for customized workout plans, nutrition guidance, and achieving your fitness goals.';
      }

      if (metaDescription) {
        let metaTag = document.querySelector('meta[name="description"]');
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('name', 'description');
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', metaDescription);
      }
    };

    // Add Open Graph tags for social sharing
    const optimizeOpenGraph = () => {
      const path = location.pathname;
      const baseUrl = 'https://gymspayoga.com';
      
      const ogTags = [
        { property: 'og:url', content: `${baseUrl}${path}` },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'GymSpaYoga' },
        { property: 'og:locale', content: 'en_IN' }
      ];

      ogTags.forEach(({ property, content }) => {
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('property', property);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', content);
      });
    };

    // Add preload for critical resources
    const addCriticalResourcePreloads = () => {
      const preloads = [
        { href: 'https://fonts.googleapis.com', as: 'connect', crossorigin: 'anonymous' },
        { href: 'https://images.unsplash.com', as: 'connect', crossorigin: 'anonymous' }
      ];

      preloads.forEach(({ href, as, crossorigin }) => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = href;
          if (crossorigin) link.crossOrigin = crossorigin;
          document.head.appendChild(link);
        }
      });
    };

    // Execute optimizations
    const executeOptimizations = () => {
      optimizeImages();
      addPageSpecificStructuredData();
      optimizeMetaDescriptions();
      optimizeOpenGraph();
      addCriticalResourcePreloads();
      
      // Update canonical URL
      let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalTag) {
        canonicalTag = document.createElement('link') as HTMLLinkElement;
        canonicalTag.rel = 'canonical';
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.href = `https://gymspayoga.com${location.pathname}`;
    };

    // Run optimizations after component mount and route changes
    const timeoutId = setTimeout(executeOptimizations, 100);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]);

  useEffect(() => {
    // Track page views for SEO analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname,
      });
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default AdvancedSEOManager;