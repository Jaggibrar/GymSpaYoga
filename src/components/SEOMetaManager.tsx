import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Comprehensive meta tag management for better SEO
const SEOMetaManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove any duplicate or conflicting meta tags
    const cleanupDuplicateMetas = () => {
      const metaTags = document.querySelectorAll('meta[name], meta[property]');
      const seenTags = new Map();
      
      metaTags.forEach(tag => {
        const key = tag.getAttribute('name') || tag.getAttribute('property');
        if (key) {
          if (seenTags.has(key)) {
            // Remove duplicate
            tag.remove();
          } else {
            seenTags.set(key, tag);
          }
        }
      });
    };

    // Ensure proper language and direction attributes
    const ensureLanguageAttributes = () => {
      if (!document.documentElement.lang) {
        document.documentElement.lang = 'en-IN';
      }
      
      if (!document.documentElement.dir) {
        document.documentElement.dir = 'ltr';
      }
    };

    // Add proper meta tags for indexing
    const ensureIndexingMetas = () => {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (!robotsMeta) {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
        document.head.appendChild(meta);
      }

      // Add geo tags for local SEO
      const existingGeoRegion = document.querySelector('meta[name="geo.region"]');
      if (!existingGeoRegion) {
        const geoRegion = document.createElement('meta');
        geoRegion.name = 'geo.region';
        geoRegion.content = 'IN';
        document.head.appendChild(geoRegion);

        const geoCountry = document.createElement('meta');
        geoCountry.name = 'geo.country';
        geoCountry.content = 'India';
        document.head.appendChild(geoCountry);
      }
    };

    // Fix image alt attributes for better accessibility and SEO
    const fixImageAltAttributes = () => {
      const images = document.querySelectorAll('img:not([alt])');
      images.forEach((img: HTMLImageElement) => {
        const title = img.title || img.getAttribute('data-alt') || 'GymSpaYoga Image';
        img.alt = title;
      });
    };

    // Add structured data for breadcrumbs if not present
    const addBreadcrumbStructuredData = () => {
      const pathSegments = location.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0 && !document.querySelector('script[data-type="breadcrumb"]')) {
        const breadcrumbs = [
          { name: 'Home', url: 'https://gymspayoga.com/' }
        ];

        let currentPath = '';
        pathSegments.forEach((segment, index) => {
          currentPath += `/${segment}`;
          const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
          breadcrumbs.push({
            name,
            url: `https://gymspayoga.com${currentPath}`
          });
        });

        if (breadcrumbs.length > 1) {
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.setAttribute('data-type', 'breadcrumb');
          script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.name,
              "item": item.url
            }))
          });
          document.head.appendChild(script);
        }
      }
    };

    // Execute all SEO enhancements
    cleanupDuplicateMetas();
    ensureLanguageAttributes();
    ensureIndexingMetas();
    fixImageAltAttributes();
    addBreadcrumbStructuredData();

  }, [location.pathname]);

  return null;
};

export default SEOMetaManager;