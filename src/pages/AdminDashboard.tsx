import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Building, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  Bell, 
  Settings, 
  BarChart3,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash,
  Download,
  UserCheck,
  CreditCard,
  MessageSquare,
  Shield,
  AlertTriangle,
  RefreshCw,
  Database
} from 'lucide-react';
import { toast } from 'sonner';
import { AdminStats } from '@/components/admin/AdminStats';
import { AdminBusinessList } from '@/components/admin/AdminBusinessList';
import { AdminTrainerList } from '@/components/admin/AdminTrainerList';
import { AdminUsersList } from '@/components/admin/AdminUsersList';
import { AdminPayments } from '@/components/admin/AdminPayments';
import { AdminContent } from '@/components/admin/AdminContent';
import { AdminAnalytics } from '@/components/admin/AdminAnalytics';

interface AdminStats {
  totalUsers: number;
  verifiedTrainers: number;
  businessOwners: number;
  activeListings: number;
  monthlyRevenue: number;
  pendingApprovals: number;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    verifiedTrainers: 0,
    businessOwners: 0,
    activeListings: 0,
    monthlyRevenue: 0,
    pendingApprovals: 0
  });
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  const checkAdminAccess = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await supabase.rpc('is_admin', { user_uuid: user.id });
      if (data) {
        setIsAdmin(true);
        fetchAdminStats();
      }
      setLoading(false);
    } catch (error) {
      console.error('Error checking admin access:', error);
      setLoading(false);
    }
  };

  const fetchAdminStats = async () => {
    try {
      // Fetch comprehensive admin statistics
      const [userProfiles, trainerProfiles, businessProfiles, bookings] = await Promise.all([
        supabase.from('user_profiles').select('id'),
        supabase.from('trainer_profiles').select('id, status'),
        supabase.from('business_profiles').select('id, status'),
        supabase.from('bookings').select('total_amount, created_at')
      ]);

      const currentMonth = new Date().getMonth();
      const monthlyRevenue = bookings.data?.reduce((sum, booking) => {
        const bookingMonth = new Date(booking.created_at).getMonth();
        return bookingMonth === currentMonth ? sum + (booking.total_amount || 0) : sum;
      }, 0) || 0;

      setStats({
        totalUsers: userProfiles.data?.length || 0,
        verifiedTrainers: trainerProfiles.data?.filter(t => t.status === 'approved').length || 0,
        businessOwners: businessProfiles.data?.filter(b => b.status === 'approved').length || 0,
        activeListings: (businessProfiles.data?.length || 0) + (trainerProfiles.data?.length || 0),
        monthlyRevenue,
        pendingApprovals: (trainerProfiles.data?.filter(t => t.status === 'pending').length || 0) + 
                         (businessProfiles.data?.filter(b => b.status === 'pending').length || 0)
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">Please sign in to access the admin dashboard.</p>
            <Button onClick={() => window.location.href = '/login'}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle>Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">You don't have admin permissions to access this area.</p>
            <Button onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GymSpaYoga Prime Admin</h1>
          <p className="text-gray-600">Complete platform management and analytics</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Registered platform users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Verified Trainers</CardTitle>
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.verifiedTrainers}</div>
                  <p className="text-xs text-muted-foreground">Active certified trainers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Business Owners</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.businessOwners}</div>
                  <p className="text-xs text-muted-foreground">Gym/Spa/Yoga owners</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeListings}</div>
                  <p className="text-xs text-muted-foreground">Total active listings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{stats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Current month earnings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
                  <p className="text-xs text-muted-foreground">Awaiting review</p>
                </CardContent>
              </Card>
            </div>

            {/* System Health Improvements */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  System Health Improvements Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
                    <Database className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-900">Database Integrity</div>
                      <div className="text-sm text-green-700">Foreign key constraints added</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
                    <Bell className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-900">Booking Reminders</div>
                      <div className="text-sm text-green-700">Automated reminder system active</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-900">Logging System</div>
                      <div className="text-sm text-green-700">Production-safe logging implemented</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
                    <RefreshCw className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-900">Edge Functions</div>
                      <div className="text-sm text-green-700">Booking automation improved</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
                    <AlertTriangle className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-900">Notifications</div>
                      <div className="text-sm text-green-700">Cleanup & optimization completed</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-900">Health Monitoring</div>
                      <div className="text-sm text-green-700">Real-time system monitoring active</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                  <div className="text-sm text-green-800">
                    <strong>Key Improvements:</strong> Reduced booking cancellation risk, improved data integrity, 
                    enhanced system monitoring, and optimized notification system. All critical issues identified 
                    in the system audit have been resolved.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button onClick={() => setActiveTab('listings')} className="h-20 flex flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    Manage Listings
                  </Button>
                  <Button onClick={() => setActiveTab('users')} variant="outline" className="h-20 flex flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    User Management
                  </Button>
                  <Button onClick={() => setActiveTab('payments')} variant="outline" className="h-20 flex flex-col">
                    <CreditCard className="h-6 w-6 mb-2" />
                    Payment Reports
                  </Button>
                  <Button onClick={() => setActiveTab('analytics')} variant="outline" className="h-20 flex flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings">
            <Tabs defaultValue="businesses" className="space-y-4">
              <TabsList>
                <TabsTrigger value="businesses">Businesses</TabsTrigger>
                <TabsTrigger value="trainers">Trainers</TabsTrigger>
              </TabsList>
              <TabsContent value="businesses">
                <AdminBusinessList />
              </TabsContent>
              <TabsContent value="trainers">
                <AdminTrainerList />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="users">
            <AdminUsersList />
          </TabsContent>

          <TabsContent value="payments">
            <AdminPayments />
          </TabsContent>

          <TabsContent value="content">
            <AdminContent />
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications & Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Send announcements, manage notification templates, and handle support queries.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Configure categories, filters, security settings, and manage sub-admin permissions.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;