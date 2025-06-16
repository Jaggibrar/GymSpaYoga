
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Users, Dumbbell, Waves, Heart, ArrowRight, TrendingUp, Award, Shield } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { SmartFilters } from '@/components/SmartFilters';
import { useBusinessData } from '@/hooks/useBusinessData';
import SEOHead from '@/components/SEOHead';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { businesses, loading } = useBusinessData();
  const { signOut } = useAuth();
  
  // Get trending destinations (recently added businesses)
  const trendingDestinations = businesses?.slice(0, 6) || [];

  const categories = [
    {
      title: "Premium Gyms",
      description: "State-of-the-art fitness centers with modern equipment and expert trainers.",
      icon: "🏋️",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      buttonText: "Explore Gyms",
      buttonColor: "from-red-500 to-orange-500",
      link: "/gyms"
    },
    {
      title: "Luxury Spas",
      description: "Indulge in ultimate relaxation with premium spa treatments and wellness services.",
      icon: "🌊",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      buttonText: "Explore Spas",
      buttonColor: "from-blue-500 to-cyan-500",
      link: "/spas"
    },
    {
      title: "Yoga Studios",
      description: "Find inner peace and strength through yoga practice in serene environments.",
      icon: "💜",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      buttonText: "Explore Yoga",
      buttonColor: "from-purple-500 to-pink-500",
      link: "/yoga"
    }
  ];

  return (
    <>
      <SEOHead
        title="GymSpaYoga - Find Premium Gyms, Spas & Yoga Studios"
        description="Discover and book the best gyms, spas, and yoga studios near you. Premium wellness experiences with verified reviews and instant booking."
        keywords="gym, spa, yoga, fitness, wellness, booking, health, premium, luxury"
      />
      
      <div className="min-h-screen bg-gray-50">
        <AppHeader onLogout={signOut} />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Wellness Journey <br />
              <span className="text-emerald-200">Starts Here</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Discover premium gyms, luxury spas, and expert yoga studios. Book instantly and transform your health journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg">
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/register-business">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3 text-lg">
                  List Your Business
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Search Filters */}
        <section className="container mx-auto px-4 -mt-10 relative z-10">
          <SmartFilters showMoodFilter={true} activeFilter="all" activeSort="popular" onFilterChange={() => {}} />
        </section>

        {/* Explore Categories Section */}
        <section className="container mx-auto px-4 py-16 bg-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explore Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your wellness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {category.title}
                    </h3>
                  </div>
                </div>
                
                {/* Content Section */}
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <Link to={category.link} className="block">
                    <Button 
                      className={`w-full bg-gradient-to-r ${category.buttonColor} hover:opacity-90 text-white font-semibold py-3 px-6 transition-all duration-300 group-hover:scale-105`}
                    >
                      {category.buttonText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Destinations - Fixed routing */}
        {!loading && trendingDestinations.length > 0 && (
          <section className="container mx-auto px-4 py-16 bg-gray-50">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-600 mr-3" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Trending Destinations
                </h2>
              </div>
              <p className="text-xl text-gray-600">
                Discover the most popular wellness destinations right now
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trendingDestinations.map((business) => (
                <Card key={business.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"} 
                      alt={business.business_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold group-hover:text-emerald-600 transition-colors line-clamp-1">
                        {business.business_name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-yellow-600">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium">4.8</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{business.city}, {business.state}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {business.description || "Premium wellness destination offering excellent services"}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {business.business_type?.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Link to={`/${business.business_type}s/${business.id}`}>
                        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/explore">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
                  View All Destinations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </section>
        )}

        <AppFooter />
      </div>
    </>
  );
};

export default Index;
