
// Dynamic sitemap generation for better SEO
export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemapXML = (urls: SitemapUrl[]): string => {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  const urlElements = urls.map(url => {
    return `
<url>
  <loc>${url.loc}</loc>
  ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
  ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
  ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  <mobile:mobile/>
</url>`;
  }).join('');

  return `${header}${urlElements}
</urlset>`;
};

export const getStaticUrls = (baseUrl: string): SitemapUrl[] => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return [
    // Homepage
    {
      loc: `${baseUrl}/`,
      changefreq: 'daily',
      priority: 1.0,
      lastmod: currentDate
    },
    // Main Service Pages
    {
      loc: `${baseUrl}/gyms`,
      changefreq: 'daily',
      priority: 0.9,
      lastmod: currentDate
    },
    {
      loc: `${baseUrl}/spas`,
      changefreq: 'daily',
      priority: 0.9,
      lastmod: currentDate
    },
    {
      loc: `${baseUrl}/yoga`,
      changefreq: 'daily',
      priority: 0.9,
      lastmod: currentDate
    },
    {
      loc: `${baseUrl}/trainers`,
      changefreq: 'daily',
      priority: 0.9,
      lastmod: currentDate
    },
    {
      loc: `${baseUrl}/explore`,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: currentDate
    },
    // Business Pages
    {
      loc: `${baseUrl}/register-business`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: currentDate
    },
    {
      loc: `${baseUrl}/register-trainer`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: currentDate
    },
    // Information Pages
    {
      loc: `${baseUrl}/about`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: currentDate
    },
    {
      loc: `${baseUrl}/pricing`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: currentDate
    },
    {
      loc: `${baseUrl}/support`,
      changefreq: 'weekly',
      priority: 0.6,
      lastmod: currentDate
    },
    {
      loc: `${baseUrl}/blogs`,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: currentDate
    }
  ];
};

// Generate location-based URLs for better local SEO (global cities)
export const getLocationUrls = (baseUrl: string): SitemapUrl[] => {
  // Import dynamically won't work in utility, so we define key global cities here
  const globalCities = [
    // India
    'mumbai', 'delhi', 'bangalore', 'hyderabad', 'pune', 'chennai', 'kolkata', 'ahmedabad', 'jaipur', 'lucknow', 'chandigarh', 'goa', 'noida', 'gurgaon', 'indore', 'kochi', 'bhopal', 'nagpur', 'coimbatore', 'surat', 'patna', 'vadodara', 'mysore',
    // USA
    'new-york', 'los-angeles', 'chicago', 'houston', 'miami', 'san-francisco', 'seattle', 'boston', 'austin', 'denver', 'san-diego', 'dallas', 'atlanta', 'philadelphia', 'phoenix', 'las-vegas', 'portland', 'nashville', 'washington-dc', 'honolulu', 'scottsdale',
    // UK
    'london', 'manchester', 'birmingham', 'edinburgh', 'glasgow', 'bristol', 'liverpool', 'leeds', 'brighton', 'bath',
    // UAE
    'dubai', 'abu-dhabi', 'sharjah',
    // Canada
    'toronto', 'vancouver', 'montreal', 'calgary', 'ottawa',
    // Australia
    'sydney', 'melbourne', 'brisbane', 'perth', 'gold-coast',
    // Europe
    'paris', 'berlin', 'amsterdam', 'barcelona', 'madrid', 'rome', 'milan', 'lisbon', 'vienna', 'prague', 'dublin', 'stockholm', 'copenhagen', 'helsinki', 'zurich', 'munich', 'budapest',
    // Asia
    'singapore', 'tokyo', 'seoul', 'bangkok', 'kuala-lumpur', 'hong-kong', 'shanghai', 'taipei', 'bali', 'ho-chi-minh-city',
    // Latin America
    'mexico-city', 'sao-paulo', 'rio-de-janeiro', 'buenos-aires', 'bogota', 'medellin', 'cancun', 'tulum',
    // Africa
    'cape-town', 'nairobi', 'lagos', 'cairo', 'marrakech',
    // Oceania
    'auckland', 'queenstown',
  ];
  const services = ['gyms', 'spas', 'yoga-classes'];
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [];
  
  services.forEach(service => {
    globalCities.forEach(city => {
      urls.push({
        loc: `${baseUrl}/${service}-in-${city}`,
        changefreq: 'daily',
        priority: 0.85,
        lastmod: currentDate
      });
    });
  });
  
  return urls;
};

// SEO-friendly URL generation
export const generateSEOFriendlyUrl = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Meta description generator
export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  const cleaned = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  
  const truncated = cleaned.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  return lastSpaceIndex > 0 
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated.substring(0, maxLength - 3) + '...';
};

// Generate FAQ schema
export const generateFAQSchema = (faqs: Array<{question: string; answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};
