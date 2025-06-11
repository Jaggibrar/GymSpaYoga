
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Star, MapPin, Waves, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryBusinessesProps {
  category: string;
}

const CategoryBusinesses = ({ category }: CategoryBusinessesProps) => {
  const getCategoryIcon = () => {
    switch (category) {
      case 'gym':
        return <Dumbbell className="h-6 w-6 text-red-600" />;
      case 'spa':
        return <Waves className="h-6 w-6 text-blue-600" />;
      case 'yoga':
        return <Heart className="h-6 w-6 text-purple-600" />;
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

  const getCategoryDescription = () => {
    switch (category) {
      case 'gym':
        return 'Discover top-rated gym facilities with modern amenities and expert trainers.';
      case 'spa':
        return 'Experience luxury spa treatments and wellness services for ultimate relaxation.';
      case 'yoga':
        return 'Find peaceful yoga studios with certified instructors for mind-body wellness.';
      default:
        return 'Discover top-rated facilities with modern amenities and expert professionals.';
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'gym':
        return 'from-red-500 to-orange-500';
      case 'spa':
        return 'from-blue-500 to-cyan-500';
      case 'yoga':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-red-500 to-orange-500';
    }
  };

  const getRegisterLink = () => {
    return '/register-business';
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
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          {getCategoryDescription()}
        </p>
        
        <div className="flex justify-center gap-4">
          <Link to={getRegisterLink()}>
            <Button className={`bg-gradient-to-r ${getCategoryColor()} hover:opacity-90 text-white px-6 py-3`}>
              List Your {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            <Star className="h-12 w-12 text-yellow-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Top Rated</h3>
          <p className="text-gray-600 text-sm">
            Only the highest quality {category} facilities make it to our platform
          </p>
        </Card>

        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            <MapPin className="h-12 w-12 text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Convenient Locations</h3>
          <p className="text-gray-600 text-sm">
            Find {category} facilities near you with easy booking and scheduling
          </p>
        </Card>

        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-center mb-4">
            {getCategoryIcon()}
          </div>
          <h3 className="text-lg font-semibold mb-2">Professional Service</h3>
          <p className="text-gray-600 text-sm">
            Experienced professionals ready to help you achieve your wellness goals
          </p>
        </Card>
      </div>
    </div>
  );
};

export default CategoryBusinesses;
