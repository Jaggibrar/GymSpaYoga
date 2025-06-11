
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface BookingStatusBadgeProps {
  status: string;
  showIcon?: boolean;
}

export const BookingStatusBadge = ({ status, showIcon = true }: BookingStatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return {
          variant: 'default' as const,
          className: 'bg-green-500 hover:bg-green-600 text-white',
          icon: CheckCircle,
          label: 'Confirmed'
        };
      case 'pending':
        return {
          variant: 'default' as const,
          className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          icon: Clock,
          label: 'Pending'
        };
      case 'cancelled':
        return {
          variant: 'default' as const,
          className: 'bg-red-500 hover:bg-red-600 text-white',
          icon: XCircle,
          label: 'Cancelled'
        };
      case 'rejected':
        return {
          variant: 'default' as const,
          className: 'bg-gray-500 hover:bg-gray-600 text-white',
          icon: AlertCircle,
          label: 'Rejected'
        };
      default:
        return {
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-600',
          icon: AlertCircle,
          label: status.charAt(0).toUpperCase() + status.slice(1)
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={config.className}>
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {config.label}
    </Badge>
  );
};
