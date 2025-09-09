import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from './LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import {
  Zap,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Copy,
  Send,
  Settings,
  Users,
  Mail,
  BarChart3
} from 'lucide-react';

interface ZapierIntegrationProps {
  entityType?: 'leads' | 'campaigns' | 'analytics';
  entityData?: any;
}

export const ZapierIntegration: React.FC<ZapierIntegrationProps> = ({ 
  entityType = 'leads',
  entityData 
}) => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const zapTemplates = [
    {
      name: 'New Lead to Google Sheets',
      description: 'Automatically add new leads to your Google Sheets',
      icon: Users,
      trigger: 'New high-score lead',
      action: 'Add row to Google Sheets'
    },
    {
      name: 'Campaign Results to Slack',
      description: 'Send campaign performance updates to your Slack channel',
      icon: Mail,
      trigger: 'Campaign completed',
      action: 'Send Slack message'
    },
    {
      name: 'Weekly Analytics Report',
      description: 'Email weekly analytics reports to your team',
      icon: BarChart3,
      trigger: 'Weekly schedule',
      action: 'Send email via Gmail'
    }
  ];

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Triggering Zapier webhook:", webhookUrl);

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        triggered_from: window.location.origin,
        entity_type: entityType,
        data: entityData || {
          // Sample data based on entity type
          ...(entityType === 'leads' && {
            lead_name: 'Sophie Martin',
            lead_email: 'sophie@techcorp.com',
            lead_score: 95,
            lead_status: 'Hot Lead',
            lead_source: 'LinkedIn'
          }),
          ...(entityType === 'campaigns' && {
            campaign_name: 'Spring Launch',
            campaign_status: 'Active',
            open_rate: '31.2%',
            click_rate: '4.8%',
            conversion_rate: '2.1%'
          }),
          ...(entityType === 'analytics' && {
            total_leads: 2847,
            conversion_rate: '23.8%',
            revenue_generated: '$184k',
            period: 'Last 30 days'
          })
        }
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Add this to handle CORS
        body: JSON.stringify(payload),
      });

      // Since we're using no-cors, we won't get a proper response status
      // Instead, we'll show a more informative message
      toast({
        title: "Webhook Triggered",
        description: "The request was sent to Zapier. Please check your Zap's history to confirm it was triggered.",
      });

      setIsConnected(true);
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the Zapier webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      {/* Connection Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-500" />
            Zapier Integration
          </CardTitle>
          <CardDescription>
            Connect your LeadFlow data to thousands of apps via Zapier webhooks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleTrigger} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Create a new Zap with a webhook trigger and paste the URL here
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                type="submit" 
                disabled={isLoading || !webhookUrl}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isLoading ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Test Webhook
              </Button>
              
              {isConnected && (
                <Badge variant="secondary" className="text-green-700 bg-green-50">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              )}
            </div>
          </form>

          <Separator />

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Sample Payload Structure:</h4>
            <div className="bg-muted rounded-md p-3">
              <pre className="text-xs overflow-x-auto">
{JSON.stringify({
  timestamp: "2024-01-15T10:30:00Z",
  triggered_from: "leadflow.app",
  entity_type: entityType,
  data: entityType === 'leads' ? {
    lead_name: "Sophie Martin",
    lead_email: "sophie@techcorp.com", 
    lead_score: 95,
    lead_status: "Hot Lead",
    lead_source: "LinkedIn"
  } : entityType === 'campaigns' ? {
    campaign_name: "Spring Launch",
    open_rate: "31.2%",
    click_rate: "4.8%"
  } : {
    total_leads: 2847,
    conversion_rate: "23.8%"
  }
}, null, 2)}
              </pre>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(JSON.stringify({
                  timestamp: "2024-01-15T10:30:00Z",
                  triggered_from: "leadflow.app",
                  entity_type: entityType,
                  data: {}
                }, null, 2))}
                className="mt-2"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy JSON
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zap Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Zap Templates</CardTitle>
          <CardDescription>
            Get started quickly with these pre-built automation templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {zapTemplates.map((template, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-50 rounded-md">
                    <template.icon className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {template.trigger}
                      </Badge>
                      <span>→</span>
                      <Badge variant="outline" className="text-xs">
                        {template.action}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="text-center">
            <Button variant="outline" className="text-orange-600 border-orange-200 hover:bg-orange-50">
              <Zap className="h-4 w-4 mr-2" />
              Browse More Templates
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            How to Set Up Zapier Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <h4 className="font-medium">Create a New Zap</h4>
                <p className="text-sm text-muted-foreground">
                  Go to Zapier and create a new Zap with a "Webhooks by Zapier" trigger
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <h4 className="font-medium">Configure Webhook</h4>
                <p className="text-sm text-muted-foreground">
                  Choose "Catch Hook" as the trigger event and copy the provided webhook URL
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <h4 className="font-medium">Paste URL and Test</h4>
                <p className="text-sm text-muted-foreground">
                  Paste the webhook URL above and click "Test Webhook" to send sample data
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                4
              </div>
              <div>
                <h4 className="font-medium">Add Actions</h4>
                <p className="text-sm text-muted-foreground">
                  Connect your favorite apps and configure what happens when the webhook is triggered
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};