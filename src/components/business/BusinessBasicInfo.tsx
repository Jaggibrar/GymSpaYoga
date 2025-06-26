
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BusinessBasicInfoProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const BusinessBasicInfo: React.FC<BusinessBasicInfoProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="business_name">Business Name *</Label>
          <Input
            id="business_name"
            value={formData.business_name}
            onChange={(e) => onInputChange('business_name', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="business_type">Business Type *</Label>
          <Select value={formData.business_type} onValueChange={(value) => onInputChange('business_type', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gym">Gym</SelectItem>
              <SelectItem value="spa">Spa</SelectItem>
              <SelectItem value="yoga">Yoga Studio</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessBasicInfo;
