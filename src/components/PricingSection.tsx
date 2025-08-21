import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Phone } from 'lucide-react';

// --- ThemedGlowCard Component (as provided) ---
interface ThemedGlowCardProps {
  children: ReactNode;
  className?: string;
}

const ThemedGlowCard = ({ children, className }: ThemedGlowCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(208, 74, 74, 0.33),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
};


// --- Main PricingSection Component ---
const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const plans = [
    {
      duration: '1 Month',
      price: 3000,
      description: 'Perfect for trying us out or for short-term fitness goals. Maximum flexibility.',
      popular: false,
    },
    {
      duration: '3 Months',
      price: 7500,
      description: 'A great start to build a consistent routine and see tangible results. Saves you ₹1,500.',
      popular: false,
    },
    {
      duration: '6 Months',
      price: 11500,
      description: 'Our most popular plan. Commit to your health and enjoy significant savings of ₹6,500.',
      popular: true,
    },
    {
      duration: '12 Months',
      price: 13000,
      description: 'The best value for a full year of transformation. An incredible saving of ₹23,000.',
      popular: false,
    },
    {
      duration: '15 Months',
      price: 15000,
      description: 'Ultimate commitment for a lifestyle change. Locks in the lowest monthly rate, saving ₹30,000.',
      popular: false,
    }
  ];

  useEffect(() => {
    if (inView && sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.pricing-card');
      gsap.fromTo(cards,
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, [inView]);

  return (
    <section ref={ref} className="section bg-gradient-dark relative overflow-hidden py-20">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div ref={sectionRef} className="space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-gradient font-oswald font-bold text-4xl md:text-5xl">
              CHOOSE YOUR COMMITMENT
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The longer you commit, the more you save. Select a plan that aligns with your goals and call us to get started instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <ThemedGlowCard key={plan.duration} className="pricing-card">
                <Card 
                  className={`relative flex flex-col h-full ${
                    plan.popular 
                      ? 'border-primary/50' 
                      : 'border-border/30'
                  } bg-black/40 backdrop-blur-md transition-all duration-500`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1 rounded-full font-semibold border border-primary/50">
                        <Star className="w-4 h-4 mr-2" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center p-6 pb-4">
                    <h3 className="text-2xl font-oswald font-bold text-white mb-2">
                      {plan.duration}
                    </h3>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-oswald font-bold text-white">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 pt-4 flex-grow flex flex-col justify-between">
                    <p className="text-muted-foreground text-sm mb-6 text-center flex-grow">
                      {plan.description}
                    </p>
                    
                    <a href="tel:+919063678960" className="w-full">
                       <Button 
                        className={`w-full ${
                          plan.popular 
                            ? 'btn-hero' 
                            : 'bg-muted/20 text-white border border-border/30 hover:bg-primary/20 hover:border-primary/30 hover:text-primary'
                        }`}
                        size="lg"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call to Join
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </ThemedGlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;