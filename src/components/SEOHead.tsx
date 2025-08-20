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
  title = "TORQUE & TONE FITNESS - Premium Gym & Personal Training in Kompally, Hyderabad",
  description = "Transform your body at TORQUE & TONE FITNESS in Kompally, Hyderabad. Premium gym with certified personal trainers, group fitness classes, nutrition coaching, CrossFit, yoga, and state-of-the-art equipment. Join India's fastest-growing fitness community today!",
  keywords = "gym Kompally, fitness center Hyderabad, personal training Kompally, group fitness classes, nutrition coaching, CrossFit Hyderabad, yoga classes, strength training, cardio workouts, weight loss programs, muscle building, fitness transformation, premium gym Telangana, best gym near me",
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
    
    // Enhanced SEO meta tags for better indexing
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('googlebot', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('bingbot', noindex ? 'noindex, nofollow' : 'index, follow');

    // Geographic and business meta tags
    updateMetaTag('geo.region', 'IN-TG');
    updateMetaTag('geo.placename', 'Kompally, Hyderabad');
    updateMetaTag('geo.position', '17.5467183;78.4899247');
    updateMetaTag('ICBM', '17.5467183, 78.4899247');

    // Business contact information
    updateMetaTag('business:contact_data:street_address', '7-61 sree venkata sai colony beside st\'anthonys high school');
    updateMetaTag('business:contact_data:locality', 'Kompally');
    updateMetaTag('business:contact_data:region', 'Telangana');
    updateMetaTag('business:contact_data:postal_code', '500014');
    updateMetaTag('business:contact_data:country_name', 'India');
    
    // Canonical URL
    updateLinkTag('canonical', canonical);
    
    // Enhanced Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', canonical, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:image:alt', `${title} - Premium gym facility in Kompally with modern equipment`, true);
    updateMetaTag('og:site_name', 'TORQUE & TONE FITNESS', true);
    updateMetaTag('og:locale', 'en_US', true);
    updateMetaTag('og:locale:alternate', 'hi_IN', true);

    // Business-specific Open Graph tags
    updateMetaTag('business:contact_data:street_address', '7-61 sree venkata sai colony beside st\'anthonys high school', true);
    updateMetaTag('business:contact_data:locality', 'Kompally', true);
    updateMetaTag('business:contact_data:region', 'Telangana', true);
    updateMetaTag('business:contact_data:postal_code', '500014', true);
    updateMetaTag('business:contact_data:country_name', 'India', true);
    updateMetaTag('business:contact_data:phone_number', '+919989678960', true);
    
    // Enhanced Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:image:alt', `${title} - Premium gym facility in Kompally with modern equipment`);
    updateMetaTag('twitter:site', '@TorqueToneFitness');
    updateMetaTag('twitter:creator', '@TorqueToneFitness');

    // Additional performance and mobile meta tags
    updateMetaTag('format-detection', 'telephone=yes');
    updateMetaTag('mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    
  }, [title, description, keywords, canonical, ogImage, ogType, noindex]);
  
  return null; // This component doesn't render anything
};

export default SEOHead;
