
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useAuth } from "@/hooks/useAuth";
import { useGyms } from "@/hooks/useGyms";
import { useSearch } from "@/hooks/useSearch";
import LoadingScreen from "@/components/LoadingScreen";
import SearchAndFilters from "@/components/SearchAndFilters";
import AdvancedSearchFilters from "@/components/AdvancedSearchFilters";
import EnhancedBusinessCard from "@/components/EnhancedBusinessCard";
import PageHero from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";

const Gyms = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { gyms, loading: gymsLoading, error } = useGyms();
  const [isLoading, setIsLoading] = useState(true);

  const {
    filteredBusinesses,
    availableAmenities,
    selectedAmenities,
    handleSearchChange,
    handleLocationChange,
    handlePriceRangeChange,
    handleAmenityToggle
  } = useSearch(gyms);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    toast.error(error);
  }

  if (isLoading || gymsLoading) {
    return <LoadingScreen category="gym" onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <PageHero
        title="Find Your Perfect"
        subtitle="Gym"
        description="Discover state-of-the-art fitness centers near you."
        backgroundImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      />

      <div className="container mx-auto px-4 py-8">
        <SearchAndFilters
          onSearchChange={handleSearchChange}
          onLocationChange={handleLocationChange}
          onPriceRangeChange={handlePriceRangeChange}
          onAmenityToggle={handleAmenityToggle}
          selectedAmenities={selectedAmenities}
          availableAmenities={availableAmenities}
          businessType="gym"
        />

        <AdvancedSearchFilters
          onPriceRangeChange={handlePriceRangeChange}
          onAmenityToggle={handleAmenityToggle}
          selectedAmenities={selectedAmenities}
          availableAmenities={availableAmenities}
          businessType="gym"
        />

        <div className="text-center mb-8 mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Available Gyms
          </h2>
          <Badge className="mb-4 bg-emerald-500">
            Showing {filteredBusinesses.length} results
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((gym) => (
            <EnhancedBusinessCard 
              key={gym.id} 
              business={gym} 
              serviceType="gym"
            />
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No gyms found matching your criteria.</p>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your search filters or check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gyms;
