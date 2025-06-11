
import { Label } from "@/components/ui/label";
import { Heart, Dumbbell, Waves } from "lucide-react";

interface Category {
  value: string;
  label: string;
  icon: any;
  color: string;
}

interface TrainerCategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const TrainerCategorySelector = ({
  categories,
  selectedCategory,
  onCategorySelect
}: TrainerCategorySelectorProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-medium text-gray-700">Choose Your Category *</Label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.value}
            className={`p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-lg ${
              selectedCategory === cat.value 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onCategorySelect(cat.value)}
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${cat.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
              <cat.icon className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-bold text-lg text-center text-gray-800">{cat.label}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
