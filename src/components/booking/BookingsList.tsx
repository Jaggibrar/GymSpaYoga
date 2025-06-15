
import { useRealTimeBookings } from '@/hooks/useRealTimeBookings';
import { useBookingConfirmation } from '@/hooks/useBookingConfirmation';
import { BookingCard } from './BookingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Calendar, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useLoadingState } from '@/hooks/useLoadingState';

interface BookingsListProps {
  showBusinessActions?: boolean;
  businessOwnersView?: boolean;
}

export const BookingsList = ({ 
  showBusinessActions = false, 
  businessOwnersView = false 
}: BookingsListProps) => {
  const { bookings, loading, updateBookingStatus, refetch } = useRealTimeBookings(businessOwnersView);
  const { confirmBooking, rejectBooking } = useBookingConfirmation();
  const loadingManager = useLoadingState();

  const handleConfirmBooking = async (bookingId: number) => {
    const success = await loadingManager.withLoading(`confirm-${bookingId}`, async () => {
      const result = await confirmBooking(bookingId);
      if (result) {
        await refetch(); // Refresh the list
        toast.success('Booking confirmed successfully!');
      }
      return result;
    });
  };

  const handleRejectBooking = async (bookingId: number) => {
    const success = await loadingManager.withLoading(`reject-${bookingId}`, async () => {
      const result = await rejectBooking(bookingId, 'Business declined the booking request');
      if (result) {
        await refetch(); // Refresh the list
        toast.success('Booking rejected');
      }
      return result;
    });
  };

  const handleCancelBooking = async (bookingId: number) => {
    const success = await loadingManager.withLoading(`cancel-${bookingId}`, async () => {
      const result = await updateBookingStatus(bookingId, 'cancelled', 'Cancelled by user');
      if (result) {
        await refetch(); // Refresh the list
        toast.success('Booking cancelled');
      }
      return result;
    });
  };

  const handleViewDetails = (bookingId: number) => {
    // Navigate to booking details or show detailed modal
    console.log('View booking details:', bookingId);
    toast.info('Booking details feature coming soon!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-600" />
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {businessOwnersView ? 'No booking requests yet' : 'No bookings found'}
          </h3>
          <p className="text-gray-600 mb-6">
            {businessOwnersView 
              ? 'When customers book your services, they will appear here.'
              : 'Your booking history will appear here once you make your first booking.'
            }
          </p>
          {!businessOwnersView && (
            <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
              Browse Services
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{bookings.length}</div>
            <div className="text-sm text-gray-600">Total Bookings</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {bookings.filter(b => b.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            showActions={showBusinessActions}
            showBusinessInfo={!businessOwnersView}
            showUserInfo={businessOwnersView}
            showCancelOption={!businessOwnersView}
            isLoading={loadingManager.isLoading(`confirm-${booking.id}`) || 
                      loadingManager.isLoading(`reject-${booking.id}`) || 
                      loadingManager.isLoading(`cancel-${booking.id}`)}
            onConfirm={showBusinessActions ? handleConfirmBooking : undefined}
            onReject={showBusinessActions ? handleRejectBooking : undefined}
            onCancel={!businessOwnersView ? handleCancelBooking : undefined}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Refresh Button */}
      <div className="text-center pt-4">
        <Button 
          variant="outline" 
          onClick={refetch}
          disabled={loadingManager.isLoading()}
          className="flex items-center gap-2"
        >
          {loadingManager.isLoading() ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Calendar className="h-4 w-4" />
          )}
          Refresh Bookings
        </Button>
      </div>
    </div>
  );
};
