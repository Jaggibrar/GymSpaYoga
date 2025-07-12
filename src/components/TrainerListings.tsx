
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone, Mail, Users } from "lucide-react";
import { useTrainers } from "@/hooks/useTrainers";
import { Link, useNavigate } from "react-router-dom";

interface TrainerListingsProps {
  searchTerm?: string;
  location?: string;
  sortBy?: string;
  priceFilter?: string;
}

const TrainerListings = ({ searchTerm, location, sortBy, priceFilter }: TrainerListingsProps) => {
  const { trainers, loading, error } = useTrainers(searchTerm, location, priceFilter, 'trainer');
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trainers...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <p className="text-red-600">Error loading trainers: {error}</p>
        </div>
      </section>
    );
  }

  if (trainers.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Trainers Found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or check back later.</p>
        </div>
      </section>
    );
  }

  // Sort trainers based on sortBy prop
  const sortedTrainers = [...trainers].sort((a, b) => {
    switch (sortBy) {
      case 'session_price':
        return a.hourly_rate - b.hourly_rate;
      case '-session_price':
        return b.hourly_rate - a.hourly_rate;
      case 'created_at':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-800 mb-4">
            Expert Personal Trainers
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Connect with certified fitness coaches who will guide you to achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTrainers.map((trainer) => (
            <Card key={trainer.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-white">
              <div className="relative">
                <img 
                  src={trainer.profile_image_url || "/placeholder.svg"} 
                  alt={trainer.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">4.8</span>
                      <span className="text-sm text-gray-500">(12)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                      {trainer.name}
                    </CardTitle>
                    <p className="text-gray-600">{trainer.experience} years experience</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">₹{trainer.hourly_rate}</p>
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
                    <Button 
                      className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
                      onClick={() => navigate(`/trainers/${trainer.id}`)}
                    >
                      View Details
                    </Button>
                    <Link to={`/book-trainer/${trainer.id}`}>
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300">
                        Book Session
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" className="hover:bg-purple-50">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="hover:bg-indigo-50">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainerListings;
