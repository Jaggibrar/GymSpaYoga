
import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, User, Award, Crown, Diamond, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Trainer {
  id: string;
  name: string;
  category: string;
  trainer_tier: string;
  experience: number;
  specializations: string[];
  hourly_rate: number;
  location: string;
  bio: string;
  profile_image_url?: string;
}

interface TrainerCardProps {
  trainer: Trainer;
}

const TrainerCard = memo(({ trainer }: TrainerCardProps) => {
  const getTierIcon = (tierType: string) => {
    switch (tierType.toLowerCase()) {
      case 'elite': return <Crown className="h-4 w-4" />;
      case 'pro': return <Diamond className="h-4 w-4" />;
      case 'intermediate': return <Award className="h-4 w-4" />;
      default: return <IndianRupee className="h-4 w-4" />;
    }
  };

  const getTierColor = (tierType: string) => {
    switch (tierType.toLowerCase()) {
      case 'elite': return "from-yellow-500 to-yellow-600";
      case 'pro': return "from-purple-500 to-purple-600";
      case 'intermediate': return "from-blue-500 to-blue-600";
      default: return "from-green-500 to-green-600";
    }
  };

  const imageUrl = trainer.profile_image_url || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 rounded-3xl overflow-hidden bg-white">
      <div className="relative overflow-hidden h-48">
        <img 
          src={imageUrl}
          alt={trainer.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${getTierColor(trainer.trainer_tier)} text-white border-0 px-3 py-2 rounded-full`}>
          {getTierIcon(trainer.trainer_tier)}
          <span className="ml-1 capitalize font-semibold">{trainer.trainer_tier}</span>
        </Badge>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 text-white">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="font-medium">4.8</span>
            <span className="text-sm opacity-90">({trainer.experience}+ years exp)</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold group-hover:text-red-600 transition-colors mb-2 line-clamp-1">
            {trainer.name}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm capitalize">{trainer.category} Trainer</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm truncate">{trainer.location}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {trainer.bio}
        </p>
        
        {trainer.specializations && trainer.specializations.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {trainer.specializations.slice(0, 3).map((spec, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {spec}
              </Badge>
            ))}
            {trainer.specializations.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{trainer.specializations.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-red-600">
              ₹{trainer.hourly_rate.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">per hour</p>
          </div>
          <Link to={`/trainers/${trainer.id}`}>
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl px-6 py-3 font-semibold transform hover:scale-105 transition-all duration-300">
              Book Session
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
});

TrainerCard.displayName = 'TrainerCard';

export default TrainerCard;
