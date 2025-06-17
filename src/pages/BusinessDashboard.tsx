
import { useAuth } from "@/hooks/useAuth";
import { useHasBusinessProfiles } from "@/hooks/useOwnerBookings";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import BusinessBookingsDashboard from "@/components/booking/BusinessBookingsDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, Calendar, TrendingUp, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function BusinessDashboard() {
  const { user } = useAuth();
  const { hasProfiles, loading } = useHasBusinessProfiles();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <AppHeader />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Loading business dashboard...</span>
        </div>
        <AppFooter />
      </div>
    );
  }

  if (!hasProfiles) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <AppHeader />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto border-0 shadow-xl">
            <CardContent className="py-12 text-center">
              <Building2 className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Business Dashboard</h1>
              <p className="text-gray-600 mb-8 text-lg">Get started by creating your business profile to begin receiving bookings and managing your services.</p>
              <Link to="/register-business">
                <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-8 py-3">
                  <Building2 className="h-5 w-5 mr-2" />
                  Create Business Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <AppHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Business Dashboard</h1>
          <p className="text-gray-600">Manage your bookings and business operations</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-800">--</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
                  <p className="text-2xl font-bold text-yellow-600">--</p>
                </div>
                <Users className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-2xl font-bold text-green-600">--</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Profile Views</p>
                  <p className="text-2xl font-bold text-purple-600">--</p>
                </div>
                <Building2 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-blue-500" />
              Booking Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BusinessBookingsDashboard />
          </CardContent>
        </Card>
      </div>
      <AppFooter />
    </div>
  );
}
