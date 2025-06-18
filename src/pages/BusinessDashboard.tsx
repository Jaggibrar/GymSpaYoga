
import { useAuth } from "@/hooks/useAuth";
import { useHasBusinessProfiles } from "@/hooks/useOwnerBookings";
import BusinessBookingsDashboard from "@/components/booking/BusinessBookingsDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Calendar, TrendingUp, Loader2, Plus, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function BusinessDashboard() {
  const { user } = useAuth();
  const { hasProfiles, loading } = useHasBusinessProfiles();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Loading business dashboard...</span>
        </div>
      </div>
    );
  }

  if (!hasProfiles) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Business Dashboard</h1>
            <p className="text-gray-600">Manage your bookings, listings, and business operations</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
            <Link to="/register-business">
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Add New Listing
              </Button>
            </Link>
            <Link to="/business-bookings">
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-800">--</p>
                  <p className="text-xs text-green-600">Live data coming soon</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
                  <p className="text-2xl font-bold text-yellow-600">--</p>
                  <p className="text-xs text-green-600">Real-time updates</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-2xl font-bold text-green-600">--</p>
                  <p className="text-xs text-green-600">Monthly revenue</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Profile Views</p>
                  <p className="text-2xl font-bold text-purple-600">--</p>
                  <p className="text-xs text-green-600">Weekly analytics</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              Booking Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <BusinessBookingsDashboard />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
