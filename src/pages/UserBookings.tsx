import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Dumbbell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BookingsList } from '@/components/booking/BookingsList';
import { ErrorBoundaryWrapper } from '@/components/ErrorBoundaryWrapper';

const UserBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-8 w-8 text-emerald-600" />
            <h2 className="text-3xl font-bold text-gray-800">My Bookings</h2>
          </div>
          <p className="text-gray-600 text-lg">Track and manage all your fitness bookings</p>
        </div>
        <ErrorBoundaryWrapper>
          <BookingsList showBusinessActions={false} />
        </ErrorBoundaryWrapper>
        {/* Add a message if no bookings visible */}
        {/* You may handle this in <BookingsList> if prop available. */}
      </div>
    </div>
  );
};

export default UserBookings;
