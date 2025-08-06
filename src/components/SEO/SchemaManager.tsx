import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaManagerProps {
  schemaData: any;
}

const SchemaManager: React.FC<SchemaManagerProps> = ({ schemaData }) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

// Common schema generators
export const generateWebPageSchema = (page: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": page.name,
  "description": page.description,
  "url": page.url,
  "breadcrumb": page.breadcrumbs ? {
    "@type": "BreadcrumbList",
    "itemListElement": page.breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : undefined,
  "mainEntity": {
    "@type": "WebSite",
    "name": "GymSpaYoga.com",
    "url": "https://gymspayyoga.com"
  }
});

export const generateBusinessSchema = (business: any) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": business.business_name,
  "description": business.description,
  "image": business.image_urls?.[0],
  "telephone": business.phone,
  "email": business.email,
  "url": `https://gymspayyoga.com/business/${business.id}`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": business.address,
    "addressLocality": business.city,
    "addressRegion": business.state,
    "postalCode": business.pin_code,
    "addressCountry": "IN"
  },
  "geo": business.latitude && business.longitude ? {
    "@type": "GeoCoordinates",
    "latitude": business.latitude,
    "longitude": business.longitude
  } : undefined,
  "openingHours": business.opening_time && business.closing_time ? 
    `Mo-Su ${business.opening_time}-${business.closing_time}` : undefined,
  "priceRange": business.session_price ? `₹${business.session_price}` : "$$",
  "aggregateRating": business.rating ? {
    "@type": "AggregateRating",
    "ratingValue": business.rating,
    "reviewCount": business.review_count || 1
  } : undefined
});

export const generateTrainerSchema = (trainer: any) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": trainer.full_name,
  "description": trainer.bio,
  "image": trainer.avatar_url,
  "telephone": trainer.phone,
  "email": trainer.email,
  "url": `https://gymspayyoga.com/trainers/${trainer.id}`,
  "jobTitle": trainer.specializations?.join(', ') || 'Fitness Trainer',
  "worksFor": {
    "@type": "Organization",
    "name": "GymSpaYoga.com"
  },
  "address": trainer.city ? {
    "@type": "PostalAddress",
    "addressLocality": trainer.city,
    "addressCountry": "IN"
  } : undefined,
  "offers": trainer.session_price ? {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": trainer.session_price,
    "description": "Personal training session"
  } : undefined
});

export const generateBlogSchema = (blog: any) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": blog.title,
  "description": blog.excerpt || blog.content?.substring(0, 160),
  "image": blog.featured_image,
  "author": {
    "@type": "Person",
    "name": blog.author_name || "GymSpaYoga Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "GymSpaYoga.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://gymspayyoga.com/logo.png"
    }
  },
  "datePublished": blog.created_at,
  "dateModified": blog.updated_at || blog.created_at,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://gymspayyoga.com/blog/${blog.slug}`
  }
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
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

export default SchemaManager;