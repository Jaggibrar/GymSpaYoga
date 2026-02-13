import React from 'react';
import { Helmet } from 'react-helmet-async';

// Generate nested LocalBusiness schema with proper subtype
export const generateAdvancedBusinessSchema = (business: any) => {
  const baseUrl = 'https://gymspayoga.com';
  
  // Map business_type to schema.org type
  const getSchemaType = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'gym': return ['LocalBusiness', 'HealthClub', 'SportsActivityLocation'];
      case 'spa': return ['LocalBusiness', 'DaySpa', 'HealthAndBeautyBusiness'];
      case 'yoga':
      case 'yoga_studio': return ['LocalBusiness', 'ExerciseGym', 'SportsActivityLocation'];
      case 'therapist': return ['LocalBusiness', 'HealthAndBeautyBusiness'];
      case 'chiropractor': return ['LocalBusiness', 'Physician', 'MedicalBusiness'];
      default: return ['LocalBusiness'];
    }
  };

  const types = getSchemaType(business.business_type);
  const reviewCount = business.review_count || 0;
  const slug = business.slug || business.id;
  
  const typeRoute: Record<string, string> = {
    gym: 'gyms', spa: 'spas', yoga: 'yoga', yoga_studio: 'yoga',
    therapist: 'therapists', chiropractor: 'chiropractors'
  };
  const route = typeRoute[business.business_type?.toLowerCase()] || 'business';

  const schema: any = {
    "@context": "https://schema.org",
    "@type": types,
    "name": business.business_name,
    "description": business.description,
    "image": business.image_urls?.[0],
    "telephone": business.phone,
    "email": business.email,
    "url": `${baseUrl}/${route}/${slug}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address,
      "addressLocality": business.city,
      "addressRegion": business.state,
      "postalCode": business.pin_code,
      "addressCountry": "IN"
    },
    "priceRange": business.session_price 
      ? `₹${business.session_price}` 
      : business.monthly_price 
        ? `₹${business.monthly_price}/mo` 
        : "$$",
  };

  // Only add AggregateRating if there are reviews
  if (reviewCount > 0 && business.rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": business.rating,
      "reviewCount": reviewCount,
      "bestRating": 5,
      "worstRating": 1
    };
  }

  // Opening hours
  if (business.opening_time && business.closing_time) {
    schema.openingHoursSpecification = {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": business.opening_time,
      "closes": business.closing_time
    };
  }

  // Amenities as offered services
  if (business.amenities?.length > 0) {
    schema.amenityFeature = business.amenities.map((amenity: string) => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity,
      "value": true
    }));
  }

  return schema;
};

// Generate BreadcrumbList schema
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

// Generate FAQPage schema
export const generateFAQPageSchema = (faqs: Array<{ question: string; answer: string }>) => ({
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
});

// Component to inject multiple schemas
interface AdvancedSchemaProps {
  schemas: any[];
}

const AdvancedSchemaInjector: React.FC<AdvancedSchemaProps> = ({ schemas }) => (
  <Helmet>
    {schemas.filter(Boolean).map((schema, i) => (
      <script key={i} type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    ))}
  </Helmet>
);

export default AdvancedSchemaInjector;
