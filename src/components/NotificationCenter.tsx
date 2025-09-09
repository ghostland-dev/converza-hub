import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Bell,
  User,
  Mail,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  Settings
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'lead' | 'campaign' | 'system' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'lead',
      title: 'New High-Score Lead',
      message: 'Sophie Martin scored 95 points and is ready for outreach',
      timestamp: '2 minutes ago',
      isRead: false,
      priority: 'high',
      actionUrl: '/leads'
    },
    {
      id: '2',
      type: 'campaign',
      title: 'Campaign Milestone',
      message: 'Spring Launch reached 1,000 email opens',
      timestamp: '1 hour ago',
      isRead: false,
      priority: 'medium',
      actionUrl: '/campaigns'
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Monthly Goal Achieved',
      message: 'You\'ve reached 68% of your monthly lead target',
      timestamp: '3 hours ago',
      isRead: true,
      priority: 'medium',
      actionUrl: '/analytics'
    },
    {
      id: '4',
      type: 'system',
      title: 'System Update',
      message: 'New analytics dashboard features are now available',
      timestamp: '1 day ago',
      isRead: true,
      priority: 'low',
      actionUrl: '/analytics'
    },
    {
      id: '5',
      type: 'lead',
      title: 'Lead Nurturing Alert',
      message: '15 leads haven\'t been contacted in over 7 days',
      timestamp: '2 days ago',
      isRead: false,
      priority: 'medium',
      actionUrl: '/leads'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'lead': return User;
      case 'campaign': return Mail;
      case 'achievement': return TrendingUp;
      case 'system': return Settings;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'lead': return 'text-blue-600 bg-blue-50';
      case 'campaign': return 'text-green-600 bg-green-50';
      case 'achievement': return 'text-purple-600 bg-purple-50';
      case 'system': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-96 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Mark all read
                </Button>
              )}
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            </div>
          </div>
        </div>

        <ScrollArea className="h-96">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
                <p className="text-sm mt-1">You're all caught up!</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => {
                  const Icon = getIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                        notification.isRead 
                          ? 'bg-muted/20 border-transparent' 
                          : 'bg-background border-border hover:bg-muted/30'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={`text-sm font-medium ${
                              notification.isRead ? 'text-muted-foreground' : 'text-foreground'
                            }`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              <div 
                                className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`}
                                title={`${notification.priority} priority`}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className={`text-xs mt-1 ${
                            notification.isRead ? 'text-muted-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {notification.timestamp}
                            </span>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <Button variant="ghost" className="w-full text-sm" size="sm">
                View All Notifications
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};