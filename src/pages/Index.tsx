import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Clock, Users, Building2, Sparkles, Heart, TrendingUp, Shield, Award, ArrowRight, CheckCircle, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import FunctionalSearch from '@/components/FunctionalSearch';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedListings();
  }, []);

  const fetchFeaturedListings = async () => {
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setFeaturedListings(data || []);
    } catch (error) {
      console.error('Error fetching featured listings:', error);
    }
  };

  const getTierLabel = (monthlyPrice, sessionPrice) => {
    if (monthlyPrice) {
      if (monthlyPrice >= 5000) return 'Luxury';
      if (monthlyPrice >= 3000) return 'Premium';
      return 'Budget';
    }
    if (sessionPrice) {
      if (sessionPrice >= 2000) return 'Luxury';
      if (sessionPrice >= 1000) return 'Premium';
      return 'Budget';
    }
    return 'Budget';
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Luxury': return 'bg-purple-100 text-purple-800';
      case 'Premium': return 'bg-blue-100 text-blue-800';
      case 'Budget': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (businessId, businessType) => {
    const type = businessType.toLowerCase();
    switch (type) {
      case 'spa':
        navigate(`/spas/${businessId}`);
        break;
      case 'yoga':
      case 'yoga_studio':
        navigate(`/yoga/${businessId}`);
        break;
      case 'gym':
      default:
        navigate(`/gyms/${businessId}`);
        break;
    }
  };

  const categories = [
    {
      title: "Premium Gyms",
      description: "State-of-the-art equipment and expert trainers",
      icon: <Building2 className="h-8 w-8" />,
      link: "/gyms",
      color: "from-blue-500 to-indigo-600",
      count: "500+ Gyms",
      image: "/placeholder.svg"
    },
    {
      title: "Luxury Spas",
      description: "Rejuvenate your body and mind with premium treatments",
      icon: <Sparkles className="h-8 w-8" />,
      link: "/spas",
      color: "from-pink-500 to-rose-600",
      count: "200+ Spas",
      image: "/placeholder.svg"
    },
    {
      title: "Yoga Studios",
      description: "Find inner peace with certified yoga instructors",
      icon: <Heart className="h-8 w-8" />,
      link: "/yoga",
      color: "from-green-500 to-emerald-600",
      count: "300+ Studios",
      image: "/placeholder.svg"
    },
    {
      title: "Personal Trainers",
      description: "One-on-one coaching for your fitness goals",
      icon: <Users className="h-8 w-8" />,
      link: "/trainers",
      color: "from-purple-500 to-violet-600",
      count: "1000+ Trainers",
      image: "/placeholder.svg"
    }
  ];

  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Easy Discovery",
      description: "Find perfect wellness spaces with intelligent search and filters"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Verified Quality",
      description: "All partners are thoroughly vetted for quality assurance"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Instant Booking",
      description: "Book sessions instantly and manage your wellness schedule"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Expert Reviews",
      description: "Read authentic reviews from real customers"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "2,000+", label: "Partner Facilities" },
    { number: "50+", label: "Cities" },
    { number: "4.9★", label: "Average Rating" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      text: "Found the perfect yoga studio near my home. The booking process was seamless!",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      location: "Delhi",
      text: "Great platform for discovering premium gyms. Saved me so much time!",
      rating: 5
    },
    {
      name: "Anjali Patel",
      location: "Bangalore",
      text: "Booked a spa session and it was amazing. Will definitely use again!",
      rating: 5
    }
  ];

  return (
    <>
      <SEOHead
        title="GymSpaYoga - Find Premium Gyms, Spas & Yoga Studios Near You"
        description="Discover and book the best gyms, spas, yoga studios, and personal trainers in your city. Premium wellness experiences at your fingertips."
        keywords="gym booking, spa booking, yoga classes, personal trainer, fitness, wellness, health"
      />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section - Clean & Modern */}
        <section className="bg-white py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find Your Perfect
                <span className="text-emerald-500 block">Wellness Space</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover premium gyms, luxurious spas, serene yoga studios, and expert personal trainers near you.
              </p>

              {/* Search Section */}
              <div className="mb-12">
                <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 max-w-2xl mx-auto">
                  <FunctionalSearch className="w-full" />
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    <Badge variant="outline" className="text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      Mumbai
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      Delhi
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      Bangalore
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      Hyderabad
                    </Badge>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Link to="/explore">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                    <Search className="mr-2 h-5 w-5" />
                    Explore Now
                  </Button>
                </Link>
                <Link to="/register-business">
                  <Button size="lg" variant="outline" className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300">
                    <Building2 className="mr-2 h-5 w-5" />
                    Join as Partner
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-500 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        {featuredListings.length > 0 && (
          <section className="py-16 lg:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Featured Wellness Centers
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Discover hand-picked premium facilities trusted by thousands of satisfied customers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredListings.map((listing) => {
                  const tier = getTierLabel(listing.monthly_price, listing.session_price);
                  
                  return (
                    <Card key={listing.id} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100 bg-white">
                      <div className="relative">
                        {listing.image_urls && listing.image_urls.length > 0 ? (
                          <img
                            src={listing.image_urls[0]}
                            alt={listing.business_name}
                            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-t-lg flex items-center justify-center">
                            <span className="text-2xl font-bold text-emerald-600">
                              {listing.business_name[0]}
                            </span>
                          </div>
                        )}
                        
                        <div className="absolute top-4 right-4">
                          <Badge className={getTierColor(tier)}>
                            {tier}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-bold group-hover:text-emerald-600 transition-colors">
                            {listing.business_name}
                          </CardTitle>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">4.8</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {listing.city}, {listing.state}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          {(listing.monthly_price || listing.session_price) && (
                            <div className="flex items-center text-emerald-600 font-semibold">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {listing.monthly_price ? (
                                <span>₹{listing.monthly_price}/month</span>
                              ) : (
                                <span>₹{listing.session_price}/session</span>
                              )}
                            </div>
                          )}

                          <p className="text-gray-600 text-sm line-clamp-2">
                            {listing.description}
                          </p>

                          <Button 
                            className="w-full group-hover:bg-emerald-500 group-hover:text-white transition-colors"
                            onClick={() => handleViewDetails(listing.id, listing.business_type)}
                          >
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="text-center mt-12">
                <Link to="/explore">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                    View All Listings
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Categories Section - Grid Layout */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Discover Your Wellness Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From high-energy workouts to peaceful meditation, find exactly what your body and mind need
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link key={index} to={category.link}>
                  <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100 bg-white">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <div className="text-emerald-500">{category.icon}</div>
                      </div>
                      <CardTitle className="text-xl font-bold group-hover:text-emerald-600 transition-colors">
                        {category.title}
                      </CardTitle>
                      <Badge variant="outline" className="mx-auto text-xs">
                        {category.count}
                      </Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600 mb-4 text-sm">{category.description}</p>
                      <Button variant="outline" size="sm" className="group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Clean Cards */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose GymSpaYoga?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We've reimagined the wellness booking experience to make it seamless, trustworthy, and delightful
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands of satisfied customers who found their perfect wellness routine
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white border border-gray-100 shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-emerald-500">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Life?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of people who have already discovered their perfect wellness routine with GymSpaYoga
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
