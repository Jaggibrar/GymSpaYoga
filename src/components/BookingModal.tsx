
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, CreditCard, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useBookingConfirmation } from '@/hooks/useBookingConfirmation';
import { toast } from 'sonner';

interface BookingModalProps {
  businessName: string;
  businessType: string;
  businessId: string;
  price?: string;
  trigger: React.ReactNode;
}

const BookingModal = ({ businessName, businessType, businessId, price, trigger }: BookingModalProps) => {
  const { user } = useAuth();
  const { createBooking, loading } = useBookingConfirmation();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'booking' | 'confirmation'>('booking');
  
  const [formData, setFormData] = useState({
    booking_date: '',
    booking_time: '',
    duration_minutes: 60,
    notes: '',
    total_amount: 99 // Platform fee
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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

    try {
      const bookingData = {
        user_id: user.id,
        business_id: businessId,
        business_type: businessType,
        booking_date: formData.booking_date,
        booking_time: formData.booking_time,
        duration_minutes: formData.duration_minutes,
        total_amount: formData.total_amount,
        notes: formData.notes
      };

      const booking = await createBooking(bookingData);
      
      if (booking) {
        setStep('confirmation');
        toast.success('Booking request sent successfully!');
      }
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  const resetAndClose = () => {
    setStep('booking');
    setFormData({
      booking_date: '',
      booking_time: '',
      duration_minutes: 60,
      notes: '',
      total_amount: 99
    });
    setOpen(false);
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {step === 'booking' ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Book with {businessName}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="booking_date">Preferred Date</Label>
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
                <Label htmlFor="booking_time">Preferred Time</Label>
                <Input
                  id="booking_time"
                  type="time"
                  value={formData.booking_time}
                  onChange={(e) => handleInputChange('booking_time', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select 
                  value={formData.duration_minutes.toString()} 
                  onValueChange={(value) => handleInputChange('duration_minutes', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Requirements (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements or preferences..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="border-t pt-4">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Booking Summary</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <p><strong>Business:</strong> {businessName}</p>
                    <p><strong>Type:</strong> {businessType.replace('_', ' ').toUpperCase()}</p>
                    {price && <p><strong>Listed Price:</strong> {price}</p>}
                    <p><strong>Platform Fee:</strong> ₹99</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  * Final pricing will be confirmed by the business. The platform fee covers booking processing.
                </p>
              </div>

              <Button 
                type="submit" 
                disabled={loading || !user}
                className="w-full"
              >
                {loading ? 'Sending Request...' : 'Send Booking Request'}
              </Button>

              {!user && (
                <p className="text-sm text-center text-red-600">
                  Please sign in to make a booking
                </p>
              )}
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                Booking Request Sent!
              </DialogTitle>
            </DialogHeader>
            
            <div className="text-center space-y-4">
              <div className="bg-green-50 p-6 rounded-lg">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800 mb-2">Request Submitted Successfully</h3>
                <p className="text-green-700 text-sm">
                  Your booking request has been sent to {businessName}. They will contact you shortly to confirm the details.
                </p>
              </div>
              
              <div className="text-left space-y-2 text-sm text-gray-600">
                <p><strong>What happens next?</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Business will review your request</li>
                  <li>They'll contact you to confirm availability</li>
                  <li>Final pricing will be agreed upon</li>
                  <li>You'll receive booking confirmation</li>
                </ul>
              </div>
              
              <Button onClick={resetAndClose} className="w-full">
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
