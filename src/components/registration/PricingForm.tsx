
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PricingFormProps {
  monthlyPrice: string;
  sessionPrice: string;
  onMonthlyPriceChange: (price: string) => void;
  onSessionPriceChange: (price: string) => void;
}

export const PricingForm = ({ 
  monthlyPrice, 
  sessionPrice, 
  onMonthlyPriceChange, 
  onSessionPriceChange 
}: PricingFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
        Pricing Information
      </h3>
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
          <Label htmlFor="monthlyPrice" className="text-lg font-medium text-gray-700">Monthly Membership (₹)</Label>
          <Input 
            id="monthlyPrice" 
            placeholder="2500" 
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            value={monthlyPrice}
            onChange={(e) => onMonthlyPriceChange(e.target.value)}
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="sessionPrice" className="text-lg font-medium text-gray-700">Per Session Price (₹)</Label>
          <Input 
            id="sessionPrice" 
            placeholder="500" 
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            value={sessionPrice}
            onChange={(e) => onSessionPriceChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
