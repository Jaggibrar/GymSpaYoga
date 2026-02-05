import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ArrowRight, Users } from "lucide-react";
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

  const displayTrainers = trainers.slice(0, 3);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              {getCategoryTitle()}
            </h3>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <CardContent className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayTrainers.length === 0) {
    return (
      <section className="py-20 px-4 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              No {getCategoryTitle()} Available
            </h3>
            <p className="text-gray-500 mb-6">
              We're currently working on adding more trainers in this category.
            </p>
            <Link to="/trainers">
              <Button className="bg-[#005EB8] hover:bg-[#004d96]">
                View All Trainers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-white/60 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            {getCategoryTitle()}
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            {getCategoryDescription()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayTrainers.map((trainer) => (
            <Card key={trainer.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <div className="relative">
                <img 
                  src={trainer.profile_image_url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"} 
                  alt={trainer.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{trainer.rating || 4.8}</span>
                      <span className="text-sm text-gray-500">({trainer.reviews_count || 12})</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-[#005EB8] transition-colors duration-300">
                      {trainer.name}
                    </CardTitle>
                    <p className="text-gray-600">{trainer.experience} years experience</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#005EB8]">₹{trainer.hourly_rate}</p>
                    <p className="text-sm text-gray-500">per hour</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{trainer.location}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2">{trainer.bio}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {trainer.specializations?.slice(0, 2).map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {trainer.specializations?.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{trainer.specializations.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  <Link to={`/trainers/${trainer.id}`} className="block">
                    <Button className="w-full bg-[#005EB8] hover:bg-[#004d96] transform hover:scale-105 transition-all duration-300">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/trainers">
            <Button size="lg" className="bg-[#005EB8] hover:bg-[#004d96] text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
              View All {getCategoryTitle()}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryTrainers;
