import { Helmet } from 'react-helmet-async';

interface TrainerDataProps {
  trainer: {
    id: string;
    name: string;
    bio: string;
    category: string;
    trainer_tier: string;
    experience: number;
    hourly_rate: number;
    location: string;
    certifications?: string;
    profile_image_url?: string;
    specializations?: string[];
  };
  reviews?: Array<{
    rating: number;
    comment: string;
    user_name: string;
    created_at: string;
  }>;
}

export const TrainerStructuredData = ({ trainer, reviews = [] }: TrainerDataProps) => {
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 5;

  const trainerData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": trainer.name,
    "description": trainer.bio,
    "url": `https://gymspayyoga.com/trainers/${trainer.id}`,
    "image": trainer.profile_image_url || "/default-trainer-image.jpg",
    "jobTitle": `${trainer.category} Instructor`,
    "worksFor": {
      "@type": "Organization",
      "name": "GymSpaYoga.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": trainer.location,
      "addressCountry": "IN"
    },
    "knowsAbout": trainer.specializations || [trainer.category],
    "hasCredential": trainer.certifications ? {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certification",
      "name": trainer.certifications
    } : undefined,
    "offers": {
      "@type": "Offer",
      "name": `${trainer.category} Training Sessions`,
      "description": `Professional ${trainer.category} training with ${trainer.experience} years of experience`,
      "price": trainer.hourly_rate,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": trainer.hourly_rate,
        "priceCurrency": "INR",
        "description": "Per hour training session"
      }
    },
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
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://gymspayyoga.com/trainers/${trainer.id}`
    }
  };

  // Add service-specific structured data
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${trainer.category} Training by ${trainer.name}`,
    "description": trainer.bio,
    "provider": {
      "@type": "Person",
      "name": trainer.name,
      "image": trainer.profile_image_url
    },
    "serviceType": `${trainer.category} Training`,
    "areaServed": trainer.location,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${trainer.name} Training Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Personal ${trainer.category} Training`,
            "description": `One-on-one ${trainer.category} training sessions`
          },
          "price": trainer.hourly_rate,
          "priceCurrency": "INR"
        }
      ]
    },
    "aggregateRating": reviews.length > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": reviews.length
    } : undefined
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(trainerData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceData)}
      </script>
    </Helmet>
  );
};