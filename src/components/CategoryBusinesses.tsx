
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Star, MapPin } from "lucide-react";

interface CategoryBusinessesProps {
  category: string;
}

const CategoryBusinesses = ({ category }: CategoryBusinessesProps) => {
  // This component can be used to show featured businesses by category
  // For now, it's a placeholder that can be enhanced later
  
  const getCategoryIcon = () => {
    switch (category) {
      case 'gym':
        return <Dumbbell className="h-6 w-6 text-red-600" />;
      default:
        return <Dumbbell className="h-6 w-6 text-red-600" />;
    }
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'gym':
        return 'Premium Fitness Centers';
      case 'spa':
        return 'Luxury Spa Experiences';
      case 'yoga':
        return 'Mindful Yoga Studios';
      default:
        return 'Featured Businesses';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          {getCategoryIcon()}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {getCategoryTitle()}
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover top-rated {category} facilities with modern amenities and expert professionals.
        </p>
      </div>
    </div>
  );
};

export default CategoryBusinesses;
