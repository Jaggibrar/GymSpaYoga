import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
  canonical?: string;
  noindex?: boolean;
  structuredData?: any;
  breadcrumbs?: Array<{name: string; url: string}>;
}

export const AdvancedSEOManager = ({
  title = "GymSpaYoga.com - Premium Fitness, Spa & Yoga Services",
  description = "Discover top-rated gyms, luxury spas, and expert yoga instructors near you. Book verified fitness trainers, wellness treatments, and yoga classes. Your wellness journey starts here.",
  keywords = "gym, spa, yoga, fitness trainer, wellness, meditation, massage, yoga classes, personal trainer, fitness center, spa treatments, holistic health",
  image = "/og-image.jpg",
  article = false,
  canonical,
  noindex = false,
  structuredData,
  breadcrumbs
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = `https://gymspayoga.com${location.pathname}`;
  const canonicalUrl = canonical || currentUrl;
  
  // Default structured data for the website
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GymSpaYoga.com",
    "description": description,
    "url": "https://gymspayoga.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://gymspayoga.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GymSpaYoga.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gymspayoga.com/logo.png"
      }
    }
  };

  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GymSpaYoga.com",
    "url": "https://gymspayoga.com",
    "logo": "https://gymspayoga.com/logo.png",
    "description": "Premier platform connecting users with verified fitness trainers, spa services, and yoga instructors",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.facebook.com/gymspayyoga",
      "https://www.instagram.com/gymspayyoga",
      "https://www.twitter.com/gymspayyoga",
      "https://www.linkedin.com/company/gymspayyoga"
    ]
  };

  // Breadcrumb structured data
  const breadcrumbData = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://gymspayoga.com${crumb.url}`
    }))
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="GymSpaYoga.com" />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"} />
      <meta name="googlebot" content="index,follow" />
      <meta name="bingbot" content="index,follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="GymSpaYoga.com" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@gymspayyoga" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@gymspayyoga" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#1f2937" />
      <meta name="msapplication-TileColor" content="#1f2937" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="GymSpaYoga" />
      
      {/* Geo Meta Tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="ICBM" content="20.5937, 78.9629" />
      
      {/* Language and Content Tags */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="language" content="English" />
      <meta name="content-type" content="text/html; charset=UTF-8" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://pihmoaogjjiicfnkmpbe.supabase.co" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//google-analytics.com" />
      <link rel="dns-prefetch" href="//googletagmanager.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      
      {breadcrumbData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2310b981'/%3E%3Ctext x='50' y='62' font-size='60' text-anchor='middle' fill='white'%3E%F0%9F%8F%8B%EF%B8%8F%3C/text%3E%3C/svg%3E" />
      <link rel="apple-touch-icon" sizes="180x180" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2310b981'/%3E%3Ctext x='50' y='62' font-size='60' text-anchor='middle' fill='white'%3E%F0%9F%8F%8B%EF%B8%8F%3C/text%3E%3C/svg%3E" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
};