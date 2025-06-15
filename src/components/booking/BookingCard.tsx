import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, User, Phone, CreditCard, Building, Loader2 } from 'lucide-react';
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
    user_profile?: {
      full_name: string;
      phone?: string;
    };
    business_profile?: {
      business_name: string;
    };
  };
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
  showBusinessInfo = false,
  showUserInfo = false,
  showCancelOption = false,
  isLoading = false,
  onConfirm, 
  onReject, 
  onCancel,
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

  const canConfirmOrReject = showActions && booking.status === 'pending';
  const canCancel = showCancelOption && (booking.status === 'pending' || booking.status === 'confirmed');

  return (
    <Card className={`hover:shadow-lg transition-shadow duration-300 ${isLoading ? 'opacity-70' : ''}`}>
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
        {/* User Information (for business owners) */}
        {showUserInfo && booking.user_profile && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 flex items-center">
              <User className="h-4 w-4 mr-1 text-blue-600" />
              Customer Details
            </h4>
            <div className="space-y-1">
              <p className="text-sm"><strong>Name:</strong> {booking.user_profile.full_name}</p>
              {booking.user_profile.phone && (
                <p className="text-sm"><strong>Phone:</strong> {booking.user_profile.phone}</p>
              )}
            </div>
          </div>
        )}

        {/* Business Information (for users) */}
        {showBusinessInfo && booking.business_profile && (
          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 flex items-center">
              <Building className="h-4 w-4 mr-1 text-green-600" />
              Business Details
            </h4>
            <p className="text-sm"><strong>Business:</strong> {booking.business_profile.business_name}</p>
          </div>
        )}

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
            <Calendar className="h-4 w-4 text-orange-500" />
            <div>
              <p className="font-medium text-sm">Created</p>
              <p className="text-sm text-gray-600">
                {new Date(booking.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {booking.notes && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-medium text-sm mb-1">Notes</p>
            <p className="text-sm text-gray-600">{booking.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {canConfirmOrReject && onConfirm && onReject && (
            <>
              <Button 
                onClick={() => onConfirm(booking.id)}
                className="flex-1 bg-green-500 hover:bg-green-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Confirm
              </Button>
              <Button 
                onClick={() => onReject(booking.id)}
                variant="destructive"
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Reject
              </Button>
            </>
          )}
          
          {canCancel && onCancel && (
            <Button 
              onClick={() => onCancel(booking.id)}
              variant="destructive"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Cancel Booking
            </Button>
          )}
          
          {onViewDetails && (
            <Button 
              onClick={() => onViewDetails(booking.id)}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
