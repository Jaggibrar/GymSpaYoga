
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Phone, Dumbbell, Waves, Heart, ArrowRight, Quote, Sparkles, Zap, Shield } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Futuristic Header */}
      <header className="bg-black/20 backdrop-blur-2xl shadow-2xl sticky top-0 z-50 border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-14 w-14 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 border border-cyan-400/30">
                <Dumbbell className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/trainers">
                <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 backdrop-blur-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Find Trainers
                </Button>
              </Link>
              <Link to="/register-business">
                <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 backdrop-blur-sm hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  List Your Business
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 shadow-2xl transform hover:scale-105 transition-all duration-300">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="py-32 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <div className="transform hover:scale-105 transition-all duration-500">
            <h2 className="text-8xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
              Transform Your
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block mt-4">
                Wellness Journey
              </span>
            </h2>
            <p className="text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              Discover and book the best gyms, spas, yoga centers, and expert trainers near you. 
              Your transformation starts with the perfect match.
            </p>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl mb-4 backdrop-blur-sm border border-cyan-400/30">
                  <div className="text-cyan-400">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Badge variant="secondary" className="px-8 py-4 text-lg shadow-2xl hover:shadow-xl transform hover:scale-110 transition-all duration-300 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-200">
              📍 Nearby Locations
            </Badge>
            <Badge variant="secondary" className="px-8 py-4 text-lg shadow-2xl hover:shadow-xl transform hover:scale-110 transition-all duration-300 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-200">
              💎 Luxury Experience
            </Badge>
            <Badge variant="secondary" className="px-8 py-4 text-lg shadow-2xl hover:shadow-xl transform hover:scale-110 transition-all duration-300 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-200">
              ⭐ Premium Quality
            </Badge>
            <Badge variant="secondary" className="px-8 py-4 text-lg shadow-2xl hover:shadow-xl transform hover:scale-110 transition-all duration-300 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-200">
              💰 Best Value
            </Badge>
          </div>
        </div>
      </section>

      {/* Enhanced Categories */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center text-white mb-16 drop-shadow-2xl">
            Explore by Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {categories.map((category) => (
              <Link key={category.title} to={category.link}>
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-6 cursor-pointer border-0 bg-black/40 backdrop-blur-2xl transform hover:scale-105 relative overflow-hidden border border-gray-700/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="text-center pb-6 relative z-10">
                    <div className={`mx-auto w-28 h-28 bg-gradient-to-r ${category.color} rounded-3xl flex items-center justify-center text-white mb-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 shadow-2xl border border-white/20`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-xl mb-4">
                      {category.description}
                    </CardDescription>
                    <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-200">
                      {category.count} Available
                    </Badge>
                  </CardHeader>
                  <CardContent className="text-center relative z-10">
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-2xl group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300 border border-cyan-400/30">
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
      <section className="py-20 px-4 bg-black/20 backdrop-blur-sm relative z-10">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center text-white mb-16 drop-shadow-2xl">
            Featured Listings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-black/40 backdrop-blur-2xl border border-gray-700/30">
                <div className="relative overflow-hidden">
                  <img 
                    src={listing.image} 
                    alt={listing.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-purple-500 shadow-2xl border border-cyan-400/30">
                    {listing.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {listing.name}
                      </CardTitle>
                      <p className="text-cyan-400 font-semibold text-lg">{listing.type}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold text-white">{listing.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-300">
                      <MapPin className="h-5 w-5 mr-3 text-cyan-400" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center text-cyan-400 font-bold text-xl">
                      <span>{listing.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {listing.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-sm border-gray-600 text-gray-300">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <Link to={listing.link}>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-2xl hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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
      <section className="py-20 px-4 bg-black/20 backdrop-blur-sm relative z-10">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center text-white mb-16 drop-shadow-2xl">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-black/40 backdrop-blur-2xl transform hover:scale-105 border border-gray-700/30">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Quote className="h-8 w-8 text-cyan-400 mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4 border-2 border-cyan-400/30" />
                    <div>
                      <p className="font-bold text-white text-lg">{testimonial.name}</p>
                      <p className="text-sm text-cyan-400">{testimonial.profession}</p>
                      <p className="text-sm text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
            <div className="transform hover:scale-105 transition-all duration-500">
              <div className="bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-cyan-400/30">
                <h3 className="text-4xl font-bold mb-6 text-cyan-400">Our Vision</h3>
                <p className="text-xl leading-relaxed text-gray-200">
                  To become the leading platform that connects wellness seekers with the perfect fitness and wellness destinations, making healthy living accessible to everyone across India and beyond.
                </p>
              </div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-500">
              <div className="bg-black/40 backdrop-blur-2xl rounded-3xl p-8 border border-purple-400/30">
                <h3 className="text-4xl font-bold mb-6 text-purple-400">Our Mission</h3>
                <p className="text-xl leading-relaxed text-gray-200">
                  We strive to simplify the wellness journey by providing comprehensive information, seamless booking experiences, and building a community that supports healthy lifestyle choices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Business Registration CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="transform hover:scale-105 transition-all duration-500">
            <h3 className="text-6xl font-bold text-white mb-8 drop-shadow-2xl">
              Own a Gym, Spa, or Yoga Center?
            </h3>
            <p className="text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join our futuristic platform and reach thousands of potential customers. 
              List your business for just ₹4,999 and start growing today!
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/register-business">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-xl px-12 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border border-cyan-400/30">
                  Register Your Business - ₹4,999
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/register-trainer">
                <Button size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 backdrop-blur-sm text-xl px-12 py-6 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300">
                  Become a Trainer - ₹2,999
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black/40 backdrop-blur-2xl text-white py-16 px-4 border-t border-gray-700/30 relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-2xl border border-cyan-400/30">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">GymSpaYoga</h4>
              </div>
              <p className="text-gray-300 text-lg">Your futuristic wellness journey starts here.</p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-xl text-cyan-400">For Users</h5>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/gyms" className="hover:text-cyan-400 transition-colors duration-300">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-cyan-400 transition-colors duration-300">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-cyan-400 transition-colors duration-300">Find Yoga Centers</Link></li>
                <li><Link to="/trainers" className="hover:text-cyan-400 transition-colors duration-300">Find Trainers</Link></li>
                <li><Link to="/about" className="hover:text-cyan-400 transition-colors duration-300">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-xl text-purple-400">For Business</h5>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/register-business" className="hover:text-purple-400 transition-colors duration-300">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="hover:text-purple-400 transition-colors duration-300">Become a Trainer</Link></li>
                <li><span className="hover:text-purple-400 transition-colors duration-300 cursor-pointer">Manage Bookings</span></li>
                <li><span className="hover:text-purple-400 transition-colors duration-300 cursor-pointer">Pricing Plans</span></li>
                <li><span className="hover:text-purple-400 transition-colors duration-300 cursor-pointer">Support</span></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-xl text-emerald-400">Contact</h5>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-emerald-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-emerald-400" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700/50 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GymSpaYoga. All rights reserved. Powered by Future Tech.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
