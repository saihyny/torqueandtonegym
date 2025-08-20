import { useEffect } from 'react';

interface ServiceData {
  name: string;
  description: string;
  serviceType: string;
  provider: string;
  areaServed: string;
  availableChannel: string;
  category: string;
  offers?: {
    price?: string;
    priceCurrency: string;
    availability: string;
    validFrom?: string;
  };
  additionalProperty?: Array<{
    name: string;
    value: string;
  }>;
}

interface ServiceSchemaProps {
  services?: ServiceData[];
}

const ServiceSchema = ({ services }: ServiceSchemaProps) => {
  const defaultServices: ServiceData[] = [
    {
      name: "Personal Training",
      description: "One-on-one sessions with certified trainers tailored to your specific goals and fitness level. Personalized workout plans, proper form coaching, and consistent motivation.",
      serviceType: "FitnessService",
      provider: "TORQUE & TONE FITNESS",
      areaServed: "Kompally, Hyderabad, Telangana, India",
      availableChannel: "InPerson",
      category: "Personal Training",
      offers: {
        price: "5000",
        priceCurrency: "INR",
        availability: "InStock",
        validFrom: "2025-01-01"
      },
      additionalProperty: [
        { name: "Duration", value: "60 minutes per session" },
        { name: "Frequency", value: "2-4 sessions per week" },
        { name: "Trainer Certification", value: "NASM, ACE Certified" },
        { name: "Equipment Included", value: "All gym equipment access" }
      ]
    },
    {
      name: "Group Classes",
      description: "High-energy group workouts that motivate and challenge you alongside fellow fitness enthusiasts. Variety of classes including HIIT, strength training, and cardio.",
      serviceType: "FitnessService",
      provider: "TORQUE & TONE FITNESS",
      areaServed: "Kompally, Hyderabad, Telangana, India",
      availableChannel: "InPerson",
      category: "Group Fitness",
      offers: {
        price: "3500",
        priceCurrency: "INR",
        availability: "InStock",
        validFrom: "2025-01-01"
      },
      additionalProperty: [
        { name: "Class Duration", value: "45-60 minutes" },
        { name: "Class Size", value: "8-15 participants" },
        { name: "Skill Level", value: "All levels welcome" },
        { name: "Classes Per Week", value: "20+ classes available" }
      ]
    },
    {
      name: "Nutrition Coaching",
      description: "Expert nutrition guidance to fuel your workouts and optimize your body composition. Custom meal planning and dietary consultation.",
      serviceType: "NutritionService",
      provider: "TORQUE & TONE FITNESS",
      areaServed: "Kompally, Hyderabad, Telangana, India",
      availableChannel: "InPerson",
      category: "Nutrition Counseling",
      offers: {
        price: "4000",
        priceCurrency: "INR",
        availability: "InStock",
        validFrom: "2025-01-01"
      },
      additionalProperty: [
        { name: "Consultation Duration", value: "60 minutes" },
        { name: "Meal Plan Duration", value: "Monthly plans" },
        { name: "Follow-up Sessions", value: "Weekly check-ins" },
        { name: "Nutritionist Qualification", value: "Certified Sports Nutritionist" }
      ]
    },
    {
      name: "CrossFit Training",
      description: "Intense functional fitness workouts that build strength, endurance, and mental toughness. Combining weightlifting, gymnastics, and metabolic conditioning.",
      serviceType: "FitnessService",
      provider: "TORQUE & TONE FITNESS",
      areaServed: "Kompally, Hyderabad, Telangana, India",
      availableChannel: "InPerson",
      category: "CrossFit",
      offers: {
        price: "4500",
        priceCurrency: "INR",
        availability: "InStock",
        validFrom: "2025-01-01"
      },
      additionalProperty: [
        { name: "Workout Duration", value: "60 minutes" },
        { name: "Class Size", value: "6-12 participants" },
        { name: "Equipment", value: "Olympic barbells, kettlebells, pull-up bars" },
        { name: "Skill Progression", value: "Beginner to advanced levels" }
      ]
    },
    {
      name: "Yoga & Flexibility",
      description: "Improve mobility, balance, and mental wellness through guided yoga and stretching sessions. Stress reduction and injury prevention focus.",
      serviceType: "FitnessService",
      provider: "TORQUE & TONE FITNESS",
      areaServed: "Kompally, Hyderabad, Telangana, India",
      availableChannel: "InPerson",
      category: "Yoga",
      offers: {
        price: "3000",
        priceCurrency: "INR",
        availability: "InStock",
        validFrom: "2025-01-01"
      },
      additionalProperty: [
        { name: "Session Duration", value: "60-75 minutes" },
        { name: "Yoga Style", value: "Hatha, Vinyasa, Restorative" },
        { name: "Class Size", value: "8-15 participants" },
        { name: "Instructor Certification", value: "200-hour RYT Certified" }
      ]
    },
    {
      name: "Athletic Performance",
      description: "Sport-specific training programs designed to enhance athletic performance and prevent injuries. Speed, agility, and power development.",
      serviceType: "FitnessService",
      provider: "TORQUE & TONE FITNESS",
      areaServed: "Kompally, Hyderabad, Telangana, India",
      availableChannel: "InPerson",
      category: "Athletic Training",
      offers: {
        price: "6000",
        priceCurrency: "INR",
        availability: "InStock",
        validFrom: "2025-01-01"
      },
      additionalProperty: [
        { name: "Training Duration", value: "90 minutes per session" },
        { name: "Sports Focus", value: "Cricket, Football, Basketball, Tennis" },
        { name: "Performance Testing", value: "Monthly assessments" },
        { name: "Trainer Background", value: "Former professional athletes" }
      ]
    }
  ];

  const servicesToUse = services || defaultServices;

  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "TORQUE & TONE FITNESS Services",
      "description": "Comprehensive fitness services offered by TORQUE & TONE FITNESS",
      "itemListElement": servicesToUse.map((service, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Service",
          "@id": `https://torqueandtonefitness.com/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`,
          "name": service.name,
          "description": service.description,
          "serviceType": service.serviceType,
          "provider": {
            "@type": "LocalBusiness",
            "@id": "https://torqueandtonefitness.com#business",
            "name": service.provider,
            "url": "https://torqueandtonefitness.com",
            "additionalType": "https://schema.org/SportsActivityLocation"
          },
          "areaServed": {
            "@type": "Place",
            "name": service.areaServed
          },
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceType": service.availableChannel
          },
          "category": service.category,
          "offers": service.offers ? {
            "@type": "Offer",
            "price": service.offers.price,
            "priceCurrency": service.offers.priceCurrency,
            "availability": `https://schema.org/${service.offers.availability}`,
            "validFrom": service.offers.validFrom,
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": service.offers.price,
              "priceCurrency": service.offers.priceCurrency,
              "billingDuration": "P1M"
            }
          } : undefined,
          "additionalProperty": service.additionalProperty?.map(prop => ({
            "@type": "PropertyValue",
            "name": prop.name,
            "value": prop.value
          })),
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": `${service.name} Programs`,
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.name
                }
              }
            ]
          }
        }
      }))
    };

    // Remove existing schema if it exists
    const existingSchema = document.querySelector('script[data-schema="services"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Add new schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'services');
    script.textContent = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const schemaElement = document.querySelector('script[data-schema="services"]');
      if (schemaElement) {
        schemaElement.remove();
      }
    };
  }, [servicesToUse]);

  return null; // This component doesn't render anything
};

export default ServiceSchema;
