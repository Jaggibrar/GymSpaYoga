import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Clock, 
  Award, 
  Eye, 
  MessageCircle, 
  CheckCircle, 
  Zap,
  Verified
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Trainer } from '@/hooks/useTrainers';

interface PremiumTrainerCardProps {
  trainer: Trainer;
  featured?: boolean;
}

const PremiumTrainerCard: React.FC<PremiumTrainerCardProps> = ({ 
  trainer, 
  featured = false 
}) => {
  const navigate = useNavigate();

  const handleViewProfile = React.useCallback(() => {
    navigate(`/trainers/${trainer.id}`);
  }, [navigate, trainer.id]);

  const handleBookSession = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hi, I'm interested in booking a training session with ${trainer.name}. Could you please provide more details?`;
    // Use default number since public_trainer_listings view hides phone for privacy
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [trainer.name]);

  const getTierInfo = (tier: string) => {
    const tiers = {
      certified: {
        gradient: 'from-blue-500 to-blue-600',
        label: 'Certified'
      },
      expert: {
        gradient: 'from-purple-500 to-purple-600',
        label: 'Expert'
      },
      elite: {
        gradient: 'from-yellow-500 to-yellow-600',
        label: 'Elite'
      }
    };
    return tiers[tier as keyof typeof tiers] || tiers.certified;
  };

  const tierInfo = React.useMemo(() => getTierInfo(trainer.trainer_tier), [trainer.trainer_tier]);

  return (
    <Card 
      className="w-full max-w-sm group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md rounded-xl overflow-hidden bg-white"
    >
      {/* Image Section - matching CategoryBusinesses h-56 */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={trainer.profile_image_url || "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b"} 
          alt={trainer.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b";
          }}
        />
        
        {/* Tier Badge - Top Right */}
        <Badge className={`absolute top-4 right-4 bg-gradient-to-r ${tierInfo.gradient} text-white border-0 capitalize px-3 py-1 shadow-lg`}>
          {tierInfo.label}
        </Badge>
        
        {/* Category & Verified Badges - Top Left */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Badge className="bg-black/70 text-white border-0 capitalize font-semibold px-3 py-1 shadow-lg text-sm">
            {trainer.category?.toUpperCase() || 'TRAINER'}
          </Badge>
          <Badge className="bg-blue-500 text-white font-bold text-xs flex items-center gap-1 shadow-md">
            <Verified className="h-3 w-3" />
            Verified
          </Badge>
        </div>
        
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>

      {/* Content Section - matching CategoryBusinesses p-6 */}
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold group-hover:text-[#005EB8] transition-colors line-clamp-2 leading-tight flex-1 mr-2">
              {trainer.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-yellow-600 flex-shrink-0">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{trainer.rating || 4.8}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm font-medium truncate">{trainer.location}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {trainer.bio || "Professional fitness trainer with expertise in personalized training programs"}
        </p>
        
        {/* Specializations - matching amenities style */}
        <div className="flex flex-wrap gap-2">
          {trainer.specializations?.slice(0, 2).map((spec, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-1">
              {spec}
            </Badge>
          ))}
          {trainer.specializations && trainer.specializations.length > 2 && (
            <Badge variant="outline" className="text-xs px-2 py-1">
              +{trainer.specializations.length - 2} more
            </Badge>
          )}
        </div>
        
        {/* Experience & Price Row */}
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{trainer.experience} years experience</span>
          </div>
          
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-[#005EB8]">₹{trainer.hourly_rate}/session</p>
          </div>
        </div>

        {/* Action Buttons - matching CategoryBusinesses style */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProfile();
            }}
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          <Button 
            className="flex-1 bg-[#005EB8] hover:bg-[#004d96] text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleBookSession}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Book Now
          </Button>
        </div>
        
        {/* Stats Row - matching CategoryBusinesses footer style */}
        <div className="flex items-center gap-4 pt-4 border-t text-sm text-gray-500">
          <div className="flex items-center gap-1 flex-1">
            <Award className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{trainer.certifications || 'Certified Trainer'}</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
            <span className="text-xs">Available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(PremiumTrainerCard);
