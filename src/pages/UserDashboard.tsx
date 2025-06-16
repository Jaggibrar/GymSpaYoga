
import { useAuth } from "@/hooks/useAuth";
import { useRealTimeBookings } from "@/hooks/useRealTimeBookings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, DollarSign, User, Building, Phone, Mail, Star, TrendingUp, Activity, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { getTierFromPricing, getTierIcon, getTierColor } from "@/utils/businessUtils";

const UserDashboard = () => {
  const { user } = useAuth();
  const { bookings, loading, error } = useRealTimeBookings(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <Activity className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Connection Error</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'confirmed' && 
    booking.booking_date && 
    new Date(booking.booking_date) >= new Date()
  );

  const pastBookings = bookings.filter(booking => 
    booking.booking_date && 
    new Date(booking.booking_date) < new Date()
  );

  const pendingBookings = bookings.filter(booking => booking.status === 'pending');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return '₹0';
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.email && `Signed in as ${user.email}`}
              </p>
            </div>
            <div className="flex space-x-3">
              <Link to="/explore">
                <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                  <Target className="h-4 w-4 mr-2" />
                  Find Services
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-500 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(bookings.reduce((sum, booking) => sum + (booking.total_amount || 0), 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
                  Upcoming Bookings
                </CardTitle>
                <CardDescription>
                  Your confirmed appointments and sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming bookings</h3>
                    <p className="text-gray-600 mb-4">Ready to book your next wellness session?</p>
                    <Link to="/explore">
                      <Button>Browse Services</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingBookings.slice(0, 3).map((booking) => {
                      // Create a proper business object for tier calculation
                      const businessForTier = {
                        monthly_price: booking.business_profile?.monthly_price,
                        session_price: booking.business_profile?.session_price
                      };
                      const tier = getTierFromPricing(businessForTier);
                      
                      return (
                        <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <Building className="h-4 w-4 text-gray-500 mr-2" />
                                <h4 className="font-semibold text-gray-900">
                                  {booking.business_profile?.business_name || 'Business Name'}
                                </h4>
                                <span className="ml-2">{getTierIcon(tier)}</span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {booking.booking_date && format(new Date(booking.booking_date), 'MMM dd, yyyy')}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {booking.booking_time || 'Time TBD'}
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  {formatCurrency(booking.total_amount)}
                                </div>
                                <div className="flex items-center">
                                  <Badge className={`${getStatusColor(booking.status || 'pending')} text-white`}>
                                    {booking.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {upcomingBookings.length > 3 && (
                      <div className="text-center pt-4">
                        <Link to="/user-bookings">
                          <Button variant="outline">View All Bookings</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/gyms" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-2" />
                    Find Gyms
                  </Button>
                </Link>
                <Link to="/spas" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Book Spa
                  </Button>
                </Link>
                <Link to="/yoga" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Yoga Classes
                  </Button>
                </Link>
                <Link to="/trainers" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Personal Trainers
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest bookings and updates</CardDescription>
              </CardHeader>
              <CardContent>
                {pastBookings.length === 0 ? (
                  <div className="text-center py-4">
                    <Activity className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No recent activity</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pastBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center space-x-3 text-sm">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(booking.status || 'completed')}`}></div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {booking.business_profile?.business_name}
                          </p>
                          <p className="text-gray-600">
                            {booking.booking_date && format(new Date(booking.booking_date), 'MMM dd')}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
