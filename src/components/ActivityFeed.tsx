import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Users,
  Mail,
  UserPlus,
  Settings,
  TrendingUp,
  Star,
  Eye,
  MessageSquare,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'lead_added' | 'campaign_sent' | 'lead_scored' | 'system_update' | 'user_action';
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  metadata?: {
    leadScore?: number;
    campaignName?: string;
    recipientCount?: number;
    changeValue?: string;
  };
}

interface ActivityFeedProps {
  limit?: number;
  showHeader?: boolean;
  entityFilter?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  limit = 10,
  showHeader = true,
  entityFilter
}) => {
  const [activities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'lead_added',
      title: 'New high-score lead added',
      description: 'Sophie Martin scored 95 points from LinkedIn source',
      timestamp: '2 minutes ago',
      user: {
        name: 'System',
        initials: 'SY'
      },
      metadata: {
        leadScore: 95
      }
    },
    {
      id: '2',
      type: 'campaign_sent',
      title: 'Campaign email sent',
      description: 'Spring Launch campaign delivered to 1,420 recipients',
      timestamp: '15 minutes ago',
      user: {
        name: 'Marketing Team',
        initials: 'MT'
      },
      metadata: {
        campaignName: 'Spring Launch',
        recipientCount: 1420
      }
    },
    {
      id: '3',
      type: 'lead_scored',
      title: 'Lead score updated',
      description: 'Marc Dubois lead score increased from 78 to 87',
      timestamp: '1 hour ago',
      user: {
        name: 'AI System',
        initials: 'AI'
      },
      metadata: {
        changeValue: '+9 points'
      }
    },
    {
      id: '4',
      type: 'user_action',
      title: 'Lead contacted',
      description: 'Email sent to Claire Rousseau regarding product demo',
      timestamp: '2 hours ago',
      user: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        initials: 'JD'
      }
    },
    {
      id: '5',
      type: 'system_update',
      title: 'Analytics updated',
      description: 'Monthly performance report generated with new insights',
      timestamp: '4 hours ago',
      user: {
        name: 'System',
        initials: 'SY'
      }
    },
    {
      id: '6',
      type: 'lead_added',
      title: 'Bulk leads imported',
      description: '47 new leads imported from CSV file',
      timestamp: '6 hours ago',
      user: {
        name: 'Sarah Wilson',
        initials: 'SW'
      }
    },
    {
      id: '7',
      type: 'campaign_sent',
      title: 'Follow-up campaign started',
      description: 'Nurture sequence initiated for 340 warm leads',
      timestamp: '1 day ago',
      user: {
        name: 'Automation',
        initials: 'AU'
      },
      metadata: {
        campaignName: 'Nurture Sequence',
        recipientCount: 340
      }
    }
  ]);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'lead_added': return UserPlus;
      case 'campaign_sent': return Mail;
      case 'lead_scored': return Star;
      case 'system_update': return Settings;
      case 'user_action': return MessageSquare;
      default: return Users;
    }
  };

  const getActivityColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'lead_added': return 'text-green-600 bg-green-50';
      case 'campaign_sent': return 'text-blue-600 bg-blue-50';
      case 'lead_scored': return 'text-yellow-600 bg-yellow-50';
      case 'system_update': return 'text-gray-600 bg-gray-50';
      case 'user_action': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeLabel = (type: ActivityItem['type']) => {
    switch (type) {
      case 'lead_added': return 'Lead';
      case 'campaign_sent': return 'Campaign';
      case 'lead_scored': return 'Score';
      case 'system_update': return 'System';
      case 'user_action': return 'Action';
      default: return 'Activity';
    }
  };

  const displayedActivities = limit ? activities.slice(0, limit) : activities;

  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest updates and actions in your account
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      )}
      
      <CardContent className={showHeader ? '' : 'p-6'}>
        <ScrollArea className={limit ? 'h-96' : 'h-full'}>
          <div className="space-y-4">
            {displayedActivities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              const colorClass = getActivityColor(activity.type);
              
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(activity.type)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {activity.description}
                    </p>
                    
                    {activity.metadata && (
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        {activity.metadata.leadScore && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>Score: {activity.metadata.leadScore}</span>
                          </div>
                        )}
                        {activity.metadata.recipientCount && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{activity.metadata.recipientCount} recipients</span>
                          </div>
                        )}
                        {activity.metadata.changeValue && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{activity.metadata.changeValue}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {activity.user && (
                          <>
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                              <AvatarFallback className="text-xs">
                                {activity.user.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                              {activity.user.name}
                            </span>
                          </>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {activity.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        {limit && activities.length > limit && (
          <div className="mt-4 text-center">
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All Activity
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};