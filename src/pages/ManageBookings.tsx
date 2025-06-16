import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Calendar, MapPin, Star, Clock, Phone, User, CreditCard, TrendingUp, BarChart3, Activity, Users, DollarSign, Target, ArrowLeft, Dumbbell, Download, Filter, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Link } from "react-router-dom";
import { useRealTimeBookings } from "@/hooks/useRealTimeBookings";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const ManageBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { bookings, loading, updateBookingStatus } = useRealTimeBookings(true);
  const { user } = useAuth();

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.business_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.business_id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate analytics from real data
  const analyticsData = {
    totalRevenue: filteredBookings
      .filter(b => b.status === 'confirmed' && b.total_amount)
      .reduce((sum, b) => sum + (b.total_amount || 0), 0),
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
    avgBookingValue: bookings.length > 0 
      ? bookings.reduce((sum, b) => sum + (b.total_amount || 0), 0) / bookings.length 
      : 0
  };

  const handleConfirm = async (bookingId: number) => {
    const success = await updateBookingStatus(bookingId, 'confirmed', "Booking confirmed by business");
    if (success) {
      toast.success("Booking confirmed successfully");
    }
  };

  const handleReject = async (bookingId: number) => {
    const success = await updateBookingStatus(bookingId, 'rejected', "Booking rejected by business");
    if (success) {
      toast.success("Booking rejected");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-500 hover:bg-green-600";
      case "pending": return "bg-yellow-500 hover:bg-yellow-600";
      case "cancelled": return "bg-red-500 hover:bg-red-600";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="p-8 text-center shadow-2xl border-0">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to manage bookings</p>
          <Link to="/login">
            <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
              Go to Login
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Elegant Header */}
      <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 text-gray-600 hover:text-emerald-600 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Business Dashboard
                </h1>
                <p className="text-sm text-gray-500">Welcome back, {user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
          <p className="text-gray-600">Manage your bookings and track business performance</p>
        </div>

        <Tabs defaultValue="analytics" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm border border-gray-200 p-1 rounded-xl">
            <TabsTrigger 
              value="analytics" 
              className="text-base px-6 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Analytics & Performance
            </TabsTrigger>
            <TabsTrigger 
              value="bookings" 
              className="text-base px-6 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Manage Bookings
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-1">Total Revenue</p>
                      <p className="text-3xl font-bold text-green-800">{formatCurrency(analyticsData.totalRevenue)}</p>
                      <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700 mb-1">Total Bookings</p>
                      <p className="text-3xl font-bold text-blue-800">{analyticsData.totalBookings}</p>
                      <p className="text-xs text-blue-600 mt-1">All time bookings</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700 mb-1">Confirmed Bookings</p>
                      <p className="text-3xl font-bold text-purple-800">{analyticsData.confirmedBookings}</p>
                      <p className="text-xs text-purple-600 mt-1">Ready to serve</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700 mb-1">Pending Bookings</p>
                      <p className="text-3xl font-bold text-orange-800">{analyticsData.pendingBookings}</p>
                      <p className="text-xs text-orange-600 mt-1">Awaiting response</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-teal-700 mb-1">Avg Booking Value</p>
                      <p className="text-3xl font-bold text-teal-800">{formatCurrency(analyticsData.avgBookingValue)}</p>
                      <p className="text-xs text-teal-600 mt-1">Per booking</p>
                    </div>
                    <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-700 mb-1">Cancelled Bookings</p>
                      <p className="text-3xl font-bold text-red-800">{analyticsData.cancelledBookings}</p>
                      <p className="text-xs text-red-600 mt-1">Needs attention</p>
                    </div>
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                      <XCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            {/* Elegant Filters */}
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Input
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-12 pl-4 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-12 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-xl">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 h-12 rounded-xl shadow-lg">
                    <Filter className="h-5 w-5 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Bookings Table */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Your Bookings ({filteredBookings.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No bookings found</h3>
                    <p className="text-gray-500">
                      {bookings.length === 0 
                        ? "You haven't received any bookings yet." 
                        : "No bookings match your current filters."}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-100">
                          <TableHead className="font-semibold text-gray-700">Booking Details</TableHead>
                          <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                          <TableHead className="font-semibold text-gray-700">Date & Time</TableHead>
                          <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                          <TableHead className="font-semibold text-gray-700">Status</TableHead>
                          <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBookings.map((booking) => (
                          <TableRow key={booking.id} className="border-gray-50 hover:bg-gray-50 transition-colors">
                            <TableCell>
                              <div>
                                <p className="font-semibold text-gray-800">{booking.business_type?.toUpperCase()} Booking</p>
                                <p className="text-sm text-gray-500">ID: {booking.id}</p>
                                {booking.notes && (
                                  <p className="text-sm text-gray-600 mt-1 max-w-xs truncate">{booking.notes}</p>
                                )}
                                <p className="text-xs text-gray-400 mt-1">
                                  Duration: {booking.duration_minutes || 60} minutes
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-800">
                                  {booking.user_profile?.full_name || 'Unknown Customer'}
                                </p>
                                {booking.user_profile?.phone && (
                                  <p className="text-sm text-gray-600">{booking.user_profile.phone}</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-800">
                                  {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : 'Not set'}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {booking.booking_time || 'Time not set'}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-semibold text-green-600 text-lg">
                                {booking.total_amount ? formatCurrency(booking.total_amount) : 'Not set'}
                              </p>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${getStatusColor(booking.status || 'pending')} text-white font-medium px-3 py-1 rounded-full`}>
                                {(booking.status || 'pending').charAt(0).toUpperCase() + (booking.status || 'pending').slice(1)}
                              </Badge>
                              {booking.confirmed_at && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Confirmed: {new Date(booking.confirmed_at).toLocaleString()}
                                </p>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {booking.status === "pending" && (
                                  <>
                                    <Button 
                                      size="sm" 
                                      className="bg-green-500 hover:bg-green-600 shadow-md"
                                      onClick={() => handleConfirm(booking.id)}
                                      disabled={loading}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Confirm
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="destructive"
                                      className="shadow-md"
                                      onClick={() => handleReject(booking.id)}
                                      disabled={loading}
                                    >
                                      <XCircle className="h-4 w-4 mr-1" />
                                      Reject
                                    </Button>
                                  </>
                                )}
                                <Button size="sm" variant="outline" className="shadow-md">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManageBookings;
