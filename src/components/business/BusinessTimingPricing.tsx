
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BusinessTimingPricingProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const BusinessTimingPricing: React.FC<BusinessTimingPricingProps> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-4">
      {/* Timing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="opening_time">Opening Time *</Label>
          <Input
            id="opening_time"
            type="time"
            value={formData.opening_time}
            onChange={(e) => onInputChange('opening_time', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="closing_time">Closing Time *</Label>
          <Input
            id="closing_time"
            type="time"
            value={formData.closing_time}
            onChange={(e) => onInputChange('closing_time', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="monthly_price">Monthly Price (₹)</Label>
          <Input
            id="monthly_price"
            type="number"
            value={formData.monthly_price || ''}
            onChange={(e) => onInputChange('monthly_price', e.target.value ? parseInt(e.target.value) : undefined)}
          />
        </div>
        <div>
          <Label htmlFor="session_price">Session Price (₹)</Label>
          <Input
            id="session_price"
            type="number"
            value={formData.session_price || ''}
            onChange={(e) => onInputChange('session_price', e.target.value ? parseInt(e.target.value) : undefined)}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessTimingPricing;
