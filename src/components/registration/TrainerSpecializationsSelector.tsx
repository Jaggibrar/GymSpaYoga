
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TrainerSpecializationsSelectorProps {
  category: string;
  specializations: { [key: string]: string[] };
  selectedSpecializations: string[];
  onSpecializationChange: (specialization: string, checked: boolean) => void;
}

export const TrainerSpecializationsSelector = ({
  category,
  specializations,
  selectedSpecializations,
  onSpecializationChange
}: TrainerSpecializationsSelectorProps) => {
  if (!category) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
        Specializations
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {specializations[category as keyof typeof specializations]?.map((spec) => (
          <div key={spec} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50">
            <Checkbox
              id={spec}
              checked={selectedSpecializations.includes(spec)}
              onCheckedChange={(checked) => onSpecializationChange(spec, checked as boolean)}
              className="w-5 h-5"
            />
            <Label htmlFor={spec} className="text-lg font-medium cursor-pointer">{spec}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};
