
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, User, Calendar, TrendingUp } from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalBusinesses: number;
  totalTrainers: number;
  totalBookings: number;
  pendingBusinesses: number;
  pendingTrainers: number;
  approvedBusinesses: number;
  approvedTrainers: number;
}

export const AdminStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalBusinesses: 0,
    totalTrainers: 0,
    totalBookings: 0,
    pendingBusinesses: 0,
    pendingTrainers: 0,
    approvedBusinesses: 0,
    approvedTrainers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [
        { count: totalBusinesses },
        { count: totalTrainers },
        { count: totalBookings },
        { count: pendingBusinesses },
        { count: pendingTrainers },
        { count: approvedBusinesses },
        { count: approvedTrainers }
      ] = await Promise.all([
        supabase.from('business_profiles').select('*', { count: 'exact', head: true }),
        supabase.from('trainer_profiles').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
        supabase.from('business_profiles').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('trainer_profiles').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('business_profiles').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
        supabase.from('trainer_profiles').select('*', { count: 'exact', head: true }).eq('status', 'approved')
      ]);

      setStats({
        totalUsers: 0, // We can't access auth.users directly
        totalBusinesses: totalBusinesses || 0,
        totalTrainers: totalTrainers || 0,
        totalBookings: totalBookings || 0,
        pendingBusinesses: pendingBusinesses || 0,
        pendingTrainers: pendingTrainers || 0,
        approvedBusinesses: approvedBusinesses || 0,
        approvedTrainers: approvedTrainers || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Businesses',
      value: stats.totalBusinesses,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Trainers',
      value: stats.totalTrainers,
      icon: User,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingBusinesses + stats.pendingTrainers,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  if (loading) {
    return <div className="animate-pulse">Loading statistics...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
