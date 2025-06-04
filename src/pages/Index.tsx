
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Phone, Dumbbell, Waves, Heart } from "lucide-react";
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
      amenities: ["AC", "Parking", "Locker"]
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
      amenities: ["Massage", "Sauna", "Pool"]
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
      amenities: ["AC", "Props", "Meditation"]
    }
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/register-business">
                <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                  List Your Business
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Find Your Perfect
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Wellness </span>
            Destination
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover and book the best gyms, spas, and yoga centers near you. Your journey to wellness starts here.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2 text-sm">📍 Nearby</Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">💎 Luxury</Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">⭐ Standard</Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">💰 Budget Friendly</Badge>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Explore by Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.title} to={category.link}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-20 h-20 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {category.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800">{category.title}</CardTitle>
                    <CardDescription className="text-gray-600 text-lg">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                      Explore {category.title}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 px-4 bg-white/40">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Featured Listings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="relative">
                  <img 
                    src={listing.image} 
                    alt={listing.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600">
                    {listing.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800">{listing.name}</CardTitle>
                      <p className="text-emerald-600 font-semibold">{listing.type}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{listing.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{listing.location}</span>
                    </div>
                    <div className="flex items-center text-emerald-600 font-semibold">
                      <span className="text-lg">{listing.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Registration CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Own a Gym, Spa, or Yoga Center?
          </h3>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join our platform and reach thousands of potential customers. List your business for just ₹4,999 and start growing today!
          </p>
          <Link to="/register-business">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-4">
              Register Your Business - ₹4,999
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Dumbbell className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-xl font-bold">GymSpaYoga</h4>
              </div>
              <p className="text-gray-400">Your wellness journey starts here.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Users</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Find Gyms</li>
                <li>Find Spas</li>
                <li>Find Yoga Centers</li>
                <li>Book Sessions</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Business</h5>
              <ul className="space-y-2 text-gray-400">
                <li>List Your Business</li>
                <li>Manage Bookings</li>
                <li>Pricing Plans</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GymSpaYoga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
