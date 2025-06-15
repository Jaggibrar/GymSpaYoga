
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle, 
  XCircle, 
  Eye,
  Loader2 
} from 'lucide-react';
import { format } from 'date-fns';

interface BookingCardProps {
  booking: any;
  showActions?: boolean;
  showBusinessInfo?: boolean;
  showUserInfo?: boolean;
  showCancelOption?: boolean;
  isLoading?: boolean;
  onConfirm?: (bookingId: number) => void;
  onReject?: (bookingId: number) => void;
  onCancel?: (bookingId: number) => void;
  onViewDetails?: (bookingId: number) => void;
}

export const BookingCard = ({
  booking,
  showActions = false,
  showBusinessInfo = true,
  showUserInfo = false,
  showCancelOption = false,
  isLoading = false,
  onConfirm,
  onReject,
  onCancel,
  onViewDetails
}: BookingCardProps) => {
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
      return format(new Date(dateString), 'MMM dd, yyyy');
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

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Booking #{booking.id}
          </CardTitle>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              {booking.booking_date ? formatDate(booking.booking_date) : 'Date not set'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              {booking.booking_time ? formatTime(booking.booking_time) : 'Time not set'}
            </span>
          </div>
        </div>

        {/* Business/User Info */}
        {showBusinessInfo && (
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              {booking.business_type?.charAt(0).toUpperCase() + booking.business_type?.slice(1)} Service
            </span>
          </div>
        )}

        {showUserInfo && (
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              Customer Booking
            </span>
          </div>
        )}

        {/* Duration and Amount */}
        <div className="grid grid-cols-2 gap-4">
          {booking.duration_minutes && (
            <div className="text-sm text-gray-700">
              <span className="font-medium">Duration:</span> {booking.duration_minutes} min
            </div>
          )}
          {booking.total_amount && (
            <div className="text-sm text-gray-700">
              <span className="font-medium">Amount:</span> ₹{booking.total_amount}
            </div>
          )}
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="text-sm text-gray-700">
            <span className="font-medium">Notes:</span> {booking.notes}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          {onViewDetails && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails(booking.id)}
              className="flex items-center gap-1"
            >
              <Eye className="h-3 w-3" />
              View Details
            </Button>
          )}

          {showActions && booking.status === 'pending' && (
            <>
              {onConfirm && (
                <Button 
                  size="sm" 
                  onClick={() => onConfirm(booking.id)}
                  disabled={isLoading}
                  className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1"
                >
                  {isLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <CheckCircle className="h-3 w-3" />
                  )}
                  Confirm
                </Button>
              )}
              {onReject && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => onReject(booking.id)}
                  disabled={isLoading}
                  className="flex items-center gap-1"
                >
                  {isLoading ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  Reject
                </Button>
              )}
            </>
          )}

          {showCancelOption && booking.status === 'pending' && onCancel && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onCancel(booking.id)}
              disabled={isLoading}
              className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1"
            >
              {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <XCircle className="h-3 w-3" />
              )}
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
