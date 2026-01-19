// Enhanced Schema Markup Generator for SEO

import { INDIAN_CITIES, SERVICE_CATEGORIES, SEO_FAQS } from '@/data/seoData';

interface BusinessData {
  id: string;
  business_name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  pin_code?: string;
  phone?: string;
  email?: string;
  opening_time?: string;
  closing_time?: string;
  monthly_price?: number;
  session_price?: number;
  image_urls?: string[];
  amenities?: string[];
  business_type?: string;
  slug?: string;
}

interface TrainerData {
  id: string;
  name: string;
  bio?: string;
  location?: string;
  phone?: string;
  email?: string;
  hourly_rate?: number;
  experience?: number;
  specializations?: string[];
  certifications?: string;
  profile_image_url?: string;
  category?: string;
}

interface BlogData {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author_name?: string;
  featured_image_url?: string;
  created_at: string;
  updated_at: string;
  category?: string;
  tags?: string[];
}

// Generate LocalBusiness Schema
export const generateLocalBusinessSchema = (business: BusinessData, reviews?: any[]) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gymspayoga.com';
  const businessType = getSchemaBusinessType(business.business_type);
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': businessType,
    '@id': `${baseUrl}/${business.business_type}s/${business.slug || business.id}`,
    name: business.business_name,
    description: business.description || `${business.business_name} - Premium ${business.business_type} in ${business.city}`,
    url: `${baseUrl}/${business.business_type}s/${business.slug || business.id}`,
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.pin_code,
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: business.opening_time || '06:00',
      closes: business.closing_time || '22:00',
    },
    priceRange: getPriceRange(business.monthly_price || business.session_price),
    image: business.image_urls?.[0] || `${baseUrl}/placeholder.svg`,
    sameAs: [],
  };

  // Add aggregate rating if reviews exist
  if (reviews && reviews.length > 0) {
    const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 4), 0) / reviews.length;
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    };
  }

  // Add amenities as offered services
  if (business.amenities && business.amenities.length > 0) {
    schema.amenityFeature = business.amenities.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    }));
  }

  return schema;
};

// Generate Person Schema for Trainers
export const generateTrainerSchema = (trainer: TrainerData) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gymspayoga.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/trainers/${trainer.id}`,
    name: trainer.name,
    description: trainer.bio,
    image: trainer.profile_image_url,
    jobTitle: 'Personal Trainer',
    url: `${baseUrl}/trainers/${trainer.id}`,
    telephone: trainer.phone,
    email: trainer.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: trainer.location,
      addressCountry: 'IN',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'GymSpaYoga',
      url: baseUrl,
    },
    hasCredential: trainer.certifications ? [{
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Fitness Certification',
      name: trainer.certifications,
    }] : undefined,
    knowsAbout: trainer.specializations?.map(spec => ({
      '@type': 'Thing',
      name: spec,
    })),
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: trainer.hourly_rate,
        priceCurrency: 'INR',
        unitText: 'HOUR',
      },
      description: 'Personal Training Session',
    },
  };
};

// Generate Article Schema for Blog Posts
export const generateArticleSchema = (blog: BlogData) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gymspayoga.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}/blog/${blog.slug}`,
    headline: blog.title,
    description: blog.excerpt || blog.content.substring(0, 160),
    image: blog.featured_image_url || `${baseUrl}/placeholder.svg`,
    datePublished: blog.created_at,
    dateModified: blog.updated_at,
    author: {
      '@type': 'Person',
      name: blog.author_name || 'GymSpaYoga Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GymSpaYoga',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/lovable-uploads/04d91ea0-0319-4c44-a2cc-25bbf4d6b004.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${blog.slug}`,
    },
    keywords: blog.tags?.join(', '),
    articleSection: blog.category,
  };
};

// Generate FAQ Schema
export const generateFAQSchema = (category: string, city?: string) => {
  const faqs = SEO_FAQS[category as keyof typeof SEO_FAQS] || [];
  const cityName = city || 'India';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question.replace(/{city}/g, cityName),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace(/{city}/g, cityName),
      },
    })),
  };
};

// Generate BreadcrumbList Schema
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

// Generate ItemList Schema for Listing Pages
export const generateItemListSchema = (
  items: Array<{ name: string; url: string; image?: string; position: number }>,
  listName: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      url: item.url,
      name: item.name,
      image: item.image,
    })),
  };
};

// Generate WebPage Schema for City/Area Pages
export const generateWebPageSchema = (
  title: string,
  description: string,
  url: string,
  category: string,
  city?: string
) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gymspayoga.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': url,
    name: title,
    description: description,
    url: url,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      name: 'GymSpaYoga',
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: `${category} in ${city || 'India'}`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/hero-banner.png`,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: category, item: `${baseUrl}/${category.toLowerCase()}` },
        ...(city ? [{ '@type': 'ListItem', position: 3, name: city, item: url }] : []),
      ],
    },
  };
};

// Generate Organization Schema
export const generateOrganizationSchema = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gymspayoga.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'GymSpaYoga',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/lovable-uploads/04d91ea0-0319-4c44-a2cc-25bbf4d6b004.png`,
      width: 200,
      height: 60,
    },
    description: 'India\'s leading platform for discovering and booking gyms, spas, yoga studios, personal trainers, and wellness services.',
    foundingDate: '2024',
    founders: [{
      '@type': 'Person',
      name: 'Jagdeep Singh',
    }],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: '+91-XXXXXXXXXX',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    }],
    sameAs: [
      'https://www.facebook.com/gymspayoga',
      'https://www.instagram.com/gymspayoga',
      'https://twitter.com/gymspayoga',
      'https://www.linkedin.com/company/gymspayoga',
    ],
  };
};

// Generate WebSite Schema with SearchAction
export const generateWebSiteSchema = () => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gymspayoga.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'GymSpaYoga',
    url: baseUrl,
    description: 'Discover and book the best gyms, spas, yoga studios, and personal trainers in India.',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/explore?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-IN',
  };
};

// Helper Functions
function getSchemaBusinessType(businessType?: string): string {
  const typeMap: Record<string, string> = {
    gym: 'HealthClub',
    spa: 'HealthAndBeautyBusiness',
    yoga: 'HealthClub',
    therapist: 'MedicalBusiness',
  };
  return typeMap[businessType || 'gym'] || 'LocalBusiness';
}

function getPriceRange(price?: number): string {
  if (!price) return '₹₹';
  if (price < 2000) return '₹';
  if (price < 5000) return '₹₹';
  if (price < 10000) return '₹₹₹';
  return '₹₹₹₹';
}

// Generate all schemas for a page
export const generatePageSchemas = (
  pageType: 'home' | 'category' | 'listing' | 'blog' | 'city',
  data?: any
) => {
  const schemas: any[] = [];
  
  schemas.push(generateOrganizationSchema());
  schemas.push(generateWebSiteSchema());
  
  switch (pageType) {
    case 'category':
      if (data?.category && data?.city) {
        schemas.push(generateFAQSchema(data.category, data.city));
      }
      break;
    case 'listing':
      if (data?.business) {
        schemas.push(generateLocalBusinessSchema(data.business, data.reviews));
      }
      break;
    case 'blog':
      if (data?.blog) {
        schemas.push(generateArticleSchema(data.blog));
      }
      break;
  }
  
  return schemas;
};
