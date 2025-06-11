
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TrainerPersonalInfoProps {
  name: string;
  email: string;
  phone: string;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
}

export const TrainerPersonalInfo = ({
  name,
  email,
  phone,
  onNameChange,
  onEmailChange,
  onPhoneChange
}: TrainerPersonalInfoProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-lg font-medium text-gray-700">Full Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="email" className="text-lg font-medium text-gray-700">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            placeholder="your@email.com"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-lg font-medium text-gray-700">Phone Number *</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            required
            className="h-14 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            placeholder="+91 98765 43210"
          />
        </div>
      </div>
    </div>
  );
};
