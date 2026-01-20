
import { useAuth } from "@/hooks/useAuth";
import { useHasBusinessProfiles } from "@/hooks/useOwnerBookings";
import { EnhancedProfile } from "@/components/EnhancedProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, User, Building2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const { user } = useAuth();
  const { hasProfiles: hasBusinessProfiles } = useHasBusinessProfiles();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.user_metadata?.full_name || 'User'}!
          </h1>
          <p className="text-gray-600">Manage your profile, bookings, and explore wellness services</p>
        </div>

        {/* Business Dashboard Link for business owners */}
        {hasBusinessProfiles && (
          <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Business Owner Dashboard</h3>
                    <p className="text-gray-600">Manage your business bookings and profile</p>
                  </div>
                </div>
                <Link to="/business-dashboard">
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                    Go to Business Dashboard
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/user-bookings" className="group">
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">My Bookings</h3>
                <p className="text-gray-600">View and manage your upcoming appointments</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/explore" className="group">
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Explore Services</h3>
                <p className="text-gray-600">Discover gyms, spas, and wellness centers</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/profile" className="group">
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">My Profile</h3>
                <p className="text-gray-600">Update your personal information and preferences</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Enhanced Profile Component */}
        <EnhancedProfile />
      </div>
    </div>
  );
}
