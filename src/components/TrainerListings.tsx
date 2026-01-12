
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useTrainerData } from "@/hooks/useTrainerData";
import PremiumTrainerCard from "@/components/PremiumTrainerCard";
import LoadingSpinner from "@/components/LoadingSpinner";

interface TrainerListingsProps {
  searchTerm?: string;
  location?: string;
  sortBy?: string;
  priceFilter?: string;
}

const TrainerListings = ({ searchTerm, location, sortBy, priceFilter }: TrainerListingsProps) => {
  const { trainers, loading, error } = useTrainerData('all', searchTerm, location);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-destructive mb-4">Error loading trainers: {error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  // Filter by price
  let filteredTrainers = trainers;
  if (priceFilter) {
    filteredTrainers = trainers.filter(trainer => {
      switch (priceFilter) {
        case 'budget':
          return trainer.hourly_rate <= 1000;
        case 'premium':
          return trainer.hourly_rate > 1000 && trainer.hourly_rate <= 2000;
        case 'luxury':
          return trainer.hourly_rate > 2000;
        default:
          return true;
      }
    });
  }

  // Sort trainers
  const sortedTrainers = [...filteredTrainers].sort((a, b) => {
    switch (sortBy) {
      case 'session_price':
        return a.hourly_rate - b.hourly_rate;
      case '-session_price':
        return b.hourly_rate - a.hourly_rate;
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  if (sortedTrainers.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">No trainers found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search criteria or browse all trainers.
        </p>
        <Link to="/trainers">
          <Button>View All Trainers</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Featured Personal Trainers
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Connect with certified fitness professionals who will help you achieve your goals
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {sortedTrainers.map((trainer, index) => {
          // Convert TrainerData to Trainer format for compatibility
          const trainerForCard = {
            ...trainer,
            user_id: trainer.id, // Add missing user_id field
            rating: 4.8,
            reviews_count: Math.floor(Math.random() * 50) + 10,
            created_at: trainer.created_at,
            updated_at: trainer.updated_at
          };
          
          return (
            <PremiumTrainerCard 
              key={trainer.id} 
              trainer={trainerForCard}
              featured={index < 3} // Mark first 3 as featured
            />
          );
        })}
      </div>

      {/* Load More Section */}
      {sortedTrainers.length >= 9 && (
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Showing {sortedTrainers.length} trainers
          </p>
          <Button variant="outline" size="lg" className="rounded-xl">
            Load More Trainers
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrainerListings;
