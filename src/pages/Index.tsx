
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

const Index = () => {
  const { businesses, loading } = useBusinessData();
  const recentBusinesses = businesses?.slice(0, 6) || [];

  const categories = [
    {
      title: "Premium Gyms",
      description: "State-of-the-art fitness centers with modern equipment",
      icon: Dumbbell,
      color: "from-red-500 to-orange-500",
      link: "/gyms"
    },
    {
      title: "Luxury Spas",
      description: "Rejuvenating spa experiences for complete relaxation",
      icon: Waves,
      color: "from-blue-500 to-cyan-500",
      link: "/spas"
    },
    {
      title: "Yoga Studios",
      description: "Find inner peace with expert yoga instructors",
      icon: Heart,
      color: "from-purple-500 to-pink-500",
      link: "/yoga"
    }
  ];

  const stats = [
    { number: "500+", label: "Verified Businesses", icon: Shield },
    { number: "10K+", label: "Happy Customers", icon: Users },
    { number: "50+", label: "Cities Covered", icon: MapPin },
    { number: "4.8", label: "Average Rating", icon: Star }
  ];

  return (
    <>
      <SEOHead
        title="GymSpaYoga - Find Premium Gyms, Spas & Yoga Studios"
        description="Discover and book the best gyms, spas, and yoga studios near you. Premium wellness experiences with verified reviews and instant booking."
        keywords="gym, spa, yoga, fitness, wellness, booking, health, premium, luxury"
      />
      
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        
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
          <SmartFilters showMoodFilter={true} />
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-emerald-600" />
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you want to build strength, find peace, or pamper yourself, we have the perfect place for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link key={index} to={category.link}>
                <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{category.title}</h3>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <Button variant="outline" className="group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      Explore Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Listings */}
        {recentBusinesses.length > 0 && (
          <section className="container mx-auto px-4 py-16 bg-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Recently Added
              </h2>
              <p className="text-xl text-gray-600">
                Check out the newest wellness destinations in your area
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentBusinesses.map((business) => (
                <Card key={business.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"} 
                      alt={business.business_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-emerald-500 text-white">
                      New
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
                      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/explore">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
                  View All Listings
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
