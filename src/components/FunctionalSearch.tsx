
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FunctionalSearchProps {
  onSearch?: (location: string) => void;
  className?: string;
}

const FunctionalSearch = ({ onSearch, className = "" }: FunctionalSearchProps) => {
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchLocation.trim()) {
      if (onSearch) {
        onSearch(searchLocation.trim());
      } else {
        // Navigate to explore page with search parameters
        navigate(`/explore?location=${encodeURIComponent(searchLocation.trim())}`);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        type="text"
        placeholder="Enter your location (e.g., Mumbai, Delhi, Bangalore)"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        onKeyPress={handleKeyPress}
        className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-[#005EB8] shadow-lg"
      />
      <Button 
        onClick={handleSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-[#005EB8] hover:bg-[#004d96]"
      >
        <Search className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default FunctionalSearch;
