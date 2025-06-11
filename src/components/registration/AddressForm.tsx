
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";

interface AddressFormProps {
  address: string;
  city: string;
  state: string;
  pinCode: string;
  onAddressChange: (address: string) => void;
  onCityChange: (city: string) => void;
  onStateChange: (state: string) => void;
  onPinCodeChange: (pinCode: string) => void;
}

export const AddressForm = ({ 
  address, 
  city, 
  state, 
  pinCode, 
  onAddressChange, 
  onCityChange, 
  onStateChange, 
  onPinCodeChange 
}: AddressFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 flex items-center">
        <MapPin className="h-6 w-6 mr-2" />
        Business Address
      </h3>
      <div className="space-y-6">
        <Textarea 
          placeholder="Complete business address"
          className="min-h-[100px] text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input 
            placeholder="City" 
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            required
          />
          <Input 
            placeholder="State" 
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            value={state}
            onChange={(e) => onStateChange(e.target.value)}
            required
          />
          <Input 
            placeholder="PIN Code" 
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            value={pinCode}
            onChange={(e) => onPinCodeChange(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};
