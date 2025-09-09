import { Button } from "@/components/ui/button";
import { UserCircle, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="border-b border-border bg-gradient-card backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                LeadFlow
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors">
                Pricing
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <UserCircle className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/login">Start Free Trial</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;