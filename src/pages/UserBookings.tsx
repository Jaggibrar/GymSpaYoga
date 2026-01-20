import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Dumbbell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BookingsList } from '@/components/booking/BookingsList';
import { ErrorBoundaryWrapper } from '@/components/ErrorBoundaryWrapper';
import SEOHead from '@/components/SEOHead';

const UserBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <SEOHead
        title="My Bookings | GymSpaYoga"
        description="View and manage all your gym, spa and yoga bookings. Track your fitness appointments and wellness sessions."
        keywords="my bookings, fitness appointments, gym bookings, spa bookings, yoga bookings"
        noindex={true}
      />
      <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Dumbbell className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary">
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">My Bookings</h2>
          </div>
          <p className="text-muted-foreground text-lg">Track and manage all your fitness bookings</p>
        </div>
        <ErrorBoundaryWrapper>
          <BookingsList showBusinessActions={false} />
        </ErrorBoundaryWrapper>
      </div>
    </div>
    </>
  );
};

export default UserBookings;
