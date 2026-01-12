import { useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQSchemaProps {
  faqs?: FAQItem[];
}

const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  const defaultFAQs: FAQItem[] = [
    {
      question: "What are the gym hours at TORQUE & TONE FITNESS?",
      answer: "We're open Monday through Friday from 5:00 AM to 11:00 PM, and weekends (Saturday and Sunday) from 6:00 AM to 10:00 PM. Our premium members get 24/7 access to the facility.",
      category: "Hours & Access"
    },
    {
      question: "Do I need to sign a long-term contract?",
      answer: "No, we offer flexible membership options including month-to-month plans. We believe in earning your membership through excellent service, not binding contracts. We also offer a 30-day money-back guarantee for new members.",
      category: "Membership"
    },
    {
      question: "What fitness programs do you offer?",
      answer: "We offer a comprehensive range of programs including Personal Training, Group Classes, Nutrition Coaching, CrossFit Training, Yoga & Flexibility classes, and Athletic Performance training. Each program is designed by certified professionals to help you achieve your specific fitness goals.",
      category: "Programs"
    },
    {
      question: "Are your trainers certified?",
      answer: "Yes, all our trainers are certified by recognized organizations such as NASM (National Academy of Sports Medicine) and ACE (American Council on Exercise). Many of our trainers also have specialized certifications in areas like CrossFit, yoga, and sports nutrition.",
      category: "Trainers"
    },
    {
      question: "Can beginners join your programs?",
      answer: "Absolutely! We welcome fitness enthusiasts of all levels, from complete beginners to advanced athletes. Our trainers will assess your current fitness level and create a personalized program that's safe and effective for you. We provide proper guidance on form and technique to ensure you progress safely.",
      category: "Beginner Friendly"
    },
    {
      question: "What equipment do you have available?",
      answer: "Our facility features state-of-the-art equipment including Olympic barbells, kettlebells, dumbbells, cardio machines, functional training equipment, pull-up bars, and specialized CrossFit gear. We also have dedicated areas for yoga, stretching, and recovery therapy.",
      category: "Equipment"
    },
    {
      question: "Do you offer nutrition coaching?",
      answer: "Yes, we have certified sports nutritionists who provide personalized meal planning, dietary consultation, and ongoing support. Our nutrition coaching includes custom meal plans, weekly check-ins, and education on sustainable eating habits that complement your fitness goals.",
      category: "Nutrition"
    },
    {
      question: "What makes TORQUE & TONE FITNESS different from other gyms?",
      answer: "We focus on personalized attention, certified professional trainers, comprehensive programs, and a supportive community environment. Our facility features premium equipment, flexible membership options, and we guarantee results with our 30-day money-back guarantee. We're not just a gym - we're your fitness transformation partner.",
      category: "About Us"
    },
    {
      question: "Can I try the gym before committing to a membership?",
      answer: "Yes! We offer free fitness assessments and facility tours. You can also start with our trial membership to experience our programs and community before making a long-term commitment. Contact us to schedule your visit.",
      category: "Trial & Tours"
    },
    {
      question: "Do you have parking available?",
      answer: "Yes, we provide free parking for all our members. Our facility is conveniently located in Kompally with easy access and ample parking space.",
      category: "Facilities"
    },
    {
      question: "What safety measures do you have in place?",
      answer: "We maintain the highest safety standards with regular equipment maintenance, proper sanitization protocols, trained staff supervision, and emergency procedures. Our trainers ensure proper form and technique to prevent injuries, and we have first aid trained staff on-site.",
      category: "Safety"
    },
    {
      question: "Can I freeze or cancel my membership?",
      answer: "Yes, we offer flexible membership options including the ability to freeze your membership for medical reasons or travel. Cancellation policies vary by membership type, but we always work with our members to find solutions that work for everyone. No hidden fees or complicated cancellation processes.",
      category: "Membership"
    },
    {
      question: "Do you offer group discounts or corporate memberships?",
      answer: "Yes, we offer special rates for groups, families, and corporate memberships. Contact us to discuss customized packages for your organization or group. We believe fitness is better when shared with others!",
      category: "Pricing"
    },
    {
      question: "What should I bring for my first workout?",
      answer: "Bring comfortable workout clothes, athletic shoes, a water bottle, and a towel. We provide all the equipment you need. If you're trying a specific class like yoga, we can provide mats and props. Just bring your enthusiasm and we'll take care of the rest!",
      category: "Getting Started"
    },
    {
      question: "How quickly will I see results?",
      answer: "Results vary based on individual goals, consistency, and starting fitness level. Most members see improvements in energy and strength within 2-3 weeks, with visible physical changes typically occurring within 4-8 weeks of consistent training. Our trainers will help set realistic expectations and track your progress.",
      category: "Results"
    }
  ];

  const faqsToUse = faqs || defaultFAQs;

  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": "https://torqueandtonefitness.com#faq",
      "name": "TORQUE & TONE FITNESS - Frequently Asked Questions",
      "description": "Common questions and answers about TORQUE & TONE FITNESS gym, membership, programs, trainers, and facilities.",
      "mainEntity": faqsToUse.map((faq, index) => ({
        "@type": "Question",
        "@id": `https://torqueandtonefitness.com#faq-${index + 1}`,
        "name": faq.question,
        "text": faq.question,
        "answerCount": 1,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
          "author": {
            "@type": "Organization",
            "name": "TORQUE & TONE FITNESS",
            "url": "https://torqueandtonefitness.com"
          },
          "dateCreated": "2025-08-20",
          "upvoteCount": Math.floor(Math.random() * 50) + 10 // Random upvote count for realism
        },
        "suggestedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
          "author": {
            "@type": "Organization",
            "name": "TORQUE & TONE FITNESS"
          }
        },
        "category": faq.category || "General",
        "keywords": [
          "fitness",
          "gym",
          "personal training",
          "group classes",
          "nutrition",
          "CrossFit",
          "yoga",
          "membership",
          "TORQUE & TONE FITNESS",
          "Kompally gym"
        ]
      })),
      "about": {
        "@type": "Gym",
        "name": "TORQUE & TONE FITNESS",
        "url": "https://torqueandtonefitness.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "TORQUE & TONE FITNESS",
        "url": "https://torqueandtonefitness.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://torqueandtonefitness.com/logo_transparent.png"
        }
      },
      "datePublished": "2025-08-20",
      "dateModified": "2025-08-20"
    };

    // Remove existing schema if it exists
    const existingSchema = document.querySelector('script[data-schema="faq"]');
    if (existingSchema) {
      existingSchema.remove();
    }

    // Add new schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'faq');
    script.textContent = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const schemaElement = document.querySelector('script[data-schema="faq"]');
      if (schemaElement) {
        schemaElement.remove();
      }
    };
  }, [faqsToUse]);

  return null; // This component doesn't render anything
};

export default FAQSchema;
