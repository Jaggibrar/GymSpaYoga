
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useTrainers } from "@/hooks/useTrainers";
import LoadingScreen from "@/components/LoadingScreen";
import PageHero from "@/components/PageHero";
import CategoryTrainers from "@/components/CategoryTrainers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

const Trainers = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { trainers, loading: trainersLoading, error } = useTrainers();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Sample trainers for when database is empty
  const sampleTrainers = [
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 9876543210",
      category: "gym",
      trainer_tier: "Premium",
      experience: 8,
      certifications: "ACSM Certified",
      specializations: ["Weight Training", "Bodybuilding", "HIIT"],
      hourly_rate: 1500,
      location: "Mumbai",
      bio: "Experienced personal trainer with 8 years in bodybuilding and strength training. Specialized in helping clients achieve their fitness goals through personalized workout plans.",
      profile_image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      status: "approved",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya@example.com",
      phone: "+91 9876543211",
      category: "yoga",
      trainer_tier: "Expert",
      experience: 6,
      certifications: "RYT 500",
      specializations: ["Hatha Yoga", "Meditation", "Prenatal Yoga"],
      hourly_rate: 1200,
      location: "Pune",
      bio: "Certified yoga instructor specializing in traditional Hatha yoga and mindfulness meditation. Passionate about helping students find balance and inner peace.",
      profile_image_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      status: "approved",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "3",
      name: "Arjun Kumar",
      email: "arjun@example.com",
      phone: "+91 9876543212",
      category: "gym",
      trainer_tier: "Standard",
      experience: 5,
      certifications: "NASM Certified",
      specializations: ["Functional Training", "CrossFit", "Sports Conditioning"],
      hourly_rate: 1000,
      location: "Bangalore",
      bio: "Dynamic fitness trainer focused on functional movement and athletic performance. Helping clients build strength and endurance for everyday activities.",
      profile_image_url: "https://images.unsplash.com/photo-1567013127542-490d757e51cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      status: "approved",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const displayTrainers = trainers.length > 0 ? trainers : sampleTrainers;

  const filteredTrainers = displayTrainers.filter(trainer => {
    const matchesSearch = searchTerm === "" || 
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = locationFilter === "" ||
      trainer.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    toast.error(error);
  }

  if (isLoading || trainersLoading) {
    return <LoadingScreen category="gym" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <PageHero
        title="Train with Certified"
        subtitle="Personal Trainers"
        description="Find experienced trainers to help you achieve your fitness goals."
        backgroundImage="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      />

      <CategoryTrainers category="gym" />

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search trainers by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Available Trainers
          </h2>
          <Badge className="mb-4 bg-emerald-500">
            Showing {filteredTrainers.length} results
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainers.map((trainer) => (
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
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
                    onClick={() => toast.success(`Booking session with ${trainer.name}. Feature coming soon!`)}
                  >
                    Book Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTrainers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No trainers found matching your criteria.</p>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your search or check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trainers;
