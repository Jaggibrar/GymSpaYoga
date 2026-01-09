import { useState } from "react";
import { Heart, Search, Filter, SlidersHorizontal, ArrowRight, MessageCircle } from "lucide-react";
import { useTherapists } from "@/hooks/useTherapists";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import OptimizedBusinessGrid from "@/components/OptimizedBusinessGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Therapists = () => {
  const { therapists, loading, error } = useTherapists();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Filter and sort therapists
  const filteredTherapists = therapists
    .filter((therapist) => {
      const matchesSearch = therapist.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          therapist.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          therapist.state.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || therapist.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.session_price || a.monthly_price || 0) - (b.session_price || b.monthly_price || 0);
        case "price-high":
          return (b.session_price || b.monthly_price || 0) - (a.session_price || a.monthly_price || 0);
        case "newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  // Get unique categories
  const categories = Array.from(new Set(therapists.map(t => t.category)));

  return (
    <>
      <SEOHead
        title="Find Wellness Therapists Near You | GymSpaYoga"
        description="Discover certified wellness therapists, massage therapists, physiotherapists, and holistic healers. Book sessions with experienced professionals for your health and wellness journey."
        keywords="therapists, wellness therapists, massage therapy, physiotherapy, holistic healing, sports therapy, rehabilitation"
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <section className="relative overflow-hidden h-[250px] md:h-[350px]">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Professional wellness therapist session"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                Find Professional Therapists
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
                Connect with certified wellness therapists for personalized care
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Search and Filters Section */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search by name or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-12">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters Display */}
              {(searchTerm || selectedCategory !== "all") && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {searchTerm && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-2 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {selectedCategory !== "all" && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Category: {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="ml-2 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="h-7"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-lg text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredTherapists.length}</span> therapist{filteredTherapists.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Therapists Grid */}
          {error && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">Error loading therapists: {error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          )}

          {!error && (
            <OptimizedBusinessGrid
              businesses={filteredTherapists}
              loading={loading}
            />
          )}

          {/* Empty State */}
          {!loading && !error && filteredTherapists.length === 0 && (
            <Card className="border-0 shadow-xl">
              <CardContent className="text-center py-16">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No therapists found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* GymSpaYoga Branding Banner with Real People */}
        <section className="bg-[#005EB8] py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left: Real People Images */}
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
                    <img
                      key={index}
                      src={img}
                      alt={`Community member ${index + 1}`}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full border-3 border-white object-cover shadow-md"
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="ml-4 md:ml-6">
                  <p className="text-2xl md:text-3xl font-bold text-white">10,000+</p>
                  <p className="text-white/80 text-sm md:text-base">Active Members</p>
                </div>
              </div>

              {/* Center: Message */}
              <div className="text-center lg:text-left flex-1 max-w-md">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  GymSpaYoga.com
                </h3>
                <p className="text-white/90 text-sm md:text-base">
                  Your Complete Wellness Destination. Find your therapist today!
                </p>
              </div>

              {/* Right: CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/explore">
                  <Button size="lg" className="bg-white text-[#005EB8] font-bold hover:bg-gray-100">
                    Explore More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20know%20more%20about%20GymSpaYoga" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-[#005EB8] font-bold hover:bg-gray-100">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Therapists;
