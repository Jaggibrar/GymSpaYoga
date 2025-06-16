
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useTrainerData } from "@/hooks/useTrainerData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Award, Crown, Zap, Shield, User } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";
import SEOHead from "@/components/SEOHead";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { useAuth } from "@/hooks/useAuth";

const Trainers = () => {
  useScrollToTop();
  const { signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  
  const { trainers, loading, error } = useTrainerData(
    categoryFilter === 'all' ? undefined : categoryFilter, 
    searchTerm, 
    locationFilter, 
    tierFilter
  );

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'elite': return <Crown className="h-4 w-4" />;
      case 'pro': return <Award className="h-4 w-4" />;
      case 'intermediate': return <Zap className="h-4 w-4" />;
      case 'basic': return <Shield className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'elite': return "from-purple-600 to-purple-700";
      case 'pro': return "from-blue-600 to-blue-700";
      case 'intermediate': return "from-emerald-600 to-emerald-700";
      case 'basic': return "from-orange-600 to-orange-700";
      default: return "from-gray-600 to-gray-700";
    }
  };

  const handleBookNow = (trainerName: string) => {
    toast.success(`Booking session with ${trainerName}. Please sign in to complete your booking!`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <AppHeader onLogout={signOut} />
        <SEOHead
          title="Personal Trainers - GymSpaYoga"
          description="Find the best personal trainers and fitness coaches near you"
        />
        <div className="mobile-container py-8 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Error loading trainers</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link to="/">
              <Button className="touch-target">Back to Home</Button>
            </Link>
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <AppHeader onLogout={signOut} />
      <SEOHead
        title="Personal Trainers - GymSpaYoga"
        description="Find certified personal trainers and fitness coaches. Connect with elite, pro, and experienced trainers near you."
      />
      
      <PageHero
        title="Personal Trainers"
        subtitle="Expert Guidance"
        description="Connect with certified personal trainers who will guide you to achieve your fitness goals."
        backgroundImage="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      />

      <div className="mobile-container py-4 md:py-8">
        {/* Search Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl mb-6 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="relative">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
              <Input
                placeholder="Search trainers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 md:pl-12 h-12 md:h-14 mobile-text md:text-lg border-0 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
              <Input
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10 md:pl-12 h-12 md:h-14 mobile-text md:text-lg border-0 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-12 md:h-14 mobile-text md:text-lg border-0 focus:ring-2 focus:ring-emerald-500">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="gym">Gym Trainer</SelectItem>
                <SelectItem value="spa">Spa Therapist</SelectItem>
                <SelectItem value="yoga">Yoga Instructor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="h-12 md:h-14 mobile-text md:text-lg border-0 focus:ring-2 focus:ring-emerald-500">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="elite">Elite</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Trainers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse border-0 shadow-lg">
                <div className="h-40 md:h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4 md:p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : trainers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {trainers.map((trainer) => (
              <Card key={trainer.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
                <div className="relative overflow-hidden h-40 md:h-48 rounded-t-lg">
                  <img 
                    src={trainer.profile_image_url || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className={`absolute top-3 md:top-4 right-3 md:right-4 bg-gradient-to-r ${getTierColor(trainer.trainer_tier)} text-white shadow-lg`}>
                    {getTierIcon(trainer.trainer_tier)}
                    <span className="ml-1 capitalize">{trainer.trainer_tier}</span>
                  </Badge>
                </div>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="text-base md:text-lg group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {trainer.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="truncate">{trainer.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                    <Award className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="capitalize">{trainer.category} • {trainer.experience} years exp</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 p-4 md:p-6">
                  <p className="text-gray-600 mobile-text mb-3 md:mb-4 line-clamp-2">
                    {trainer.bio || "Certified fitness trainer dedicated to helping you achieve your wellness goals."}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
                    {trainer.specializations?.slice(0, 2).map((spec, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {trainer.specializations?.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{trainer.specializations.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                      <span className="text-xs md:text-sm font-medium">4.8</span>
                      <span className="text-xs md:text-sm text-gray-500">(32)</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg md:text-xl font-bold text-emerald-600">
                        ₹{trainer.hourly_rate}/hour
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 touch-target text-xs md:text-sm flex-1 shadow-lg"
                      onClick={() => handleBookNow(trainer.name)}
                    >
                      Book Session
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="touch-target text-xs md:text-sm border-emerald-200 hover:bg-emerald-50"
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 md:py-12">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">
              <User className="h-16 w-16 md:h-24 md:w-24 mx-auto text-emerald-400" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">No trainers found</h3>
            <p className="text-gray-600 mb-4 md:mb-6 mobile-text md:text-base">
              {searchTerm || locationFilter || categoryFilter !== 'all' || tierFilter !== 'all'
                ? "Try adjusting your search criteria or explore other options."
                : "Be the first! Register as a trainer and start connecting with clients."
              }
            </p>
            <div className="flex gap-3 md:gap-4 justify-center flex-col sm:flex-row">
              <Link to="/register-trainer">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 touch-target w-full sm:w-auto shadow-lg">
                  Register as Trainer
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="touch-target w-full sm:w-auto border-emerald-200 hover:bg-emerald-50">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <AppFooter />
    </div>
  );
};

export default Trainers;
