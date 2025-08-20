import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import BookingForm from './BookingForm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from '@/lib/icons';

const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const plans = [
    {
      name: 'Basic',
      price: 3000,
      period: 'month',
      description: 'Perfect for getting started with your fitness journey',
      popular: false,
      features: [
        'Gym access during off-peak hours',
        'Basic equipment usage',
        'Locker room access',
        'Free fitness assessment',
        'Mobile app access'
      ],
      cta: 'Start Basic'
    },
    {
      name: 'Standard',
      price: 3500,
      period: 'month',
      description: 'Most popular choice for serious fitness enthusiasts',
      popular: true,
      features: [
        '24/7 gym access',
        'All equipment & amenities',
        '2 group classes per week',
        'Nutrition consultation',
        'Guest pass (2 per month)',
        'Mobile app & progress tracking',
        'Sauna & steam room access'
      ],
      cta: 'Choose Standard'
    },
    {
      name: 'Premium',
      price: 5000,
      period: 'month',
      description: 'Ultimate fitness experience with personalized coaching',
      popular: false,
      features: [
        'Everything in Standard',
        '4 personal training sessions',
        'Unlimited group classes',
        'Custom meal planning',
        'Recovery therapy access',
        'Priority equipment booking',
        'Exclusive premium lounge',
        'Supplements consultation'
      ],
      cta: 'Go Premium'
    }
  ];

  useEffect(() => {
    if (inView && sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.pricing-card');
      
      gsap.fromTo(cards,
        { 
          y: 80,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }
      );
    }
  }, [inView]);

  return (
    <section ref={ref} className="section bg-gradient-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div ref={sectionRef} className="space-y-16">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-gradient font-oswald font-bold">
              MEMBERSHIP PLANS
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Choose the perfect membership that fits your lifestyle and fitness goals. 
              All plans include access to our world-class facilities and expert support.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={plan.name}
                className={`pricing-card relative ${
                  plan.popular 
                    ? 'scale-105 border-primary/50 shadow-glow' 
                    : 'border-border/30'
                } card-premium hover:scale-105 transition-all duration-500`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-6 py-2 mt-2 rounded-full font-semibold">
                      <Star className="w-4 h-4 mt-2" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center p-8 pb-4">
                  {/* Plan Name */}
                  <h3 className="text-2xl font-oswald font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-end justify-center gap-2">
                      <span className="text-5xl font-oswald font-bold text-white">
                        ₹{plan.price}
                      </span>
                      <span className="text-muted-foreground mb-2">
                        /{plan.period}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8 pt-4 space-y-6">
                  {/* Features List */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="pt-6">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'btn-hero' 
                          : 'bg-muted/20 text-white border border-border/30 hover:bg-primary/20 hover:border-primary/30 hover:text-primary'
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </div>

                  {/* Additional Info */}
                  <div className="text-center pt-4">
                    <p className="text-xs text-muted-foreground">
                      No long-term contracts • Cancel anytime
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="text-center space-y-8 pt-8">
            {/* Money Back Guarantee */}
            <div className="bg-card/30 rounded-2xl p-8 border border-border/30 max-w-2xl mx-auto">
              <h3 className="text-xl font-oswald font-semibold text-white mb-4">
                30-Day Money Back Guarantee
              </h3>
              <p className="text-muted-foreground mb-6">
                Not satisfied with your membership? Get a full refund within the first 30 days, no questions asked.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-hero">
                  Start Your Trial
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  Schedule Tour
                </Button>
              </div>
            </div>

            {/* Contact for Corporate */}
            <p className="text-sm text-muted-foreground">
              Corporate memberships available. 
              <a href="#contact" className="text-primary hover:underline ml-1">
                Contact us for group rates
              </a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingSection;
