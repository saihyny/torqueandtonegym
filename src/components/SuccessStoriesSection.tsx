// src/components/sections/SuccessStoriesSection.tsx (Updated)

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence, motion } from 'framer-motion';
import ThemedGlowCard from './ui/ThemedGlowCard'
import MaskedDiv from './ui/masked-div';      // Adjust import path
import { LazyImage } from '@/components/OptimizedImage';

// --- Data for our carousel ---
const stories = [
  {
    name: 'Sarah Johnson',
    transformation: 'Lost 40 lbs in 6 months',
    beforeImage: 'https://images.pexels.com/photos/3837464/pexels-photo-3837464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    afterImage: 'https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Mike Rodriguez',
    transformation: 'Gained 25 lbs of Muscle',
    beforeImage: 'https://images.pexels.com/photos/1552102/pexels-photo-1552102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    afterImage: 'https://images.pexels.com/photos/2204196/pexels-photo-2204196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Emily Chen',
    transformation: 'Rehabbed Injury & Gained Flexibility',
    beforeImage: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    afterImage: 'https://images.pexels.com/photos/4752861/pexels-photo-4752861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }
];

const SuccessStoriesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  // GSAP animation for when the section scrolls into view
  useEffect(() => {
    if (inView && sectionRef.current) {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
      );
    }
  }, [inView]);

  // --- Carousel Logic ---
  const startAutoPlay = () => {
    stopAutoPlay(); // Ensure no multiple intervals are running
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }, 5000); // Change story every 5 seconds
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handlePaginationClick = (index: number) => {
    setActiveIndex(index);
    // Reset the timer when a user manually selects a slide
    startAutoPlay();
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay(); // Cleanup on component unmount
  }, []);

  const activeStory = stories[activeIndex];

  return (
    <section ref={ref} className="section bg-gradient-dark relative overflow-hidden py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <h2 className="text-gradient font-oswald font-bold">
            TRANSFORMATION SHOWCASE
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Witness the incredible results our members achieve. Hover over the card to interact. The stories change automatically.
          </p>
        </div>

        {/* The main interactive card showcase */}
        <div ref={sectionRef} className="max-w-6xl mx-auto" style={{ perspective: '2000px' }}>
          {/* REPLACE SkiperCard WITH FuturisticCard */}
          <ThemedGlowCard>
            <div 
              className="space-y-6"
              onMouseEnter={stopAutoPlay}
              onMouseLeave={startAutoPlay}
            >
              {/* Pagination Controls */}
              <div className="absolute top-4 right-6 z-20 flex justify-center gap-2">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePaginationClick(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index ? 'bg-white scale-125' : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to story ${index + 1}`}
                  />
                ))}
              </div>

              {/* Animated Content Area */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="space-y-8">
                    {/* Card Header */}
                    <div className="text-center pt-4">
                      <h3 className="text-3xl lg:text-4xl font-oswald font-bold text-white">
                        {activeStory.name}'s Journey
                      </h3>
                      <p className="text-primary font-semibold text-lg">
                        {activeStory.transformation}
                      </p>
                    </div>
                    
                    {/* Before & After Images Container */}
                    <div className="flex flex-col sm:flex-row justify-center gap-8 items-center">
                      <div className="w-full text-center">
                        <h4 className="font-oswald text-2xl text-white mb-4">BEFORE</h4>
                        <MaskedDiv maskType="type-1" size={0.9}>
                          <LazyImage
                            src={activeStory.beforeImage}
                            alt={`${activeStory.name} before`}
                            width={400}
                            height={500}
                            className="w-full h-full object-cover [filter:drop-shadow(0_0_1px_rgba(255,255,255,0.4))]"
                          />
                        </MaskedDiv>
                      </div>
                      <div className="w-full text-center">
                        <h4 className="font-oswald text-2xl text-primary mb-4">AFTER</h4>
                        <MaskedDiv maskType="type-1" size={0.9} className="rotate-180 ">
                          <LazyImage
                            src={activeStory.afterImage}
                            alt={`${activeStory.name} after`}
                            width={400}
                            height={500}
                            className="w-full h-full object-cover rotate-180 [filter:drop-shadow(0_0_1px_rgba(255,255,255,0.4))]"
                          />
                        </MaskedDiv>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </ThemedGlowCard>
        </div>

      </div>
    </section>
  );
};

export default SuccessStoriesSection;