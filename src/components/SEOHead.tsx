import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "LeadFlow - Professional Lead Management Platform",
  description = "Transform your sales process with LeadFlow's powerful lead management, email automation, and analytics platform. Generate more leads and close more deals.",
  keywords = "lead management, CRM, email marketing, sales automation, lead generation, B2B sales",
  ogTitle,
  ogDescription,
  ogImage = "/og-image.jpg",
  canonicalUrl,
  structuredData,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'LeadFlow');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Open Graph tags
    updateMetaTag('og:title', ogTitle || title, 'property');
    updateMetaTag('og:description', ogDescription || description, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'LeadFlow', 'property');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', ogTitle || title, 'name');
    updateMetaTag('twitter:description', ogDescription || description, 'name');
    updateMetaTag('twitter:image', ogImage, 'name');
    
    // Canonical URL
    if (canonicalUrl) {
      updateLinkTag('canonical', canonicalUrl);
    }
    
    // Structured Data
    if (structuredData) {
      updateStructuredData(structuredData);
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, canonicalUrl, structuredData]);

  return null;
};

function updateMetaTag(name: string, content: string, attribute = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.content = content;
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  
  element.href = href;
}

function updateStructuredData(data: object) {
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Common structured data schemas
export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LeadFlow',
  description: 'Professional Lead Management Platform',
  url: window.location.origin,
  logo: `${window.location.origin}/logo.png`,
  sameAs: [
    'https://twitter.com/leadflow',
    'https://linkedin.com/company/leadflow',
  ],
});

export const createSoftwareApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LeadFlow',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  description: 'Professional lead management and email automation platform',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '49.00',
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
});