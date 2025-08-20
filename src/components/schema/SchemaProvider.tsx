import React from 'react';
import LocalBusinessSchema from './LocalBusinessSchema';
import ServiceSchema from './ServiceSchema';
import ReviewSchema from './ReviewSchema';
import FAQSchema from './FAQSchema';

interface SchemaProviderProps {
  children: React.ReactNode;
  includeLocalBusiness?: boolean;
  includeServices?: boolean;
  includeReviews?: boolean;
  includeFAQ?: boolean;
  customLocalBusiness?: any;
  customServices?: any;
  customReviews?: any;
  customFAQs?: any;
}

const SchemaProvider: React.FC<SchemaProviderProps> = ({
  children,
  includeLocalBusiness = true,
  includeServices = true,
  includeReviews = true,
  includeFAQ = true,
  customLocalBusiness,
  customServices,
  customReviews,
  customFAQs
}) => {
  return (
    <>
      {includeLocalBusiness && (
        <LocalBusinessSchema {...customLocalBusiness} />
      )}
      
      {includeServices && (
        <ServiceSchema services={customServices} />
      )}
      
      {includeReviews && (
        <ReviewSchema 
          reviews={customReviews?.reviews} 
          aggregateRating={customReviews?.aggregateRating} 
        />
      )}
      
      {includeFAQ && (
        <FAQSchema faqs={customFAQs} />
      )}
      
      {children}
    </>
  );
};

export default SchemaProvider;
