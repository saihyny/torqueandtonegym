import { useEffect } from 'react';

interface ReviewData {
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
  reviewAspect?: string;
  itemReviewed?: string;
}

interface ReviewSchemaProps {
  reviews?: ReviewData[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
}

const ReviewSchema = ({ reviews, aggregateRating }: ReviewSchemaProps) => {
  const defaultReviews: ReviewData[] = [
    {
      author: "Sarah Johnson",
      reviewBody: "TORQUE & TONE FITNESS completely transformed my life! I lost 40 lbs in 6 months with their amazing personal training program. The trainers are incredibly knowledgeable and supportive. The facility is top-notch with state-of-the-art equipment. I couldn't be happier with my results!",
      ratingValue: 5,
      datePublished: "2024-12-15",
      reviewAspect: "Personal Training",
      itemReviewed: "TORQUE & TONE FITNESS"
    },
    {
      author: "Mike Rodriguez",
      reviewBody: "Gained 25 lbs of pure muscle through their strength training program. The CrossFit classes are intense but incredibly effective. The community here is amazing - everyone supports each other. Best gym investment I've ever made!",
      ratingValue: 5,
      datePublished: "2024-11-28",
      reviewAspect: "CrossFit Training",
      itemReviewed: "TORQUE & TONE FITNESS"
    },
    {
      author: "Emily Chen",
      reviewBody: "After my injury, I thought I'd never get back to full fitness. The yoga and flexibility programs here helped me not only recover but become stronger and more flexible than ever before. The instructors are certified professionals who really care about your progress.",
      ratingValue: 5,
      datePublished: "2024-10-20",
      reviewAspect: "Yoga & Flexibility",
      itemReviewed: "TORQUE & TONE FITNESS"
    },
    {
      author: "David Kumar",
      reviewBody: "The nutrition coaching program changed my entire relationship with food. Lost 30 lbs and gained so much energy. The meal plans are practical and delicious. Highly recommend to anyone serious about their health goals.",
      ratingValue: 5,
      datePublished: "2024-09-10",
      reviewAspect: "Nutrition Coaching",
      itemReviewed: "TORQUE & TONE FITNESS"
    },
    {
      author: "Priya Sharma",
      reviewBody: "Group classes are so motivating! The energy is infectious and the workouts are challenging but fun. I've made great friends here and achieved fitness goals I never thought possible. The trainers push you to be your best.",
      ratingValue: 5,
      datePublished: "2024-08-25",
      reviewAspect: "Group Classes",
      itemReviewed: "TORQUE & TONE FITNESS"
    },
    {
      author: "Raj Patel",
      reviewBody: "Athletic performance training here took my cricket game to the next level. The sport-specific drills and strength conditioning are exactly what I needed. Improved my speed and agility significantly.",
      ratingValue: 5,
      datePublished: "2024-07-18",
      reviewAspect: "Athletic Performance",
      itemReviewed: "TORQUE & TONE FITNESS"
    },
    {
      author: "Anita Reddy",
      reviewBody: "Clean facilities, professional staff, and excellent equipment. The 24/7 access is perfect for my schedule. Great value for money compared to other gyms in the area.",
      ratingValue: 4,
      datePublished: "2024-06-30",
      reviewAspect: "Facilities",
      itemReviewed: "TORQUE & TONE FITNESS"
    },
    {
      author: "Vikram Singh",
      reviewBody: "Been a member for 2 years now. Consistently excellent service and results. The variety of programs keeps workouts interesting. Staff is always helpful and knowledgeable.",
      ratingValue: 5,
      datePublished: "2024-05-15",
      reviewAspect: "Overall Experience",
      itemReviewed: "TORQUE & TONE FITNESS"
    }
  ];

  const defaultAggregateRating = {
    ratingValue: 4.8,
    reviewCount: 150,
    bestRating: 5,
    worstRating: 1
  };

  const reviewsToUse = reviews || defaultReviews;
  const aggregateToUse = aggregateRating || defaultAggregateRating;

  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "TORQUE & TONE FITNESS Reviews",
      "description": "Customer reviews and testimonials for TORQUE & TONE FITNESS",
      "itemListElement": [
        // Individual Reviews
        ...reviewsToUse.map((review, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Review",
            "@id": `https://torqueandtonefitness.com/reviews/${review.author.toLowerCase().replace(/\s+/g, '-')}`,
            "author": {
              "@type": "Person",
              "name": review.author
            },
            "reviewBody": review.reviewBody,
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": review.ratingValue,
              "bestRating": 5,
              "worstRating": 1
            },
            "datePublished": review.datePublished,
            "reviewAspect": review.reviewAspect,
            "itemReviewed": {
              "@type": "Gym",
              "name": review.itemReviewed || "TORQUE & TONE FITNESS",
              "url": "https://torqueandtonefitness.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "TORQUE & TONE FITNESS"
            }
          }
        })),
        // Aggregate Rating
        {
          "@type": "ListItem",
          "position": reviewsToUse.length + 1,
          "item": {
            "@type": "AggregateRating",
            "@id": "https://torqueandtonefitness.com#aggregate-rating",
            "itemReviewed": {
              "@type": "Gym",
              "name": "TORQUE & TONE FITNESS",
              "url": "https://torqueandtonefitness.com"
            },
            "ratingValue": aggregateToUse.ratingValue,
            "reviewCount": aggregateToUse.reviewCount,
            "bestRating": aggregateToUse.bestRating,
            "worstRating": aggregateToUse.worstRating,
            "ratingExplanation": "Based on customer reviews and success stories from our fitness programs including personal training, group classes, nutrition coaching, CrossFit, yoga, and athletic performance training."
          }
        }
      ]
    };

    // Also create a separate Organization schema with reviews
    const organizationWithReviews = {
      "@context": "https://schema.org",
      "@type": "Gym",
      "@id": "https://torqueandtonefitness.com#organization-reviews",
      "name": "TORQUE & TONE FITNESS",
      "url": "https://torqueandtonefitness.com",
      "review": reviewsToUse.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "reviewBody": review.reviewBody,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.ratingValue,
          "bestRating": 5,
          "worstRating": 1
        },
        "datePublished": review.datePublished,
        "reviewAspect": review.reviewAspect
      })),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateToUse.ratingValue,
        "reviewCount": aggregateToUse.reviewCount,
        "bestRating": aggregateToUse.bestRating,
        "worstRating": aggregateToUse.worstRating
      }
    };

    // Remove existing schemas if they exist
    const existingReviewSchema = document.querySelector('script[data-schema="reviews"]');
    if (existingReviewSchema) {
      existingReviewSchema.remove();
    }
    
    const existingOrgReviewSchema = document.querySelector('script[data-schema="organization-reviews"]');
    if (existingOrgReviewSchema) {
      existingOrgReviewSchema.remove();
    }

    // Add review list schema
    const reviewScript = document.createElement('script');
    reviewScript.type = 'application/ld+json';
    reviewScript.setAttribute('data-schema', 'reviews');
    reviewScript.textContent = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(reviewScript);

    // Add organization with reviews schema
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.setAttribute('data-schema', 'organization-reviews');
    orgScript.textContent = JSON.stringify(organizationWithReviews, null, 2);
    document.head.appendChild(orgScript);

    // Cleanup function
    return () => {
      const reviewSchemaElement = document.querySelector('script[data-schema="reviews"]');
      if (reviewSchemaElement) {
        reviewSchemaElement.remove();
      }
      
      const orgReviewSchemaElement = document.querySelector('script[data-schema="organization-reviews"]');
      if (orgReviewSchemaElement) {
        orgReviewSchemaElement.remove();
      }
    };
  }, [reviewsToUse, aggregateToUse]);

  return null; // This component doesn't render anything
};

export default ReviewSchema;
