import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, User, Phone, Calendar, Clock, CreditCard, CheckCircle, XCircle, RefreshCw, AlertTriangle, Building2, Wifi, WifiOff } from "lucide-react";
import { useOwnerBookings, useHasBusinessProfiles } from "@/hooks/useOwnerBookings";
import { BookingActionModal } from "./BookingActionModal";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const statusLabels = {
  pending: { color: "bg-yellow-100 text-yellow-700", label: "Pending" },
  confirmed: { color: "bg-green-100 text-green-700", label: "Accepted" },
  cancelled: { color: "bg-red-100 text-red-700", label: "Cancelled" },
};

export default function BusinessBookingsDashboard() {
  const [filter, setFilter] = useState<"pending" | "confirmed" | "cancelled" | "all">("pending");
  const { bookings, loading, error, refetch } = useOwnerBookings(filter);
  const { hasProfiles, loading: profilesLoading } = useHasBusinessProfiles();
  const [modalInfo, setModalInfo] = useState<{id: number, action: "accept" | "cancel"}|null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Accept booking with timeout protection
  const handleAccept = async (bookingId: number) => {
    setActionLoading(bookingId);
    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out')), 10000);
      });

      const operation = supabase.rpc("update_booking_status", {
        booking_id_param: bookingId,
        new_status_param: "confirmed",
      });

      const result = await Promise.race([operation, timeoutPromise]);
      
      if (result.error) {
        console.error('Accept booking error:', result.error);
        toast.error("Failed to accept booking: " + result.error.message);
      } else {
        toast.success("Booking accepted successfully!");
        refetch();
      }
    } catch (err) {
      console.error('Error accepting booking:', err);
      toast.error("Failed to accept booking. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  // Cancel booking with timeout protection
  const handleCancel = async (bookingId: number, reason = "") => {
    setActionLoading(bookingId);
    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out')), 10000);
      });

      const operation = supabase.rpc("update_booking_status", {
        booking_id_param: bookingId,
        new_status_param: "cancelled",
        notes_param: reason,
      });

      const result = await Promise.race([operation, timeoutPromise]);
      
      if (result.error) {
        console.error('Cancel booking error:', result.error);
        toast.error("Failed to cancel booking: " + result.error.message);
      } else {
        toast.success("Booking cancelled successfully!");
        refetch();
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error("Failed to cancel booking. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  // Show loading skeleton while checking profiles
  if (profilesLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  // Show message if user has no business profiles
  if (!hasProfiles) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="py-12 text-center">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Business Profile Found</h3>
          <p className="text-gray-500 mb-6">You need to create a business listing first to receive bookings.</p>
          <Link to="/register-business">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              Create Business Listing
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Show error state with retry option and connection status
  if (error) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="py-8">
          <div className="flex items-center gap-2 mb-4">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <span className="text-sm text-gray-500">
              {isOnline ? 'Connected' : 'Offline'}
            </span>
          </div>
          
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="mb-4">
              <strong>Error loading bookings:</strong> {error}
              {!isOnline && (
                <div className="mt-2 text-sm">
                  You appear to be offline. Please check your internet connection.
                </div>
              )}
            </AlertDescription>
          </Alert>
          <div className="text-center mt-6">
            <Button onClick={refetch} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons with Connection Status */}
      <div className="flex flex-wrap gap-2 items-center">
        {["pending","confirmed","cancelled","all"].map(status => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status as any)}
            className="capitalize"
            disabled={loading}
          >
            {status === "all" ? "All" : statusLabels[status as keyof typeof statusLabels]?.label || status}
          </Button>
        ))}
        
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <span>{isOnline ? 'Online' : 'Offline'}</span>
          </div>
          
          <Button
            onClick={refetch}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Loading State with Skeleton */}
      {loading ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading bookings...</span>
          </div>
          {/* Skeleton cards for better UX */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-0 shadow-lg">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        /* Empty State */
        <Card className="border-0 shadow-lg">
          <CardContent className="py-12 text-center">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Bookings Found</h3>
            <p className="text-gray-500">
              {filter === "all" ? "You haven't received any bookings yet." : `No ${filter} bookings found.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        /* Bookings List */
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                <CardTitle className="flex items-center gap-3">
                  <span>{booking.business_profile?.business_name || "Business"}</span>
                  <Badge className={`${statusLabels[booking.status as keyof typeof statusLabels]?.color || "bg-gray-100 text-gray-700"}`}>
                    {statusLabels[booking.status as keyof typeof statusLabels]?.label || booking.status}
                  </Badge>
                </CardTitle>
                <div className="flex flex-col md:flex-row gap-2 items-center mt-2 md:mt-0">
                  {booking.status === "pending" && (
                    <>
                      <Button 
                        onClick={() => setModalInfo({id: booking.id, action: "accept"})} 
                        disabled={actionLoading === booking.id}
                        className="bg-green-500 hover:bg-green-600 flex items-center gap-1"
                      >
                        {actionLoading === booking.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        Accept
                      </Button>
                      <Button 
                        onClick={() => setModalInfo({id: booking.id, action: "cancel"})} 
                        disabled={actionLoading === booking.id}
                        variant="destructive" 
                        className="flex items-center gap-1"
                      >
                        {actionLoading === booking.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div>
                    <div className="text-sm font-medium mb-2 text-gray-600">Customer Details</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{booking.user_profile?.full_name || "Unknown Customer"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{booking.user_profile?.phone || "No phone provided"}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Booking Details */}
                  <div>
                    <div className="text-sm font-medium mb-2 text-gray-600">Booking Details</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{booking.booking_date || "Date not set"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500"/>
                        <span className="text-sm">
                          {booking.booking_time || "Time not set"} ({booking.duration_minutes || 60}min)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-500"/>
                        <span className="text-sm">
                          {booking.total_amount ? `₹${booking.total_amount}` : "Amount pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div>
                    <div className="text-sm font-medium mb-2 text-gray-600">Additional Info</div>
                    <div className="space-y-1">
                      {booking.notes && (
                        <div className="text-sm">
                          <span className="font-medium">Notes:</span> {booking.notes}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Created: {new Date(booking.created_at).toLocaleString()}
                      </div>
                      {booking.confirmation_code && (
                        <div className="text-xs text-gray-500">
                          Code: {booking.confirmation_code}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Action Modal */}
      {modalInfo && (
        <BookingActionModal
          isOpen={!!modalInfo}
          action={modalInfo.action}
          onClose={() => setModalInfo(null)}
          onSubmit={reason => {
            if (!modalInfo) return;
            if (modalInfo.action === "accept") {
              handleAccept(modalInfo.id);
            } else {
              handleCancel(modalInfo.id, reason);
            }
            setModalInfo(null);
          }}
        />
      )}
    </div>
  );
}
