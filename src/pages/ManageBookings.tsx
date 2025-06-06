
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, User, Clock, Phone, Mail, MapPin, Search, Filter, Download, TrendingUp, Users, DollarSign, Star, Dumbbell, Facebook, Instagram, Linkedin, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ManageBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const bookings = [
    {
      id: "BK001",
      customerName: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      service: "Monthly Gym Membership",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "confirmed",
      amount: "₹2,500",
      notes: "Interested in personal training sessions"
    },
    {
      id: "BK002",
      customerName: "Arjun Patel",
      email: "arjun.patel@email.com",
      phone: "+91 98765 43211",
      service: "Deep Tissue Massage",
      date: "2024-01-16",
      time: "2:30 PM",
      status: "pending",
      amount: "₹3,500",
      notes: "First time spa visit"
    },
    {
      id: "BK003",
      customerName: "Meera Singh",
      email: "meera.singh@email.com",
      phone: "+91 98765 43212",
      service: "Yoga Class Package",
      date: "2024-01-17",
      time: "6:00 AM",
      status: "confirmed",
      amount: "₹1,200",
      notes: "Beginner level yoga"
    },
    {
      id: "BK004",
      customerName: "Raj Kumar",
      email: "raj.kumar@email.com",
      phone: "+91 98765 43213",
      service: "Personal Training Session",
      date: "2024-01-18",
      time: "7:00 PM",
      status: "cancelled",
      amount: "₹1,500",
      notes: "Rescheduled for next week"
    },
    {
      id: "BK005",
      customerName: "Sneha Gupta",
      email: "sneha.gupta@email.com",
      phone: "+91 98765 43214",
      service: "Couple Spa Package",
      date: "2024-01-19",
      time: "11:00 AM",
      status: "confirmed",
      amount: "₹6,000",
      notes: "Anniversary celebration"
    }
  ];

  const stats = [
    { title: "Total Bookings", value: "156", icon: <Users className="h-6 w-6" />, color: "text-blue-600" },
    { title: "This Month Revenue", value: "₹45,000", icon: <DollarSign className="h-6 w-6" />, color: "text-green-600" },
    { title: "Average Rating", value: "4.8", icon: <Star className="h-6 w-6" />, color: "text-yellow-600" },
    { title: "Growth Rate", value: "+23%", icon: <TrendingUp className="h-6 w-6" />, color: "text-purple-600" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                GymSpaYoga
              </h1>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/pricing">
                <Button variant="outline" className="text-xs sm:text-sm">
                  Pricing
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-xs sm:text-sm">
                Business Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Manage Your
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Bookings </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Track customer bookings, manage schedules, and grow your business with our comprehensive dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="bookings" className="space-y-8">
          <TabsList className="grid w-full lg:w-auto grid-cols-1 lg:grid-cols-4">
            <TabsTrigger value="bookings">All Bookings</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            {/* Search and Filter */}
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Bookings Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">ID</th>
                      <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">Customer</th>
                      <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">Service</th>
                      <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">Date & Time</th>
                      <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">Amount</th>
                      <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="py-3 px-2 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-2 text-sm">{booking.id}</td>
                        <td className="py-4 px-2">
                          <div>
                            <p className="font-medium text-gray-800">{booking.customerName}</p>
                            <p className="text-sm text-gray-500">{booking.phone}</p>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-sm">{booking.service}</td>
                        <td className="py-4 px-2">
                          <div className="text-sm">
                            <div className="flex items-center text-gray-800">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {booking.time}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 font-medium">{booking.amount}</td>
                        <td className="py-4 px-2">
                          <Badge className={`${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredBookings.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No bookings matching your criteria.</p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>View and manage your upcoming appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16">
                  <Calendar className="h-16 w-16 mx-auto text-emerald-500 mb-4" />
                  <p className="text-xl font-medium text-gray-800 mb-2">Calendar View Coming Soon</p>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We're currently building an interactive calendar for better schedule management. Check back soon!
                  </p>
                  <Button>Notify Me When Available</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Database</CardTitle>
                <CardDescription>View and manage your customer information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16">
                  <Users className="h-16 w-16 mx-auto text-blue-500 mb-4" />
                  <p className="text-xl font-medium text-gray-800 mb-2">Customer Management Coming Soon</p>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We're building robust customer management tools to help you build better relationships. Check back soon!
                  </p>
                  <Button>Notify Me When Available</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Business Analytics</CardTitle>
                <CardDescription>Track your performance and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16">
                  <TrendingUp className="h-16 w-16 mx-auto text-purple-500 mb-4" />
                  <p className="text-xl font-medium text-gray-800 mb-2">Advanced Analytics Coming Soon</p>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We're building comprehensive analytics tools to help you make data-driven decisions. Check back soon!
                  </p>
                  <Button>Notify Me When Available</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">GymSpaYoga</h4>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Your wellness journey starts here. We connect fitness enthusiasts with the best gyms, spas, and yoga centers across India.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mb-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110">
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <X className="h-5 w-5 text-white" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition-colors duration-300 transform hover:scale-110">
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
              </div>

              {/* Payment Methods */}
              <div>
                <h6 className="text-sm font-semibold text-gray-400 mb-3">We Accept</h6>
                <div className="flex space-x-3">
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://logos-world.net/wp-content/uploads/2020/09/PayPal-Logo.png" alt="PayPal" className="h-6 w-10" />
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-6 w-10" />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-emerald-400">For Users</h5>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/gyms" className="hover:text-emerald-400 transition-colors duration-300">Find Gyms</Link></li>
                <li><Link to="/spas" className="hover:text-emerald-400 transition-colors duration-300">Find Spas</Link></li>
                <li><Link to="/yoga" className="hover:text-emerald-400 transition-colors duration-300">Find Yoga Centers</Link></li>
                <li><Link to="/trainers" className="hover:text-emerald-400 transition-colors duration-300">Find Trainers</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors duration-300">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-blue-400">For Business</h5>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/register-business" className="hover:text-blue-400 transition-colors duration-300">List Your Business</Link></li>
                <li><Link to="/register-trainer" className="hover:text-blue-400 transition-colors duration-300">Become a Trainer</Link></li>
                <li><Link to="/manage-bookings" className="hover:text-blue-400 transition-colors duration-300">Manage Bookings</Link></li>
                <li><Link to="/pricing" className="hover:text-blue-400 transition-colors duration-300">Pricing Plans</Link></li>
                <li><span className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">Support</span></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-6 text-xl text-purple-400">Contact</h5>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-purple-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-purple-400" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GymSpaYoga. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ManageBookings;
