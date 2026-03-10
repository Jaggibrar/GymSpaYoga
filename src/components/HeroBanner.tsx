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
import { motion } from 'framer-motion';

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
      <div className="relative w-full aspect-[21/9] min-h-[320px] max-h-[540px] overflow-hidden">
        <img
          src="/images/hero-banner.png"
          alt="GymSpaYoga - Premium Gyms, Spas and Yoga Studios in India"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/30 via-charcoal-900/40 to-charcoal-900/70" />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white text-center mb-3 md:mb-4 drop-shadow-lg">
              {detectedCity
                ? `Best Wellness Centers in ${detectedCity}`
                : <>Find Your Perfect Wellness<br className="hidden sm:block" /><span className="sm:hidden"> </span>Experience</>
              }
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-base sm:text-lg md:text-xl text-warm-200 mb-4 md:mb-6 text-center max-w-2xl drop-shadow-md px-2"
          >
            {detectedCity
              ? `Discover top-rated gyms, spas, yoga studios & trainers in ${detectedCity}`
              : 'Discover gyms, spas, yoga studios, and personal trainers near you'
            }
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-6 md:gap-10 text-white/90 mb-4 md:mb-0"
          >
            {[
              { label: 'Listings', value: '1,000+' },
              { label: 'Happy Users', value: '50,000+' },
              { label: 'Cities', value: '50+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg md:text-2xl font-bold text-primary drop-shadow">{stat.value}</p>
                <p className="text-xs md:text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="container mx-auto px-4 -mt-8 md:-mt-10 relative z-10"
      >
        <div data-tour="hero-search" className="bg-card rounded-2xl p-4 md:p-5 shadow-2xl w-full max-w-4xl mx-auto border border-border/50">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" aria-hidden="true" />
                <Input
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-11 h-13 text-base border-border focus:border-primary focus:ring-primary bg-card rounded-xl"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  aria-label="Search for gyms, spas, or yoga studios"
                />
              </div>

              <div className="flex gap-2 sm:gap-3">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="flex-1 sm:w-[140px] h-13 border-border bg-card text-sm rounded-xl" aria-label="Select category">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border shadow-xl z-50 rounded-xl">
                    <SelectItem value="gym">Gyms</SelectItem>
                    <SelectItem value="spa">Spas</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="trainer">Trainers</SelectItem>
                    <SelectItem value="therapist">Therapists</SelectItem>
                    <SelectItem value="chiropractor">Chiropractors</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={tier} onValueChange={setTier}>
                  <SelectTrigger className="flex-1 sm:w-[150px] h-13 border-border bg-card text-sm rounded-xl" aria-label="Filter by tier">
                    <Filter className="h-4 w-4 mr-1 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                    <SelectValue placeholder="Tier" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border shadow-xl z-50 rounded-xl">
                    <SelectItem value="budget">Budget Friendly</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={handleSearch}
                  className="h-13 min-h-[52px] px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl w-full sm:w-auto"
                  aria-label="Search"
                >
                  <Search className="mr-2 h-5 w-5" aria-hidden="true" />
                  Search
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Category Quick Links */}
        <nav className="mt-5 overflow-x-auto scrollbar-hide" aria-label="Quick category links">
          <div className="flex justify-center gap-2 sm:gap-3 min-w-max px-4 sm:px-0">
            {[
              { label: "Gyms", path: "/gyms", bg: "bg-charcoal-800 hover:bg-charcoal-700" },
              { label: "Spas", path: "/spas", bg: "bg-warm-700 hover:bg-warm-600" },
              { label: "Yoga", path: "/yoga", bg: "bg-warm-800 hover:bg-warm-700" },
              { label: "Trainers", path: "/trainers", bg: "bg-primary hover:bg-primary/90 text-primary-foreground" },
              { label: "Therapists", path: "/therapists", bg: "bg-charcoal-700 hover:bg-charcoal-600" },
              { label: "Chiropractors", path: "/chiropractors", bg: "bg-warm-900 hover:bg-warm-800" },
            ].map((item) => (
              <motion.div key={item.label} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => navigate(item.path)}
                  className={`${item.bg} text-white font-medium px-5 sm:px-6 min-h-[44px] whitespace-nowrap shadow-sm rounded-xl`}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </nav>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
