
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, User, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from '@/hooks/useAuth';
import { useBookings } from '@/hooks/useBookings';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId: string;
  serviceType: 'gym' | 'spa' | 'yoga';
  serviceName: string;
  price: number;
  priceType: 'monthly' | 'session';
}

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  businessId, 
  serviceType, 
  serviceName, 
  price, 
  priceType 
}: PaymentModalProps) => {
  const { user } = useAuth();
  const { submitBooking, loading } = useBookings();
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: 60,
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to book a session");
      return;
    }

    if (!bookingData.date || !bookingData.time) {
      toast.error("Please select date and time");
      return;
    }

    const booking = await submitBooking({
      user_id: user.id,
      business_type: serviceType,
      business_id: businessId,
      trainer_id: null,
      booking_date: bookingData.date,
      booking_time: bookingData.time,
      duration_minutes: bookingData.duration,
      total_amount: price,
      status: 'pending',
      payment_status: 'pending',
      notes: bookingData.notes
    });

    if (booking) {
      toast.success("Booking request submitted successfully! Payment will be made at the counter.");
      onClose();
      setBookingData({ date: '', time: '', duration: 60, notes: '' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-gray-900">
            <Calendar className="h-5 w-5" />
            <span>Book {serviceName}</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="font-semibold text-gray-900">{serviceName}</span>
            </div>
            <p className="text-lg font-bold text-emerald-600">
              ₹{price}/{priceType}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center space-x-2 text-gray-900">
                <Calendar className="h-4 w-4" />
                <span>Date</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
                className="text-gray-900"
              />
            </div>
            
            <div>
              <Label htmlFor="time" className="flex items-center space-x-2 text-gray-900">
                <Clock className="h-4 w-4" />
                <span>Time</span>
              </Label>
              <Input
                id="time"
                type="time"
                value={bookingData.time}
                onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                required
                className="text-gray-900"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="duration" className="text-gray-900">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={bookingData.duration}
              onChange={(e) => setBookingData({ ...bookingData, duration: parseInt(e.target.value) })}
              min="30"
              max="180"
              step="15"
              className="text-gray-900"
            />
          </div>

          <div>
            <Label htmlFor="notes" className="text-gray-900">Special Requests (Optional)</Label>
            <Textarea
              id="notes"
              value={bookingData.notes}
              onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
              placeholder="Any special requirements or preferences..."
              rows={3}
              className="text-gray-900"
            />
          </div>

          {/* Payment Information Notice */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <CreditCard className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-blue-900">Payment Information</span>
            </div>
            <p className="text-sm text-blue-800">
              Payment will be made directly at the counter. No advance payment required.
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {loading ? "Booking..." : "Submit Booking Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
