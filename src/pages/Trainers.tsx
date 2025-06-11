
import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Filter, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Trainers = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { trainers, loading, error } = useTrainers();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [tierFilter, setTierFilter] = useState("");

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = searchTerm === "" || 
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = locationFilter === "" ||
      trainer.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesCategory = categoryFilter === "" || categoryFilter === "all" || trainer.category === categoryFilter;
    
    const matchesTier = tierFilter === "" || tierFilter === "all" || trainer.trainer_tier === tierFilter;

    return matchesSearch && matchesLocation && matchesCategory && matchesTier;
  });

  if (error) {
    toast.error(error);
  }

  if (loading) {
    return <LoadingScreen category="gym" onComplete={() => {}} />;
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
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filter Trainers</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search trainers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="gym">Gym Trainer</SelectItem>
                <SelectItem value="yoga">Yoga Instructor</SelectItem>
                <SelectItem value="spa">Spa Therapist</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger>
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

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="h-6 w-6 text-emerald-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Available Trainers
            </h2>
          </div>
          <Badge className="mb-4 bg-emerald-500">
            Showing {filteredTrainers.length} results
          </Badge>
        </div>

        {filteredTrainers.length > 0 ? (
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
                      onClick={() => toast.success(`Booking session with ${trainer.name}. Please sign in to complete your booking!`)}
                    >
                      Book Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💪</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No trainers found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || locationFilter || categoryFilter || tierFilter 
                ? "Try adjusting your filters or search criteria."
                : "Be the first trainer to join our platform!"
              }
            </p>
            <Link to="/register-trainer">
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                Register as Trainer
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trainers;
