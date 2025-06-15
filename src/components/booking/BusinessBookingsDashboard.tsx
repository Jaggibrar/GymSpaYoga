
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, User, Phone, Calendar, Clock, CreditCard, BadgeCheck, XCircle, CheckCircle } from "lucide-react";
import { useOwnerBookings } from "@/hooks/useOwnerBookings";
import { BookingActionModal } from "./BookingActionModal";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const statusLabels = {
  pending: { color: "bg-yellow-100 text-yellow-700", label: "Pending" },
  confirmed: { color: "bg-green-100 text-green-700", label: "Accepted" },
  cancelled: { color: "bg-red-100 text-red-700", label: "Cancelled" },
};

export default function BusinessBookingsDashboard() {
  const [filter, setFilter] = useState<"pending" | "confirmed" | "cancelled" | "all">("pending");
  const { bookings, loading } = useOwnerBookings(filter);
  const [modalInfo, setModalInfo] = useState<{id: number, action: "accept" | "cancel"}|null>(null);

  // Accept booking
  const handleAccept = async (bookingId: number) => {
    const { error } = await supabase.rpc("update_booking_status", {
      booking_id_param: bookingId,
      new_status_param: "confirmed",
    });
    if (!error) toast.success("Booking accepted.");
    else toast.error("Failed to accept booking: " + error.message);
    // Could invoke edge function to send notification/email
  };

  // Cancel booking
  const handleCancel = async (bookingId: number, reason = "") => {
    const { error } = await supabase.rpc("update_booking_status", {
      booking_id_param: bookingId,
      new_status_param: "cancelled",
      notes_param: reason,
    });
    if (!error) toast.success("Booking cancelled.");
    else toast.error("Failed to cancel booking: " + error.message);
    // Could invoke edge function to send notification/email
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {["pending","confirmed","cancelled","all"].map(status => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status as any)}
            className="capitalize"
          >
            {status === "all" ? "All" : statusLabels[status as keyof typeof statusLabels]?.label || status}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Loading bookings...
        </div>
      ) : bookings.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">No bookings found for this status.</CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <Card key={b.id}>
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                <CardTitle>
                  {b.business_profile?.business_name || "Business"} 
                  <Badge className={`ml-3 ${statusLabels[b.status]?.color || "bg-gray-100 text-gray-700"}`}>
                    {statusLabels[b.status]?.label || b.status}
                  </Badge>
                </CardTitle>
                <div className="flex flex-col md:flex-row gap-2 items-center mt-2 md:mt-0">
                  {b.status === "pending" && (
                    <>
                      <Button 
                        onClick={() => setModalInfo({id: b.id, action: "accept"})} 
                        className="bg-green-500 hover:bg-green-600 flex items-center gap-1"
                      >
                        <CheckCircle className="h-4 w-4"/>
                        Accept
                      </Button>
                      <Button 
                        onClick={() => setModalInfo({id: b.id, action: "cancel"})} 
                        variant="destructive" className="flex items-center gap-1"
                      >
                        <XCircle className="h-4 w-4"/>
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* User Info */}
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-1">Customer</div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4" />
                      {b.user_profile?.full_name || "-"}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="h-4 w-4" />
                      {b.user_profile?.phone || "-"}
                    </div>
                  </div>
                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4" />
                      {b.booking_date}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4"/>
                      {b.booking_time} ({b.duration_minutes || 60}min)
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="h-4 w-4"/>
                      {b.total_amount ? "₹"+b.total_amount : "—"}
                    </div>
                  </div>
                  {/* Status/Notes */}
                  <div className="flex-1">
                    <div className="text-xs"> {b.notes && <span>Notes: {b.notes}</span>}</div>
                    <div className="text-xs opacity-80">Created: {new Date(b.created_at).toLocaleString()}</div>
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
            if (modalInfo.action === "accept") handleAccept(modalInfo.id);
            else handleCancel(modalInfo.id, reason);
            setModalInfo(null);
          }}
        />
      )}
    </div>
  )
}
