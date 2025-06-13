
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useSpas } from "@/hooks/useSpas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Star, Clock, Waves } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";
import SEOHead from "@/components/SEOHead";
import OptimizedImage from "@/components/OptimizedImage";

const Spas = () => {
  useScrollToTop();
  const { spas, loading, error } = useSpas();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredSpas = spas.filter(spa => {
    const matchesSearch = searchTerm === "" || 
      spa.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spa.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === "" ||
      spa.city.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const handleBookNow = (spaName: string) => {
    toast.success(`Booking ${spaName}. Please sign in to complete your booking!`);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Luxury Spas and Wellness Centers",
    "description": "Find and book premium spa treatments, massage therapy, and wellness services in Mumbai, Delhi, and Bangalore",
    "numberOfItems": filteredSpas.length,
    "itemListElement": filteredSpas.slice(0, 10).map((spa, index) => ({
      "@type": "LocalBusiness",
      "position": index + 1,
      "name": spa.business_name,
      "description": spa.description || "Premium spa offering luxury wellness treatments",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": spa.city,
        "addressRegion": spa.state,
        "addressCountry": "IN"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "opens": spa.opening_time,
        "closes": spa.closing_time
      },
      "priceRange": spa.session_price ? `₹${spa.session_price}` : "₹₹₹",
      "image": spa.image_urls?.[0] || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }))
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
        <SEOHead
          title="Luxury Spas - Error Loading | GymSpaYoga"
          description="There was an error loading spa listings. Please try again or contact our support team."
          noindex={true}
        />
        <div className="mobile-container py-8 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Error loading spas</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link to="/">
              <Button className="touch-target">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
      <SEOHead
        title="Luxury Spas & Wellness Centers - Book Premium Treatments | GymSpaYoga"
        description="Discover premium spa experiences in Mumbai, Delhi, and Bangalore. Book luxury wellness treatments, massage therapy, and rejuvenating spa services at top-rated establishments."
        keywords="luxury spas, spa treatments, massage therapy, wellness centers, spa booking, Mumbai spas, Delhi spas, Bangalore spas, relaxation, beauty treatments"
        url="https://gymspayoga.com/spas"
        structuredData={structuredData}
      />

      <PageHero
        title="Luxury Spas"
        subtitle="Relaxation & Wellness"
        description="Discover premium spa experiences and rejuvenating treatments near you. Indulge in luxury wellness services designed to restore your mind, body, and spirit."
        backgroundImage="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      />

      <div className="mobile-container py-4 md:py-8">
        {/* Content for better SEO */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Premium Spa & Wellness Services</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Experience ultimate relaxation and rejuvenation at India's finest spas and wellness centers. Our curated collection 
              features luxury establishments offering traditional and modern treatments, from Ayurvedic therapies to contemporary 
              wellness services. Each spa is carefully selected for its exceptional service quality, hygiene standards, and 
              therapeutic expertise.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">✨</span>
                <span>Certified therapists and wellness experts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🧘‍♀️</span>
                <span>Traditional Ayurvedic and modern treatments</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🌿</span>
                <span>Premium organic products and facilities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl mb-6 md:mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Find Your Perfect Spa Experience</h3>
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
              <Input
                placeholder="Search spas, treatments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 md:pl-12 h-12 md:h-14 mobile-text md:text-lg border-0 focus:ring-2 focus:ring-blue-500"
                aria-label="Search for spas and treatments"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
              <Input
                placeholder="Enter location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10 md:pl-12 h-12 md:h-14 mobile-text md:text-lg border-0 focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by location"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600">
              Found {filteredSpas.length} premium {filteredSpas.length === 1 ? 'spa' : 'spas'} 
              {searchTerm && ` matching "${searchTerm}"`}
              {locationFilter && ` in ${locationFilter}`}
            </p>
          </div>
        )}

        {/* Spas Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse" aria-label="Loading spa information">
                <div className="h-40 md:h-48 bg-gray-200"></div>
                <CardContent className="p-4 md:p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredSpas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredSpas.map((spa) => (
              <Card key={spa.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden h-40 md:h-48">
                  <OptimizedImage 
                    src={spa.image_urls?.[0] || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                    alt={`${spa.business_name} - Luxury spa treatments and wellness services`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    width={500}
                    height={300}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Badge className="absolute top-3 md:top-4 right-3 md:right-4 bg-blue-500 hover:bg-blue-600">
                    {spa.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="text-base md:text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                    {spa.business_name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">{spa.city}, {spa.state}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 p-4 md:p-6">
                  <p className="text-gray-600 mobile-text mb-3 md:mb-4 line-clamp-2">
                    {spa.description || "Luxury spa offering premium wellness treatments and relaxation services designed to rejuvenate your mind and body."}
                  </p>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current" aria-hidden="true" />
                      <span className="text-xs md:text-sm font-medium">4.8</span>
                      <span className="text-xs md:text-sm text-gray-500">(95)</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs md:text-sm text-gray-600">
                      <Clock className="h-3 w-3 md:h-4 md:w-4" aria-hidden="true" />
                      <span>{spa.opening_time} - {spa.closing_time}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <p className="text-lg md:text-xl font-bold text-blue-600">
                        {spa.session_price ? `₹${spa.session_price}/session` : spa.monthly_price ? `₹${spa.monthly_price}/month` : "Contact for pricing"}
                      </p>
                    </div>
                    <Link to={`/spa/${spa.id}`}>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 touch-target text-xs md:text-sm"
                        aria-label={`View details for ${spa.business_name}`}
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 md:py-12">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">
              <Waves className="h-16 w-16 md:h-24 md:w-24 mx-auto text-blue-400" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">No spas found</h3>
            <p className="text-gray-600 mb-4 md:mb-6 mobile-text md:text-base max-w-md mx-auto">
              {searchTerm || locationFilter 
                ? "Try adjusting your search criteria or explore other locations. We're constantly adding new premium spa partners to our platform."
                : "Be the first! Register your spa and start attracting customers looking for luxury wellness experiences."
              }
            </p>
            <div className="flex gap-3 md:gap-4 justify-center flex-col sm:flex-row">
              <Link to="/register-business">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 touch-target w-full sm:w-auto">
                  Register Your Spa
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="touch-target w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Additional SEO content */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Why Choose Premium Spas Through GymSpaYoga?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🏆 Verified Quality</h4>
              <p className="text-sm text-gray-600">All spas are thoroughly vetted for hygiene, service quality, and professional standards.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">💰 Best Prices</h4>
              <p className="text-sm text-gray-600">Compare prices and find exclusive deals on premium spa treatments and packages.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">📱 Easy Booking</h4>
              <p className="text-sm text-gray-600">Simple online booking with instant confirmation and flexible rescheduling options.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">⭐ Authentic Reviews</h4>
              <p className="text-sm text-gray-600">Read genuine reviews from verified customers to make informed decisions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spas;
