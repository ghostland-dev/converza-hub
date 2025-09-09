import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Mail,
  Phone,
  ExternalLink,
  Star,
  MoreVertical
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Leads = () => {
  // Mock leads data
  const leads = [
    {
      id: 1,
      name: "Sophie Martin",
      email: "sophie.martin@techcorp.fr",
      phone: "+33 1 23 45 67 89",
      company: "TechCorp Solutions",
      position: "CTO",
      score: 95,
      status: "Hot",
      source: "LinkedIn",
      lastContact: "2024-01-15",
      tags: ["Enterprise", "AI Interest"],
      revenue: "€50,000"
    },
    {
      id: 2,
      name: "Marc Dubois",
      email: "m.dubois@startup.io",
      phone: "+33 1 98 76 54 32",
      company: "StartupIO",
      position: "Founder & CEO",
      score: 87,
      status: "Warm",
      source: "Website",
      lastContact: "2024-01-14",
      tags: ["Startup", "Growth"],
      revenue: "€15,000"
    },
    {
      id: 3,
      name: "Claire Rousseau",
      email: "claire@consulting.com",
      phone: "+33 1 11 22 33 44",
      company: "Consulting Plus",
      position: "Marketing Director",
      score: 92,
      status: "Hot",
      source: "Referral",
      lastContact: "2024-01-13",
      tags: ["Consulting", "Premium"],
      revenue: "€30,000"
    },
    {
      id: 4,
      name: "David Chen",
      email: "david@ecommerce.fr",
      phone: "+33 1 55 66 77 88",
      company: "E-Commerce Pro",
      position: "Growth Manager",
      score: 78,
      status: "Cold",
      source: "Google Ads",
      lastContact: "2024-01-12",
      tags: ["E-commerce", "Scale"],
      revenue: "€8,000"
    },
    {
      id: 5,
      name: "Emma Wilson",
      email: "emma.wilson@agency.co.uk",
      phone: "+44 20 1234 5678",
      company: "Digital Agency UK",
      position: "Account Manager",
      score: 83,
      status: "Warm",
      source: "Facebook Ads",
      lastContact: "2024-01-11",
      tags: ["Agency", "International"],
      revenue: "€20,000"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-secondary";
    if (score >= 70) return "text-primary-glow";
    return "text-muted-foreground";
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Hot": return "destructive";
      case "Warm": return "secondary";
      case "Cold": return "outline";
      default: return "outline";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Users className="w-8 h-8 mr-3 text-primary" />
              Lead Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your qualified prospects
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="hero" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search leads by name, email, company..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Status: All
                </Button>
                <Button variant="outline" size="sm">
                  Score: 70+
                </Button>
                <Button variant="outline" size="sm">
                  Source: All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="text-xl">All Leads</CardTitle>
            <CardDescription>
              {leads.length} leads found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="p-6 rounded-lg border border-border/50 bg-muted/10 hover:bg-muted/20 transition-colors">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Lead Info */}
                    <div className="lg:col-span-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-foreground font-medium">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{lead.name}</h3>
                            <p className="text-sm text-muted-foreground">{lead.position}</p>
                            <p className="text-sm font-medium">{lead.company}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {lead.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {lead.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {lead.phone}
                        </div>
                      </div>
                    </div>

                    {/* Lead Metrics */}
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </div>
                        <div className="text-xs text-muted-foreground">Lead Score</div>
                        <div className="flex justify-center mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(lead.score / 20) ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <Badge variant={getStatusVariant(lead.status)}>
                          {lead.status}
                        </Badge>
                      </div>

                      <div className="text-center">
                        <div className="text-sm font-medium">{lead.source}</div>
                        <div className="text-xs text-muted-foreground">Source</div>
                      </div>
                    </div>

                    {/* Actions & Revenue */}
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{lead.revenue}</div>
                        <div className="text-xs text-muted-foreground">Est. Revenue</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm">{lead.lastContact}</div>
                        <div className="text-xs text-muted-foreground">Last Contact</div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button variant="hero" size="sm" className="w-full">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Lead
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-muted-foreground">
                Showing 1-5 of 12,847 leads
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="hero" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Leads;