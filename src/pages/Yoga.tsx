
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useAuth } from "@/hooks/useAuth";
import { useYogaStudios } from "@/hooks/useYogaStudios";
import LoadingScreen from "@/components/LoadingScreen";
import AppHeader from "@/components/AppHeader";
import PageHero from "@/components/PageHero";
import AppFooter from "@/components/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Yoga = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { yogaStudios, loading: yogaLoading, error } = useYogaStudios();
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

  if (isLoading || yogaLoading) {
    return <LoadingScreen category="yoga" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <AppHeader onLogout={handleLogout} />
      
      <PageHero
        title="Find Your Inner Peace at"
        subtitle="Yoga Studios"
        description="Connect with certified instructors and peaceful yoga environments."
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Available Yoga Studios
          </h2>
          <Badge className="mb-4 bg-emerald-500">
            Showing {yogaStudios.length} results
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {yogaStudios.map((studio) => (
            <Card key={studio.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Yoga Studio"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600">
                  Studio #{studio.id}
                </Badge>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                  Yoga Studio #{studio.id}
                </CardTitle>
                <p className="text-emerald-600 font-semibold text-sm md:text-base">Yoga Center</p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm">
                  Created: {new Date(studio.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {yogaStudios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No yoga studios found.</p>
          </div>
        )}
      </div>
      
      <AppFooter />
    </div>
  );
};

export default Yoga;
