import { Helmet } from 'react-helmet-async';

interface ListingSchemaProps {
  business: {
    id: string;
    slug?: string;
    business_name: string;
    description?: string;
    business_type: 'gym' | 'spa' | 'yoga' | string;
    address?: string;
    city?: string;
    state?: string;
    pin_code?: string;
    phone?: string;
    email?: string;
    opening_time?: string;
    closing_time?: string;
    session_price?: number;
    monthly_price?: number;
    image_urls?: string[];
    amenities?: string[];
  };
  rating?: number;
  reviewCount?: number;
  reviews?: Array<{ rating: number; comment?: string; user_name?: string; created_at?: string }>;
}

const typeMap: Record<string, string> = {
  gym: 'SportsActivityLocation',
  spa: 'HealthAndBeautyBusiness',
  yoga: 'SportsActivityLocation',
};

const slugFor = (t: string) => (t === 'gym' ? 'gyms' : t === 'spa' ? 'spas' : t === 'yoga' ? 'yoga' : t);

export const ListingSchema = ({ business, rating = 4.8, reviewCount = 24, reviews = [] }: ListingSchemaProps) => {
  const schemaType = typeMap[business.business_type] || 'LocalBusiness';
  const url = `https://gymspayoga.com/${slugFor(business.business_type)}/${business.slug || business.id}`;

  const lowPrice = business.session_price || business.monthly_price || undefined;
  const highPrice = business.monthly_price || business.session_price || undefined;

  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: business.business_name,
    description: business.description || `${business.business_name} — verified ${business.business_type} on GymSpaYoga`,
    url,
    image: business.image_urls?.slice(0, 5) || [],
    telephone: business.phone,
    email: business.email,
    address: business.address ? {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.pin_code,
      addressCountry: 'IN',
    } : undefined,
    openingHours: business.opening_time && business.closing_time ? `Mo-Su ${business.opening_time}-${business.closing_time}` : undefined,
    priceRange: lowPrice && highPrice ? `₹${lowPrice} - ₹${highPrice}` : '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, UPI',
    amenityFeature: business.amenities?.map(a => ({ '@type': 'LocationFeatureSpecification', name: a })) || undefined,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toFixed(1),
      reviewCount: Math.max(reviewCount, 1),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.slice(0, 5).map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.user_name || 'Verified Customer' },
      datePublished: r.created_at,
      reviewBody: r.comment,
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: '5', worstRating: '1' },
    })),
    makesOffer: [
      business.session_price ? {
        '@type': 'Offer',
        name: 'Single Session',
        price: business.session_price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      } : null,
      business.monthly_price ? {
        '@type': 'Offer',
        name: 'Monthly Membership',
        price: business.monthly_price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      } : null,
    ].filter(Boolean),
  };

  // Strip undefined to keep JSON-LD clean
  Object.keys(schema).forEach(k => schema[k] === undefined && delete schema[k]);

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default ListingSchema;
