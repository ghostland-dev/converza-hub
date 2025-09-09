import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, 
  Search, 
  Filter, 
  Plus,
  Play,
  Pause,
  BarChart3,
  Users,
  TrendingUp,
  Calendar,
  Edit,
  Copy,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const Campaigns = () => {
  // Mock campaigns data
  const campaigns = [
    {
      id: 1,
      name: "Spring Product Launch",
      type: "Email",
      status: "Active",
      sent: 15420,
      delivered: 14891,
      opened: 4467,
      clicked: 892,
      converted: 134,
      revenue: "€67,400",
      startDate: "2024-01-10",
      endDate: "2024-02-28",
      progress: 75
    },
    {
      id: 2,
      name: "Lead Nurturing Sequence",
      type: "Email + SMS",
      status: "Active",
      sent: 8920,
      delivered: 8756,
      opened: 3502,
      clicked: 701,
      converted: 89,
      revenue: "€44,500",
      startDate: "2024-01-05",
      endDate: "2024-03-15",
      progress: 60
    },
    {
      id: 3,
      name: "Webinar Promotion",
      type: "Email",
      status: "Completed",
      sent: 5340,
      delivered: 5201,
      opened: 2080,
      clicked: 416,
      converted: 62,
      revenue: "€31,000",
      startDate: "2023-12-15",
      endDate: "2024-01-15",
      progress: 100
    },
    {
      id: 4,
      name: "Holiday Special Offer",
      type: "SMS",
      status: "Paused",
      sent: 2180,
      delivered: 2156,
      opened: 1294,
      clicked: 259,
      converted: 41,
      revenue: "€20,500",
      startDate: "2023-12-20",
      endDate: "2024-01-05",
      progress: 45
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500/10 text-green-500";
      case "Completed": return "bg-blue-500/10 text-blue-500";
      case "Paused": return "bg-yellow-500/10 text-yellow-500";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.includes("SMS")) return "📱";
    return "📧";
  };

  const calculateRate = (numerator: number, denominator: number) => {
    return denominator > 0 ? ((numerator / denominator) * 100).toFixed(1) : "0.0";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Mail className="w-8 h-8 mr-3 text-primary" />
              Campaign Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Create, manage, and track your marketing campaigns
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/campaigns/create">New Campaign</Link>
            </Button>
          </div>
        </div>

        {/* Campaign Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Campaigns</p>
                  <p className="text-3xl font-bold text-primary">12</p>
                </div>
                <Play className="w-8 h-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sent</p>
                  <p className="text-3xl font-bold text-secondary">847K</p>
                </div>
                <Mail className="w-8 h-8 text-secondary/50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Open Rate</p>
                  <p className="text-3xl font-bold text-primary-glow">31.2%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary-glow/50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue Generated</p>
                  <p className="text-3xl font-bold text-secondary-hover">€163K</p>
                </div>
                <BarChart3 className="w-8 h-8 text-secondary-hover/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search campaigns by name, type, or status..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Status: All
                </Button>
                <Button variant="outline" size="sm">
                  Type: All
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last 30 days
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns List */}
        <div className="space-y-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTypeIcon(campaign.type)}</span>
                      <div>
                        <CardTitle className="text-xl">{campaign.name}</CardTitle>
                        <CardDescription className="flex items-center space-x-4">
                          <span>{campaign.type}</span>
                          <span>•</span>
                          <span>{campaign.startDate} - {campaign.endDate}</span>
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Campaign Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                  {/* Sent */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">{campaign.sent.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Sent</div>
                  </div>
                  
                  {/* Delivered */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{campaign.delivered.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Delivered</div>
                    <div className="text-xs text-primary">{calculateRate(campaign.delivered, campaign.sent)}%</div>
                  </div>
                  
                  {/* Opened */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">{campaign.opened.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Opened</div>
                    <div className="text-xs text-secondary">{calculateRate(campaign.opened, campaign.delivered)}%</div>
                  </div>
                  
                  {/* Clicked */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-glow">{campaign.clicked.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Clicked</div>
                    <div className="text-xs text-primary-glow">{calculateRate(campaign.clicked, campaign.opened)}%</div>
                  </div>
                  
                  {/* Converted */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-hover">{campaign.converted}</div>
                    <div className="text-xs text-muted-foreground">Converted</div>
                    <div className="text-xs text-secondary-hover">{calculateRate(campaign.converted, campaign.clicked)}%</div>
                  </div>
                  
                  {/* Revenue */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{campaign.revenue}</div>
                    <div className="text-xs text-muted-foreground">Revenue</div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    {campaign.status === "Active" ? (
                      <Button variant="outline" size="sm">
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </Button>
                    ) : campaign.status === "Paused" ? (
                      <Button variant="hero" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Resume
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Campaign CTA */}
        <Card className="bg-gradient-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Plus className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to create your next campaign?</h3>
                <p className="text-muted-foreground">
                  Use our AI-powered campaign builder to create high-converting email and SMS sequences.
                </p>
              </div>
              <Button variant="hero" size="lg" asChild>
                <Link to="/campaigns/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Campaign
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;