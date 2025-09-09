import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Search, 
  Filter, 
  Plus,
  Eye,
  Edit,
  Copy,
  Trash2,
  Star,
  Download,
  Upload
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const EmailTemplates = () => {
  // Mock templates data
  const templates = [
    {
      id: 1,
      name: "Welcome New Lead",
      category: "Welcome Series",
      subject: "Welcome to LeadFlow! Let's get started 🚀",
      preview: "Thank you for your interest in LeadFlow. Here's everything you need to know to get started with our platform...",
      usage: 1247,
      performance: 94,
      tags: ["Welcome", "Onboarding", "High-Convert"],
      lastUsed: "2024-01-15",
      favorite: true
    },
    {
      id: 2,
      name: "Product Demo Invitation",
      category: "Sales",
      subject: "Ready to see LeadFlow in action? Book your demo",
      preview: "Hi {{firstName}}, I noticed you've been exploring our features. Would you like to see a personalized demo of how LeadFlow can help your business grow?",
      usage: 892,
      performance: 87,
      tags: ["Demo", "Sales", "Personalized"],
      lastUsed: "2024-01-14",
      favorite: false
    },
    {
      id: 3,
      name: "Feature Announcement",
      category: "Product Updates",
      subject: "🎉 New AI-powered lead scoring is here!",
      preview: "We're excited to announce our new AI lead scoring feature that automatically qualifies your leads with 95% accuracy...",
      usage: 2341,
      performance: 91,
      tags: ["Features", "AI", "Updates"],
      lastUsed: "2024-01-13",
      favorite: true
    },
    {
      id: 4,
      name: "Free Trial Reminder",
      category: "Nurturing",
      subject: "Your trial expires in 3 days - don't lose your leads!",
      preview: "Hi {{firstName}}, your LeadFlow trial is ending soon. Don't lose access to your 500+ qualified leads and automation workflows...",
      usage: 567,
      performance: 76,
      tags: ["Trial", "Urgency", "Conversion"],
      lastUsed: "2024-01-12",
      favorite: false
    },
    {
      id: 5,
      name: "Webinar Registration",
      category: "Events",
      subject: "Reserve your spot: Advanced Lead Generation Strategies",
      preview: "Join our exclusive webinar where we'll share the exact strategies our top customers use to generate 500% more qualified leads...",
      usage: 1455,
      performance: 88,
      tags: ["Webinar", "Education", "Registration"],
      lastUsed: "2024-01-11",
      favorite: false
    },
    {
      id: 6,
      name: "Customer Success Story",
      category: "Social Proof",
      subject: "How TechCorp increased leads by 340% with LeadFlow",
      preview: "See how TechCorp transformed their lead generation process and achieved incredible results in just 90 days with LeadFlow...",
      usage: 789,
      performance: 85,
      tags: ["Case Study", "Success", "Social Proof"],
      lastUsed: "2024-01-10",
      favorite: true
    }
  ];

  const categories = [
    "All Templates",
    "Welcome Series",
    "Sales",
    "Nurturing",
    "Product Updates",
    "Events",
    "Social Proof"
  ];

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-green-500";
    if (performance >= 80) return "text-yellow-500";
    return "text-red-500";
  };

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 90) return "bg-green-500/10 text-green-500";
    if (performance >= 80) return "bg-yellow-500/10 text-yellow-500";
    return "bg-red-500/10 text-red-500";
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Mail className="w-8 h-8 mr-3 text-primary" />
              Email Templates
            </h1>
            <p className="text-muted-foreground mt-1">
              Create, manage, and optimize your email templates
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="hero" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Templates</p>
                  <p className="text-3xl font-bold text-primary">24</p>
                </div>
                <Mail className="w-8 h-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Open Rate</p>
                  <p className="text-3xl font-bold text-secondary">87.2%</p>
                </div>
                <Eye className="w-8 h-8 text-secondary/50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Most Used</p>
                  <p className="text-3xl font-bold text-primary-glow">2.3K</p>
                </div>
                <Star className="w-8 h-8 text-primary-glow/50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Performers</p>
                  <p className="text-3xl font-bold text-secondary-hover">18</p>
                </div>
                <Star className="w-8 h-8 text-secondary-hover/50" />
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
                  placeholder="Search templates by name, subject, or content..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "hero" : "outline"}
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-xl">{template.name}</CardTitle>
                      {template.favorite && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">{template.category}</Badge>
                      <span className={`text-sm px-2 py-1 rounded-full ${getPerformanceBadge(template.performance)}`}>
                        {template.performance}% performance
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="font-medium text-sm">Subject: {template.subject}</div>
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {template.preview}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
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
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {/* Usage Stats */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{template.usage.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Times Used</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getPerformanceColor(template.performance)}`}>
                      {template.performance}%
                    </div>
                    <div className="text-xs text-muted-foreground">Performance</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">{template.lastUsed}</div>
                    <div className="text-xs text-muted-foreground">Last Used</div>
                  </div>
                  
                  {/* Tags */}
                  <div className="md:col-span-2">
                    <div className="text-xs text-muted-foreground mb-2">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-border/50">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="hero" size="sm">
                      Use Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Template Builder CTA */}
        <Card className="bg-gradient-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Plus className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your First Template</h3>
                <p className="text-muted-foreground">
                  Use our drag-and-drop editor to create professional email templates that convert.
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <Button variant="hero" size="lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
                <Button variant="outline" size="lg">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EmailTemplates;