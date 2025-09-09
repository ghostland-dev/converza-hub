import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { InteractiveChart } from '@/components/InteractiveChart';
import { StatsCard } from '@/components/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Mail, 
  Target,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  DollarSign,
  MousePointer,
  Eye,
  UserPlus,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ];

  const leadTrendData = [
    { name: 'Week 1', value: 120 },
    { name: 'Week 2', value: 150 },
    { name: 'Week 3', value: 180 },
    { name: 'Week 4', value: 220 },
  ];

  const conversionData = [
    { name: 'Leads', value: 1000 },
    { name: 'Qualified', value: 450 },
    { name: 'Proposals', value: 180 },
    { name: 'Customers', value: 75 },
  ];

  const sourceData = [
    { name: 'Website', value: 35 },
    { name: 'LinkedIn', value: 28 },
    { name: 'Referrals', value: 20 },
    { name: 'Events', value: 12 },
    { name: 'Cold Email', value: 5 },
  ];

  const campaignData = [
    { name: 'Q1 Launch', value: 320 },
    { name: 'Spring Sale', value: 280 },
    { name: 'Product Demo', value: 190 },
    { name: 'Webinar Series', value: 150 },
    { name: 'Newsletter', value: 120 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-primary" />
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Track performance and optimize your lead generation strategy
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex gap-1">
              {periods.map((period) => (
                <Button
                  key={period.value}
                  variant={selectedPeriod === period.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.value)}
                >
                  {period.label}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="hero" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Leads"
            value="2,847"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            description="vs last period"
          />
          <StatsCard
            title="Conversion Rate"
            value="23.8%"
            icon={Target}
            trend={{ value: 4.2, isPositive: true }}
            description="leads to customers"
          />
          <StatsCard
            title="Campaign ROI"
            value="340%"
            icon={TrendingUp}
            trend={{ value: 18, isPositive: true }}
            description="return on investment"
          />
          <StatsCard
            title="Avg Deal Size"
            value="$2,450"
            icon={DollarSign}
            trend={{ value: 2.1, isPositive: false }}
            description="per closed deal"
          />
        </div>

        {/* Tabbed Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="funnel">Funnel</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InteractiveChart
                title="Lead Generation Trend"
                data={leadTrendData}
                type="line"
                color="#3b82f6"
                showPeriodToggle={true}
              />
              
              <InteractiveChart
                title="Conversion Funnel"
                data={conversionData}
                type="bar"
                color="#10b981"
              />
            </div>
            
            <InteractiveChart
              title="Lead Sources Distribution"
              data={sourceData}
              type="pie"
            />
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <InteractiveChart
              title="Campaign Performance"
              data={campaignData}
              type="bar"
              color="#8b5cf6"
              showPeriodToggle={true}
            />
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InteractiveChart
                title="Lead Sources Distribution"
                data={sourceData}
                type="pie"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatsCard
                  title="Website Visitors"
                  value="12,847"
                  icon={Eye}
                  trend={{ value: 8, isPositive: true }}
                  description="unique visitors"
                />
                <StatsCard
                  title="Click-through Rate"
                  value="3.2%"
                  icon={MousePointer}
                  trend={{ value: 0.5, isPositive: true }}
                  description="email campaigns"
                />
                <StatsCard
                  title="Social Engagement"
                  value="847"
                  icon={UserPlus}
                  trend={{ value: 15, isPositive: true }}
                  description="new followers"
                />
                <StatsCard
                  title="Referral Traffic"
                  value="23%"
                  icon={Users}
                  trend={{ value: 5, isPositive: true }}
                  description="of total visits"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="funnel" className="space-y-6">
            {/* Conversion Funnel */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Conversion Funnel</CardTitle>
                <CardDescription>
                  Track how leads move through your sales process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                      <Users className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">12,847</div>
                      <div className="text-sm text-muted-foreground">Total Leads</div>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                      <Target className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">8,921</div>
                      <div className="text-sm text-muted-foreground">Qualified (69.4%)</div>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary-glow/20 border-2 border-primary-glow rounded-full flex items-center justify-center mx-auto">
                      <Mail className="w-8 h-8 text-primary-glow" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">5,847</div>
                      <div className="text-sm text-muted-foreground">Engaged (65.6%)</div>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-secondary-hover/20 border-2 border-secondary-hover rounded-full flex items-center justify-center mx-auto">
                      <TrendingUp className="w-8 h-8 text-secondary-hover" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">3,421</div>
                      <div className="text-sm text-muted-foreground">Opportunities (58.5%)</div>
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center mx-auto">
                      <Target className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">910</div>
                      <div className="text-sm text-muted-foreground">Customers (26.6%)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;