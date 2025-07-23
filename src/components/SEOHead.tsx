
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'business';
  noindex?: boolean;
  structuredData?: any;
  canonicalUrl?: string;
  alternateUrls?: Array<{href: string; hreflang: string}>;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords = 'gym near me, spa booking, yoga classes, fitness center, wellness, Mumbai gym, Delhi spa, Bangalore yoga, personal trainer, massage therapy, meditation, pilates, crossfit, luxury spa treatments, fitness membership, health club, wellness center, Indian gyms, best spas India, fitness booking platform, wellness marketplace, premium gyms India, luxury spas India, certified yoga instructors', 
  image = 'https://gymspayoga.com/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  noindex = false,
  structuredData,
  canonicalUrl,
  alternateUrls = []
}: SEOHeadProps) => {
  const location = useLocation();
  const fullTitle = title.includes('GymSpaYoga') ? title : `${title} | GymSpaYoga - Best Gyms, Spas & Yoga Studios`;
  
  // Generate proper canonical URL
  const getCanonicalURL = () => {
    if (canonicalUrl) return canonicalUrl;
    if (url && url !== window.location.href) return url;
    
    const baseURL = 'https://gymspayoga.com';
    const path = location.pathname;
    const cleanPath = path === '/' ? path : path.replace(/\/$/, '');
    
    return `${baseURL}${cleanPath}`;
  };
  
  const finalCanonicalUrl = getCanonicalURL();
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="GymSpaYoga" />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="google-site-verification" content="your-google-verification-code" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Alternate URLs for multi-language */}
      {alternateUrls.map((alt, index) => (
        <link key={index} rel="alternate" href={alt.href} hrefLang={alt.hreflang} />
      ))}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content="GymSpaYoga" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@GymSpaYoga" />
      <meta name="twitter:creator" content="@GymSpaYoga" />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#10B981" />
      <meta name="msapplication-TileColor" content="#10B981" />
      <meta name="application-name" content="GymSpaYoga" />
      <meta name="apple-mobile-web-app-title" content="GymSpaYoga" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://api.bigdatacloud.net" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Default Website Structured Data */}
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "GymSpaYoga",
            "description": "Find and book the best gyms, spas, yoga studios, and personal trainers in India. Premium wellness experiences at your fingertips.",
            "url": finalCanonicalUrl,
            "logo": `${new URL(finalCanonicalUrl).origin}/logo.png`,
            "sameAs": [
              "https://facebook.com/gymspayoga",
              "https://instagram.com/gymspayoga",
              "https://twitter.com/gymspayoga",
              "https://linkedin.com/company/gymspayoga"
            ],
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${new URL(finalCanonicalUrl).origin}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            },
            "serviceType": ["Fitness Center", "Spa", "Yoga Studio"],
            "areaServed": {
              "@type": "Country",
              "name": "India"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Wellness Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Gym Membership",
                    "serviceType": "Fitness",
                    "description": "Access to premium gyms and fitness centers"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Spa Treatment",
                    "serviceType": "Wellness",
                    "description": "Luxury spa treatments and massage therapy"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Yoga Classes",
                    "serviceType": "Fitness",
                    "description": "Yoga classes and meditation sessions"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Personal Training",
                    "serviceType": "Fitness",
                    "description": "One-on-one personal training sessions"
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
