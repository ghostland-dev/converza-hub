import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { SEOHead, createOrganizationSchema, createSoftwareApplicationSchema } from "@/components/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead
        title="LeadFlow - Professional Lead Management & Email Automation Platform"
        description="Transform your sales process with LeadFlow's powerful lead management, email automation, and analytics. Generate more qualified leads and close deals faster with our comprehensive CRM solution."
        keywords="lead management, CRM software, email automation, sales funnel, lead generation, B2B sales, marketing automation, customer relationship management"
        canonicalUrl={window.location.href}
        structuredData={[createOrganizationSchema(), createSoftwareApplicationSchema()]}
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <Hero />
          <Features />
          <Pricing />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
