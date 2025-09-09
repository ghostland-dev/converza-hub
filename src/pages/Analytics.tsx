import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Mail, 
  Target,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Analytics = () => {
  // Mock analytics data
  const kpis = [
    {
      title: "Total Leads Generated",
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Lead Conversion Rate",
      value: "26.6%",
      change: "+3.1%",
      trend: "up",
      icon: Target,
      color: "text-secondary"
    },
    {
      title: "Email Open Rate",
      value: "31.2%",
      change: "-1.8%",
      trend: "down",
      icon: Mail,
      color: "text-primary-glow"
    },
    {
      title: "Customer Acquisition Cost",
      value: "€47",
      change: "-8.4%",
      trend: "up",
      icon: TrendingUp,
      color: "text-secondary-hover"
    }
  ];

  const leadSources = [
    { name: "LinkedIn", leads: 4250, percentage: 33.1, color: "bg-blue-500" },
    { name: "Website", leads: 3180, percentage: 24.8, color: "bg-primary" },
    { name: "Google Ads", leads: 2840, percentage: 22.1, color: "bg-green-500" },
    { name: "Referrals", leads: 1620, percentage: 12.6, color: "bg-secondary" },
    { name: "Facebook", leads: 957, percentage: 7.4, color: "bg-purple-500" }
  ];

  const monthlyData = [
    { month: "Oct", leads: 8420, conversions: 2104, revenue: 45200 },
    { month: "Nov", leads: 9250, conversions: 2315, revenue: 52100 },
    { month: "Dec", leads: 11200, conversions: 2800, revenue: 63400 },
    { month: "Jan", leads: 12847, conversions: 3421, revenue: 78200 }
  ];

  const campaignPerformance = [
    { name: "Spring Launch", sent: 15420, opened: 4467, clicked: 892, converted: 134, roi: 340 },
    { name: "Lead Nurturing", sent: 8920, opened: 3502, clicked: 701, converted: 89, roi: 280 },
    { name: "Webinar Promo", sent: 5340, opened: 2080, clicked: 416, converted: 62, roi: 220 },
    { name: "Holiday Offer", sent: 2180, opened: 1294, clicked: 259, converted: 41, roi: 190 }
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
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
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

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{kpi.value}</div>
                <div className="flex items-center text-sm">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1 text-red-500" />
                  )}
                  <span className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {kpi.change}
                  </span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lead Sources */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Lead Sources</CardTitle>
              <CardDescription>
                Where your leads are coming from this month
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {leadSources.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                      <span className="font-medium">{source.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{source.leads.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{source.percentage}%</div>
                    </div>
                  </div>
                  <Progress value={source.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Monthly Performance</CardTitle>
                <CardDescription>
                  Lead generation and conversion trends over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-4 rounded-lg bg-muted/20">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Month</div>
                        <div className="text-lg font-bold">{data.month}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Leads</div>
                        <div className="text-lg font-bold text-primary">{data.leads.toLocaleString()}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Conversions</div>
                        <div className="text-lg font-bold text-secondary">{data.conversions.toLocaleString()}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Revenue</div>
                        <div className="text-lg font-bold text-primary-glow">€{data.revenue.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campaign Performance */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">Campaign Performance</CardTitle>
            <CardDescription>
              Detailed metrics for your active and recent campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Campaign</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Sent</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Opened</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Clicked</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Converted</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignPerformance.map((campaign, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/10">
                      <td className="py-4 px-4">
                        <div className="font-medium">{campaign.name}</div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="font-semibold">{campaign.sent.toLocaleString()}</div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="font-semibold text-primary">{campaign.opened.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="font-semibold text-secondary">{campaign.clicked.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {((campaign.clicked / campaign.opened) * 100).toFixed(1)}%
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="font-semibold text-primary-glow">{campaign.converted}</div>
                        <div className="text-xs text-muted-foreground">
                          {((campaign.converted / campaign.clicked) * 100).toFixed(1)}%
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="font-semibold text-secondary-hover">{campaign.roi}%</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

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
      </div>
    </DashboardLayout>
  );
};

export default Analytics;