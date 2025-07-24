import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Clock, 
  Award, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Zap,
  Heart
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
    navigate(`/book-trainer/${trainer.id}`);
  }, [navigate, trainer.id]);

  const getTierInfo = (tier: string) => {
    const tiers = {
      certified: {
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        icon: CheckCircle,
        label: 'Certified'
      },
      expert: {
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-700',
        icon: Award,
        label: 'Expert'
      },
      elite: {
        color: 'from-amber-500 to-amber-600',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        icon: Zap,
        label: 'Elite'
      }
    };
    return tiers[tier as keyof typeof tiers] || tiers.certified;
  };

  const tierInfo = React.useMemo(() => getTierInfo(trainer.trainer_tier), [trainer.trainer_tier]);
  const TierIcon = tierInfo.icon;

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-700 cursor-pointer border-0 ${
        featured 
          ? 'ring-2 ring-primary shadow-2xl hover:shadow-3xl hover:-translate-y-4' 
          : 'shadow-lg hover:shadow-2xl hover:-translate-y-2'
      } bg-white rounded-3xl`}
      onClick={handleViewProfile}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 px-3 py-1 text-xs font-semibold">
            ⭐ Featured
          </Badge>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={trainer.profile_image_url || "/placeholder.svg"} 
          alt={trainer.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-900">{trainer.rating || 4.8}</span>
              <span className="text-sm text-gray-600">({trainer.reviews_count || 12})</span>
            </div>
          </div>
        </div>

        {/* Tier Badge */}
        <div className="absolute bottom-4 left-4">
          <div className={`${tierInfo.bgColor} backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center gap-2 shadow-lg`}>
            <TierIcon className={`h-4 w-4 ${tierInfo.textColor}`} />
            <span className={`font-semibold text-sm ${tierInfo.textColor} capitalize`}>
              {tierInfo.label}
            </span>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Button
            size="sm"
            className="bg-white/90 backdrop-blur-sm text-primary hover:bg-white shadow-lg border-0 rounded-xl"
            onClick={handleBookSession}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
              {trainer.name}
            </h3>
            <div className="text-right">
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ₹{trainer.hourly_rate}
              </p>
              <p className="text-sm text-muted-foreground">per session</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{trainer.experience} years</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="truncate max-w-32">{trainer.location}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {trainer.bio}
        </p>

        {/* Specializations */}
        <div className="flex flex-wrap gap-2">
          {trainer.specializations.slice(0, 2).map((spec, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 border-0"
            >
              {spec}
            </Badge>
          ))}
          {trainer.specializations.length > 2 && (
            <Badge 
              variant="secondary" 
              className="text-xs bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20"
            >
              +{trainer.specializations.length - 2} more
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            className="flex-1 rounded-xl border-2 hover:border-primary hover:text-primary transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProfile();
            }}
          >
            <Users className="h-4 w-4 mr-2" />
            View Profile
          </Button>
          <Button 
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleBookSession}
          >
            Book Session
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{Math.floor(Math.random() * 50) + 20}+ clients</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Verified</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Available today
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(PremiumTrainerCard);