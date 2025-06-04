
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryTrainersProps {
  category: "gym" | "spa" | "yoga";
}

const CategoryTrainers = ({ category }: CategoryTrainersProps) => {
  // Mock trainers data filtered by category
  const allTrainers = [
    {
      id: 1,
      name: "Rahul Sharma",
      category: "gym",
      rating: 4.9,
      reviews: 156,
      experience: 8,
      hourlyRate: 1500,
      location: "Mumbai",
      specializations: ["Weight Training", "Bodybuilding", "HIIT"],
      image: "/placeholder.svg",
      bio: "Certified personal trainer with 8 years of experience in bodybuilding and strength training."
    },
    {
      id: 2,
      name: "Vikram Rao",
      category: "gym",
      rating: 4.9,
      reviews: 178,
      experience: 12,
      hourlyRate: 1800,
      location: "Delhi",
      specializations: ["CrossFit", "Functional Training", "Sports Conditioning"],
      image: "/placeholder.svg",
      bio: "Former athlete turned fitness coach, specializing in high-intensity functional training."
    },
    {
      id: 3,
      name: "Priya Patel",
      category: "yoga",
      rating: 4.8,
      reviews: 89,
      experience: 6,
      hourlyRate: 1200,
      location: "Pune",
      specializations: ["Hatha Yoga", "Meditation", "Prenatal Yoga"],
      image: "/placeholder.svg",
      bio: "Experienced yoga instructor specializing in traditional Hatha yoga and mindfulness meditation."
    },
    {
      id: 4,
      name: "Anjali Gupta",
      category: "yoga",
      rating: 4.7,
      reviews: 145,
      experience: 9,
      hourlyRate: 1400,
      location: "Bangalore",
      specializations: ["Vinyasa", "Power Yoga", "Yin Yoga"],
      image: "/placeholder.svg",
      bio: "Passionate yoga teacher with expertise in dynamic flow sequences and restorative practices."
    },
    {
      id: 5,
      name: "Meera Singh",
      category: "spa",
      rating: 4.7,
      reviews: 234,
      experience: 10,
      hourlyRate: 2000,
      location: "Bangalore",
      specializations: ["Deep Tissue", "Aromatherapy", "Hot Stone"],
      image: "/placeholder.svg",
      bio: "Master therapist with expertise in various massage techniques and holistic wellness."
    },
    {
      id: 6,
      name: "Kavya Reddy",
      category: "spa",
      rating: 4.8,
      reviews: 189,
      experience: 7,
      hourlyRate: 1800,
      location: "Hyderabad",
      specializations: ["Swedish Massage", "Reflexology", "Facial"],
      image: "/placeholder.svg",
      bio: "Licensed therapist specializing in relaxation and wellness treatments for mind and body."
    }
  ];

  const categoryTrainers = allTrainers.filter(trainer => trainer.category === category).slice(0, 3);

  const getCategoryTitle = () => {
    switch (category) {
      case "gym": return "Expert Gym Trainers";
      case "spa": return "Professional Spa Therapists";
      case "yoga": return "Certified Yoga Instructors";
      default: return "Expert Trainers";
    }
  };

  const getCategoryDescription = () => {
    switch (category) {
      case "gym": return "Get personalized fitness training from certified gym professionals";
      case "spa": return "Experience healing and relaxation with our expert therapists";
      case "yoga": return "Find your inner peace with experienced yoga instructors";
      default: return "Connect with professional trainers";
    }
  };

  if (categoryTrainers.length === 0) return null;

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
          {categoryTrainers.map((trainer) => (
            <Card key={trainer.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-white/90 backdrop-blur-sm">
              <div className="relative">
                <img 
                  src={trainer.image} 
                  alt={trainer.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{trainer.rating}</span>
                      <span className="text-sm text-gray-500">({trainer.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                      {trainer.name}
                    </CardTitle>
                    <p className="text-gray-600">{trainer.experience} years experience</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">₹{trainer.hourlyRate}</p>
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
                    {trainer.specializations.slice(0, 2).map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {trainer.specializations.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{trainer.specializations.length - 2} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300">
                      Book Session
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-emerald-50">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-blue-50">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/trainers">
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
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
