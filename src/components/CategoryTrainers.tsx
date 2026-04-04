import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ArrowRight, Users, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useTrainers } from "@/hooks/useTrainers";

interface CategoryTrainersProps {
  category: "gym" | "spa" | "yoga" | "trainer" | "chiropractor";
}

const CategoryTrainers = ({ category }: CategoryTrainersProps) => {
  const { trainers, loading } = useTrainers('', '', '', category);

  const getCategoryTitle = () => {
    switch (category) {
      case "gym": return "Expert Gym Trainers";
      case "spa": return "Professional Spa Therapists";
      case "yoga": return "Certified Yoga Instructors";
      case "trainer": return "Personal Trainers";
      case "chiropractor": return "Professional Chiropractors";
      default: return "Expert Trainers";
    }
  };

  const getCategoryDescription = () => {
    switch (category) {
      case "gym": return "Get personalized fitness training from certified gym professionals";
      case "spa": return "Experience healing and relaxation with our expert therapists";
      case "yoga": return "Find your inner peace with experienced yoga instructors";
      case "trainer": return "Achieve your fitness goals with dedicated personal trainers";
      case "chiropractor": return "Get expert spinal care and pain relief from certified chiropractors";
      default: return "Connect with professional trainers";
    }
  };

  const displayTrainers = trainers.slice(0, 4);

  if (loading) {
    return (
      <section className="py-16 px-4 bg-accent/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-foreground mb-2">{getCategoryTitle()}</h3>
            <p className="text-muted-foreground">{getCategoryDescription()}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden animate-pulse border border-border">
                <div className="h-56 bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-10 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayTrainers.length === 0) {
    return (
      <section className="py-16 px-4 bg-accent/30">
        <div className="container mx-auto max-w-6xl text-center">
          <Users className="h-14 w-14 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            No {getCategoryTitle()} Available Yet
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We're expanding our network. Check back soon or explore all trainers.
          </p>
          <Link to="/trainers">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              View All Trainers <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-accent/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3 text-primary border-primary/30 bg-primary/5 px-3 py-1">
            <Award className="h-3.5 w-3.5 mr-1.5" /> Verified Professionals
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {getCategoryTitle()}
          </h3>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {getCategoryDescription()}
          </p>
        </div>

        {/* Trainer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {displayTrainers.map((trainer) => (
            <div
              key={trainer.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={trainer.profile_image_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Rating pill */}
                <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-foreground">{trainer.rating || 4.8}</span>
                  <span className="text-xs text-muted-foreground">({trainer.reviews_count || 12})</span>
                </div>
                {/* Tier badge */}
                {trainer.trainer_tier && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary/90 text-primary-foreground text-[10px] uppercase tracking-wider font-semibold">
                      {trainer.trainer_tier}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                {/* Name & Price row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="font-bold text-foreground text-lg truncate group-hover:text-primary transition-colors">
                      {trainer.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      <span>{trainer.experience} yrs experience</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xl font-bold text-primary">₹{trainer.hourly_rate}</p>
                    <p className="text-[11px] text-muted-foreground">per hour</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                  <span className="truncate">{trainer.location}</span>
                </div>

                {/* Specializations */}
                {trainer.specializations && trainer.specializations.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {trainer.specializations.slice(0, 2).map((spec) => (
                      <Badge key={spec} variant="outline" className="text-[11px] font-normal bg-accent/50 border-border">
                        {spec}
                      </Badge>
                    ))}
                    {trainer.specializations.length > 2 && (
                      <Badge variant="outline" className="text-[11px] font-normal bg-accent/50 border-border">
                        +{trainer.specializations.length - 2} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* CTA */}
                <Link to={`/trainers/${trainer.id}`} className="block mt-auto pt-1">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl h-11">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center">
          <Link to="/trainers">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 rounded-xl"
            >
              View All {getCategoryTitle()}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryTrainers;
