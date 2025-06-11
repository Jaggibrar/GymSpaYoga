
import { Star } from "lucide-react";

interface TrainerTier {
  value: string;
  label: string;
  price: string;
  color: string;
  icon: any;
  features: string[];
}

interface TrainerPricingSummaryProps {
  selectedTier: string;
  trainerTiers: TrainerTier[];
}

export const TrainerPricingSummary = ({ selectedTier, trainerTiers }: TrainerPricingSummaryProps) => {
  const getSelectedTierDetails = () => {
    return trainerTiers.find(tier => tier.value === selectedTier);
  };

  if (!selectedTier) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200">
      <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Star className="h-7 w-7 mr-3 text-blue-600" />
        Registration Summary
      </h4>
      <div className={`bg-gradient-to-r ${getSelectedTierDetails()?.color} text-white p-6 rounded-xl`}>
        <div className="text-center">
          <div className="text-2xl font-semibold mb-2">{getSelectedTierDetails()?.label} Tier</div>
          <div className="text-4xl font-bold mb-2">{getSelectedTierDetails()?.price}</div>
          <div className="text-blue-100">One-time registration fee</div>
        </div>
      </div>
    </div>
  );
};
