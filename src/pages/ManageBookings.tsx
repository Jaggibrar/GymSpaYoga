
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Star, Clock, Phone, User, CreditCard, TrendingUp, BarChart3, Activity, Users, DollarSign, Target, ArrowLeft, Dumbbell, Download, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const ManageBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  // Mock analytics data
  const analyticsData = {
    totalRevenue: "₹2,45,000",
    totalBookings: 156,
    activeCustomers: 89,
    conversionRate: "68%",
    avgBookingValue: "₹1,570",
    customerRetention: "76%"
  };

  const monthlyData = [
    { month: "Jan", revenue: 45000, bookings: 28, customers: 22 },
    { month: "Feb", revenue: 52000, bookings: 34, customers: 28 },
    { month: "Mar", revenue: 48000, bookings: 31, customers: 25 },
    { month: "Apr", revenue: 65000, bookings: 42, customers: 34 },
    { month: "May", revenue: 58000, bookings: 38, customers: 31 },
    { month: "Jun", revenue: 72000, bookings: 46, customers: 38 }
  ];

  // Mock booking data
  const bookings = [
    {
      id: 1,
      customerName: "Rahul Sharma",
      customerEmail: "rahul@email.com",
      customerPhone: "+91 98765 43210",
      service: "Monthly Gym Membership",
      businessName: "Elite Fitness Hub",
      date: "2024-01-15",
      time: "10:00 AM",
      amount: "₹2,500",
      status: "confirmed",
      paymentMethod: "UPI",
      bookingDate: "2024-01-10"
    },
    {
      id: 2,
      customerName: "Priya Patel",
      customerEmail: "priya@email.com",
      customerPhone: "+91 87654 32109",
      service: "Spa Relaxation Package",
      businessName: "Serenity Spa",
      date: "2024-01-16",
      time: "2:00 PM",
      amount: "₹3,500",
      status: "pending",
      paymentMethod: "Credit Card",
      bookingDate: "2024-01-12"
    },
    {
      id: 3,
      customerName: "Arjun Singh",
      customerEmail: "arjun@email.com",
      customerPhone: "+91 76543 21098",
      service: "Yoga Classes - Quarterly",
      businessName: "Zen Yoga Studio",
      date: "2024-01-17",
      time: "6:00 AM",
      amount: "₹1,200",
      status: "confirmed",
      paymentMethod: "UPI",
      bookingDate: "2024-01-11"
    },
    {
      id: 4,
      customerName: "Meera Gupta",
      customerEmail: "meera@email.com",
      customerPhone: "+91 65432 10987",
      service: "Personal Training Session",
      businessName: "PowerHouse Gym",
      date: "2024-01-18",
      time: "7:00 PM",
      amount: "₹800",
      status: "cancelled",
      paymentMethod: "Wallet",
      bookingDate: "2024-01-13"
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500 hover:bg-green-600";
      case "pending": return "bg-yellow-500 hover:bg-yellow-600";
      case "cancelled": return "bg-red-500 hover:bg-red-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg shadow-xl sticky top-0 z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Dumbbell className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Business Dashboard</h2>
          <p className="text-gray-600 text-lg">Manage your bookings and track performance analytics</p>
        </div>

        <Tabs defaultValue="analytics" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="analytics" className="text-lg px-6 py-3">Analytics & Performance</TabsTrigger>
            <TabsTrigger value="bookings" className="text-lg px-6 py-3">Manage Bookings</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-green-600">{analyticsData.totalRevenue}</p>
                    <p className="text-sm text-green-500">+12% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-3xl font-bold text-blue-600">{analyticsData.totalBookings}</p>
                    <p className="text-sm text-blue-500">+8% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Customers</p>
                    <p className="text-3xl font-bold text-purple-600">{analyticsData.activeCustomers}</p>
                    <p className="text-sm text-purple-500">+15% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-3xl font-bold text-orange-600">{analyticsData.conversionRate}</p>
                    <p className="text-sm text-orange-500">+5% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Booking Value</p>
                    <p className="text-3xl font-bold text-teal-600">{analyticsData.avgBookingValue}</p>
                    <p className="text-sm text-teal-500">+3% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Customer Retention</p>
                    <p className="text-3xl font-bold text-pink-600">{analyticsData.customerRetention}</p>
                    <p className="text-sm text-pink-500">+7% from last month</p>
                  </div>
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Activity className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-6 w-6 mr-2 text-indigo-600" />
                    Monthly Revenue Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{data.month}</span>
                        <span className="text-lg font-bold text-indigo-600">₹{data.revenue.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-6 w-6 mr-2 text-purple-600" />
                    Customer Acquisition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{data.month}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">{data.bookings} bookings</span>
                          <span className="text-lg font-bold text-purple-600">{data.customers} customers</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Export Options */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <Download className="h-4 w-4 mr-2" />
                    Revenue Report
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    <Download className="h-4 w-4 mr-2" />
                    Customer Report
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Download className="h-4 w-4 mr-2" />
                    Booking Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            {/* Filters */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="h-12"
                />
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 h-12">
                  <Filter className="h-5 w-5 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </Card>

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="p-6 hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.customerName}</h3>
                          <p className="text-lg font-semibold text-indigo-600 mb-1">{booking.service}</p>
                          <p className="text-gray-600">{booking.businessName}</p>
                        </div>
                        <Badge className={`${getStatusColor(booking.status)} text-white`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          <span>{booking.customerEmail}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{booking.customerPhone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span>{booking.paymentMethod}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600 mb-4">{booking.amount}</p>
                      <div className="space-y-2">
                        {booking.status === "pending" && (
                          <Button className="w-full bg-green-500 hover:bg-green-600">
                            Confirm
                          </Button>
                        )}
                        <Button variant="outline" className="w-full">
                          Contact Customer
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageBookings;
