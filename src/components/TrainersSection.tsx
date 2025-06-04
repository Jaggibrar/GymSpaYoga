
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
      image: "/placeholder.svg"
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
      case "gym": return "from-red-500 to-orange-500";
      case "spa": return "from-blue-500 to-cyan-500";
      case "yoga": return "from-green-500 to-emerald-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-800 mb-6">
            Expert Trainers & Instructors
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with certified professionals for personalized training and guidance
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">500+</div>
              <div className="text-gray-600">Certified Trainers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600">Available Support</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredTrainers.map((trainer) => (
            <Card key={trainer.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <div className="relative">
                <img 
                  src={trainer.image} 
                  alt={trainer.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`bg-gradient-to-r ${getCategoryColor(trainer.category)} text-white shadow-lg`}>
                    <div className="flex items-center space-x-1">
                      {getCategoryIcon(trainer.category)}
                      <span className="capitalize">{trainer.category}</span>
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
                <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                  {trainer.name}
                </CardTitle>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">{trainer.experience} years exp.</p>
                  <p className="text-lg font-bold text-emerald-600">₹{trainer.hourlyRate}/hr</p>
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
                  
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 text-sm">
                    Book Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/trainers">
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-xl px-12 py-6 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
              View All Trainers
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
          <div className="mt-6">
            <Link to="/register-trainer">
              <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 text-lg px-8 py-3">
                Become a Trainer - ₹2,999
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;
