import React from "react";
import { Button } from "@/components/ui/button";
import { Dumbbell, Waves, Heart, MapPin, Star, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
const AnimatedHeroGrid = React.lazy(() => import("@/components/AnimatedHeroGrid"));
import { useAuth } from "@/hooks/useAuth";
const RecentListings = React.lazy(() => import("@/components/RecentListings"));
import SEOHead from "@/components/SEOHead";
import HeroCarousel from "@/components/HeroCarousel";
const GeolocationRecommendations = React.lazy(() => import("@/components/GeolocationRecommendations").then(m => ({ default: m.GeolocationRecommendations })));

const Index = () => {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const categories = [
    {
      title: "Premium Gyms",
      description: "State-of-the-art fitness centers with expert trainers",
      icon: <Dumbbell className="h-8 w-8" />,
      color: "from-orange-500 to-red-500",
      href: "/gyms",
      stats: "500+ Gyms"
    },
    {
      title: "Luxury Spas",
      description: "Rejuvenating wellness experiences for mind and body",
      icon: <Waves className="h-8 w-8" />,
      color: "from-blue-500 to-purple-500",
      href: "/spas",
      stats: "200+ Spas"
    },
    {
      title: "Yoga Studios",
      description: "Find your inner peace with certified yoga instructors",
      icon: <Heart className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
      href: "/yoga",
      stats: "300+ Studios"
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Global Premium Gym, Spa & Yoga Booking Platform | GymSpaYoga - Premium Fitness & Wellness"
        description="🏋️‍♂️ Find & book premium gyms, luxury spas & authentic yoga studios worldwide. ⭐ 50,000+ happy members, 1000+ locations. Book instantly with verified reviews, expert trainers & exclusive wellness packages."
        keywords="gym near me, spa booking, yoga classes, fitness center, wellness India, Mumbai gym, Delhi spa, Bangalore yoga, personal trainer, massage therapy, meditation, pilates, crossfit, luxury spa treatments, fitness membership, health club, wellness center, Indian gyms, best spas India, fitness booking platform, wellness marketplace, premium gyms India, luxury spas India, certified yoga instructors, fitness classes near me, yoga studios near me, spa treatments near me"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://gymspayoga.com/#homepage",
          "name": "GymSpaYoga - India's Premier Wellness Marketplace",
          "description": "Find and book premium gyms, luxury spas, and authentic yoga studios across India. Join 50,000+ happy members on their wellness journey.",
          "url": "https://gymspayoga.com/",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Wellness Services",
            "description": "Premium fitness and wellness services available on GymSpaYoga",
            "numberOfItems": 4,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Service",
                  "name": "Premium Gyms",
                  "description": "State-of-the-art fitness centers with expert trainers",
                  "url": "https://gymspayoga.com/gyms"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Service",
                  "name": "Luxury Spas",
                  "description": "Rejuvenating wellness experiences for mind and body",
                  "url": "https://gymspayoga.com/spas"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Service",
                  "name": "Yoga Studios",
                  "description": "Find your inner peace with certified yoga instructors",
                  "url": "https://gymspayoga.com/yoga"
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "Service",
                  "name": "Personal Trainers",
                  "description": "Expert fitness guidance from certified professionals",
                  "url": "https://gymspayoga.com/trainers"
                }
              }
            ]
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
          }
        }}
      />
      
      {/* Hero Section */}
      <HeroCarousel>
        <div className="container-modern">
          <div className="max-w-6xl mx-auto text-center text-white">
            <div className="mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight px-2">
                Your Wellness <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">Journey</span> Starts Here
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 px-4">
                Discover gyms, spas, yoga studios, personal trainers, and wellness therapists near you. Your perfect fitness match is just a search away.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-12 px-4">
              <div className="bg-white rounded-full shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center px-4">
                  <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Search for gyms, spas, yoga..." 
                    className="w-full outline-none text-gray-800 placeholder-gray-500"
                  />
                </div>
                <div className="flex-1 flex items-center px-4 border-l border-gray-200">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Enter your location" 
                    className="w-full outline-none text-gray-800 placeholder-gray-500"
                  />
                </div>
                <Link to="/explore" className="inline-flex">
                  <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full whitespace-nowrap">
                    Search
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 px-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">500+</div>
                <div className="text-sm text-white/80">Verified Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">10k+</div>
                <div className="text-sm text-white/80">Happy Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">50+</div>
                <div className="text-sm text-white/80">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </HeroCarousel>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container-modern">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-primary mb-6 sm:mb-8">
              Your Wellness Universe
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover a curated ecosystem of premium wellness destinations. From strength training to spiritual wellness, find your perfect match for a healthier, happier you.
            </p>
          </div>
          
          <React.Suspense fallback={null}>
            <AnimatedHeroGrid />
          </React.Suspense>
        </div>
      </section>

      {/* Recent Listings Section - Reduced gap */}
      <div className="-mt-4">
          <React.Suspense fallback={null}>
            <RecentListings />
          </React.Suspense>
      </div>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            {[
              { icon: <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />, number: "50K+", label: "Happy Members" },
              { icon: <MapPin className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />, number: "1000+", label: "Locations" },
              { icon: <Star className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />, number: "4.9", label: "Average Rating" },
              { icon: <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />, number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-emerald-600 mb-2 sm:mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geolocation Recommendations Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <React.Suspense fallback={null}>
            <GeolocationRecommendations />
          </React.Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Transform Your Life?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of people who have already started their wellness journey with us.
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-4 min-h-[48px]">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900 text-base sm:text-lg px-6 sm:px-8 py-4 min-h-[48px]">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/explore">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-4 min-h-[48px]">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Explore Near You
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Quick Setup Panel */}
    </div>
  );
};

export default Index;
