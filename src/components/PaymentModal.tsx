
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CreditCard, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId?: string;
  trainerId?: string;
  serviceType: 'gym' | 'spa' | 'yoga' | 'trainer';
  serviceName: string;
  price: number;
  priceType: 'monthly' | 'session';
}

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  businessId, 
  trainerId, 
  serviceType, 
  serviceName, 
  price, 
  priceType 
}: PaymentModalProps) => {
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const [bookingDate, setBookingDate] = useState<Date>();
  const [bookingTime, setBookingTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please log in to make a booking");
      return;
    }

    if (!bookingDate || !bookingTime) {
      toast.error("Please select a booking date and time");
      return;
    }

    setIsProcessing(true);

    try {
      // Create order in database
      const orderData = {
        user_id: user.id,
        business_id: businessId,
        trainer_id: trainerId,
        amount: price * 100, // Convert to cents
        currency: 'inr',
        status: 'pending',
        payment_status: 'pending',
        service_type: serviceType,
        booking_date: format(bookingDate, 'yyyy-MM-dd'),
        booking_time: bookingTime,
        duration_minutes: duration,
        notes: notes || null
      };

      const { data: order, error } = await createOrder(orderData);
      
      if (error) {
        throw error;
      }

      // TODO: Integrate with Stripe for actual payment processing
      // For now, simulate payment processing
      setTimeout(() => {
        toast.success("Booking confirmed! Payment processed successfully.");
        onClose();
        setIsProcessing(false);
      }, 2000);

    } catch (err) {
      console.error('Payment error:', err);
      toast.error("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Book {serviceName}</span>
          </DialogTitle>
        </DialogHeader>
        
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Payment integration is currently in development. This is a demo booking system.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Booking Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Service:</span>
                <p className="font-medium">{serviceName}</p>
              </div>
              <div>
                <span className="text-gray-600">Price:</span>
                <p className="font-medium text-emerald-600">₹{price}/{priceType}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input 
                id="duration" 
                type="number" 
                value={duration} 
                onChange={(e) => setDuration(parseInt(e.target.value))}
                min="30"
                max="180"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Total Amount</Label>
              <div className="mt-1 p-2 bg-gray-50 rounded-md border">
                <span className="text-lg font-semibold text-emerald-600">₹{price}</span>
              </div>
            </div>
          </div>

          <div>
            <Label>Booking Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1",
                    !bookingDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {bookingDate ? format(bookingDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={bookingDate}
                  onSelect={setBookingDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="time">Booking Time</Label>
            <Input 
              id="time" 
              type="time" 
              value={bookingTime} 
              onChange={(e) => setBookingTime(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea 
              id="notes" 
              placeholder="Any special requirements or notes..."
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handlePayment} 
              disabled={isProcessing || !bookingDate || !bookingTime}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
            >
              {isProcessing ? "Processing..." : `Pay ₹${price}`}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>🔒 Secure payment powered by Stripe (Coming Soon)</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
