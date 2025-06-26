
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BusinessAddressInfoProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const BusinessAddressInfo: React.FC<BusinessAddressInfoProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="address">Address *</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => onInputChange('state', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="pin_code">PIN Code *</Label>
          <Input
            id="pin_code"
            value={formData.pin_code}
            onChange={(e) => onInputChange('pin_code', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessAddressInfo;
