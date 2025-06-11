
import { Label } from "@/components/ui/label";

interface BusinessType {
  value: string;
  label: string;
  icon: string;
}

interface BusinessTypeSelectorProps {
  businessTypes: BusinessType[];
  selectedType: string;
  onTypeSelect: (type: string) => void;
}

export const BusinessTypeSelector = ({ businessTypes, selectedType, onTypeSelect }: BusinessTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-medium text-gray-700">Business Type *</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {businessTypes.map((type) => (
          <div 
            key={type.value}
            className={`p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg ${
              selectedType === type.value 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onTypeSelect(type.value)}
          >
            <div className="text-4xl text-center mb-3">{type.icon}</div>
            <h4 className="font-bold text-lg text-center text-gray-800">{type.label}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
