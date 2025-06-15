
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User, CreditCard, FileText } from "lucide-react";
import { format } from 'date-fns';

interface BookingDetailsModalProps {
  booking: any;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingDetailsModal = ({ booking, isOpen, onClose }: BookingDetailsModalProps) => {
  if (!booking) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'EEEE, MMMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return format(date, 'hh:mm a');
    } catch {
      return timeString;
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    try {
      return format(new Date(dateTimeString), 'MMM dd, yyyy at hh:mm a');
    } catch {
      return dateTimeString;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Booking Details</span>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Info */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">Date:</span>
                <span>{booking.booking_date ? formatDate(booking.booking_date) : 'Not set'}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">Time:</span>
                <span>{booking.booking_time ? formatTime(booking.booking_time) : 'Not set'}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">Service:</span>
                <span>{booking.business_type?.charAt(0).toUpperCase() + booking.business_type?.slice(1)}</span>
              </div>
              
              {booking.duration_minutes && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium">Duration:</span>
                  <span>{booking.duration_minutes} minutes</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Info */}
          {booking.total_amount && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium">Amount:</span>
                  <span>₹{booking.total_amount}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Payment Status:</span>
                  <Badge variant="outline">
                    {booking.payment_status?.charAt(0).toUpperCase() + booking.payment_status?.slice(1)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {booking.notes && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <FileText className="h-4 w-4 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Notes:</span>
                    <p className="text-sm text-gray-600 mt-1">{booking.notes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Business Response */}
          {booking.business_response && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <User className="h-4 w-4 text-emerald-600 mt-0.5" />
                  <div>
                    <span className="font-medium">Business Response:</span>
                    <p className="text-sm text-gray-600 mt-1">{booking.business_response}</p>
                    {booking.response_at && (
                      <p className="text-xs text-gray-500 mt-1">
                        Responded on {formatDateTime(booking.response_at)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timestamps */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="text-sm">
                <span className="font-medium">Created:</span>
                <span className="ml-2 text-gray-600">{formatDateTime(booking.created_at)}</span>
              </div>
              
              {booking.confirmed_at && (
                <div className="text-sm">
                  <span className="font-medium">Confirmed:</span>
                  <span className="ml-2 text-gray-600">{formatDateTime(booking.confirmed_at)}</span>
                </div>
              )}
              
              {booking.cancelled_at && (
                <div className="text-sm">
                  <span className="font-medium">Cancelled:</span>
                  <span className="ml-2 text-gray-600">{formatDateTime(booking.cancelled_at)}</span>
                </div>
              )}

              {booking.confirmation_code && (
                <div className="text-sm">
                  <span className="font-medium">Confirmation Code:</span>
                  <span className="ml-2 text-gray-600 font-mono">{booking.confirmation_code}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
