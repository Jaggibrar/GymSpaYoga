import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Waves, Heart, MapPin, Star, Users, ArrowRight } from "lucide-react";
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="GymSpaYoga - Premium Gym, Spa & Yoga Booking Platform"
        description="Find & book premium gyms, luxury spas & authentic yoga studios. 1000+ locations with verified reviews and expert trainers."
        keywords="gym near me, spa booking, yoga classes, fitness center, wellness, personal trainer"
        type="website"
      />
      
      {/* Hero Section */}
      <HeroCarousel>
        <div className="container mx-auto px-4 h-full">
          <div className="max-w-4xl mx-auto text-center text-white flex flex-col justify-center h-full py-8 md:py-12">
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Your Wellness <span className="text-white">Journey</span> Starts Here
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Discover gyms, spas, yoga studios, personal trainers, and wellness therapists near you
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-6 md:mb-8">
              <div className="bg-white rounded-lg shadow-lg p-2 flex flex-row gap-2">
                <div className="flex-1 flex items-center px-3 min-w-0">
                  <svg className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                    type="text" 
                    placeholder="Gyms, spas..." 
                    className="w-full outline-none text-sm md:text-base text-foreground placeholder-muted-foreground bg-transparent"
                  />
                </div>
                <div className="w-px bg-border"></div>
                <div className="flex-1 flex items-center px-3 min-w-0">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Location" 
                    className="w-full outline-none text-sm md:text-base text-foreground placeholder-muted-foreground bg-transparent"
                  />
                </div>
                <Link to="/explore">
                  <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-4 md:px-6 py-2 rounded-lg whitespace-nowrap">
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </HeroCarousel>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Wellness Universe
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover premium wellness destinations. From strength training to spiritual wellness.
            </p>
          </div>
          
          <React.Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <AnimatedHeroGrid />
          </React.Suspense>
        </div>
      </section>

      {/* Recent Listings Section */}
      <React.Suspense fallback={null}>
        <RecentListings />
      </React.Suspense>

      {/* Geolocation Recommendations Section */}
      <section className="py-12 sm:py-16 bg-muted">
        <div className="container mx-auto px-4">
          <React.Suspense fallback={null}>
            <GeolocationRecommendations />
          </React.Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Life?</h2>
          <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Join thousands of people who have already started their wellness journey with us.
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-6 py-3">
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/explore">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-6 py-3">
                <MapPin className="h-5 w-5 mr-2" />
                Explore Near You
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Business Registration Banner */}
      <section className="py-16 sm:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-sm font-semibold">
                For Business Owners
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Ready to Grow Your
                <span className="block text-primary">
                  Wellness Business?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Join thousands of successful businesses on GymSpaYoga. Get discovered by customers actively looking for wellness services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register-business">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 shadow-md"
                  >
                    <Dumbbell className="mr-2 h-5 w-5" />
                    Register Your Business
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4"
                  >
                    View Pricing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 pt-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-primary fill-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-foreground">Featured Listings</div>
                    <div className="text-sm text-muted-foreground">Stand out to customers</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-foreground">Direct Bookings</div>
                    <div className="text-sm text-muted-foreground">Connect with clients</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Professional wellness business"
                  className="w-full h-[350px] sm:h-[400px] lg:h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
