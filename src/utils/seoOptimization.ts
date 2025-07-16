// Advanced SEO optimization utilities for ranking #1

export const SEO_KEYWORDS = {
  primary: [
    'gym near me',
    'spa booking',
    'yoga classes',
    'fitness center',
    'personal trainer',
    'massage therapy',
    'wellness center'
  ],
  secondary: [
    'best gym mumbai',
    'luxury spa delhi',
    'yoga studio bangalore',
    'fitness classes near me',
    'spa treatments',
    'meditation classes',
    'pilates studio',
    'crossfit gym',
    'weight loss programs'
  ],
  longTail: [
    'best premium gyms in mumbai with personal trainers',
    'luxury spa packages in delhi with couple massage',
    'authentic yoga studios in bangalore for beginners',
    'certified personal trainers for weight loss near me',
    'hot stone massage therapy centers in mumbai',
    'hatha yoga classes for seniors in delhi'
  ],
  locations: [
    'mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'kolkata',
    'pune', 'ahmedabad', 'jaipur', 'surat', 'lucknow', 'kanpur'
  ]
};

export const generatePageTitle = (
  type: 'gym' | 'spa' | 'yoga' | 'trainer',
  location?: string,
  specific?: string
): string => {
  const baseTemplates = {
    gym: location 
      ? `Best Gyms in ${location} | Premium Fitness Centers & Personal Training | GymSpaYoga`
      : 'Best Gyms in India | Premium Fitness Centers & Personal Training | GymSpaYoga',
    spa: location
      ? `Luxury Spas in ${location} | Massage & Wellness Treatments | GymSpaYoga`
      : 'Luxury Spas in India | Massage & Wellness Treatments | GymSpaYoga',
    yoga: location
      ? `Best Yoga Studios in ${location} | Certified Instructors & Classes | GymSpaYoga`
      : 'Best Yoga Studios in India | Certified Instructors & Classes | GymSpaYoga',
    trainer: location
      ? `Personal Trainers in ${location} | Certified Fitness Coaches | GymSpaYoga`
      : 'Personal Trainers in India | Certified Fitness Coaches | GymSpaYoga'
  };

  return specific ? `${specific} | ${baseTemplates[type]}` : baseTemplates[type];
};

export const generateMetaDescription = (
  type: 'gym' | 'spa' | 'yoga' | 'trainer',
  location?: string
): string => {
  const templates = {
    gym: location 
      ? `🏋️‍♂️ Find premium gyms in ${location}. Book fitness centers, personal trainers & workout classes. ⭐ Verified reviews, instant booking, best prices guaranteed. Join 50K+ members!`
      : '🏋️‍♂️ Discover premium gyms across India. Book fitness centers, personal trainers & workout classes. ⭐ 50K+ members, verified reviews, instant booking. Transform your fitness journey!',
    spa: location
      ? `🧘‍♀️ Luxury spa treatments in ${location}. Book massage therapy, wellness packages & relaxation services. ⭐ Expert therapists, instant booking, exclusive deals.`
      : '🧘‍♀️ Book luxury spa treatments across India. Massage therapy, wellness packages & relaxation services. ⭐ Expert therapists, verified reviews, instant booking.',
    yoga: location
      ? `🕉️ Authentic yoga studios in ${location}. Book yoga classes, meditation & wellness sessions. ⭐ Certified instructors, all levels welcome, instant booking.`
      : '🕉️ Find authentic yoga studios across India. Book yoga classes, meditation & wellness sessions. ⭐ Certified instructors, all levels, instant booking.',
    trainer: location
      ? `💪 Certified personal trainers in ${location}. Book fitness coaching, nutrition guidance & workout plans. ⭐ Expert trainers, proven results, instant booking.`
      : '💪 Connect with certified personal trainers across India. Fitness coaching, nutrition guidance & workout plans. ⭐ Expert trainers, proven results.'
  };

  return templates[type];
};

