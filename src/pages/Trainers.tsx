
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useAuth } from "@/hooks/useAuth";
import { useTrainers } from "@/hooks/useTrainers";
import LoadingScreen from "@/components/LoadingScreen";
import AppHeader from "@/components/AppHeader";
import PageHero from "@/components/PageHero";
import AppFooter from "@/components/AppFooter";
import CategoryTrainers from "@/components/CategoryTrainers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Trainers = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { trainers, loading: trainersLoading, error } = useTrainers();
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

  if (isLoading || trainersLoading) {
    return <LoadingScreen category="gym" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <AppHeader onLogout={handleLogout} />
      
      <PageHero
        title="Train with Certified"
        subtitle="Personal Trainers"
        description="Find experienced trainers to help you achieve your fitness goals."
        backgroundImage="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      />

      <CategoryTrainers category="gym" />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Available Trainers
          </h2>
          <Badge className="mb-4 bg-emerald-500">
            Showing {trainers.length} results
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <Card key={trainer.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src={trainer.profile_image_url || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                  alt={trainer.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600">
                  {trainer.trainer_tier}
                </Badge>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                  {trainer.name}
                </CardTitle>
                <p className="text-emerald-600 font-semibold text-sm md:text-base">
                  {trainer.specializations.length > 0 ? trainer.specializations.join(", ") : "Personal Trainer"}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">Experience:</span> {trainer.experience} years
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">Rate:</span> ₹{trainer.hourly_rate}/hour
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">Location:</span> {trainer.location}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {trainer.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {trainers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No approved trainers found.</p>
            <p className="text-gray-500 text-sm mt-2">
              Check back later or try registering as a trainer!
            </p>
          </div>
        )}
      </div>
      
      <AppFooter />
    </div>
  );
};

export default Trainers;
