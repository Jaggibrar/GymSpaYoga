
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useAuth } from "@/hooks/useAuth";
import { useGyms } from "@/hooks/useGyms";
import LoadingScreen from "@/components/LoadingScreen";
import AppHeader from "@/components/AppHeader";
import PageHero from "@/components/PageHero";
import AppFooter from "@/components/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Phone, Star } from "lucide-react";

const Gyms = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { gyms, loading: gymsLoading, error } = useGyms();
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading || gymsLoading) {
    return <LoadingScreen category="gym" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <AppHeader onLogout={handleLogout} />
      
      <PageHero
        title="Find Your Perfect"
        subtitle="Gym"
        description="Discover state-of-the-art fitness centers near you."
        backgroundImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Available Gyms
          </h2>
          <Badge className="mb-4 bg-emerald-500">
            Showing {gyms.length} results
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gyms.map((gym) => (
            <Card key={gym.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src={gym.image_urls && gym.image_urls.length > 0 
                    ? gym.image_urls[0] 
                    : "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  } 
                  alt={gym.business_name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600">
                  {gym.category}
                </Badge>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                  {gym.business_name}
                </CardTitle>
                <div className="flex items-center space-x-2 text-emerald-600 font-semibold text-sm md:text-base">
                  <MapPin className="h-4 w-4" />
                  <span>{gym.city}, {gym.state}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{gym.opening_time} - {gym.closing_time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>{gym.phone}</span>
                  </div>
                  {gym.monthly_price && (
                    <div className="text-emerald-600 font-bold">
                      ₹{gym.monthly_price}/month
                    </div>
                  )}
                  {gym.session_price && (
                    <div className="text-emerald-600 font-bold">
                      ₹{gym.session_price}/session
                    </div>
                  )}
                  {gym.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {gym.description}
                    </p>
                  )}
                  {gym.amenities && gym.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {gym.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {gym.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{gym.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {gyms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No approved gyms found.</p>
            <p className="text-gray-500 text-sm mt-2">
              Check back later or try registering your gym!
            </p>
          </div>
        )}
      </div>
      
      <AppFooter />
    </div>
  );
};

export default Gyms;
