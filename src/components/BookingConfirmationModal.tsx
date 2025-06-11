
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { useBookingConfirmation } from '@/hooks/useBookingConfirmation';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: number;
    customerName: string;
    service: string;
    date: string;
    time: string;
    amount: string;
  };
  onConfirm?: () => void;
}

const BookingConfirmationModal = ({ 
  isOpen, 
  onClose, 
  booking,
  onConfirm 
}: BookingConfirmationModalProps) => {
  const [notes, setNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejection, setShowRejection] = useState(false);
  const { confirmBooking, rejectBooking, loading } = useBookingConfirmation();

  const handleConfirm = async () => {
    const success = await confirmBooking(booking.id, notes);
    if (success) {
      onConfirm?.();
      onClose();
      setNotes('');
    }
  };

  const handleReject = async () => {
    const success = await rejectBooking(booking.id, rejectionReason);
    if (success) {
      onConfirm?.();
      onClose();
      setRejectionReason('');
      setShowRejection(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Booking Confirmation</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold">{booking.customerName}</h3>
            <p className="text-sm text-gray-600">{booking.service}</p>
            <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
            <p className="font-semibold text-emerald-600">{booking.amount}</p>
          </div>

          {!showRejection ? (
            <>
              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any special instructions or notes..."
                  rows={3}
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Booking
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setShowRejection(true)}
                  disabled={loading}
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="reason">Rejection Reason</Label>
                <Textarea
                  id="reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a reason for rejecting this booking..."
                  rows={3}
                  required
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => setShowRejection(false)}
                  disabled={loading}
                  className="flex-1"
                >
                  Back
                </Button>
                
                <Button 
                  onClick={handleReject}
                  disabled={loading || !rejectionReason.trim()}
                  className="flex-1 bg-red-500 hover:bg-red-600"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Confirm Rejection
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmationModal;
