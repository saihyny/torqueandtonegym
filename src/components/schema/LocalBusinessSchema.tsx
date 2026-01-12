import { useEffect } from 'react';

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string[];
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  priceRange?: string;
  image?: string[];
}

const LocalBusinessSchema = ({
  name = "TORQUE & TONE FITNESS",
  description = "Premium fitness center offering personal training, group classes, nutrition coaching, CrossFit training, yoga, and athletic performance programs. State-of-the-art equipment and certified trainers.",
  url = "https://torqueandtonefitness.com",
  telephone = ["+919989678960", "+919063678960", "+919000927424"],
  email = "torquetonefitness@gmail.com",
  address = {
    streetAddress: "7-61 sree venkata sai colony beside st'anthonys high school",
    addressLocality: "KOMPALLY",
    addressRegion: "Telangana",
    postalCode: "500014",
    addressCountry: "IN"
  },
  geo = {
    latitude: 17.5467183,
    longitude: 78.4899247
  },
  openingHours = [
    "Mo-Fr 05:00-23:00",
    "Sa-Su 06:00-22:00"
  ],
  priceRange = "₹₹",
  image = [
    "https://torqueandtonefitness.com/hero-bodybuilder.jpg",
    "https://torqueandtonefitness.com/gym-interior.jpg"
  ]
}: LocalBusinessSchemaProps) => {

  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${url}#business`,
      "name": name,
      "alternateName": "Torque & Tone Fitness",
      "additionalType": "https://schema.org/SportsActivityLocation",
      "description": description,
      "url": url,
      "telephone": telephone,
      "email": email,
      "image": image,
      "logo": `${url}/logo_transparent.png`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": address.streetAddress,
        "addressLocality": address.addressLocality,
        "addressRegion": address.addressRegion,
        "postalCode": address.postalCode,
        "addressCountry": address.addressCountry
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": geo.latitude,
        "longitude": geo.longitude
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "05:00",
          "closes": "23:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "06:00",
          "closes": "22:00"
        }
      ],
      "priceRange": priceRange,
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking",
      "hasMap": "https://www.google.com/maps/place/BARBELL+FITNESS+CLUB+(KOMPALLY)/@17.5467234,78.4873498,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb8500108407cf:0x7fa695ff96089354!8m2!3d17.5467183!4d78.4899247!16s%2Fg%2F11wfr6hkkr",
      "sameAs": [
        "https://www.facebook.com/torquetonefitness",
        "https://www.instagram.com/torquetonefitness",
        "https://twitter.com/torquetonefitness"
      ],
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Personal Training",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Group Classes",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Nutrition Coaching",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "CrossFit Training",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Yoga Classes",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Athletic Performance Training",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "State-of-the-art Equipment",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Certified Trainers",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Parking Available",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Air Conditioning",
          "value": true
        }
      ],
      "knowsAbout": [
        "Fitness Training",
        "Weight Loss",
        "Muscle Building",
        "Strength Training",
        "Cardio Training",
        "Nutrition Coaching",
        "CrossFit",
        "Yoga",
        "Athletic Performance",
        "Personal Training"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    // Remove existing schema if it exists
    const existingSchema = document.querySelector('script[data-schema="local-business"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Add new schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'local-business');
    script.textContent = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const schemaElement = document.querySelector('script[data-schema="local-business"]');
      if (schemaElement) {
        schemaElement.remove();
      }
    };
  }, [name, description, url, telephone, email, address, geo, openingHours, priceRange, image]);

  return null; // This component doesn't render anything
};

export default LocalBusinessSchema;
