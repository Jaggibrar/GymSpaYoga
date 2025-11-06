
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Phone, Mail, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Trainer } from '@/hooks/useTrainers';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useState } from 'react';

interface TrainerCardProps {
  trainer: Trainer;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/trainers/${trainer.id}`);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/book-trainer/${trainer.id}`);
  };

  const getTierColor = (tier: string) => {
    const colors = {
      certified: 'bg-blue-100 text-blue-700',
      expert: 'bg-purple-100 text-purple-700',
      elite: 'bg-gold-100 text-gold-700'
    };
    return colors[tier as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden transform hover:scale-105 bg-white cursor-pointer">
      <div className="relative" onClick={handleViewDetails}>
        <img 
          src={trainer.profile_image_url || "/placeholder.svg"} 
          alt={trainer.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
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
        <div className="absolute top-4 left-4">
          <Badge className={`${getTierColor(trainer.trainer_tier)} border-0 font-medium`}>
            {trainer.trainer_tier}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
              {trainer.name}
            </CardTitle>
            <p className="text-gray-600 mb-2">{trainer.experience} years experience</p>
            <div className="flex items-center text-gray-500 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{trainer.location}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-600">₹{trainer.hourly_rate}</p>
            <p className="text-sm text-gray-500">per session</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {trainer.bio}
        </p>
        
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
        
        <div className="space-y-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleViewDetails}
          >
            View Details
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
          <div className="flex gap-2">
            <WhatsAppButton 
              phoneNumber={trainer.phone}
              businessName={trainer.name}
              variant="outline" 
              className="flex-1"
            />
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(TrainerCard);
