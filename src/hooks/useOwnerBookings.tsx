
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useOwnerBookings(statusFilter: string = "pending") {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    let isSubscribed = true;

    const fetchBookings = async () => {
      setLoading(true);
      // Get businesses owned by this user
      const { data: businesses } = await supabase
        .from("business_profiles")
        .select("id")
        .eq("user_id", user.id);
      const businessIds = (businesses || []).map((b: any) => b.id);

      if (!businessIds.length) {
        setBookings([]);
        setLoading(false);
        return;
      }

      let query = supabase
        .from("bookings")
        .select(
          `
            *,
            user_profile:user_id(full_name, phone, email),
            business_profile:business_id(business_name)
          `
        )
        .in("business_id", businessIds)
        .order("created_at", { ascending: false });

      if (statusFilter && statusFilter !== "all")
        query = query.eq("status", statusFilter);

      const { data, error } = await query;

      if (error) setError(error.message);
      else if (isSubscribed) {
        setBookings(data || []);
        setError(null);
      }
      setLoading(false);
    };

    fetchBookings();

    const channel = supabase
      .channel("business-bookings-owner")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
        },
        fetchBookings
      )
      .subscribe();

    return () => {
      isSubscribed = false;
      supabase.removeChannel(channel);
    };
  }, [user, statusFilter]);

  return { bookings, loading, error };
}
