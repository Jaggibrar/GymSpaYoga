
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

interface BookingStatusBadgeProps {
  status: string;
}

export const BookingStatusBadge = ({ status }: BookingStatusBadgeProps) => {
  const getStatusConfig = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return {
          variant: 'default' as const,
          className: 'bg-green-100 text-green-800 hover:bg-green-100',
          icon: <CheckCircle className="h-3 w-3" />,
          label: 'Confirmed'
        };
      case 'pending':
        return {
          variant: 'secondary' as const,
          className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
          icon: <Clock className="h-3 w-3" />,
          label: 'Pending'
        };
      case 'rejected':
        return {
          variant: 'destructive' as const,
          className: 'bg-red-100 text-red-800 hover:bg-red-100',
          icon: <XCircle className="h-3 w-3" />,
          label: 'Rejected'
        };
      case 'cancelled':
        return {
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
          icon: <XCircle className="h-3 w-3" />,
          label: 'Cancelled'
        };
      default:
        return {
          variant: 'outline' as const,
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
          icon: <AlertCircle className="h-3 w-3" />,
          label: status || 'Unknown'
        };
    }
  };

  const { variant, className, icon, label } = getStatusConfig(status);

  return (
    <Badge variant={variant} className={`flex items-center gap-1 ${className}`}>
      {icon}
      {label}
    </Badge>
  );
};
