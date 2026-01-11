
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Dumbbell, Waves, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TrainersSection = () => {
  const featuredTrainers = [
    {
      id: 1,
      name: "Rahul Sharma",
      category: "gym",
      rating: 4.9,
      reviews: 156,
      experience: 8,
      hourlyRate: 1500,
      location: "Mumbai",
      specializations: ["Weight Training", "Bodybuilding"],
      image: "/lovable-uploads/48b65a0c-9366-48be-abc8-35404c2a1d37.png"
    },
    {
      id: 2,
      name: "Priya Patel",
      category: "yoga",
      rating: 4.8,
      reviews: 89,
      experience: 6,
      hourlyRate: 1200,
      location: "Pune",
      specializations: ["Hatha Yoga", "Meditation"],
      image: "/lovable-uploads/1b4c27c8-74f8-4552-9ef9-658431a0e65b.png"
    },
    {
      id: 3,
      name: "Meera Singh",
      category: "spa",
      rating: 4.7,
      reviews: 234,
      experience: 10,
      hourlyRate: 2000,
      location: "Bangalore",
      specializations: ["Deep Tissue", "Aromatherapy"],
      image: "/lovable-uploads/f6b8bda4-a19a-4114-b2d6-550e44d1a2ce.png"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "gym": return <Dumbbell className="h-4 w-4" />;
      case "spa": return <Waves className="h-4 w-4" />;
      case "yoga": return <Heart className="h-4 w-4" />;
      default: return <Dumbbell className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "gym": return "from-[#005EB8] to-[#005EB8]";
      case "spa": return "from-[#005EB8] to-[#005EB8]";
      case "yoga": return "from-[#005EB8] to-[#005EB8]";
      default: return "from-[#005EB8] to-[#005EB8]";
    }
  };

  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Expert Trainers & Instructors
          </h3>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">
            Connect with certified professionals for personalized training and guidance
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#005EB8]">500+</div>
              <div className="text-gray-600 text-sm sm:text-base">Certified Trainers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#005EB8]">98%</div>
              <div className="text-gray-600 text-sm sm:text-base">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#005EB8]">24/7</div>
              <div className="text-gray-600 text-sm sm:text-base">Available Support</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {featuredTrainers.map((trainer) => (
            <Card key={trainer.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <div className="relative">
                <img 
                  src={trainer.image} 
                  alt={trainer.name}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`bg-[#005EB8] text-white shadow-lg`}>
                    <div className="flex items-center space-x-1">
                      {getCategoryIcon(trainer.category)}
                      <span className="capitalize text-xs sm:text-sm">{trainer.category}</span>
                    </div>
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{trainer.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-[#005EB8] transition-colors duration-300">
                  {trainer.name}
                </CardTitle>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">{trainer.experience} years exp.</p>
                  <p className="text-base sm:text-lg font-bold text-[#005EB8]">₹{trainer.hourlyRate}/hr</p>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{trainer.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {trainer.specializations.map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-[#005EB8] hover:bg-[#004d96] transform hover:scale-105 transition-all duration-300 text-sm">
                    Book Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/trainers">
            <Button size="lg" className="bg-[#005EB8] hover:bg-[#004d96] text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 w-full sm:w-auto mb-4 sm:mb-6">
              View All Trainers
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
          <div className="mt-4 sm:mt-6">
            <Link to="/register-trainer">
              <Button variant="outline" className="border-[#005EB8] text-[#005EB8] hover:bg-[#005EB8]/10 text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto">
                Become a Trainer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
