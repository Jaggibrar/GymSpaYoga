
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: any;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  canonical?: string;
  noindex?: boolean;
}

const SEOHead = ({
  title = "GymSpaYoga - Find Best Gyms, Spas & Yoga Studios Near You | Book Online",
  description = "Discover and book the best gyms, luxury spas, and yoga studios in Mumbai, Delhi, Bangalore. Compare prices, read reviews, and find certified trainers. Start your wellness journey today!",
  keywords = "gym near me, spa booking, yoga classes, fitness center, wellness, personal trainer, Mumbai gyms, spa treatments, yoga studio, fitness membership, gym membership, spa near me, yoga near me",
  image = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
  url = "https://gymspayoga.com/",
  type = "website",
  structuredData,
  author = "GymSpaYoga Team",
  publishedTime,
  modifiedTime,
  section = "Wellness",
  tags = [],
  canonical,
  noindex = false
}: SEOHeadProps) => {
  
  const finalCanonical = canonical || url;
  
  // Generate comprehensive structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://gymspayoga.com/#organization",
        "name": "GymSpaYoga",
        "alternateName": "Gym Spa Yoga",
        "url": "https://gymspayoga.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://gymspayoga.com/logo.png",
          "width": 512,
          "height": 512,
          "caption": "GymSpaYoga Logo"
        },
        "image": {
          "@type": "ImageObject",
          "url": image,
          "width": 1200,
          "height": 630
        },
        "description": description,
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-7596958097",
            "contactType": "customer service",
            "email": "gymspayoga@gmail.com",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"],
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "06:00",
              "closes": "23:00"
            }
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN",
          "addressRegion": "Maharashtra",
          "addressLocality": "Mumbai",
          "streetAddress": "India"
        },
        "founder": {
          "@type": "Person",
          "name": "GymSpaYoga Founders"
        },
        "foundingDate": "2025",
        "numberOfEmployees": "50-100",
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 19.0760,
            "longitude": 72.8777
          },
          "geoRadius": "500000"
        },
        "sameAs": [
          "https://facebook.com/gymspayoga",
          "https://instagram.com/gymspayoga",
          "https://twitter.com/gymspayoga",
          "https://linkedin.com/company/gymspayoga",
          "https://youtube.com/@gymspayoga"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://gymspayoga.com/#website",
        "url": "https://gymspayoga.com/",
        "name": "GymSpaYoga",
        "description": description,
        "publisher": {
          "@id": "https://gymspayoga.com/#organization"
        },
        "inLanguage": "en-IN",
        "copyrightYear": "2025",
        "copyrightHolder": {
          "@id": "https://gymspayoga.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://gymspayoga.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": url + "#webpage",
        "url": url,
        "name": title,
        "isPartOf": {
          "@id": "https://gymspayoga.com/#website"
        },
        "about": {
          "@id": "https://gymspayoga.com/#organization"
        },
        "description": description,
        "inLanguage": "en-IN",
        "mainContentOfPage": {
          "@type": "WebPageElement",
          "cssSelector": "main"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://gymspayoga.com/"
            }
          ]
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", "h2", "h3"]
        },
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": [url]
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://gymspayoga.com/#localbusiness",
        "name": "GymSpaYoga",
        "image": image,
        "telephone": "+91-7596958097",
        "email": "gymspayoga@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Multiple Locations",
          "addressLocality": "Mumbai, Delhi, Bangalore",
          "addressRegion": "India",
          "addressCountry": "IN"
        },
        "geo": [
          {
            "@type": "GeoCoordinates",
            "latitude": 19.0760,
            "longitude": 72.8777,
            "name": "Mumbai"
          },
          {
            "@type": "GeoCoordinates", 
            "latitude": 28.7041,
            "longitude": 77.1025,
            "name": "Delhi"
          },
          {
            "@type": "GeoCoordinates",
            "latitude": 12.9716,
            "longitude": 77.5946,
            "name": "Bangalore"
          }
        ],
        "url": "https://gymspayoga.com/",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "06:00",
            "closes": "23:00"
          }
        ],
        "priceRange": "₹₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking",
        "servesCuisine": "Wellness Services",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Gym, Spa & Yoga Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Gym Membership",
                "description": "Access to premium fitness facilities"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Spa Treatments",
                "description": "Luxury wellness and relaxation services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Yoga Classes",
                "description": "Professional yoga instruction and classes"
              }
            }
          ]
        }
      }
    ]
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="bingbot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Content and Performance */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="width" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      
      {/* Language and Geo */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      <meta name="geo.placename" content="Mumbai, Delhi, Bangalore" />
      <meta name="geo.position" content="19.0760;72.8777" />
      <meta name="ICBM" content="19.0760, 72.8777" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="en-in" href={url} />
      <link rel="alternate" hrefLang="hi-in" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="GymSpaYoga" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />
      <meta property="fb:app_id" content="your-facebook-app-id" />
      
      {/* Article specific Open Graph */}
      {type === "article" && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:section" content={section} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@gymspayoga" />
      <meta name="twitter:creator" content="@gymspayoga" />
      <meta name="twitter:domain" content="gymspayoga.com" />
      
      {/* LinkedIn */}
      <meta property="linkedin:owner" content="gymspayoga" />
      
      {/* Mobile App */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="GymSpaYoga" />
      <meta name="application-name" content="GymSpaYoga" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#10b981" />
      <meta name="msapplication-TileColor" content="#10b981" />
      <meta name="msapplication-navbutton-color" content="#10b981" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#10b981" />
      
      {/* Performance and Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="dns-prefetch" href="//api.gymspayoga.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Additional SEO Meta Tags */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="1 days" />
      <meta name="expires" content="never" />
      <meta name="copyright" content="© 2025 GymSpaYoga. All rights reserved." />
      <meta name="generator" content="React 18, Vite" />
      <meta name="referrer" content="origin-when-cross-origin" />
      
      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Verification Tags (Placeholder) */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      <meta name="yandex-verification" content="your-yandex-verification-code" />
      <meta name="p:domain_verify" content="your-pinterest-verification-code" />
      
      {/* Favicons and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#10b981" />
      
      {/* RSS and Feeds */}
      <link rel="alternate" type="application/rss+xml" title="GymSpaYoga Blog Feed" href="/rss.xml" />
      <link rel="alternate" type="application/atom+xml" title="GymSpaYoga Atom Feed" href="/atom.xml" />
      
      {/* Web App Manifest */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Search Engine Features */}
      <meta name="google" content="notranslate" />
      <meta name="google" content="nositelinkssearchbox" />
      
      {/* Cache Control */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
    </Helmet>
  );
};

export default SEOHead;