export const generateStructuredData = (type: string, data: any) => {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": data.name || "GymSpaYoga Business",
    "description": data.description,
    "url": `https://gymspayoga.com/${type}/${data.id}`,
    "image": data.images || [],
    "telephone": data.phone,
    "email": data.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address,
      "addressLocality": data.city,
      "addressRegion": data.state,
      "postalCode": data.postalCode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": data.latitude,
      "longitude": data.longitude
    },
    "openingHours": data.openingHours || "Mo-Su 06:00-22:00",
    "priceRange": data.priceRange || "₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": data.rating || "4.5",
      "reviewCount": data.reviewCount || "25",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "name": data.offerName || "Membership Plans",
      "description": data.offerDescription || "Flexible membership options available",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };

  // Add specific properties based on type
  if (type === 'gym') {
    return {
      ...baseStructure,
      "@type": "SportsActivityLocation",
      "sport": ["Fitness", "Weight Training", "Cardio", "Personal Training"]
    };
  } else if (type === 'spa') {
    return {
      ...baseStructure,
      "@type": "BeautySalon",
      "hasMenu": {
        "@type": "Menu",
        "name": "Spa Services",
        "hasMenuSection": [
          {
            "@type": "MenuSection",
            "name": "Massage Therapy",
            "hasMenuItem": [
              {
                "@type": "MenuItem",
                "name": "Swedish Massage",
                "description": "Relaxing full-body massage"
              },
              {
                "@type": "MenuItem",
                "name": "Deep Tissue Massage",
                "description": "Therapeutic massage for muscle tension"
              }
            ]
          }
        ]
      }
    };
  } else if (type === 'yoga') {
    return {
      ...baseStructure,
      "@type": "SportsActivityLocation",
      "sport": ["Yoga", "Meditation", "Pilates"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Yoga Classes",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Hatha Yoga",
              "description": "Traditional yoga practice focusing on postures and breathing"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Vinyasa Yoga",
              "description": "Dynamic yoga practice with flowing movements"
            }
          }
        ]
      }
    };
  }

  return baseStructure;
};

export const generateBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
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
  };
};

// Common FAQs for wellness industry
export const WELLNESS_FAQS = [
  {
    question: "How do I book a gym membership through GymSpaYoga?",
    answer: "Simply browse our verified gyms, select your preferred location and membership plan, and book instantly online. You'll receive confirmation within minutes."
  },
  {
    question: "Are all fitness centers and spas verified?",
    answer: "Yes, all our partner gyms, spas, and yoga studios undergo strict verification processes to ensure quality, safety, and authentic services."
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can cancel or reschedule your bookings up to 24 hours before your scheduled session through your dashboard or by contacting our support team."
  },
  {
    question: "Do you offer personal trainer services?",
    answer: "Absolutely! We connect you with certified personal trainers who offer customized workout plans, nutrition guidance, and one-on-one training sessions."
  },
  {
    question: "What safety measures are in place at partner facilities?",
    answer: "All our partner facilities follow strict hygiene protocols, maintain sanitized equipment, and implement safety measures to ensure a secure wellness experience."
  }
];

// Performance optimization for SEO
export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Add loading="lazy" for non-critical images
    if (!img.hasAttribute('loading') && !img.closest('[data-priority="high"]')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add proper alt text if missing
    if (!img.alt && img.getAttribute('data-alt')) {
      img.alt = img.getAttribute('data-alt') || '';
    }
  });
};

// Core Web Vitals optimization
export const optimizeWebVitals = () => {
  // Preload critical resources
  const criticalResources = [
    { href: '/hero-image.jpg', as: 'image' },
    { href: '/logo.png', as: 'image' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' }
  ];

  criticalResources.forEach(resource => {
    const existingLink = document.querySelector(`link[href="${resource.href}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    }
  });

  // Optimize image loading
  optimizeImages();

  // Add prefetch for likely next pages
  const prefetchPages = ['/gyms', '/spas', '/yoga', '/trainers'];
  prefetchPages.forEach(page => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = page;
    document.head.appendChild(link);
  });
};