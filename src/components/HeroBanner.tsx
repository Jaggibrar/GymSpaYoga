import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';
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
      {/* Hero Image */}
      <div className="relative w-full min-h-[420px] md:min-h-[520px] overflow-hidden">
        <picture>
          <source srcSet="/images/hero-banner.webp" type="image/webp" />
          <img
            src="/images/hero-banner.png"
            alt="GymSpaYoga - Premium Gyms, Spas and Yoga Studios"
            className="w-full h-full object-cover object-center absolute inset-0"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width="1920"
            height="706"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center max-w-3xl"
          >
            <span className="inline-block bg-primary/20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-white/10">
              🌍 200+ Cities · 50,000+ Users · 1,000+ Listings
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight">
              {detectedCity
                ? <>Best Wellness in <span className="text-primary">{detectedCity}</span></>
                : <>Find Your Perfect<br /><span className="text-primary">Wellness</span> Experience</>
              }
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-6 max-w-xl mx-auto">
              {detectedCity
                ? `Discover top-rated gyms, spas, yoga studios & trainers in ${detectedCity}`
                : 'Discover gyms, spas, yoga studios, and personal trainers near you'
              }
            </p>
          </motion.div>

          {/* Search Bar - Embedded in Hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-3xl"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-white/20">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search gyms, spas, yoga..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-sm border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full sm:w-[130px] h-12 border-0 bg-accent text-sm rounded-xl">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border border-border shadow-xl rounded-xl">
                      <SelectItem value="gym">Gyms</SelectItem>
                      <SelectItem value="spa">Spas</SelectItem>
                      <SelectItem value="yoga">Yoga</SelectItem>
                      <SelectItem value="trainer">Trainers</SelectItem>
                      <SelectItem value="therapist">Therapists</SelectItem>
                      <SelectItem value="chiropractor">Chiropractors</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSearch} className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-sm">
                    <Search className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Search</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Category Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mt-4"
          >
            {[
              { label: "Gyms", path: "/gyms" },
              { label: "Spas", path: "/spas" },
              { label: "Yoga", path: "/yoga" },
              { label: "Trainers", path: "/trainers" },
              { label: "Therapists", path: "/therapists" },
            ].map(tag => (
              <button
                key={tag.label}
                onClick={() => navigate(tag.path)}
                className="bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full border border-white/10 transition-all duration-200"
              >
                {tag.label}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
