import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[BOOKING-REMINDER] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Starting booking reminder service");

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get pending reminders that are due
    const { data: pendingReminders, error: remindersError } = await supabase
      .from('booking_reminders')
      .select(`
        *,
        bookings (
          id,
          booking_date,
          booking_time,
          status,
          user_id,
          business_profiles (business_name, phone, email),
          trainer_profiles (name, phone, email)
        )
      `)
      .eq('status', 'pending')
      .lte('scheduled_at', new Date().toISOString());

    if (remindersError) {
      throw new Error(`Failed to fetch reminders: ${remindersError.message}`);
    }

    logStep("Found pending reminders", { count: pendingReminders?.length });

    if (!pendingReminders || pendingReminders.length === 0) {
      return new Response(JSON.stringify({ message: "No pending reminders" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    let processedCount = 0;
    let errorCount = 0;

    for (const reminder of pendingReminders) {
      try {
        const booking = reminder.bookings;
        if (!booking) continue;

        // Create notification
        const { error: notificationError } = await supabase
          .from('in_app_notifications')
          .insert({
            user_id: booking.user_id,
            title: getNotificationTitle(reminder.reminder_type),
            message: getNotificationMessage(reminder.reminder_type, booking),
            type: 'booking_reminder',
            booking_id: booking.id
          });

        if (notificationError) {
          logStep("Failed to create notification", { error: notificationError.message });
          errorCount++;
          continue;
        }

        // Mark reminder as sent
        const { error: updateError } = await supabase
          .from('booking_reminders')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString()
          })
          .eq('id', reminder.id);

        if (updateError) {
          logStep("Failed to update reminder status", { error: updateError.message });
          errorCount++;
        } else {
          processedCount++;
        }

      } catch (error) {
        logStep("Error processing reminder", { 
          reminderId: reminder.id, 
          error: error.message 
        });
        errorCount++;
      }
    }

    logStep("Reminder processing complete", { 
      processed: processedCount, 
      errors: errorCount 
    });

    return new Response(JSON.stringify({ 
      processed: processedCount, 
      errors: errorCount,
      message: `Processed ${processedCount} reminders with ${errorCount} errors`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    logStep("ERROR in booking reminder service", { message: error.message });
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

function getNotificationTitle(reminderType: string): string {
  switch (reminderType) {
    case 'confirmation':
      return 'Booking Confirmation Required';
    case '24h_before':
      return 'Booking Reminder - Tomorrow';
    case '1h_before':
      return 'Booking Starting Soon';
    default:
      return 'Booking Reminder';
  }
}

function getNotificationMessage(reminderType: string, booking: any): string {
  const businessName = booking.business_profiles?.business_name || booking.trainer_profiles?.name || 'your appointment';
  const date = new Date(booking.booking_date).toLocaleDateString();
  const time = booking.booking_time;

  switch (reminderType) {
    case 'confirmation':
      return `Please confirm your booking at ${businessName} for ${date} at ${time}`;
    case '24h_before':
      return `Your booking at ${businessName} is tomorrow (${date}) at ${time}`;
    case '1h_before':
      return `Your booking at ${businessName} starts in 1 hour (${time})`;
    default:
      return `You have a booking at ${businessName} on ${date} at ${time}`;
  }
}