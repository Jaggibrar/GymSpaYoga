
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useTrainers } from "@/hooks/useTrainers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Star, Users, Award } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero";

const Trainers = () => {
  useScrollToTop();
  const { trainers, loading, error } = useTrainers();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = searchTerm === "" || 
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = locationFilter === "" ||
      trainer.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  const handleBookNow = (trainerName: string) => {
    toast.success(`Booking session with ${trainerName}. Please sign in to complete your booking!`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
        <div className="mobile-container py-8 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Error loading trainers</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link to="/">
              <Button className="touch-target">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <PageHero
        title="Expert Trainers"
        subtitle="Personal Training"
        description="Connect with certified fitness professionals and achieve your wellness goals."
        backgroundImage="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      />

      <div className="mobile-container py-4 md:py-8">
        {/* Search Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl mb-6 md:mb-8">
          <div className="flex flex-col gap-3 md:flex-row md:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
              <Input
                placeholder="Search trainers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 md:pl-12 h-12 md:h-14 mobile-text md:text-lg border-0 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
              <Input
                placeholder="Enter location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10 md:pl-12 h-12 md:h-14 mobile-text md:text-lg border-0 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Trainers Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-40 md:h-48 bg-gray-200"></div>
                <CardContent className="p-4 md:p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredTrainers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredTrainers.map((trainer) => (
              <Card key={trainer.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden h-40 md:h-48">
                  <img 
                    src={trainer.profile_image_url || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 md:top-4 right-3 md:right-4 bg-emerald-500 hover:bg-emerald-600">
                    {trainer.trainer_tier}
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
                </CardHeader>
                <CardContent className="pt-0 p-4 md:p-6">
                  <p className="text-gray-600 mobile-text mb-3 md:mb-4 line-clamp-2">
                    {trainer.bio || "Experienced fitness professional dedicated to helping you achieve your goals."}
                  </p>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 fill-current" />
                      <span className="text-xs md:text-sm font-medium">4.9</span>
                      <span className="text-xs md:text-sm text-gray-500">(86)</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs md:text-sm text-gray-600">
                      <Award className="h-3 w-3 md:h-4 md:w-4" />
                      <span>{trainer.experience}+ years</span>
                    </div>
                  </div>
                  <div className="mb-3 md:mb-4">
                    <div className="flex flex-wrap gap-1">
                      {trainer.specializations.slice(0, 2).map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                          {spec}
                        </Badge>
                      ))}
                      {trainer.specializations.length > 2 && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          +{trainer.specializations.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <p className="text-lg md:text-xl font-bold text-emerald-600">
                        ₹{trainer.hourly_rate}/hour
                      </p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleBookNow(trainer.name)}
                      className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 touch-target text-xs md:text-sm"
                    >
                      Book Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 md:py-12">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">
              <Users className="h-16 w-16 md:h-24 md:w-24 mx-auto text-emerald-400" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">No trainers found</h3>
            <p className="text-gray-600 mb-4 md:mb-6 mobile-text md:text-base">
              {searchTerm || locationFilter 
                ? "Try adjusting your search criteria or explore other locations."
                : "Be the first! Register as a trainer and start helping clients achieve their goals."
              }
            </p>
            <div className="flex gap-3 md:gap-4 justify-center flex-col sm:flex-row">
              <Link to="/register-trainer">
                <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 touch-target w-full sm:w-auto">
                  Register as Trainer
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="touch-target w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trainers;
