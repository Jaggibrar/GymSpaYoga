
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, User, Phone, CreditCard } from 'lucide-react';
import { BookingStatusBadge } from './BookingStatusBadge';

interface BookingCardProps {
  booking: {
    id: number;
    booking_date: string;
    booking_time: string;
    status: string;
    business_type: string;
    total_amount?: number;
    duration_minutes?: number;
    notes?: string;
    confirmed_at?: string;
    created_at: string;
  };
  showActions?: boolean;
  onConfirm?: (bookingId: number) => void;
  onReject?: (bookingId: number) => void;
  onViewDetails?: (bookingId: number) => void;
}

export const BookingCard = ({ 
  booking, 
  showActions = false, 
  onConfirm, 
  onReject, 
  onViewDetails 
}: BookingCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {booking.business_type?.toUpperCase()} Session
          </CardTitle>
          <BookingStatusBadge status={booking.status} />
        </div>
        <p className="text-sm text-gray-600">Booking ID: #{booking.id}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <div>
              <p className="font-medium text-sm">Date</p>
              <p className="text-sm text-gray-600">
                {booking.booking_date ? formatDate(booking.booking_date) : 'Not set'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-500" />
            <div>
              <p className="font-medium text-sm">Time & Duration</p>
              <p className="text-sm text-gray-600">
                {booking.booking_time || 'Not set'} ({booking.duration_minutes || 60} min)
              </p>
            </div>
          </div>
          
          {booking.total_amount && (
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-purple-500" />
              <div>
                <p className="font-medium text-sm">Amount</p>
                <p className="text-sm font-semibold text-green-600">
                  {formatCurrency(booking.total_amount)}
                </p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-orange-500" />
            <div>
              <p className="font-medium text-sm">Booked</p>
              <p className="text-sm text-gray-600">
                {new Date(booking.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {booking.notes && (
          <div className="pt-2 border-t">
            <p className="text-sm font-medium">Notes:</p>
            <p className="text-sm text-gray-600">{booking.notes}</p>
          </div>
        )}

        {booking.confirmed_at && (
          <div className="pt-2 border-t">
            <p className="text-xs text-green-600">
              Confirmed on {new Date(booking.confirmed_at).toLocaleString()}
            </p>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 pt-4 border-t">
            {booking.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 flex-1"
                  onClick={() => onConfirm?.(booking.id)}
                >
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => onReject?.(booking.id)}
                >
                  Reject
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewDetails?.(booking.id)}
            >
              View Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
