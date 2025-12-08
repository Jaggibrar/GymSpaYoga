import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [tier, setTier] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (tier) params.set('tier', tier);
    
    // Navigate to appropriate category page
    switch (category) {
      case 'gym':
        navigate(`/gyms?${params.toString()}`);
        break;
      case 'spa':
        navigate(`/spas?${params.toString()}`);
        break;
      case 'yoga':
        navigate(`/yoga?${params.toString()}`);
        break;
      case 'trainer':
        navigate(`/trainers?${params.toString()}`);
        break;
      default:
        navigate(`/explore?${params.toString()}`);
    }
  };

  return (
    <section className="bg-[#0A45FF] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Find Your Perfect Wellness Experience
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover gyms, spas, yoga studios, and personal trainers near you
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base border-gray-200 focus:border-[#0A45FF] focus:ring-[#0A45FF]"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>

              {/* Category Select */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[160px] h-12 border-gray-200 bg-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  <SelectItem value="gym">Gyms</SelectItem>
                  <SelectItem value="spa">Spas</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="trainer">Trainers</SelectItem>
                </SelectContent>
              </Select>

              {/* Tier Filter */}
              <Select value={tier} onValueChange={setTier}>
                <SelectTrigger className="w-full md:w-[180px] h-12 border-gray-200 bg-white">
                  <Filter className="h-4 w-4 mr-2 text-gray-400" />
                  <SelectValue placeholder="Filter by tier" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  <SelectItem value="budget">Budget Friendly</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>

              {/* Search Button */}
              <Button 
                onClick={handleSearch}
                className="h-12 px-8 bg-[#0A45FF] hover:bg-[#083ACC] text-white font-semibold"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/gyms')}
              className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#0A45FF]"
            >
              Browse Gyms
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/spas')}
              className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#0A45FF]"
            >
              Browse Spas
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/yoga')}
              className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#0A45FF]"
            >
              Browse Yoga
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/trainers')}
              className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#0A45FF]"
            >
              Find Trainers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
