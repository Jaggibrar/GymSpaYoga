
import { Card } from '@/components/ui/card';
import { DollarSign, Calendar, CheckCircle, Clock, TrendingUp, XCircle } from 'lucide-react';

interface BookingAnalyticsProps {
  data: {
    totalRevenue: number;
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    cancelledBookings: number;
    avgBookingValue: number;
  };
}

export const BookingAnalytics = ({ data }: BookingAnalyticsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const metrics = [
    {
      title: 'Total Revenue',
      value: formatCurrency(data.totalRevenue),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Bookings',
      value: data.totalBookings.toString(),
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Confirmed Bookings',
      value: data.confirmedBookings.toString(),
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Pending Bookings',
      value: data.pendingBookings.toString(),
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Avg Booking Value',
      value: formatCurrency(data.avgBookingValue),
      icon: TrendingUp,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    },
    {
      title: 'Cancelled Bookings',
      value: data.cancelledBookings.toString(),
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
              </div>
              <div className={`w-12 h-12 ${metric.bgColor} rounded-full flex items-center justify-center`}>
                <IconComponent className={`h-6 w-6 ${metric.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
