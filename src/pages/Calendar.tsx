
import { useScrollToTop } from "@/hooks/useScrollToTop";
import CalendarView from "@/components/CalendarView";
import PageHero from "@/components/PageHero";

const Calendar = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50">
      <PageHero
        title="Your Calendar"
        subtitle="Events & Bookings"
        description="Manage your schedule and never miss an appointment."
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      />

      <div className="container mx-auto px-4 py-8">
        <CalendarView />
      </div>
    </div>
  );
};

export default Calendar;
