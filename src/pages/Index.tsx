
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Clock, Users, Award, Dumbbell, Waves, Heart } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useGyms } from "@/hooks/useGyms";
import { useTrainers } from "@/hooks/useTrainers";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  useScrollToTop();
  const { gyms, loading: gymsLoading } = useGyms();
  const { trainers, loading: trainersLoading } = useTrainers();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const allBusinesses = gyms;
  const loading = gymsLoading || trainersLoading;

  // Filter businesses based on search and location
  const filteredBusinesses = allBusinesses.filter(business => {
    const matchesSearch = searchTerm === "" || 
      business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === "" ||
      business.city.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const handleBookNow = (businessName: string) => {
    toast.success(`Booking ${businessName}. Please sign in to complete your booking!`);
  };

  const handleSearch = () => {
    if (searchTerm || locationFilter) {
      toast.info("Searching for businesses...");
    }
  };

  const stats = [
    { icon: Dumbbell, label: "Gyms", value: gyms.filter(g => g.business_type === 'gym').length, color: "text-red-500" },
    { icon: Waves, label: "Spas", value: gyms.filter(g => g.business_type === 'spa').length, color: "text-blue-500" },
    { icon: Heart, label: "Yoga Studios", value: gyms.filter(g => g.business_type === 'yoga').length, color: "text-purple-500" },
    { icon: Users, label: "Trainers", value: trainers.length, color: "text-emerald-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-blue-600/90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Wellness Destination
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Discover premium gyms, luxurious spas, and peaceful yoga studios near you. Start your wellness journey today.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search gyms, spas, yoga studios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 text-lg border-0 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Enter location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-12 h-14 text-lg border-0 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white">
                <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explore Our Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our wide range of wellness destinations designed to fit your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Gyms",
                description: "State-of-the-art fitness centers with modern equipment",
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/gyms",
                icon: Dumbbell,
                color: "from-red-500 to-orange-500"
              },
              {
                title: "Luxury Spas",
                description: "Rejuvenating treatments in serene environments",
                image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/spas",
                icon: Waves,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Yoga Studios",
                description: "Find inner peace with expert yoga instructors",
                image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "/yoga",
                icon: Heart,
                color: "from-purple-500 to-pink-500"
              }
            ].map((category, index) => (
              <Link key={index} to={category.link} className="group">
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`}></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <category.icon className="h-8 w-8 mb-2" />
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Destinations
            </h2>
            <p className="text-lg text-gray-600">
              Discover top-rated wellness destinations in your area
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.slice(0, 6).map((business) => (
                <Card key={business.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                      alt={business.business_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600">
                      {business.category}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg group-hover:text-emerald-600 transition-colors">
                      {business.business_name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {business.city}, {business.state}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {business.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                        <span className="text-sm text-gray-500">(124)</span>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleBookNow(business.business_name)}
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏃‍♂️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No businesses found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || locationFilter 
                  ? "Try adjusting your search criteria or explore our categories below."
                  : "Be the first! Register your business and start attracting customers."
                }
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/register-business">
                  <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                    Register Your Business
                  </Button>
                </Link>
                <Link to="/register-trainer">
                  <Button variant="outline">
                    Register as Trainer
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-blue-500">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who have found their perfect wellness destination
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-emerald-500 hover:bg-gray-100 px-8 py-3">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/register-business">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-500 px-8 py-3">
                  List Your Business
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
