
// SEO utility functions for better search rankings
export const generateBusinessSchema = (business: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.business_name,
    "description": business.description,
    "image": business.image_urls || [],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address,
      "addressLocality": business.city,
      "addressRegion": business.state,
      "postalCode": business.postal_code,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": business.latitude,
      "longitude": business.longitude
    },
    "telephone": business.phone,
    "email": business.email,
    "url": `${window.location.origin}/business/${business.id}`,
    "openingHours": `Mo-Su ${business.opening_time}-${business.closing_time}`,
    "priceRange": business.monthly_price ? `₹${business.monthly_price}` : "Contact for pricing",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "50"
    }
  };
};

export const generateTrainerSchema = (trainer: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${window.location.origin}/trainer/${trainer.id}`,
    "name": trainer.full_name,
    "description": trainer.bio,
    "image": trainer.profile_image_url,
    "jobTitle": "Personal Trainer",
    "worksFor": {
      "@type": "Organization",
      "name": "GymSpaYoga"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": trainer.city,
      "addressRegion": trainer.state,
      "addressCountry": "IN"
    },
    "telephone": trainer.phone,
    "email": trainer.email,
    "hasCredential": trainer.certifications?.map((cert: string) => ({
      "@type": "EducationalOccupationalCredential",
      "name": cert
    })),
    "offers": {
      "@type": "Offer",
      "price": trainer.session_price,
      "priceCurrency": "INR",
      "description": "Personal Training Session"
    }
  };
};

export const generateBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateArticleSchema = (article: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.featured_image,
    "author": {
      "@type": "Person",
      "name": article.author_name
    },
    "publisher": {
      "@type": "Organization",
      "name": "GymSpaYoga",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`
      }
    },
    "datePublished": article.created_at,
    "dateModified": article.updated_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${window.location.origin}/blog/${article.slug}`
    }
  };
};

// Generate canonical URL
export const getCanonicalUrl = (path: string) => {
  return `${window.location.origin}${path}`;
};

// Generate Open Graph meta tags
export const generateOGTags = (data: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}) => {
  return {
    'og:title': data.title,
    'og:description': data.description,
    'og:image': data.image || `${window.location.origin}/api/placeholder/1200/630`,
    'og:url': data.url || window.location.href,
    'og:type': data.type || 'website',
    'og:site_name': 'GymSpaYoga'
  };
};

// Generate Twitter Card meta tags
export const generateTwitterTags = (data: {
  title: string;
  description: string;
  image?: string;
}) => {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': data.title,
    'twitter:description': data.description,
    'twitter:image': data.image || `${window.location.origin}/api/placeholder/1200/630`
  };
};
