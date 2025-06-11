
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TrainerProfessionalDetailsProps {
  experience: string;
  hourlyRate: string;
  location: string;
  onExperienceChange: (experience: string) => void;
  onHourlyRateChange: (hourlyRate: string) => void;
  onLocationChange: (location: string) => void;
}

export const TrainerProfessionalDetails = ({
  experience,
  hourlyRate,
  location,
  onExperienceChange,
  onHourlyRateChange,
  onLocationChange
}: TrainerProfessionalDetailsProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
        Professional Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label htmlFor="experience" className="text-lg font-medium text-gray-700">Years of Experience *</Label>
          <Input
            id="experience"
            type="number"
            value={experience}
            onChange={(e) => onExperienceChange(e.target.value)}
            required
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            placeholder="5"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="hourlyRate" className="text-lg font-medium text-gray-700">Hourly Rate (₹) *</Label>
          <Input
            id="hourlyRate"
            type="number"
            value={hourlyRate}
            onChange={(e) => onHourlyRateChange(e.target.value)}
            required
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            placeholder="1500"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="location" className="text-lg font-medium text-gray-700">Location *</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Mumbai, Maharashtra"
            required
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
