import { Helmet } from 'react-helmet-async';

interface BusinessDataProps {
  business: {
    id: string;
    business_name: string;
    description?: string;
    business_type: string;
    address: string;
    city: string;
    state: string;
    pin_code: string;
    phone: string;
    email: string;
    opening_time: string;
    closing_time: string;
    session_price?: number;
    monthly_price?: number;
    image_urls?: string[];
    amenities?: string[];
  };
  reviews?: Array<{
    rating: number;
    comment: string;
    user_name: string;
    created_at: string;
  }>;
}

export const BusinessStructuredData = ({ business, reviews = [] }: BusinessDataProps) => {
  const businessType = business.business_type;
  let schemaType = "LocalBusiness";
  
  // Map business types to appropriate schema types
  switch (businessType) {
    case 'gym':
      schemaType = "SportsActivityLocation";
      break;
    case 'spa':
      schemaType = "BeautySalon";
      break;
    case 'yoga':
      schemaType = "SportsActivityLocation";
      break;
    default:
      schemaType = "LocalBusiness";
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 5;

  const businessData = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": business.business_name,
    "description": business.description || `Premium ${businessType} services at ${business.business_name}`,
    "url": `https://gymspayyoga.com/${businessType}s/${business.id}`,
    "image": business.image_urls?.[0] || "/default-business-image.jpg",
    "telephone": business.phone,
    "email": business.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address,
      "addressLocality": business.city,
      "addressRegion": business.state,
      "postalCode": business.pin_code,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.5937",
      "longitude": "78.9629"
    },
    "openingHours": `Mo-Su ${business.opening_time}-${business.closing_time}`,
    "priceRange": business.session_price ? `₹${business.session_price} - ₹${business.monthly_price || business.session_price * 30}` : "$$",
    "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Digital Wallet",
    "currenciesAccepted": "INR",
    "amenityFeature": business.amenities?.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    })) || [],
    "aggregateRating": reviews.length > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "review": reviews.slice(0, 5).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.user_name
      },
      "datePublished": review.created_at,
      "reviewBody": review.comment,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      }
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${business.business_name} Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": businessType === 'gym' ? "Fitness Training" : 
                   businessType === 'spa' ? "Spa Treatments" : "Yoga Classes"
          }
        }
      ]
    }
  };

  // Add specific properties based on business type
  if (businessType === 'gym') {
    Object.assign(businessData, {
      "sportsActivityLocation": "Gym",
      "sport": "Fitness"
    });
  } else if (businessType === 'spa') {
    Object.assign(businessData, {
      "serviceType": "Beauty and Wellness"
    });
  } else if (businessType === 'yoga') {
    Object.assign(businessData, {
      "sportsActivityLocation": "Yoga Studio",
      "sport": "Yoga"
    });
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(businessData)}
      </script>
    </Helmet>
  );
};