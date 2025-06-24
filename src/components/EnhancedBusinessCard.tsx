
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, MessageCircle, Star, Shield } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { Badge } from "@/components/ui/badge";
import { Verified, Award, TrendingUp } from "lucide-react";

interface EnhancedBusinessCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
  price: string;
  phone?: string;
  onBookNow?: () => void;
  verified?: boolean;
  trending?: boolean;
  featured?: boolean;
}

const EnhancedBusinessCard = ({ 
  id,
  name,
  description,
  image,
  category,
  location,
  price,
  phone,
  onBookNow,
  verified = true,
  trending = false,
  featured = false
}: EnhancedBusinessCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/business/${id}`);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (phone) {
      window.open(`tel:${phone}`, '_self');
    }
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBookNow) {
      onBookNow();
    } else {
      // Default booking behavior - navigate to business details
      navigate(`/business/${id}`);
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-[#0FFCBE] bg-white relative overflow-hidden rounded-xl">
      <div className="relative overflow-hidden h-48 md:h-56 w-full rounded-t-xl">
        <OptimizedImage 
          src={image} 
          alt={`${name} - ${description}`}
          className="group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Enhanced Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs">
            {category}
          </Badge>
          {verified && (
            <Badge className="bg-blue-500 text-white font-bold text-xs flex items-center gap-1">
              <Verified className="h-3 w-3" />
              Verified
            </Badge>
          )}
          {featured && (
            <Badge className="bg-purple-500 text-white font-bold text-xs flex items-center gap-1">
              <Award className="h-3 w-3" />
              Featured
            </Badge>
          )}
        </div>
        
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {trending && (
            <Badge className="bg-orange-500 text-white font-bold text-xs flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Trending
            </Badge>
          )}
        </div>
        
        {/* Rating Display */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-bold">4.8</span>
                <span className="text-xs text-gray-600">(124 reviews)</span>
              </div>
              <Badge className="bg-blue-100 text-blue-700 text-xs">
                Open Now
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-2 sm:pb-3 p-4 sm:p-6 md:p-8">
        <CardTitle className="text-lg sm:text-xl md:text-2xl group-hover:text-emerald-600 transition-colors line-clamp-1 font-black">
          {name}
        </CardTitle>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" aria-hidden="true" />
          <span className="truncate font-semibold text-sm sm:text-base">{location}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 p-6">
        <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-2 font-medium leading-relaxed">
          {description}
        </p>
        
        <div className="space-y-4">
          {/* Trust Indicators */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Verified className="h-4 w-4 text-blue-500" />
              <span>Verified Business</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Trusted Partner</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-800">Starting at</span>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-600">{price}</span>
            </div>
          </div>
          
          <Button 
            onClick={handleViewDetails}
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-400 hover:to-blue-400 font-black py-3 text-lg transition-all duration-300 transform hover:scale-105"
          >
            View Details
          </Button>
          
          {/* Quick Contact Options */}
          <div className="grid grid-cols-2 gap-2">
            {phone && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={handleCall}
              >
                <Phone className="h-3 w-3 mr-1" />
                Call Now
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={handleBookNow}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedBusinessCard;
