
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, CheckCheck, Clock, Calendar, User } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export const NotificationCenter = () => {
  const { notifications, loading, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { user } = useAuth();
  const [showAll, setShowAll] = useState(false);

  if (!user) {
    return null;
  }

  const displayNotifications = showAll ? notifications : notifications.slice(0, 5);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'new_booking': return <Calendar className="h-4 w-4" />;
      case 'status_update': return <Check className="h-4 w-4" />;
      case 'payment': return '💳';
      case 'approval': return '✅';
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'new_booking': return 'bg-blue-100 text-blue-800';
      case 'status_update': return 'bg-green-100 text-green-800';
      case 'payment': return 'bg-yellow-100 text-yellow-800';
      case 'approval': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">Loading notifications...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              <CheckCheck className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-colors ${
                  notification.is_read 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-white border-blue-200 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(notification.type)}
                        <Badge className={`text-xs ${getTypeColor(notification.type)}`}>
                          {notification.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      {!notification.is_read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimeAgo(notification.created_at)}</span>
                      </div>
                      {notification.booking_id && (
                        <Link 
                          to="/user-bookings" 
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          View booking
                        </Link>
                      )}
                    </div>
                  </div>
                  {!notification.is_read && (
                    <Button
                      onClick={() => markAsRead(notification.id)}
                      size="sm"
                      variant="ghost"
                      className="ml-2 p-1 h-6 w-6"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {notifications.length > 5 && (
              <div className="text-center pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAll(!showAll)}
                  className="text-xs"
                >
                  {showAll ? 'Show less' : `Show all ${notifications.length} notifications`}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
