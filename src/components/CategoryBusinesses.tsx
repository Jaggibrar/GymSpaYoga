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
    <div className="container mx-auto px-4 py-10">
      <section className="rounded-3xl bg-gradient-to-br from-[#181F1B] to-black border border-[#3ECF8E33] shadow-[0_0_32px_#3ECF8E11] p-8 mb-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            {getCategoryIcon()}
            <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">{getCategoryTitle()}</h2>
          </div>
          <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-4">{getCategoryDescription()}</p>
          <Link to={getRegisterLink()} className="inline-block">
            <Button className="bg-gradient-to-r from-[#3ECF8E] to-[#106EBE] hover:from-[#32bf73] hover:to-[#3ECF8E] text-black px-8 py-3 font-bold rounded-xl text-lg shadow-[0_0_12px_#3ECF8E99] transition-all duration-300">
              List Your {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
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
      </section>
    </div>
  );
};

export default CategoryBusinesses;
