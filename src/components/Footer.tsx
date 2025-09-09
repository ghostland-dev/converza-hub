import { Button } from "@/components/ui/button";
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Mail,
  MapPin,
  Phone
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                LeadFlow
              </span>
            </div>
            
            <p className="text-muted-foreground max-w-sm">
              The all-in-one SaaS platform for lead generation, qualification, and customer retention 
              powered by artificial intelligence.
            </p>
            
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-semibold mb-6">Product</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold mb-6">Resources</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Webinars</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-semibold mb-6">Contact</h4>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-primary" />
                <span>hello@leadflow.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-primary" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-primary mt-1" />
                <div>
                  <div>123 Business Avenue</div>
                  <div>75001 Paris, France</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 LeadFlow. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;