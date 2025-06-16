
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'business';
  noindex?: boolean;
  structuredData?: any;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords = 'gym, spa, yoga, fitness, wellness, booking, health', 
  image = '/api/placeholder/1200/630',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  noindex = false,
  structuredData
}: SEOHeadProps) => {
  const fullTitle = title.includes('GymSpaYoga') ? title : `${title} | GymSpaYoga`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="GymSpaYoga" />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="GymSpaYoga" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#10B981" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Default Structured Data for Local Business */}
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "GymSpaYoga",
            "description": description,
            "url": url,
            "logo": `${url}/logo.png`,
            "serviceType": ["Fitness Center", "Spa", "Yoga Studio"],
            "areaServed": "India",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Wellness Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Gym Membership",
                    "serviceType": "Fitness"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Spa Treatment",
                    "serviceType": "Wellness"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Yoga Classes",
                    "serviceType": "Fitness"
                  }
                }
              ]
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
