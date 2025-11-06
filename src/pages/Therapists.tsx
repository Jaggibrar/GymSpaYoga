import { useState } from "react";
import { Heart, Search, Filter, SlidersHorizontal } from "lucide-react";
import { useTherapists } from "@/hooks/useTherapists";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import OptimizedBusinessGrid from "@/components/OptimizedBusinessGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      </div>
    </>
  );
};

export default Therapists;
