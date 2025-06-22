
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Clock, Users, Building2, Sparkles, Heart, TrendingUp, Shield, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import FunctionalSearch from '@/components/FunctionalSearch';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  const categories = [
    {
      title: "Premium Gyms",
      description: "State-of-the-art equipment and expert trainers",
      icon: <Building2 className="h-12 w-12" />,
      link: "/gyms",
      color: "from-blue-500 to-indigo-600",
      count: "500+ Gyms"
    },
    {
      title: "Luxury Spas",
      description: "Rejuvenate your body and mind with premium treatments",
      icon: <Sparkles className="h-12 w-12" />,
      link: "/spas",
      color: "from-pink-500 to-rose-600",
      count: "200+ Spas"
    },
    {
      title: "Yoga Studios",
      description: "Find inner peace with certified yoga instructors",
      icon: <Heart className="h-12 w-12" />,
      link: "/yoga",
      color: "from-green-500 to-emerald-600",
      count: "300+ Studios"
    },
    {
      title: "Personal Trainers",
      description: "One-on-one coaching for your fitness goals",
      icon: <Users className="h-12 w-12" />,
      link: "/trainers",
      color: "from-purple-500 to-violet-600",
      count: "1000+ Trainers"
    }
  ];

  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Easy Discovery",
      description: "Find the perfect gym, spa, or yoga studio near you with our intelligent search"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Verified Quality",
      description: "All our partners are thoroughly vetted and verified for quality assurance"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Instant Booking",
      description: "Book sessions instantly and manage your wellness schedule effortlessly"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Expert Reviews",
      description: "Read authentic reviews from real customers to make informed decisions"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "2,000+", label: "Partner Facilities" },
    { number: "50+", label: "Cities" },
    { number: "4.9★", label: "Average Rating" }
  ];

  return (
    <>
      <SEOHead
        title="GymSpaYoga - Find Premium Gyms, Spas & Yoga Studios Near You"
        description="Discover and book the best gyms, spas, yoga studios, and personal trainers in your city. Premium wellness experiences at your fingertips."
        keywords="gym booking, spa booking, yoga classes, personal trainer, fitness, wellness, health"
      />
      
      <div className="min-h-screen">
        {/* Hero Section with Hyper-realistic Design */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background with Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-emerald-900/90 to-blue-900/95 z-10"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-20 container mx-auto px-4 text-center text-white">
            <div className="max-w-5xl mx-auto">
              {/* Main Headline */}
              <div className="mb-8">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
                  <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Transform
                  </span>
                  <br />
                  <span className="text-white">Your Wellness</span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Journey
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Discover premium gyms, luxurious spas, serene yoga studios, and expert personal trainers. 
                  Your perfect wellness experience is just one click away.
                </p>
              </div>

              {/* Search Section */}
              <div className="mb-12">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <FunctionalSearch className="max-w-2xl mx-auto" />
                  <div className="flex flex-wrap gap-3 justify-center mt-6">
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      Mumbai
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      Delhi
                    </Badge>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      Bangalore
                    </Badge>
                    <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30 px-4 py-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      Hyderabad
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-lg">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/explore">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
                    <Search className="mr-3 h-6 w-6" />
                    Explore Now
                  </Button>
                </Link>
                <Link to="/register-business">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-4 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105">
                    <Building2 className="mr-3 h-6 w-6" />
                    Join as Partner
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Discover Your Perfect
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Wellness Space</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From high-energy workouts to peaceful meditation, find exactly what your body and mind need
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <Link key={index} to={category.link}>
                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden cursor-pointer border-0 shadow-lg">
                    <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                    <CardHeader className="text-center pb-4">
                      <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">{category.icon}</div>
                      </div>
                      <CardTitle className="text-2xl font-bold group-hover:text-emerald-600 transition-colors">
                        {category.title}
                      </CardTitle>
                      <Badge variant="outline" className="mx-auto">
                        {category.count}
                      </Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      <Button className={`bg-gradient-to-r ${category.color} hover:shadow-lg transition-all duration-300`}>
                        Explore Now
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Why Choose 
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> GymSpaYoga?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We've reimagined the wellness booking experience to make it seamless, trustworthy, and delightful
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-emerald-600">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Life?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Join thousands of people who have already discovered their perfect wellness routine with GymSpaYoga
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-12 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-105">
                  <TrendingUp className="mr-3 h-6 w-6" />
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105">
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
