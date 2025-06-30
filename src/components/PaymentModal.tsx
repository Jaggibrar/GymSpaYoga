
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
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
  const { user, loading: authLoading } = useAuth();
  const { submitBooking, loading } = useBookings();
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: 60,
    notes: ''
  });
  const [confirmation, setConfirmation] = useState<{id: number} | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  console.log('PaymentModal - Auth state:', { user: user?.id, authLoading, isOpen });

  const validateBookingData = () => {
    if (!bookingData.date || !bookingData.time) {
      setErrorMsg("Please select both date and time for your booking");
      return false;
    }

    const selectedDate = new Date(bookingData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setErrorMsg("Please select a future date for your booking");
      return false;
    }

    if (bookingData.duration < 30 || bookingData.duration > 300) {
      setErrorMsg("Duration must be between 30 and 300 minutes");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (authLoading) {
      toast.error("Please wait while we verify your login status");
      return;
    }
    
    if (!user) {
      toast.error("Please login to book a session");
      return;
    }

    if (!validateBookingData()) {
      return;
    }

    try {
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
        setConfirmation({id: booking.id});
        setBookingData({ date: '', time: '', duration: 60, notes: '' });
      } else {
        setErrorMsg("Booking submission failed. Please try again.");
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      setErrorMsg(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  const handleClose = () => {
    setConfirmation(null);
    setErrorMsg(null);
    setBookingData({ date: '', time: '', duration: 60, notes: '' });
    onClose();
  };

  if (!isOpen) return null;

  // Show loading while auth is being determined
  if (authLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            <span className="ml-3">Verifying login status...</span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Show a clear booking confirmation page after successful booking
  if (confirmation) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-10">
            <div className="flex justify-center mb-4">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-emerald-800">Booking Submitted!</h2>
            <p className="mb-4 text-emerald-800">
              Your booking ID is <span className="font-bold">#{confirmation.id}</span>. 
              You will be notified when the business responds.
            </p>
            <Button onClick={handleClose} className="bg-emerald-500 hover:bg-emerald-600 w-full">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-gray-900">
            <Calendar className="h-5 w-5" />
            <span>Book {serviceName}</span>
          </DialogTitle>
        </DialogHeader>
        
        {errorMsg && (
          <div className="bg-red-100 border border-red-200 p-3 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-medium">Booking Error</p>
              <p className="text-red-600 text-sm">{errorMsg}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-gray-600" />
              <span className="font-semibold text-gray-900">{serviceName}</span>
            </div>
            <p className="text-lg font-bold text-emerald-600">
              ₹{price.toLocaleString()}/{priceType}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center space-x-2 text-gray-900">
                <Calendar className="h-4 w-4" />
                <span>Date *</span>
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
                <span>Time *</span>
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
            <Label htmlFor="duration" className="text-gray-900">Duration (minutes) *</Label>
            <Input
              id="duration"
              type="number"
              value={bookingData.duration}
              onChange={(e) => setBookingData({ ...bookingData, duration: parseInt(e.target.value) || 60 })}
              min="30"
              max="300"
              step="15"
              className="text-gray-900"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Between 30 and 300 minutes</p>
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
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {bookingData.notes.length}/500 characters
            </p>
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
              onClick={handleClose} 
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || authLoading}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Booking...
                </>
              ) : (
                "Submit Booking Request"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
