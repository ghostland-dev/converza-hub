import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bot, 
  Target, 
  Users, 
  TrendingUp, 
  Mail, 
  Brain, 
  Zap, 
  Shield,
  BarChart3
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Target,
      title: "Lead Acquisition",
      description: "Capture leads from multiple channels with intelligent forms, pop-ups, and social media integration.",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: Brain,
      title: "AI Qualification",
      description: "Automatically score and qualify leads using machine learning algorithms and behavioral analysis.",
      gradient: "from-secondary to-secondary-hover"
    },
    {
      icon: Zap,
      title: "Automation Workflows",
      description: "Create complex nurturing sequences with drag-and-drop workflow builder for maximum efficiency.",
      gradient: "from-primary-glow to-secondary"
    },
    {
      icon: Mail,
      title: "Multi-Channel Campaigns",
      description: "Orchestrate email, SMS, and social media campaigns from a single unified platform.",
      gradient: "from-secondary-hover to-primary"
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Get insights into lead behavior and conversion probabilities with AI-powered analytics.",
      gradient: "from-primary to-secondary-hover"
    },
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "Built-in compliance features ensure your lead generation meets all privacy regulations.",
      gradient: "from-secondary to-primary-glow"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            <Bot className="w-3 h-3 mr-1" />
            AI-Powered Platform
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="bg-gradient-primary bg-clip-text text-transparent block">
              Scale Your Business
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From lead acquisition to customer retention, our comprehensive suite of tools 
            empowers your team to achieve unprecedented growth.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden border-border/50 bg-gradient-card hover:shadow-glow transition-all duration-300 group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">500%</div>
            <div className="text-sm text-muted-foreground">Average Lead Increase</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-glow mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Automation Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary-hover mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;