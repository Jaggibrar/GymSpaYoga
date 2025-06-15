
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Building, CreditCard, FileText, CheckCircle } from "lucide-react";
import { BookingStatusBadge } from "./BookingStatusBadge";

interface BookingDetailsModalProps {
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
    confirmation_code?: string;
    user_profile?: {
      full_name: string;
      phone?: string;
    };
    business_profile?: {
      business_name: string;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingDetailsModal = ({ booking, isOpen, onClose }: BookingDetailsModalProps) => {
  if (!booking) return null;

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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>Booking Details</span>
            <BookingStatusBadge status={booking.status} />
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-sm mb-3 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                Booking Information
              </h3>
              <div className="space-y-2">
                <p className="text-sm"><strong>ID:</strong> #{booking.id}</p>
                <p className="text-sm"><strong>Service:</strong> {booking.business_type?.toUpperCase()}</p>
                <p className="text-sm"><strong>Date:</strong> {booking.booking_date ? formatDate(booking.booking_date) : 'Not set'}</p>
                <p className="text-sm"><strong>Time:</strong> {booking.booking_time || 'Not set'}</p>
                <p className="text-sm"><strong>Duration:</strong> {booking.duration_minutes || 60} minutes</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-sm mb-3 flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-green-600" />
                Payment Information
              </h3>
              <div className="space-y-2">
                {booking.total_amount ? (
                  <p className="text-sm"><strong>Amount:</strong> <span className="text-green-600 font-semibold">{formatCurrency(booking.total_amount)}</span></p>
                ) : (
                  <p className="text-sm text-gray-500">Amount not specified</p>
                )}
                <p className="text-sm"><strong>Payment Status:</strong> <Badge variant="outline">Pending</Badge></p>
              </div>
            </div>
          </div>

          {/* Business/User Information */}
          {booking.business_profile && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-sm mb-3 flex items-center">
                <Building className="h-4 w-4 mr-2 text-green-600" />
                Business Details
              </h3>
              <p className="text-sm"><strong>Business:</strong> {booking.business_profile.business_name}</p>
            </div>
          )}

          {booking.user_profile && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-sm mb-3 flex items-center">
                <User className="h-4 w-4 mr-2 text-blue-600" />
                Customer Details
              </h3>
              <div className="space-y-1">
                <p className="text-sm"><strong>Name:</strong> {booking.user_profile.full_name}</p>
                {booking.user_profile.phone && (
                  <p className="text-sm"><strong>Phone:</strong> {booking.user_profile.phone}</p>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {booking.notes && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-sm mb-3 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-orange-600" />
                Special Notes
              </h3>
              <p className="text-sm text-gray-700">{booking.notes}</p>
            </div>
          )}

          {/* Status Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-sm mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
              Status Information
            </h3>
            <div className="space-y-2">
              <p className="text-sm"><strong>Created:</strong> {formatDateTime(booking.created_at)}</p>
              {booking.confirmed_at && (
                <p className="text-sm"><strong>Confirmed:</strong> {formatDateTime(booking.confirmed_at)}</p>
              )}
              {booking.confirmation_code && (
                <p className="text-sm"><strong>Confirmation Code:</strong> <code className="bg-gray-200 px-2 py-1 rounded text-xs">{booking.confirmation_code}</code></p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
