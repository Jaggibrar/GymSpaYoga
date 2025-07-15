import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from './SectionHeader';
import { Check, Zap } from 'lucide-react';

interface AmenitiesGridProps {
  amenities: string[];
  title?: string;
  icon?: React.ReactNode;
  gradient?: string;
  columns?: number;
  defaultAmenities?: string[];
}

const AmenitiesGrid: React.FC<AmenitiesGridProps> = ({
  amenities,
  title = "Amenities & Features",
  icon = <Zap className="h-5 w-5 text-white" />,
  gradient = "from-primary to-primary/80",
  columns = 2,
  defaultAmenities = [
    'Air Conditioning',
    'Locker Room', 
    'Parking',
    'Shower Facilities',
    'Wi-Fi',
    'Reception'
  ]
}) => {
  const displayAmenities = amenities.length > 0 ? amenities : defaultAmenities;

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-8">
        <SectionHeader
          icon={icon}
          title={title}
          gradient={gradient}
        />
        <div className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
          {displayAmenities.map((amenity, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl border border-border/50 hover:bg-secondary/50 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-foreground capitalize">{amenity}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AmenitiesGrid;