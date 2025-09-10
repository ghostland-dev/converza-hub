import React, { useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { measurePageLoad, preloadCriticalResources } from '@/utils/performance';
import { SEOHead } from '@/components/SEOHead';
import { StatsCard } from '@/components/StatsCard';
import { InteractiveChart } from '@/components/InteractiveChart';
import { ActivityFeed } from '@/components/ActivityFeed';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Mail, 
  TrendingUp, 
  Target,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  DollarSign,
  Activity,
  Plus,
  Filter,
  Download,
  Search,
  Bell,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  // Initialize performance monitoring
  useEffect(() => {
    measurePageLoad();
    preloadCriticalResources();
  }, []);
  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 700 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 1200 },
  ];

  const conversionData = [
    { name: 'Website', value: 35 },
    { name: 'LinkedIn', value: 25 },
    { name: 'Referrals', value: 20 },
    { name: 'Events', value: 15 },
    { name: 'Cold Email', value: 5 },
  ];

  const recentLeads = [
    {
      name: "Sophie Martin",
      email: "sophie.martin@techcorp.fr",
      company: "TechCorp",
      score: 95,
      source: "LinkedIn",
      status: "Hot"
    },
    {
      name: "Marc Dubois",
      email: "m.dubois@startup.io",
      company: "StartupIO",
      score: 87,
      source: "Website",
      status: "Warm"
    },
    {
      name: "Claire Rousseau",
      email: "claire@consulting.com",
      company: "Consulting Plus",
      score: 92,
      source: "Referral",
      status: "Hot"
    },
    {
      name: "David Chen",
      email: "david@ecommerce.fr",
      company: "E-Commerce Pro",
      score: 78,
      source: "Google Ads",
      status: "Cold"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-secondary";
    if (score >= 70) return "text-primary-glow";
    return "text-muted-foreground";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot": return "bg-red-500/10 text-red-500";
      case "Warm": return "bg-yellow-500/10 text-yellow-500";
      case "Cold": return "bg-blue-500/10 text-blue-500";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <>
      <SEOHead
        title="Dashboard | LeadFlow - Lead Management Platform"
        description="Manage your leads, campaigns, and analytics from your LeadFlow dashboard. Track performance, view lead insights, and optimize your sales process."
        canonicalUrl={`${window.location.origin}/dashboard`}
      />
      <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's what's happening with your leads today.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/campaigns/create">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Leads"
            value="2,847"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            description="vs last month"
          />
          <StatsCard
            title="Conversion Rate"
            value="23.8%"
            icon={TrendingUp}
            trend={{ value: 4.2, isPositive: true }}
            description="leads to customers"
          />
          <StatsCard
            title="Active Campaigns"
            value="12"
            icon={Mail}
            trend={{ value: 2, isPositive: true }}
            description="running campaigns"
          />
          <StatsCard
            title="Revenue Generated"
            value="$184k"
            icon={DollarSign}
            trend={{ value: 18, isPositive: true }}
            description="this quarter"
          />
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InteractiveChart
            title="Lead Generation Trend"
            data={chartData}
            type="line"
            color="#3b82f6"
            showPeriodToggle={true}
          />
          
          <InteractiveChart
            title="Lead Sources Distribution"
            data={conversionData}
            type="pie"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Recent Leads */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Recent Leads</CardTitle>
                    <CardDescription>
                      Your latest high-scoring prospects
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLeads.map((lead, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-medium text-sm">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-sm text-muted-foreground">{lead.email}</div>
                          <div className="text-xs text-muted-foreground">{lead.company}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className={`text-sm font-medium ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm">{lead.source}</div>
                          <div className="text-xs text-muted-foreground">Source</div>
                        </div>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View All Leads
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Lead Progress */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Monthly Goal</CardTitle>
                <CardDescription>
                  Lead generation progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Leads Generated</span>
                    <span>3,421 / 5,000</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Conversion Rate</span>
                    <span>26.6%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div className="text-center pt-4">
                  <div className="text-2xl font-bold text-primary">68%</div>
                  <div className="text-sm text-muted-foreground">of monthly goal</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Import Leads
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/templates">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Templates
                </Link>
              </Button>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div>
            <ActivityFeed limit={8} />
          </div>
        </div>
      </div>
    </DashboardLayout>
    </>
  );
};

export default Dashboard;