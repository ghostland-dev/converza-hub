import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Crown } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "99",
      description: "Perfect for small businesses starting their lead generation journey",
      icon: Zap,
      gradient: "from-muted to-muted/50",
      buttonVariant: "outline" as const,
      popular: false,
      features: [
        "1,000 leads/month",
        "5,000 emails/month",
        "2 team members",
        "Basic integrations",
        "Email support",
        "Lead scoring",
        "Basic analytics"
      ]
    },
    {
      name: "Professional",
      price: "299",
      description: "Ideal for growing businesses that need advanced automation",
      icon: Star,
      gradient: "from-primary/20 to-primary/5",
      buttonVariant: "hero" as const,
      popular: true,
      features: [
        "5,000 leads/month",
        "20,000 emails/month",
        "10 team members",
        "All integrations",
        "Priority support",
        "AI lead scoring",
        "Advanced analytics",
        "A/B testing",
        "Custom workflows"
      ]
    },
    {
      name: "Enterprise",
      price: "999",
      description: "For large organizations requiring unlimited scale and customization",
      icon: Crown,
      gradient: "from-secondary/20 to-secondary/5",
      buttonVariant: "success" as const,
      popular: false,
      features: [
        "Unlimited leads",
        "Unlimited emails",
        "Unlimited team members",
        "Custom integrations",
        "Dedicated success manager",
        "Advanced AI features",
        "Custom analytics",
        "White-label options",
        "API access",
        "SLA guarantee"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20 mb-6">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Simple Pricing
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Choose Your
            <span className="bg-gradient-secondary bg-clip-text text-transparent block">
              Growth Plan
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free for 14 days. No credit card required. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden border-border/50 bg-gradient-to-br ${plan.gradient} hover:shadow-glow transition-all duration-300 group ${
                plan.popular ? 'ring-2 ring-primary/20 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-primary-foreground text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={plan.popular ? 'pt-12' : ''}>
                <div className="flex items-center justify-between mb-4">
                  <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                  {plan.popular && <Star className="w-5 h-5 text-primary fill-current" />}
                </div>
                
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                
                <div className="flex items-baseline mt-6">
                  <span className="text-4xl font-bold">€{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Button 
                  variant={plan.buttonVariant} 
                  size="lg" 
                  className="w-full"
                >
                  Start Free Trial
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Need a custom solution? We'd love to help.
          </p>
          <Button variant="outline" size="lg">
            Contact Sales Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;