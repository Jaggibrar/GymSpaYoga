import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Building, Calendar, DollarSign } from 'lucide-react';

interface AnalyticsData {
  userGrowth: { month: string; users: number }[];
  bookingStats: { month: string; bookings: number; revenue: number }[];
  categoryDistribution: { category: string; count: number }[];
  topPerformers: { name: string; bookings: number; revenue: number }[];
}

export const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    userGrowth: [],
    bookingStats: [],
    categoryDistribution: [],
    topPerformers: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch user growth data
      const { data: users } = await supabase
        .from('user_profiles')
        .select('created_at');

      // Fetch booking and revenue data
      const { data: bookings } = await supabase
        .from('bookings')
        .select('created_at, total_amount, status');

      // Fetch business category distribution
      const { data: businesses } = await supabase
        .from('business_profiles')
        .select('category, business_name')
        .eq('status', 'approved');

      // Process user growth data (last 6 months)
      const userGrowth = processMonthlyData(users || [], 'created_at');
      
      // Process booking stats (last 6 months)
      const bookingStats = processBookingData(bookings || []);
      
      // Process category distribution
      const categoryDistribution = processCategoryData(businesses || []);

      setAnalytics({
        userGrowth,
        bookingStats,
        categoryDistribution,
        topPerformers: [] // Would need more complex query for actual top performers
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const processMonthlyData = (data: any[], dateField: string) => {
    const months = getLastSixMonths();
    return months.map(month => ({
      month: month.label,
      users: data.filter(item => {
        const itemDate = new Date(item[dateField]);
        return itemDate.getMonth() === month.month && itemDate.getFullYear() === month.year;
      }).length
    }));
  };

  const processBookingData = (bookings: any[]) => {
    const months = getLastSixMonths();
    return months.map(month => ({
      month: month.label,
      bookings: bookings.filter(booking => {
        const bookingDate = new Date(booking.created_at);
        return bookingDate.getMonth() === month.month && bookingDate.getFullYear() === month.year;
      }).length,
      revenue: bookings
        .filter(booking => {
          const bookingDate = new Date(booking.created_at);
          return bookingDate.getMonth() === month.month && 
                 bookingDate.getFullYear() === month.year &&
                 booking.status === 'confirmed';
        })
        .reduce((sum, booking) => sum + (booking.total_amount || 0), 0)
    }));
  };

  const processCategoryData = (businesses: any[]) => {
    const categoryCount: { [key: string]: number } = {};
    businesses.forEach(business => {
      categoryCount[business.category] = (categoryCount[business.category] || 0) + 1;
    });
    
    return Object.entries(categoryCount).map(([category, count]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      count
    }));
  };

  const getLastSixMonths = () => {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        month: date.getMonth(),
        year: date.getFullYear(),
        label: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      });
    }
    
    return months;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalUsers = analytics.userGrowth.reduce((sum, month) => sum + month.users, 0);
  const totalBookings = analytics.bookingStats.reduce((sum, month) => sum + month.bookings, 0);
  const totalRevenue = analytics.bookingStats.reduce((sum, month) => sum + month.revenue, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics & Reports</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users (6 months)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.categoryDistribution.length}</div>
            <p className="text-xs text-muted-foreground">Active categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.userGrowth.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{data.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(data.users / Math.max(...analytics.userGrowth.map(d => d.users), 1)) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{data.users}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.bookingStats.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{data.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ 
                          width: `${(data.revenue / Math.max(...analytics.bookingStats.map(d => d.revenue), 1)) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">₹{data.revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Business Category Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analytics.categoryDistribution.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">{category.category}</span>
                <span className="text-2xl font-bold">{category.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};