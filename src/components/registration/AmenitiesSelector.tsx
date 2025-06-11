
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AmenitiesSelectorProps {
  amenitiesList: string[];
  selectedAmenities: string[];
  onAmenityToggle: (amenity: string) => void;
}

export const AmenitiesSelector = ({ amenitiesList, selectedAmenities, onAmenityToggle }: AmenitiesSelectorProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
        Amenities & Services
      </h3>
      <p className="text-gray-600 text-lg">Select all amenities and services you offer:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenitiesList.map((amenity) => (
          <div key={amenity} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50">
            <Checkbox 
              id={amenity}
              checked={selectedAmenities.includes(amenity)}
              onCheckedChange={() => onAmenityToggle(amenity)}
              className="w-5 h-5"
            />
            <Label htmlFor={amenity} className="text-lg font-medium cursor-pointer">
              {amenity}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
