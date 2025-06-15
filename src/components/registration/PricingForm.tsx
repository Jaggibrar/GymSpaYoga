
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Diamond, IndianRupee } from "lucide-react";

interface PricingFormProps {
  monthlyPrice: string;
  sessionPrice: string;
  tier: string;
  onMonthlyPriceChange: (price: string) => void;
  onSessionPriceChange: (price: string) => void;
  onTierChange: (tier: string) => void;
}

export const PricingForm = ({ 
  monthlyPrice, 
  sessionPrice,
  tier,
  onMonthlyPriceChange, 
  onSessionPriceChange,
  onTierChange
}: PricingFormProps) => {
  const tiers = [
    {
      id: 'budget',
      name: 'Budget Friendly',
      icon: IndianRupee,
      color: 'from-green-500 to-green-600',
      description: 'Affordable options for everyone',
      monthlyRange: '₹1,000 - ₹2,999',
      sessionRange: '₹200 - ₹999'
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Diamond,
      color: 'from-blue-500 to-blue-600',
      description: 'Quality services with great value',
      monthlyRange: '₹3,000 - ₹4,999',
      sessionRange: '₹1,000 - ₹1,999'
    },
    {
      id: 'luxury',
      name: 'Luxury',
      icon: Crown,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Premium experience with top amenities',
      monthlyRange: '₹5,000+',
      sessionRange: '₹2,000+'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-6">
          Pricing & Tier Information
        </h3>
        
        {/* Tier Selection */}
        <div className="mb-8">
          <Label className="text-lg font-medium text-gray-700 mb-4 block">
            Select Your Business Tier *
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tierOption) => {
              const IconComponent = tierOption.icon;
              return (
                <Card 
                  key={tierOption.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    tier === tierOption.id 
                      ? 'ring-2 ring-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => onTierChange(tierOption.id)}
                >
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${tierOption.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-lg text-gray-800 mb-2">{tierOption.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{tierOption.description}</p>
                      <div className="text-xs text-gray-500">
                        <p className="mb-1">Monthly: {tierOption.monthlyRange}</p>
                        <p>Session: {tierOption.sessionRange}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Your tier will be automatically determined based on your pricing, but you can manually select it here.
          </p>
        </div>

        {/* Pricing Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="monthlyPrice" className="text-lg font-medium text-gray-700">
              Monthly Membership Price (₹)
            </Label>
            <Input 
              id="monthlyPrice" 
              type="number"
              placeholder="2500" 
              className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
              value={monthlyPrice}
              onChange={(e) => onMonthlyPriceChange(e.target.value)}
            />
            <p className="text-sm text-gray-500">Leave empty if not offering monthly plans</p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="sessionPrice" className="text-lg font-medium text-gray-700">
              Per Session Price (₹)
            </Label>
            <Input 
              id="sessionPrice" 
              type="number"
              placeholder="500" 
              className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
              value={sessionPrice}
              onChange={(e) => onSessionPriceChange(e.target.value)}
            />
            <p className="text-sm text-gray-500">Leave empty if not offering per-session pricing</p>
          </div>
        </div>
      </div>
    </div>
  );
};
