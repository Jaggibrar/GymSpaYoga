
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Bell,
  Settings,
  BarChart3,
  Building,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  XCircle,
  Eye,
  Award,
  MessageCircle,
  MapPin,
  Phone
} from "lucide-react";
import { NotificationCenter } from "@/components/NotificationCenter";
import { BookingsList } from "@/components/booking/BookingsList";
import BusinessBookingsDashboard from "@/components/booking/BusinessBookingsDashboard";

const BusinessDashboard = () => {
  const { user, userProfile } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please login to access the business dashboard</p>
          <Link to="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Enhanced mock stats with better visuals
  const stats = [
    {
      title: "Total Bookings",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Pending Requests",
      value: "5",
      change: "Needs attention",
      trend: "neutral",
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    },
    {
      title: "Monthly Revenue",
      value: "₹45,000",
      change: "+8%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Customer Rating",
      value: "4.8",
      change: "45 reviews",
      trend: "up",
      icon: Star,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600"
    }
  ];

  const recentActivities = [
    {
      type: "booking",
      title: "New booking confirmed",
      description: "John Doe - Gym Session",
      time: "2 min ago",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      type: "payment",
      title: "Payment received",
      description: "₹2,500 from Sarah Smith",
      time: "15 min ago",
      icon: DollarSign,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      type: "review",
      title: "New 5-star review",
      description: "Amazing service and facilities!",
      time: "1 hour ago",
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50"
    },
    {
      type: "update",
      title: "Profile updated",
      description: "Business hours changed",
      time: "3 hours ago",
      icon: Settings,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  const quickActions = [
    {
      title: "Manage Bookings",
      description: "View and respond to booking requests",
      icon: Calendar,
      link: "/business-bookings",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Update Profile",
      description: "Edit your business information",
      icon: Building,
      link: "/profile",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "View Analytics",
      description: "Track your business performance",
      icon: BarChart3,
      link: "#analytics",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Customer Reviews",
      description: "Manage customer feedback",
      icon: MessageCircle,
      link: "#reviews",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Business Dashboard
                </h1>
                <p className="text-gray-600">Welcome back, {userProfile?.full_name || 'Business Owner'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/business-bookings">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 flex items-center gap-2 shadow-lg">
                  <Calendar className="h-4 w-4" />
                  Manage Bookings
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline" className="border-indigo-200 hover:bg-indigo-50">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                  {stat.trend === "up" && (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.trend === "up" ? "text-green-600" : stat.trend === "neutral" ? "text-orange-600" : "text-red-600"}`}>
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              Booking Requests
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Recent Activity */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className={`flex items-center p-4 rounded-xl ${activity.bgColor} border border-white/50`}>
                        <div className={`p-2 rounded-lg bg-white mr-4`}>
                          <activity.icon className={`h-5 w-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Quick Actions */}
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-4">
                    {quickActions.map((action, index) => (
                      <Link key={index} to={action.link}>
                        <div className="group p-4 rounded-xl border-2 border-gray-100 hover:border-transparent hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-white hover:to-gray-50">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${action.color} text-white group-hover:scale-110 transition-transform`}>
                              <action.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {action.title}
                              </h3>
                              <p className="text-sm text-gray-600">{action.description}</p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Booking Requests
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <BusinessBookingsDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationCenter />
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Business Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <BarChart3 className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Advanced Analytics Coming Soon</h3>
                  <p className="text-gray-600 text-lg mb-6">
                    Get detailed insights into your business performance, customer behavior, and revenue trends.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
                      <Award className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <p className="font-medium text-gray-800">Performance Metrics</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                      <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <p className="font-medium text-gray-800">Revenue Analytics</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
                      <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <p className="font-medium text-gray-800">Customer Insights</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessDashboard;
