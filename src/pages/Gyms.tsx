import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Grid3X3, Map, Star, Clock, DollarSign, Navigation, List, Dumbbell, MessageCircle, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { useOptimizedBusinessData } from '@/hooks/useOptimizedBusinessData';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAnalytics } from '@/components/analytics/AnalyticsProvider';
import OptimizedImage from '@/components/performance/ImageOptimizer';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const Gyms = () => {
  const navigate = useNavigate();
  const { trackSearch, trackUserAction } = useAnalytics();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  
  const { position, getCurrentPosition, loading: geoLoading } = useGeolocation();

  const { businesses, loading, error } = useOptimizedBusinessData(
    'gym',
    searchTerm,
    location,
    sortBy
  );

  const budgetGyms = businesses.filter(b => {
    const price = b.monthly_price || b.session_price || 0;
    return price < 2000;
  });

  const premiumGyms = businesses.filter(b => {
    const price = b.monthly_price || b.session_price || 0;
    return price >= 2000 && price < 4000;
  });

  const luxuryGyms = businesses.filter(b => {
    const price = b.monthly_price || b.session_price || 0;
    return price >= 4000;
  });

  const handleSearch = () => {
    trackSearch(searchTerm, location, businesses.length);
    trackUserAction('gym_search', { searchTerm, location, resultCount: businesses.length });
  };

  const handleGetCurrentLocation = () => {
    getCurrentPosition();
    if (position) {
      setLocation(`${position.latitude}, ${position.longitude}`);
      toast.success('Current location detected!');
    }
  };

  const handleViewDetails = (business: any) => {
    navigate(`/gyms/${business.slug || business.id}`);
  };

  const handleBookNow = (phone: string, businessName: string) => {
    if (phone) {
      const message = `Hi, I'm interested in joining ${businessName}. Could you please provide more details about membership options?`;
      const whatsappUrl = `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const tierConfig: Record<string, { color: string; bgLight: string; label: string }> = {
    budget: { color: 'bg-warm-800', bgLight: 'bg-warm-800/10', label: 'Budget Tier' },
    premium: { color: 'bg-primary', bgLight: 'bg-primary/10', label: 'Premium Tier' },
    luxury: { color: 'bg-charcoal-800', bgLight: 'bg-charcoal-800/10', label: 'Luxury Tier' },
  };

  const renderGymCard = (business: any, tierColor: string) => (
    <motion.div
      key={business.id}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="w-full group hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/40 rounded-2xl overflow-hidden bg-card h-full">
        <div className="relative h-56 overflow-hidden">
          <OptimizedImage
            src={business.image_urls?.[0] || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48"}
            alt={`${business.business_name} - Premium Gym in ${business.city}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            width={400}
            height={224}
          />
          <Badge className={`absolute top-4 right-4 ${tierColor} text-white border-0 capitalize px-3 py-1 shadow-lg rounded-lg`}>
            <Star className="h-3 w-3 mr-1 fill-white inline" />
            {(4.0 + Math.random()).toFixed(1)}
          </Badge>
          <div className="absolute top-4 left-4">
            <div className={`w-10 h-10 rounded-xl ${tierColor} flex items-center justify-center shadow-lg`}>
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <CardContent className="p-5 space-y-3">
          <div className="space-y-1.5">
            <h3 className="text-xl font-display font-bold group-hover:text-primary transition-colors line-clamp-1 leading-tight text-foreground">
              {business.business_name}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
              <span className="text-sm font-medium">{business.city}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            {business.amenities?.slice(0, 2).map((amenity: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs px-2 py-1 rounded-md border-border">
                {amenity}
              </Badge>
            ))}
            {business.amenities && business.amenities.length > 2 && (
              <Badge variant="outline" className="text-xs px-2 py-1 rounded-md border-border">
                +{business.amenities.length - 2} more
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-1.5 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>{business.opening_time} - {business.closing_time}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 flex-shrink-0 text-primary" />
              <p className="text-lg font-bold text-primary">
                {business.monthly_price ? `₹${business.monthly_price}/month` : 
                 business.session_price ? `₹${business.session_price}/session` : 'Contact for pricing'}
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline"
              onClick={() => handleViewDetails(business)}
              className="flex-1 min-h-[48px] font-semibold rounded-xl border-border"
              aria-label={`View details for ${business.business_name}`}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            <Button 
              onClick={() => handleBookNow(business.phone, business.business_name)}
              className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] min-h-[48px] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              aria-label={`Book now at ${business.business_name}`}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderTierSection = (gyms: any[], tier: string, tierColor: string) => {
    if (gyms.length === 0) return null;
    const config = tierConfig[tier];
    return (
      <ScrollReveal key={tier}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-10 ${config.color} rounded-full`} />
            <h2 className="text-3xl font-display font-bold text-foreground">{config.label}</h2>
            <Badge className={`${config.color} text-white rounded-lg`}>{gyms.length} Gyms</Badge>
          </div>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gyms.map((business) => (
              <StaggerItem key={business.id}>
                {renderGymCard(business, tierColor)}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ScrollReveal>
    );
  };

  return (
    <>
      <SEOHead
        title="Best Gyms in India - Find Premium Fitness Centers Near You | GymSpaYoga"
        description="Discover and book the best gyms in Mumbai, Delhi, Bangalore & across India. State-of-the-art equipment, expert trainers, and flexible membership options. Book now!"
        keywords="gyms near me, best gym Mumbai, premium gym Delhi, fitness center Bangalore, gym membership India, workout facilities"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[250px] md:h-[350px]">
          <div className="absolute inset-0">
            <OptimizedImage 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Modern gym equipment and fitness facility interior"
              className="w-full h-full object-cover"
              priority={true}
              width={1920}
              height={350}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/40 via-charcoal-900/50 to-charcoal-900/70"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-3 text-white">
                Explore Premium Gyms
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Discover state-of-the-art fitness centers with expert trainers
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Section */}
        <motion.section
          className="container mx-auto px-4 py-6 -mt-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border border-border shadow-xl rounded-2xl bg-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search gyms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-border rounded-xl"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 pr-10 h-12 border-border rounded-xl"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={handleGetCurrentLocation}
                    disabled={geoLoading}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  >
                    <Navigation className={`h-4 w-4 ${geoLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
                <Button 
                  onClick={handleSearch}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6 rounded-xl font-semibold"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Filters */}
        <section className="py-5 bg-accent/50 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg font-semibold">
                  {businesses.length} Gyms Found
                </Badge>
                <select 
                  className="px-4 py-2 border border-border rounded-xl text-sm bg-card"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="created_at">Sort by: Latest</option>
                  <option value="business_name">Sort by: Name</option>
                  <option value="monthly_price">Sort by: Price</option>
                </select>
              </div>
              
              <div className="flex gap-2">
                {[
                  { mode: 'grid' as const, icon: Grid3X3, label: 'Grid' },
                  { mode: 'list' as const, icon: List, label: 'List' },
                  { mode: 'map' as const, icon: Map, label: 'Map' },
                ].map(({ mode, icon: Icon, label }) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode(mode)}
                    className={`rounded-lg ${viewMode === mode ? 'bg-primary text-primary-foreground' : 'border-border'}`}
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 space-y-16">
            {error ? (
              <div className="text-center py-12">
                <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 max-w-md mx-auto">
                  <p className="text-destructive mb-4">Failed to load gyms: {error}</p>
                  <Button onClick={() => window.location.reload()} variant="outline" className="rounded-xl">
                    Try Again
                  </Button>
                </div>
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse border-border rounded-2xl">
                    <div className="h-48 bg-muted rounded-t-2xl"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-3 bg-muted rounded w-20"></div>
                        <div className="h-3 bg-muted rounded w-16"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : businesses.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🏋️‍♀️</div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">No gyms found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search criteria or explore different locations</p>
              </div>
            ) : (
              <>
                {renderTierSection(budgetGyms, 'budget', 'bg-warm-800')}
                {renderTierSection(premiumGyms, 'premium', 'bg-primary')}
                {renderTierSection(luxuryGyms, 'luxury', 'bg-charcoal-800')}
              </>
            )}
          </div>
        </section>

        {/* Trainer Banner */}
        <section className="py-14 md:py-20 bg-accent/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <ScrollReveal direction="left" className="flex-1 flex justify-center lg:justify-start">
                <motion.img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=500&q=80"
                  alt="Personal trainer helping client"
                  className="rounded-3xl max-w-sm w-full object-cover shadow-xl"
                  whileHover={{ scale: 1.03 }}
                />
              </ScrollReveal>
              <ScrollReveal direction="right" className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">HIRE A PERSONAL TRAINER</h2>
                <p className="text-xl text-muted-foreground mb-4">Getting back in shape has never been so easy!</p>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">Get a best-in-class Personal Trainer and kick-start your fitness journey!</p>
                <Link to="/trainers">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
                    <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8 py-6 text-lg rounded-xl">
                      ENQUIRE NOW
                    </Button>
                  </motion.div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Community Banner */}
        <section className="bg-secondary py-14">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex items-center">
                  <div className="flex -space-x-4">
                    {[
                      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&h=200&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
                      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=face',
                    ].map((img, index) => (
                      <img key={index} src={img} alt={`Community member ${index + 1}`}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full border-3 border-secondary object-cover shadow-md" loading="lazy" />
                    ))}
                  </div>
                  <div className="ml-5">
                    <p className="text-2xl md:text-3xl font-display font-bold text-primary">10,000+</p>
                    <p className="text-secondary-foreground/70 text-sm">Active Members</p>
                  </div>
                </div>
                <div className="text-center lg:text-left flex-1 max-w-md">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-secondary-foreground mb-2">GymSpaYoga.com</h3>
                  <p className="text-secondary-foreground/80 text-sm">Your Complete Wellness Destination. Start your fitness journey today!</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/explore">
                    <Button size="lg" className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 rounded-xl">
                      Explore More <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <a href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20know%20more%20about%20GymSpaYoga" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-card text-foreground font-bold hover:bg-card/90 rounded-xl">
                      <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default Gyms;
