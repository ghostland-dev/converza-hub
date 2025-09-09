import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { ZapierIntegration } from '@/components/ZapierIntegration';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Zap,
  Mail,
  Database,
  Slack,
  FileText,
  BarChart3,
  Users,
  ExternalLink,
  CheckCircle,
  Plus,
  Settings
} from 'lucide-react';

const Integrations = () => {
  const integrations = [
    {
      name: 'Zapier',
      description: 'Connect to 5,000+ apps with automated workflows',
      icon: Zap,
      color: 'bg-orange-500',
      status: 'available',
      category: 'automation'
    },
    {
      name: 'Google Sheets',
      description: 'Sync leads and campaign data to spreadsheets',
      icon: FileText,
      color: 'bg-green-500',
      status: 'available',
      category: 'data'
    },
    {
      name: 'Slack',
      description: 'Get notifications about leads and campaigns',
      icon: Slack,
      color: 'bg-purple-500',
      status: 'available',
      category: 'communication'
    },
    {
      name: 'Mailchimp',
      description: 'Sync leads with your email marketing campaigns',
      icon: Mail,
      color: 'bg-yellow-500',
      status: 'coming-soon',
      category: 'email'
    },
    {
      name: 'HubSpot',
      description: 'Two-way sync with your CRM platform',
      icon: Database,
      color: 'bg-blue-500',
      status: 'coming-soon',
      category: 'crm'
    },
    {
      name: 'Google Analytics',
      description: 'Track lead sources and website behavior',
      icon: BarChart3,
      color: 'bg-indigo-500',
      status: 'coming-soon',
      category: 'analytics'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Integrations', count: integrations.length },
    { id: 'automation', name: 'Automation', count: integrations.filter(i => i.category === 'automation').length },
    { id: 'data', name: 'Data & Storage', count: integrations.filter(i => i.category === 'data').length },
    { id: 'communication', name: 'Communication', count: integrations.filter(i => i.category === 'communication').length },
    { id: 'email', name: 'Email Marketing', count: integrations.filter(i => i.category === 'email').length },
    { id: 'crm', name: 'CRM', count: integrations.filter(i => i.category === 'crm').length },
    { id: 'analytics', name: 'Analytics', count: integrations.filter(i => i.category === 'analytics').length }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Available
          </Badge>
        );
      case 'connected':
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case 'coming-soon':
        return (
          <Badge variant="secondary">
            Coming Soon
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Zap className="w-8 h-8 mr-3 text-primary" />
              Integrations
            </h1>
            <p className="text-muted-foreground mt-1">
              Connect LeadFlow with your favorite tools and automate your workflow
            </p>
          </div>
          
          <Button className="mt-4 md:mt-0">
            <Plus className="w-4 h-4 mr-2" />
            Request Integration
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              size="sm"
              className="justify-start"
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Zapier Integration Detail */}
        <ZapierIntegration />

        <Separator />

        {/* All Integrations Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">All Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${integration.color} text-white`}>
                        <integration.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                      </div>
                    </div>
                    {getStatusBadge(integration.status)}
                  </div>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="capitalize">
                      {integration.category}
                    </Badge>
                    
                    {integration.status === 'available' ? (
                      <Button size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    ) : integration.status === 'connected' ? (
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" disabled>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Learn More
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Workflows */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Automation Workflows</CardTitle>
            <CardDescription>
              Get started quickly with these commonly used automation patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {[
                {
                  title: 'New Lead → Google Sheets',
                  description: 'Automatically add new high-scoring leads to a spreadsheet for your sales team',
                  apps: ['LeadFlow', 'Google Sheets'],
                  popularity: '1,200+ users'
                },
                {
                  title: 'Campaign Complete → Slack Alert',
                  description: 'Get notified in Slack when email campaigns finish with performance metrics',
                  apps: ['LeadFlow', 'Slack'],
                  popularity: '800+ users'
                },
                {
                  title: 'Lead Score Change → CRM Update',
                  description: 'Sync lead score changes with your CRM to keep sales teams informed',
                  apps: ['LeadFlow', 'HubSpot'],
                  popularity: '650+ users'
                }
              ].map((workflow, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{workflow.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{workflow.description}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {workflow.popularity}
                        </div>
                        <div className="flex items-center gap-1">
                          {workflow.apps.map((app, idx) => (
                            <React.Fragment key={app}>
                              <Badge variant="outline" className="text-xs">
                                {app}
                              </Badge>
                              {idx < workflow.apps.length - 1 && (
                                <span className="text-muted-foreground text-xs">→</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;