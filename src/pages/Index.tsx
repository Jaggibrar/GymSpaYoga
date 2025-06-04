
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Phone, Dumbbell, Waves, Heart, ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const categories = [
    {
      title: "Gyms",
      description: "State-of-the-art fitness centers",
      icon: <Dumbbell className="h-8 w-8" />,
      color: "from-red-500 to-orange-500",
      link: "/gyms"
    },
    {
      title: "Spas",
      description: "Luxury wellness & relaxation",
      icon: <Waves className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-500",
      link: "/spas"
    },
    {
      title: "Yoga Centers",
      description: "Mind, body & soul harmony",
      icon: <Heart className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
      link: "/yoga"
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
      amenities: ["AC", "Props", "Meditation"],
      link: "/yoga/1"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      text: "Amazing platform! Found my perfect gym within minutes. The booking process is seamless.",
      location: "Mumbai",
      image: "/placeholder.svg"
    },
    {
      name: "Arjun Patel",
      rating: 5,
      text: "The spa recommendations are spot on. Loved the detailed information and easy booking.",
      location: "Pune",
      image: "/placeholder.svg"
    },
    {
      name: "Meera Singh",
      rating: 5,
      text: "Found an incredible yoga studio through this app. The reviews helped me choose perfectly!",
      location: "Bangalore",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                <Dumbbell className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/register-business">
                <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  List Your Business
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-lg transform hover:scale-105 transition-all duration-300">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 backdrop-blur-3xl"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="transform hover:scale-105 transition-all duration-500">
            <h2 className="text-6xl font-bold text-gray-800 mb-8 leading-tight">
              Find Your Perfect
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent block mt-2"> Wellness Journey</span>
            </h2>
            <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover and book the best gyms, spas, and yoga centers near you. Your transformation starts here.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Badge variant="secondary" className="px-6 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">📍 Nearby</Badge>
            <Badge variant="secondary" className="px-6 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">💎 Luxury</Badge>
            <Badge variant="secondary" className="px-6 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">⭐ Standard</Badge>
            <Badge variant="secondary" className="px-6 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">💰 Budget Friendly</Badge>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Explore by Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {categories.map((category) => (
              <Link key={category.title} to={category.link}>
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 cursor-pointer border-0 bg-white/90 backdrop-blur-sm transform hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="text-center pb-6 relative z-10">
                    <div className={`mx-auto w-24 h-24 bg-gradient-to-r ${category.color} rounded-3xl flex items-center justify-center text-white mb-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 shadow-xl`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-3xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">{category.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-xl">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center relative z-10">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300">
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

      {/* Featured Listings */}
      <section className="py-20 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Featured Listings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <div className="relative overflow-hidden">
                  <img 
                    src={listing.image} 
                    alt={listing.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600 shadow-lg">
                    {listing.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">{listing.name}</CardTitle>
                      <p className="text-emerald-600 font-semibold text-lg">{listing.type}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{listing.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3" />
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
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
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

      {/* User Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm transform hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Quote className="h-8 w-8 text-emerald-500 mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <p className="font-bold text-gray-800">{testimonial.name}</p>
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
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
            <div className="transform hover:scale-105 transition-all duration-500">
              <h3 className="text-4xl font-bold mb-6">Our Vision</h3>
              <p className="text-xl leading-relaxed">
                To become the leading platform that connects wellness seekers with the perfect fitness and wellness destinations, making healthy living accessible to everyone across India.
              </p>
            </div>
            <div className="transform hover:scale-105 transition-all duration-500">
              <h3 className="text-4xl font-bold mb-6">Our Mission</h3>
              <p className="text-xl leading-relaxed">
                We strive to simplify the wellness journey by providing comprehensive information, seamless booking experiences, and building a community that supports healthy lifestyle choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Registration CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="transform hover:scale-105 transition-all duration-500">
            <h3 className="text-5xl font-bold text-white mb-8">
              Own a Gym, Spa, or Yoga Center?
            </h3>
            <p className="text-2xl text-emerald-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join our platform and reach thousands of potential customers. List your business for just ₹4,999 and start growing today!
            </p>
            <Link to="/register-business">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-xl px-12 py-6 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
                Register Your Business - ₹4,999
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold">GymSpaYoga</h4>
              </div>
              <p className="text-gray-400 text-lg">Your wellness journey starts here.</p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-xl">For Users</h5>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300">Find Yoga Centers</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors duration-300">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-xl">For Business</h5>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/register-business" className="hover:text-emerald-400 transition-colors duration-300">List Your Business</Link></li>
                <li>Manage Bookings</li>
                <li>Pricing Plans</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-xl">Contact</h5>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3" />
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
