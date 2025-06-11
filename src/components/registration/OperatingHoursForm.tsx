
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

interface OperatingHoursFormProps {
  openingTime: string;
  closingTime: string;
  onOpeningTimeChange: (time: string) => void;
  onClosingTimeChange: (time: string) => void;
}

export const OperatingHoursForm = ({ 
  openingTime, 
  closingTime, 
  onOpeningTimeChange, 
  onClosingTimeChange 
}: OperatingHoursFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 flex items-center">
        <Clock className="h-6 w-6 mr-2" />
        Operating Hours
      </h3>
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
          <Label className="text-lg font-medium text-gray-700">Opening Time *</Label>
          <Input 
            type="time" 
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            value={openingTime}
            onChange={(e) => onOpeningTimeChange(e.target.value)}
            required
          />
        </div>
        <div className="space-y-3">
          <Label className="text-lg font-medium text-gray-700">Closing Time *</Label>
          <Input 
            type="time" 
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            value={closingTime}
            onChange={(e) => onClosingTimeChange(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};
