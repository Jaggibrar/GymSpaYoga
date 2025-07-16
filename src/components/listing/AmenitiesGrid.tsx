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
    <Card className="border-0 shadow-lg bg-white">
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
              className="flex items-center gap-3 py-2"
            >
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-4 w-4 text-white stroke-[2.5]" />
              </div>
              <span className="text-gray-800 font-medium text-sm capitalize">{amenity}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AmenitiesGrid;