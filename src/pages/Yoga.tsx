import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useAuth } from "@/hooks/useAuth";
import { useYogaStudios } from "@/hooks/useYogaStudios";
import { useSearch } from "@/hooks/useSearch";
import LoadingScreen from "@/components/LoadingScreen";
import MainNavigation from "@/components/MainNavigation";
import SearchAndFilters from "@/components/SearchAndFilters";
import PageHero from "@/components/PageHero";
import AppFooter from "@/components/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Yoga = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { yogaStudios, loading: yogaLoading, error } = useYogaStudios();
  const [isLoading, setIsLoading] = useState(true);

  const {
    filteredBusinesses,
    availableAmenities,
    selectedAmenities,
    handleSearchChange,
    handleLocationChange,
    handlePriceRangeChange,
    handleAmenityToggle
  } = useSearch(yogaStudios);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  if (error) {
    toast.error(error);
  }

  if (isLoading || yogaLoading) {
    return <LoadingScreen category="yoga" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <MainNavigation />
      
      <PageHero
        title="Find Your Inner Peace at"
        subtitle="Yoga Studios"
        description="Connect with certified instructors and peaceful yoga environments."
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      />

      <div className="container mx-auto px-4 py-8">
        <SearchAndFilters
          onSearchChange={handleSearchChange}
          onLocationChange={handleLocationChange}
          onPriceRangeChange={handlePriceRangeChange}
          onAmenityToggle={handleAmenityToggle}
          selectedAmenities={selectedAmenities}
          availableAmenities={availableAmenities}
          businessType="yoga"
        />

        <div className="text-center mb-8 mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Available Yoga Studios
          </h2>
          <Badge className="mb-4 bg-emerald-500">
            Showing {filteredBusinesses.length} results
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((studio) => (
            <Card key={studio.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src={studio.image_urls && studio.image_urls.length > 0 
                    ? studio.image_urls[0] 
                    : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  } 
                  alt={studio.business_name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600">
                  {studio.category}
                </Badge>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                  {studio.business_name}
                </CardTitle>
                <div className="flex items-center space-x-2 text-emerald-600 font-semibold text-sm md:text-base">
                  <MapPin className="h-4 w-4" />
                  <span>{studio.city}, {studio.state}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{studio.opening_time} - {studio.closing_time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>{studio.phone}</span>
                  </div>
                  {studio.monthly_price && (
                    <div className="text-emerald-600 font-bold">
                      ₹{studio.monthly_price}/month
                    </div>
                  )}
                  {studio.session_price && (
                    <div className="text-emerald-600 font-bold">
                      ₹{studio.session_price}/session
                    </div>
                  )}
                  {studio.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {studio.description}
                    </p>
                  )}
                  {studio.amenities && studio.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {studio.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {studio.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{studio.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                  <Link to={`/yoga/${studio.id}`}>
                    <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No yoga studios found matching your criteria.</p>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your search filters or check back later!
            </p>
          </div>
        )}
      </div>
      
      <AppFooter />
    </div>
  );
};

export default Yoga;
