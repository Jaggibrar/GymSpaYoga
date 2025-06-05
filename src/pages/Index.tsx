
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Phone, Dumbbell, Waves, Heart, ArrowRight, Quote, Sparkles, Zap, Shield, Facebook, Instagram, Linkedin, X } from "lucide-react";
import { Link } from "react-router-dom";
import TrainersSection from "@/components/TrainersSection";

const Index = () => {
  const categories = [
    {
      title: "Gyms",
      description: "State-of-the-art fitness centers",
      icon: <Dumbbell className="h-8 w-8" />,
      color: "from-cyan-500 to-blue-500",
      link: "/gyms",
      count: "500+"
    },
    {
      title: "Spas",
      description: "Luxury wellness & relaxation",
      icon: <Waves className="h-8 w-8" />,
      color: "from-blue-500 to-purple-500",
      link: "/spas",
      count: "300+"
    },
    {
      title: "Yoga Centers",
      description: "Mind, body & soul harmony",
      icon: <Heart className="h-8 w-8" />,
      color: "from-emerald-500 to-green-500",
      link: "/yoga",
      count: "250+"
    }
  ];

  const featuredListings = [
    {
      id: 1,
      name: "Elite Fitness Hub",
      type: "Gym",
      category: "Luxury",
      rating: 4.8,
      location: "Bandra West, Mumbai",
      price: "₹2,500/month",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "Parking", "Locker"],
      link: "/gym/1"
    },
    {
      id: 2,
      name: "Serenity Spa & Wellness",
      type: "Spa",
      category: "Luxury",
      rating: 4.9,
      location: "Koregaon Park, Pune",
      price: "₹3,500/session",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["Massage", "Sauna", "Pool"],
      link: "/spa/1"
    },
    {
      id: 3,
      name: "Zen Yoga Studio",
      type: "Yoga",
      category: "Standard",
      rating: 4.7,
      location: "Indiranagar, Bangalore",
      price: "₹1,200/month",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      amenities: ["AC", "Props", "Meditation"],
      link: "/yoga/1"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      text: "Amazing platform! Found my perfect gym within minutes. The booking process is seamless and the trainers are incredible.",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      profession: "Software Engineer"
    },
    {
      name: "Arjun Patel",
      rating: 5,
      text: "The spa recommendations are spot on. Loved the detailed information and easy booking. Best wellness platform ever!",
      location: "Pune",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      profession: "Business Analyst"
    },
    {
      name: "Meera Singh",
      rating: 5,
      text: "Found an incredible yoga studio through this app. The reviews helped me choose perfectly! Life-changing experience.",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      profession: "Marketing Manager"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Members", icon: <Heart className="h-6 w-6" /> },
    { number: "1,000+", label: "Partner Venues", icon: <Shield className="h-6 w-6" /> },
    { number: "500+", label: "Expert Trainers", icon: <Zap className="h-6 w-6" /> },
    { number: "50+", label: "Cities", icon: <Sparkles className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/trainers">
                <Button variant="outline" className="text-xs sm:text-sm">
                  Find Trainers
                </Button>
              </Link>
              <Link to="/register-business">
                <Button variant="outline" className="text-xs sm:text-sm">
                  List Your Business
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-xs sm:text-sm">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-gray-800 mb-6 sm:mb-8 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent block mt-2 sm:mt-4">
              Wellness Journey
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover and book the best gyms, spas, yoga centers, and expert trainers near you. 
            Your transformation starts with the perfect match.
          </p>

          {/* Hero Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16 max-w-6xl mx-auto">
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Modern Gym"
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Dumbbell className="h-6 w-6" />
                  <span className="text-sm font-semibold">PREMIUM GYMS</span>
                </div>
                <h3 className="text-2xl font-bold">State-of-the-Art Fitness</h3>
                <p className="text-sm opacity-90">Professional equipment & expert guidance</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Spa"
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Waves className="h-6 w-6" />
                  <span className="text-sm font-semibold">LUXURY SPAS</span>
                </div>
                <h3 className="text-2xl font-bold">Ultimate Relaxation</h3>
                <p className="text-sm opacity-90">Rejuvenate your mind, body & soul</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Peaceful Yoga Studio"
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="h-6 w-6" />
                  <span className="text-sm font-semibold">YOGA CENTERS</span>
                </div>
                <h3 className="text-2xl font-bold">Inner Peace & Balance</h3>
                <p className="text-sm opacity-90">Find harmony through ancient practices</p>
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl mb-4 backdrop-blur-sm">
                  <div className="text-emerald-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-12 sm:mb-16">
            <Link to="/gyms?filter=luxury">
              <Badge className="px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg bg-emerald-500 hover:bg-emerald-600 cursor-pointer transition-all duration-300 hover:scale-105">
                📍 Nearby Locations
              </Badge>
            </Link>
            <Link to="/spas?filter=luxury">
              <Badge className="px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg bg-blue-500 hover:bg-blue-600 cursor-pointer transition-all duration-300 hover:scale-105">
                💎 Luxury Experience
              </Badge>
            </Link>
            <Link to="/yoga?filter=premium">
              <Badge className="px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg bg-purple-500 hover:bg-purple-600 cursor-pointer transition-all duration-300 hover:scale-105">
                ⭐ Premium Quality
              </Badge>
            </Link>
            <Link to="/gyms?filter=budget">
              <Badge className="px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-lg bg-orange-500 hover:bg-orange-600 cursor-pointer transition-all duration-300 hover:scale-105">
                💰 Best Value
              </Badge>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Categories */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-12 sm:mb-16">
            Explore by Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {categories.map((category) => (
              <Link key={category.title} to={category.link}>
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-6 cursor-pointer transform hover:scale-105">
                  <CardHeader className="text-center pb-6">
                    <div className={`mx-auto w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-r ${category.color} rounded-3xl flex items-center justify-center text-white mb-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 shadow-xl`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-lg sm:text-xl mb-4">
                      {category.description}
                    </CardDescription>
                    <Badge className="bg-emerald-500 hover:bg-emerald-600">
                      {category.count} Available
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-xl group-hover:shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                      Explore {category.title}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Listings */}
      <section className="py-12 sm:py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-12 sm:mb-16">
            Featured Listings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img 
                    src={listing.image} 
                    alt={listing.name}
                    className="w-full h-48 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600">
                    {listing.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                        {listing.name}
                      </CardTitle>
                      <p className="text-emerald-600 font-semibold text-lg">{listing.type}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold text-gray-800">{listing.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3 text-emerald-600" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center text-emerald-600 font-bold text-xl">
                      <span>{listing.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {listing.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-sm">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <Link to={listing.link}>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                      View Details
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <TrainersSection />

      {/* Enhanced User Testimonials */}
      <section className="py-12 sm:py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-800 mb-12 sm:mb-16">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform hover:scale-105">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center mb-6">
                    <Quote className="h-8 w-8 text-emerald-600 mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mr-4" />
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{testimonial.name}</p>
                      <p className="text-sm text-emerald-600">{testimonial.profession}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 text-white">
            <div className="transform hover:scale-105 transition-all duration-500">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8">
                <h3 className="text-3xl sm:text-4xl font-bold mb-6">Our Vision</h3>
                <p className="text-lg sm:text-xl leading-relaxed">
                  To become the leading platform that connects wellness seekers with the perfect fitness and wellness destinations, making healthy living accessible to everyone across India and beyond.
                </p>
              </div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-500">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8">
                <h3 className="text-3xl sm:text-4xl font-bold mb-6">Our Mission</h3>
                <p className="text-lg sm:text-xl leading-relaxed">
                  We strive to simplify the wellness journey by providing comprehensive information, seamless booking experiences, and building a community that supports healthy lifestyle choices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Business Registration CTA */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
            Own a Gym, Spa, or Yoga Center?
          </h3>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
            Join our platform and reach thousands of potential customers. 
            List your business and start growing today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link to="/register-business">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 w-full sm:w-auto">
                Register Your Business
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/register-trainer">
              <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 backdrop-blur-sm text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 w-full sm:w-auto">
                Become a Trainer
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">GymSpaYoga</h4>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Your wellness journey starts here. We connect fitness enthusiasts with the best gyms, spas, and yoga centers across India. Transform your health, transform your life.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mb-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <X className="h-5 w-5 text-white" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
              </div>

              {/* Payment Methods */}
              <div>
                <h6 className="text-sm font-semibold text-gray-400 mb-3">We Accept</h6>
                <div className="flex space-x-3">
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://logos-world.net/wp-content/uploads/2020/09/PayPal-Logo.png" alt="PayPal" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-6 w-10" />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-emerald-400">For Users</h5>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300">Find Yoga Centers</Link></li>
                <li><Link to="/trainers" className="hover:text-emerald-400 transition-colors duration-300">Find Trainers</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors duration-300">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-blue-400">For Business</h5>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/register-business" className="hover:text-blue-400 transition-colors duration-300">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="hover:text-blue-400 transition-colors duration-300">Become a Trainer</Link></li>
                <li><span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Manage Bookings</span></li>
                <li><span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Pricing Plans</span></li>
                <li><span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Support</span></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-purple-400">Contact</h5>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-purple-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-purple-400" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GymSpaYoga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
