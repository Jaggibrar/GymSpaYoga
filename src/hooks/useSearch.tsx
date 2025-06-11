
import { useState, useMemo } from 'react';

interface BaseSearch {
  id: string;
  business_name: string;
  city: string;
  state: string;
  monthly_price?: number;
  session_price?: number;
  amenities?: string[];
  description?: string;
}

export const useSearch = <T extends BaseSearch>(businesses: T[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      // Search term filter
      const matchesSearch = searchTerm === "" || 
        business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (business.description && business.description.toLowerCase().includes(searchTerm.toLowerCase()));

      // Location filter
      const matchesLocation = location === "" ||
        business.city.toLowerCase().includes(location.toLowerCase()) ||
        business.state.toLowerCase().includes(location.toLowerCase());

      // Price filter
      const price = business.monthly_price || business.session_price || 0;
      const matchesPrice = price >= priceRange.min && price <= priceRange.max;

      // Amenities filter
      const matchesAmenities = selectedAmenities.length === 0 ||
        selectedAmenities.every(amenity => 
          business.amenities?.some(businessAmenity => 
            businessAmenity.toLowerCase().includes(amenity.toLowerCase())
          )
        );

      return matchesSearch && matchesLocation && matchesPrice && matchesAmenities;
    });
  }, [businesses, searchTerm, location, priceRange, selectedAmenities]);

  // Get all unique amenities from businesses
  const availableAmenities = useMemo(() => {
    const amenities = new Set<string>();
    businesses.forEach(business => {
      business.amenities?.forEach(amenity => amenities.add(amenity));
    });
    return Array.from(amenities);
  }, [businesses]);

  const handleSearchChange = (search: string) => setSearchTerm(search);
  const handleLocationChange = (loc: string) => setLocation(loc);
  const handlePriceRangeChange = (min: number, max: number) => setPriceRange({ min, max });
  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return {
    filteredBusinesses,
    availableAmenities,
    selectedAmenities,
    handleSearchChange,
    handleLocationChange,
    handlePriceRangeChange,
    handleAmenityToggle
  };
};
