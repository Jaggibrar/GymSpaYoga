
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";

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

      // For now, simulate payment processing
      // In a real implementation, you would integrate with Stripe here
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Book {serviceName}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input 
                id="price" 
                value={`₹${price}/${priceType}`} 
                readOnly 
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input 
                id="duration" 
                type="number" 
                value={duration} 
                onChange={(e) => setDuration(parseInt(e.target.value))}
                min="30"
                max="180"
              />
            </div>
          </div>

          <div>
            <Label>Booking Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
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
            />
          </div>

          <div className="flex space-x-2 pt-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
