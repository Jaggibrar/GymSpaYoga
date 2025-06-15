
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';
import { BookingCard } from './BookingCard';
import { BookingDetailsModal } from './BookingDetailsModal';
import { useRealTimeBookings } from '@/hooks/useRealTimeBookings';
import { toast } from 'sonner';

interface BookingsListProps {
  showBusinessActions?: boolean;
  businessOwnersView?: boolean;
}

export const BookingsList = ({ 
  showBusinessActions = false,
  businessOwnersView = false 
}: BookingsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { bookings, loading, updateBookingStatus } = useRealTimeBookings(businessOwnersView);

  const filteredBookings = bookings.filter(booking => {
    const searchableText = `${booking.business_type} ${booking.notes || ''} ${booking.id}`.toLowerCase();
    const userSearchableText = businessOwnersView && booking.user_profile ? 
      booking.user_profile.full_name.toLowerCase() : '';
    const businessSearchableText = !businessOwnersView && booking.business_profile ? 
      booking.business_profile.business_name.toLowerCase() : '';
    
    const matchesSearch = 
      searchableText.includes(searchTerm.toLowerCase()) ||
      userSearchableText.includes(searchTerm.toLowerCase()) ||
      businessSearchableText.includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleConfirm = async (bookingId: number) => {
    const success = await updateBookingStatus(bookingId, 'confirmed', 'Booking confirmed by business');
    if (success) {
      toast.success('Booking confirmed successfully');
    }
  };

  const handleReject = async (bookingId: number) => {
    const success = await updateBookingStatus(bookingId, 'rejected', 'Booking rejected by business');
    if (success) {
      toast.success('Booking rejected');
    }
  };

  const handleViewDetails = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      setIsDetailsModalOpen(true);
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedBooking(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder={businessOwnersView ? "Search by customer, service..." : "Search by business, service..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Grid */}
      {filteredBookings.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">
              {bookings.length === 0 
                ? (businessOwnersView ? "No booking requests found" : "No bookings found")
                : "No bookings match your current filters"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              showActions={showBusinessActions}
              showUserInfo={businessOwnersView}
              showBusinessInfo={!businessOwnersView}
              onConfirm={handleConfirm}
              onReject={handleReject}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
      />
    </div>
  );
};
