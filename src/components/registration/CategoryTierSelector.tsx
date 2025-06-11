
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

interface CategoryTier {
  value: string;
  label: string;
  price: string;
  color: string;
  icon: any;
  features: string[];
}

interface CategoryTierSelectorProps {
  categoryTiers: CategoryTier[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const CategoryTierSelector = ({ categoryTiers, selectedCategory, onCategorySelect }: CategoryTierSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-medium text-gray-700">Destination Category *</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryTiers.map((tier) => (
          <div 
            key={tier.value}
            className={`p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg ${
              selectedCategory === tier.value 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onCategorySelect(tier.value)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${tier.color} rounded-xl flex items-center justify-center`}>
                <tier.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">{tier.price}</div>
                <div className="text-sm text-gray-500">One-time</div>
              </div>
            </div>
            <h4 className="font-bold text-xl mb-3 text-gray-800">{tier.label}</h4>
            <ul className="space-y-1">
              {tier.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
