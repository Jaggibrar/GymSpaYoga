import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
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
  const [detectedCity, setDetectedCity] = useState<string | null>(null);

  // Auto-detect city via geolocation
  useEffect(() => {
    const cached = sessionStorage.getItem('gymspayoga_detected_city');
    if (cached) {
      setDetectedCity(cached);
      return;
    }
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=en`
            );
            const data = await res.json();
            const city = data.city || data.locality || null;
            if (city) {
              setDetectedCity(city);
              sessionStorage.setItem('gymspayoga_detected_city', city);
            }
          } catch { /* silent */ }
        },
        () => { /* permission denied - no action */ },
        { timeout: 5000, maximumAge: 600000 }
      );
    }
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (tier) params.set('tier', tier);
    
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
      case 'therapist':
        navigate(`/therapists?${params.toString()}`);
        break;
      case 'chiropractor':
        navigate(`/chiropractors?${params.toString()}`);
        break;
      default:
        navigate(`/explore?${params.toString()}`);
    }
  };

  return (
    <section className="relative" aria-label="Hero banner with search">
      {/* Hero Banner Image with proper aspect ratio */}
      <div className="relative w-full aspect-[21/9] min-h-[280px] max-h-[500px] overflow-hidden">
        <img
          src="/images/hero-banner.png"
          alt="GymSpaYoga - Premium Gyms, Spas and Yoga Studios in India"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-3 md:mb-4 drop-shadow-lg">
            {detectedCity
              ? `Best Wellness Centers in ${detectedCity}`
              : <>Find Your Perfect Wellness<br className="hidden sm:block" /><span className="sm:hidden"> </span>Experience</>
            }
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 md:mb-6 text-center max-w-2xl drop-shadow-md px-2">
            {detectedCity
              ? `Discover top-rated gyms, spas, yoga studios & trainers in ${detectedCity}`
              : 'Discover gyms, spas, yoga studios, and personal trainers near you'
            }
          </p>
        </div>
      </div>

      {/* Search Bar - Positioned below the image */}
      <div className="container mx-auto px-4 -mt-6 md:-mt-8 relative z-10">
        <div data-tour="hero-search" className="bg-white rounded-xl p-3 md:p-4 shadow-2xl w-full max-w-4xl mx-auto border border-gray-100">
          <div className="flex flex-col gap-3">
            {/* Mobile: Stack vertically, Desktop: Row */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
                <Input
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base border-gray-200 focus:border-[#005EB8] focus:ring-[#005EB8] bg-white"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  aria-label="Search for gyms, spas, or yoga studios"
                />
              </div>

              {/* Filters row on mobile */}
              <div className="flex gap-2 sm:gap-3">
                {/* Category Select */}
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger 
                    className="flex-1 sm:w-[130px] h-12 border-gray-200 bg-white text-sm"
                    aria-label="Select category"
                  >
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <SelectItem value="gym">Gyms</SelectItem>
                    <SelectItem value="spa">Spas</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="trainer">Trainers</SelectItem>
                    <SelectItem value="therapist">Therapists</SelectItem>
                    <SelectItem value="chiropractor">Chiropractors</SelectItem>
                  </SelectContent>
                </Select>

                {/* Tier Filter */}
                <Select value={tier} onValueChange={setTier}>
                  <SelectTrigger 
                    className="flex-1 sm:w-[150px] h-12 border-gray-200 bg-white text-sm"
                    aria-label="Filter by tier"
                  >
                    <Filter className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0" aria-hidden="true" />
                    <SelectValue placeholder="Tier" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <SelectItem value="budget">Budget Friendly</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button - 48px min height for mobile tap target */}
              <Button 
                onClick={handleSearch}
                className="h-12 min-h-[48px] px-6 bg-[#005EB8] hover:bg-[#004d96] text-white font-semibold"
                aria-label="Search"
              >
                <Search className="mr-2 h-5 w-5" aria-hidden="true" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Category Quick Links - Horizontal scroll on mobile */}
        <nav className="mt-4 overflow-x-auto scrollbar-hide" aria-label="Quick category links">
          <div className="flex justify-center gap-2 sm:gap-3 min-w-max px-4 sm:px-0">
            <Button 
              onClick={() => navigate('/gyms')}
              className="bg-[#005EB8] hover:bg-[#004d96] text-white font-medium px-4 sm:px-6 min-h-[44px] whitespace-nowrap"
            >
              Browse Gyms
            </Button>
            <Button 
              onClick={() => navigate('/spas')}
              className="bg-[#9C27B0] hover:bg-[#7B1FA2] text-white font-medium px-4 sm:px-6 min-h-[44px] whitespace-nowrap"
            >
              Browse Spas
            </Button>
            <Button 
              onClick={() => navigate('/yoga')}
              className="bg-[#2E7D32] hover:bg-[#256b29] text-white font-medium px-4 sm:px-6 min-h-[44px] whitespace-nowrap"
            >
              Browse Yoga
            </Button>
            <Button 
              onClick={() => navigate('/trainers')}
              className="bg-[#E85D04] hover:bg-[#D4540A] text-white font-medium px-4 sm:px-6 min-h-[44px] whitespace-nowrap"
            >
              Find Trainers
            </Button>
            <Button 
              onClick={() => navigate('/therapists')}
              className="bg-[#00838F] hover:bg-[#006977] text-white font-medium px-4 sm:px-6 min-h-[44px] whitespace-nowrap"
            >
              Find Therapists
            </Button>
            <Button 
              onClick={() => navigate('/chiropractors')}
              className="bg-[#5D4037] hover:bg-[#4E342E] text-white font-medium px-4 sm:px-6 min-h-[44px] whitespace-nowrap"
            >
              Find Chiropractors
            </Button>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default HeroBanner;
