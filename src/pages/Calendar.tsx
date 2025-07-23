
import { useScrollToTop } from "@/hooks/useScrollToTop";
import CalendarView from "@/components/CalendarView";
import PageHero from "@/components/PageHero";
import SEOHead from "@/components/SEOHead";

const Calendar = () => {
  useScrollToTop();

  return (
    <>
      <SEOHead
        title="Your Calendar | GymSpaYoga"
        description="Manage your fitness schedule and wellness appointments. View and track your gym sessions, spa bookings, and yoga classes in one place."
        keywords="fitness calendar, booking schedule, gym appointments, spa bookings, yoga classes"
        noindex={true}
      />
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-purple-50">
      <PageHero
        title="Your Calendar"
        subtitle="Events & Bookings"
        description="Manage your schedule and never miss an appointment."
        backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      />

      <div className="mobile-container py-4 md:py-8">
        <CalendarView />
      </div>
    </div>
    </>
  );
};

export default Calendar;
