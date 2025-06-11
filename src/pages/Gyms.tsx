
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
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Gyms = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { gyms, loading: gymsLoading, error, refetch } = useGyms();
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

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load gyms: ${error}`);
    }
  }, [error]);

  const handleRetry = () => {
    if (refetch) {
      refetch();
      toast.info("Refreshing gym listings...");
    } else {
      window.location.reload();
    }
  };

  if (isLoading || gymsLoading) {
    return <LoadingScreen category="gym" onComplete={() => setIsLoading(false)} />;
  }

  if (error && !gyms.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Unable to Load Gyms</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={handleRetry} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
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
          <Badge className="mb-4 bg-emerald-500" variant="default">
            Showing {filteredBusinesses.length} of {gyms.length} results
          </Badge>
          {error && gyms.length > 0 && (
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-3 w-3" />
                Refresh
              </Button>
            </div>
          )}
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

        {filteredBusinesses.length === 0 && gyms.length > 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No gyms match your search</h3>
            <p className="text-gray-600 text-lg mb-4">
              No gyms found matching your criteria.
            </p>
            <p className="text-gray-500 text-sm">
              Try adjusting your search filters or check back later!
            </p>
          </div>
        )}

        {gyms.length === 0 && !error && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No gyms available</h3>
            <p className="text-gray-600 text-lg mb-4">
              There are currently no gyms listed in our system.
            </p>
            <p className="text-gray-500 text-sm">
              Please check back later for new listings!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gyms;
