import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

const SEOHead = ({
  title = "TORQUE & TONE FITNESS - Premium Gym & Personal Training",
  description = "Transform your body at TORQUE & TONE FITNESS. Premium gym with personal training, group classes, nutrition coaching, and state-of-the-art equipment.",
  keywords = "gym, fitness, personal training, group classes, nutrition coaching, CrossFit, yoga, strength training, cardio, weight loss, muscle building",
  canonical = "https://torqueandtonefitness.com/",
  ogImage = "https://torqueandtonefitness.com/hero-bodybuilder.jpg",
  ogType = "website",
  noindex = false
}: SEOHeadProps) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };
    
    // Basic SEO meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    
    // Canonical URL
    updateLinkTag('canonical', canonical);
    
    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', canonical, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', `${title} - TORQUE & TONE FITNESS`, true);
    updateMetaTag('og:site_name', 'TORQUE & TONE FITNESS', true);
    updateMetaTag('og:locale', 'en_US', true);
    
    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:image:alt', `${title} - TORQUE & TONE FITNESS`);
    
  }, [title, description, keywords, canonical, ogImage, ogType, noindex]);
  
  return null; // This component doesn't render anything
};

export default SEOHead;
