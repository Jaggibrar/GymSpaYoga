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
        () => {},
        { timeout: 5000, maximumAge: 600000 }
      );
    }
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (tier) params.set('tier', tier);
    
    switch (category) {
      case 'gym': navigate(`/gyms?${params.toString()}`); break;
      case 'spa': navigate(`/spas?${params.toString()}`); break;
      case 'yoga': navigate(`/yoga?${params.toString()}`); break;
      case 'trainer': navigate(`/trainers?${params.toString()}`); break;
      case 'therapist': navigate(`/therapists?${params.toString()}`); break;
      case 'chiropractor': navigate(`/chiropractors?${params.toString()}`); break;
      default: navigate(`/explore?${params.toString()}`);
    }
  };

  return (
    <section className="relative" aria-label="Hero banner with search">
      {/* Hero Banner Image */}
      <div className="relative w-full aspect-[21/9] min-h-[280px] max-h-[500px] overflow-hidden">
        <img
          src="/images/hero-banner.png"
          alt="GymSpaYoga - Premium Gyms, Spas and Yoga Studios in India"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Warm dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-charcoal-900/60" />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white text-center mb-3 md:mb-4 drop-shadow-lg">
            {detectedCity
              ? `Best Wellness Centers in ${detectedCity}`
              : <>Find Your Perfect Wellness<br className="hidden sm:block" /><span className="sm:hidden"> </span>Experience</>
            }
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-warm-200 mb-4 md:mb-6 text-center max-w-2xl drop-shadow-md px-2">
            {detectedCity
              ? `Discover top-rated gyms, spas, yoga studios & trainers in ${detectedCity}`
              : 'Discover gyms, spas, yoga studios, and personal trainers near you'
            }
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 -mt-6 md:-mt-8 relative z-10">
        <div data-tour="hero-search" className="bg-card rounded-xl p-3 md:p-4 shadow-2xl w-full max-w-4xl mx-auto border border-border">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" aria-hidden="true" />
                <Input
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base border-border focus:border-primary focus:ring-primary bg-card"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  aria-label="Search for gyms, spas, or yoga studios"
                />
              </div>

              <div className="flex gap-2 sm:gap-3">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="flex-1 sm:w-[130px] h-12 border-border bg-card text-sm" aria-label="Select category">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border shadow-lg z-50">
                    <SelectItem value="gym">Gyms</SelectItem>
                    <SelectItem value="spa">Spas</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="trainer">Trainers</SelectItem>
                    <SelectItem value="therapist">Therapists</SelectItem>
                    <SelectItem value="chiropractor">Chiropractors</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={tier} onValueChange={setTier}>
                  <SelectTrigger className="flex-1 sm:w-[150px] h-12 border-border bg-card text-sm" aria-label="Filter by tier">
                    <Filter className="h-4 w-4 mr-1 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                    <SelectValue placeholder="Tier" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border shadow-lg z-50">
                    <SelectItem value="budget">Budget Friendly</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleSearch}
                className="h-12 min-h-[48px] px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                aria-label="Search"
              >
                <Search className="mr-2 h-5 w-5" aria-hidden="true" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Category Quick Links */}
        <nav className="mt-4 overflow-x-auto scrollbar-hide" aria-label="Quick category links">
          <div className="flex justify-center gap-2 sm:gap-3 min-w-max px-4 sm:px-0">
            {[
              { label: "Browse Gyms", path: "/gyms", bg: "bg-charcoal-800 hover:bg-charcoal-700" },
              { label: "Browse Spas", path: "/spas", bg: "bg-warm-700 hover:bg-warm-600" },
              { label: "Browse Yoga", path: "/yoga", bg: "bg-warm-800 hover:bg-warm-700" },
              { label: "Find Trainers", path: "/trainers", bg: "bg-brand-500 hover:bg-brand-600 text-charcoal-900" },
              { label: "Find Therapists", path: "/therapists", bg: "bg-charcoal-700 hover:bg-charcoal-600" },
              { label: "Find Chiropractors", path: "/chiropractors", bg: "bg-warm-900 hover:bg-warm-800" },
            ].map((item) => (
              <Button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`${item.bg} text-white font-medium px-4 sm:px-6 min-h-[44px] whitespace-nowrap shadow-sm`}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default HeroBanner;
