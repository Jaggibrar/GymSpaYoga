import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, TrendingUp, Loader2, DollarSign, Star } from "lucide-react";

export default function TrainerDashboard() {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'profile'>('overview');

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Trainer Dashboard</h1>
            <p className="text-muted-foreground">Manage your training sessions and client bookings</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 bg-background rounded-lg p-2 shadow-sm">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
            className="flex-1"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === 'bookings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('bookings')}
            className="flex-1"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Bookings
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('profile')}
            className="flex-1"
          >
            <Users className="h-4 w-4 mr-2" />
            Profile
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Clients</p>
                      <p className="text-2xl font-bold text-foreground">--</p>
                      <p className="text-xs text-primary">Coming soon</p>
                    </div>
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Sessions This Month</p>
                      <p className="text-2xl font-bold text-primary">--</p>
                      <p className="text-xs text-primary">Real-time updates</p>
                    </div>
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Earnings</p>
                      <p className="text-2xl font-bold text-[#2E7D32]">--</p>
                      <p className="text-xs text-primary">Monthly revenue</p>
                    </div>
                    <div className="w-12 h-12 bg-[#2E7D32] rounded-xl flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Rating</p>
                      <p className="text-2xl font-bold text-[#E85D04]">--</p>
                      <p className="text-xs text-primary">Client feedback</p>
                    </div>
                    <div className="w-12 h-12 bg-[#E85D04] rounded-xl flex items-center justify-center">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Welcome Message */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">Welcome to Your Trainer Dashboard!</h2>
                <p className="text-muted-foreground mb-6">
                  Your trainer profile is now live and ready to receive bookings. 
                  Clients can discover your services and book sessions directly through the platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setActiveTab('profile')} className="bg-primary hover:bg-primary/90">
                    View Profile
                  </Button>
                  <Button onClick={() => setActiveTab('bookings')} variant="outline">
                    Check Bookings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'bookings' && (
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-muted/50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary-foreground" />
                </div>
                Booking Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Bookings Yet</h3>
                <p className="text-muted-foreground">
                  Your booking management system will appear here once you start receiving client bookings.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'profile' && (
          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-muted/50 rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                Trainer Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Profile Management</h3>
                <p className="text-muted-foreground mb-6">
                  Your trainer profile management tools will be available here.
                  You can update your services, rates, and availability.
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Edit Profile (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
