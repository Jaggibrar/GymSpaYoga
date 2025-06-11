
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone } from "lucide-react";

interface ContactInfoFormProps {
  email: string;
  phone: string;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
}

export const ContactInfoForm = ({ email, phone, onEmailChange, onPhoneChange }: ContactInfoFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-3">
        <Label htmlFor="email" className="text-lg font-medium text-gray-700 flex items-center">
          <Mail className="h-5 w-5 mr-2" />
          Email Address *
        </Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="business@example.com" 
          className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
        />
      </div>
      <div className="space-y-3">
        <Label htmlFor="phone" className="text-lg font-medium text-gray-700 flex items-center">
          <Phone className="h-5 w-5 mr-2" />
          Phone Number *
        </Label>
        <Input 
          id="phone" 
          placeholder="+91 98765 43210" 
          className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          required
        />
      </div>
    </div>
  );
};
