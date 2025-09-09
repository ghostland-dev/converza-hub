import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Star, Users, TrendingUp, Target } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              <Star className="w-3 h-3 mr-1 fill-current" />
              #1 Lead Generation Platform
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Generate & Convert
                <span className="bg-gradient-primary bg-clip-text text-transparent block">
                  High-Quality Leads
                </span>
                with AI Precision
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Transform your business with our all-in-one SaaS platform. Automate lead acquisition, 
                qualification, and conversion with intelligent AI-powered workflows.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500%</div>
                <div className="text-sm text-muted-foreground">Lead Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">95%</div>
                <div className="text-sm text-muted-foreground">Automation Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-glow">24h</div>
                <div className="text-sm text-muted-foreground">Setup Time</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group">
                Start Free 14-Day Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="group">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                10,000+ companies
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                $50M+ revenue generated
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-card bg-gradient-card p-1">
              <img
                src={heroImage}
                alt="LeadFlow Dashboard Analytics"
                className="w-full h-auto rounded-xl shadow-elegant"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-card border border-border rounded-lg p-3 shadow-glow">
                <Target className="w-5 h-5 text-primary mb-1" />
                <div className="text-xs text-muted-foreground">Lead Score</div>
                <div className="text-lg font-bold text-primary">98%</div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-glow">
                <TrendingUp className="w-5 h-5 text-secondary mb-1" />
                <div className="text-xs text-muted-foreground">Conversion</div>
                <div className="text-lg font-bold text-secondary">+245%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;