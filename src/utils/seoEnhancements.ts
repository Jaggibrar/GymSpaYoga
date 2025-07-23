// Advanced SEO enhancements and fixes

// Fix common SEO issues
export const fixSEOIssues = () => {
  // Remove duplicate meta tags
  const removeDuplicateMetas = () => {
    const metas = document.querySelectorAll('meta[name], meta[property]');
    const seen = new Set();
    
    metas.forEach(meta => {
      const key = meta.getAttribute('name') || meta.getAttribute('property');
      if (key && seen.has(key)) {
        meta.remove();
      } else if (key) {
        seen.add(key);
      }
    });
  };

  // Ensure proper robots meta
  const ensureRobotsTag = () => {
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
      document.head.appendChild(meta);
    }
  };

  // Fix missing alt attributes
  const fixImageAltAttributes = () => {
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach((img: HTMLImageElement) => {
      img.alt = img.title || 'Image from GymSpaYoga';
    });
  };

  // Add structured data for local business
  const addLocalBusinessSchema = () => {
    if (!document.querySelector('script[type="application/ld+json"]')) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "GymSpaYoga",
        "url": "https://gymspayoga.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://gymspayoga.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      });
      document.head.appendChild(script);
    }
  };

  // Execute all fixes
  removeDuplicateMetas();
  ensureRobotsTag();
  fixImageAltAttributes();
  addLocalBusinessSchema();
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: 'https://fonts.googleapis.com', rel: 'preconnect' },
    { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: 'anonymous' },
    { href: 'https://images.unsplash.com', rel: 'preconnect' },
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = resource.rel;
    link.href = resource.href;
    if (resource.crossorigin) {
      link.crossOrigin = resource.crossorigin;
    }
    document.head.appendChild(link);
  });
};

// Performance optimizations for SEO
export const optimizeForSEO = () => {
  // Lazy load images that are not in viewport
  const images = document.querySelectorAll('img');
  images.forEach((img: HTMLImageElement) => {
    if (!img.loading) {
      img.loading = 'lazy';
    }
  });

  // Add missing meta viewport if not present
  if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(meta);
  }

  // Ensure proper language attribute
  if (!document.documentElement.lang) {
    document.documentElement.lang = 'en-IN';
  }
};

// Monitor and fix SEO issues in real-time
export const initSEOMonitoring = () => {
  // Fix issues on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      fixSEOIssues();
      optimizeForSEO();
      preloadCriticalResources();
    });
  } else {
    fixSEOIssues();
    optimizeForSEO();
    preloadCriticalResources();
  }

  // Monitor for dynamic content changes
  const observer = new MutationObserver(() => {
    fixSEOIssues();
    optimizeForSEO();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src', 'alt', 'title']
  });
};

// Generate proper meta descriptions based on content
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  // Remove HTML tags and clean up
  const cleanContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  // Try to cut at a sentence end
  const sentences = cleanContent.split('. ');
  let description = '';
  
  for (const sentence of sentences) {
    if ((description + sentence + '. ').length <= maxLength) {
      description += sentence + '. ';
    } else {
      break;
    }
  }
  
  // If no complete sentences fit, cut at word boundary
  if (!description) {
    description = cleanContent.substring(0, maxLength - 3) + '...';
    const lastSpace = description.lastIndexOf(' ');
    if (lastSpace > 0) {
      description = description.substring(0, lastSpace) + '...';
    }
  }
  
  return description.trim();
};