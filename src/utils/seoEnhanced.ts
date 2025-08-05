// Enhanced SEO utility functions

export const generateSEOTitle = (
  basePage: string,
  location?: string,
  category?: string,
  businessName?: string
): string => {
  const locationSuffix = location ? ` in ${location}` : '';
  const categorySuffix = category ? ` - ${category}` : '';
  
  switch (basePage) {
    case 'gyms':
      return `Best Gyms${locationSuffix}${categorySuffix} | Book Fitness Centers | GymSpaYoga.com`;
    case 'spas':
      return `Top Luxury Spas${locationSuffix}${categorySuffix} | Book Spa Treatments | GymSpaYoga.com`;
    case 'yoga':
      return `Professional Yoga Studios${locationSuffix}${categorySuffix} | Book Yoga Classes | GymSpaYoga.com`;
    case 'trainers':
      return `Certified Fitness Trainers${locationSuffix}${categorySuffix} | Book Personal Trainers | GymSpaYoga.com`;
    case 'business-detail':
      return `${businessName}${locationSuffix} | Professional ${category} Services | GymSpaYoga.com`;
    case 'trainer-detail':
      return `${businessName} - ${category} Trainer${locationSuffix} | GymSpaYoga.com`;
    case 'booking':
      return `Book ${businessName}${locationSuffix} | Secure Online Booking | GymSpaYoga.com`;
    default:
      return 'GymSpaYoga.com - Premium Fitness, Spa & Yoga Services';
  }
};

export const generateSEODescription = (
  basePage: string,
  location?: string,
  category?: string,
  businessName?: string,
  customDescription?: string
): string => {
  if (customDescription) return customDescription;
  
  const locationPhrase = location ? ` in ${location}` : '';
  
  switch (basePage) {
    case 'gyms':
      return `Discover the best gyms and fitness centers${locationPhrase}. Compare prices, read reviews, and book online. Find state-of-the-art equipment, expert trainers, and flexible membership plans.`;
    case 'spas':
      return `Book luxury spa treatments and wellness services${locationPhrase}. Professional massage therapy, beauty treatments, and relaxation packages. Compare spas and book instantly.`;
    case 'yoga':
      return `Find certified yoga instructors and studios${locationPhrase}. Book yoga classes, meditation sessions, and wellness programs. All levels welcome from beginner to advanced.`;
    case 'trainers':
      return `Hire certified personal trainers${locationPhrase}. Expert fitness coaching, personalized workout plans, and nutrition guidance. Book verified trainers with proven results.`;
    case 'business-detail':
      return `Book ${businessName}${locationPhrase} - Professional ${category} services with verified reviews. Compare prices, check availability, and book online instantly.`;
    case 'trainer-detail':
      return `Book ${businessName} - Certified ${category} trainer${locationPhrase}. Professional training, personalized programs, and proven results. Check availability and book online.`;
    case 'booking':
      return `Secure online booking for ${businessName}${locationPhrase}. Instant confirmation, flexible scheduling, and secure payment. Book your appointment now.`;
    default:
      return 'Discover top-rated gyms, luxury spas, and expert yoga instructors near you. Book verified fitness trainers, wellness treatments, and yoga classes. Your wellness journey starts here.';
  }
};

export const generateKeywords = (
  basePage: string,
  location?: string,
  category?: string,
  businessName?: string
): string => {
  const baseKeywords = 'gym, spa, yoga, fitness, wellness, health, trainer';
  const locationKeywords = location ? `, ${location}, near me, ${location} fitness, ${location} wellness` : ', near me';
  const categoryKeywords = category ? `, ${category}, ${category} training, ${category} classes` : '';
  const businessKeywords = businessName ? `, ${businessName}` : '';
  
  switch (basePage) {
    case 'gyms':
      return `${baseKeywords}, fitness center, workout, exercise, gym membership, strength training, cardio${locationKeywords}${categoryKeywords}${businessKeywords}`;
    case 'spas':
      return `${baseKeywords}, spa treatment, massage, beauty salon, relaxation, wellness center, therapy${locationKeywords}${categoryKeywords}${businessKeywords}`;
    case 'yoga':
      return `${baseKeywords}, yoga studio, meditation, yoga classes, mindfulness, spiritual wellness${locationKeywords}${categoryKeywords}${businessKeywords}`;
    case 'trainers':
      return `${baseKeywords}, personal trainer, fitness coach, workout instructor, training sessions${locationKeywords}${categoryKeywords}${businessKeywords}`;
    default:
      return `${baseKeywords}${locationKeywords}${categoryKeywords}${businessKeywords}`;
  }
};

export const generateCanonicalUrl = (pathname: string): string => {
  return `https://gymspayyoga.com${pathname}`;
};

export const generateBreadcrumbs = (pathname: string, params?: any) => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Home', url: '/' }];
  
  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    switch (segment) {
      case 'gyms':
        breadcrumbs.push({ name: 'Gyms', url: currentPath });
        break;
      case 'spas':
        breadcrumbs.push({ name: 'Spas', url: currentPath });
        break;
      case 'yoga':
        breadcrumbs.push({ name: 'Yoga Studios', url: currentPath });
        break;
      case 'trainers':
        breadcrumbs.push({ name: 'Trainers', url: currentPath });
        break;
      case 'admin-dashboard':
        breadcrumbs.push({ name: 'Admin Dashboard', url: currentPath });
        break;
      case 'profile':
        breadcrumbs.push({ name: 'Profile', url: currentPath });
        break;
      case 'favorites':
        breadcrumbs.push({ name: 'Favorites', url: currentPath });
        break;
      case 'bookings':
        breadcrumbs.push({ name: 'My Bookings', url: currentPath });
        break;
      default:
        if (params?.businessName) {
          breadcrumbs.push({ name: params.businessName, url: currentPath });
        } else if (params?.trainerName) {
          breadcrumbs.push({ name: params.trainerName, url: currentPath });
        } else {
          breadcrumbs.push({ 
            name: segment.charAt(0).toUpperCase() + segment.slice(1), 
            url: currentPath 
          });
        }
    }
  });
  
  return breadcrumbs;
};

export const optimizeImageAlt = (
  imageName: string,
  context: string,
  businessName?: string,
  location?: string
): string => {
  const locationSuffix = location ? ` in ${location}` : '';
  const businessPrefix = businessName ? `${businessName} - ` : '';
  
  switch (context) {
    case 'gym':
      return `${businessPrefix}Modern gym facility with professional equipment${locationSuffix}`;
    case 'spa':
      return `${businessPrefix}Luxury spa interior and treatment rooms${locationSuffix}`;
    case 'yoga':
      return `${businessPrefix}Peaceful yoga studio space${locationSuffix}`;
    case 'trainer':
      return `${businessPrefix}Professional fitness trainer${locationSuffix}`;
    case 'business-gallery':
      return `${businessPrefix}Facility interior and amenities${locationSuffix}`;
    default:
      return `${businessPrefix}${imageName}${locationSuffix}`;
  }
};

export const generateLocalBusinessSchema = (business: any, reviews: any[] = []) => {
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length 
    : 5;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.business_name,
    "description": business.description,
    "image": business.image_urls?.[0],
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
    "aggregateRating": reviews.length > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": averageRating.toFixed(1),
      "reviewCount": reviews.length
    } : undefined,
    "priceRange": business.session_price ? `₹${business.session_price}` : "$$",
    "openingHours": `Mo-Su ${business.opening_time}-${business.closing_time}`
  };
};