
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Clock, User, CreditCard, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { validateBookingData, validateBookingTime } from '@/utils/bookingValidation';

interface BookingFormProps {
  businessId?: string;
  trainerId?: string;
  businessType: 'gym' | 'spa' | 'yoga' | 'trainer';
  businessName: string;
  onBookingSuccess?: () => void;
}

export const BookingForm = ({ 
  businessId, 
  trainerId, 
  businessType, 
  businessName,
  onBookingSuccess 
}: BookingFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    booking_date: '',
    booking_time: '',
    duration_minutes: 60,
    notes: '',
    total_amount: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to make a booking');
      return;
    }

    if (!formData.booking_date || !formData.booking_time) {
      toast.error('Please select date and time');
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        user_id: user.id,
        business_id: businessId || null,
        trainer_id: trainerId || null,
        business_type: businessType,
        booking_date: formData.booking_date,
        booking_time: formData.booking_time,
        duration_minutes: formData.duration_minutes,
        total_amount: formData.total_amount,
        notes: formData.notes,
        status: 'pending',
        payment_status: 'pending'
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) {
        console.error('Booking error:', error);
        throw error;
      }

      console.log('Booking created successfully:', data);
      toast.success(`Booking request sent to ${businessName}!`);
      
      // Reset form
      setFormData({
        booking_date: '',
        booking_time: '',
        duration_minutes: 60,
        notes: '',
        total_amount: 0
      });

      onBookingSuccess?.();
      
    } catch (error: any) {
      console.error('Failed to create booking:', error);
      toast.error(error.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Book with {businessName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="booking_date">Date</Label>
            <Input
              id="booking_date"
              type="date"
              min={today}
              value={formData.booking_date}
              onChange={(e) => handleInputChange('booking_date', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking_time">Time</Label>
            <Input
              id="booking_time"
              type="time"
              value={formData.booking_time}
              onChange={(e) => handleInputChange('booking_time', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <select
              id="duration"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={formData.duration_minutes}
              onChange={(e) => handleInputChange('duration_minutes', parseInt(e.target.value))}
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Special Requests (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special requirements or notes..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Booking Fee:</span>
              <span className="font-semibold">₹{formData.total_amount || 'TBD'}</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Final pricing will be confirmed by the business
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={loading || !user}
            className="w-full"
          >
            {loading ? 'Creating Booking...' : 'Send Booking Request'}
          </Button>

          {!user && (
            <p className="text-sm text-center text-gray-600">
              Please sign in to make a booking
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
