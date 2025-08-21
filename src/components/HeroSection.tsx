import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

// Lazily import heavy components
const BookingForm = React.lazy(() => import('@/components/BookingForm'));
const MotionSpan = React.lazy(() => import('framer-motion').then(mod => ({ default: mod.motion.span })));
const AnimatePresence = React.lazy(() => import('framer-motion').then(mod => ({ default: mod.AnimatePresence })));

// Import optimized images
import heroImage from '@/assets/hero-bodybuilder.jpg'; // Fallback

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState(0);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const words = ['GET STRONGER', 'GET FASTER', 'GET FITTER', 'GET BETTER'];

  // Word flipper (every 3s)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(prev => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  // GSAP animations
  useEffect(() => {
    let st: ScrollTrigger;

    // Dynamically import GSAP and ScrollTrigger when the component is in view
    if (inView) {
      import('gsap').then(({ gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger);

          if (textRef.current && imageRef.current) {
            const tl = gsap.timeline();
            const textElements = textRef.current.querySelectorAll('.animate-element');
            tl.fromTo(
              textElements,
              { y: 100, opacity: 0, rotationX: -45, transformOrigin: 'center bottom' },
              { y: 0, opacity: 1, rotationX: 0, duration: 1.4, stagger: 0.2, ease: 'expo.out' }
            ).fromTo(
              imageRef.current,
              { scale: 1.2, rotationY: 10, transformOrigin: 'center center' },
              { scale: 1, rotationY: 0, duration: 2, ease: 'power2.out' },
              '-=1.0'
            ).fromTo(
              '.stats-item',
              { scale: 0, opacity: 0, rotation: -45 },
              { scale: 1, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)' },
              '-=0.6'
            );
          }

          st = ScrollTrigger.create({
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            onUpdate: self => {
              if (imageRef.current) {
                gsap.to(imageRef.current, { yPercent: -25 * self.progress, duration: 0.3, ease: 'none' });
              }
            }
          });

          const glow = document.querySelector('.text-glow');
          if (glow) {
            gsap.to(glow, {
              textShadow: '0px 0px 40px rgba(255, 0, 90, 0.9)',
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: 'power2.inOut'
            });
          }
        });
      });
    }

    return () => {
      if (st) {
        st.kill();
      }
    };
  }, [inView]);

  return (
    <section
      ref={(el: HTMLDivElement | null) => {
        heroRef.current = el;
        inViewRef(el);
      }}
      className="relative min-h-screen flex items-center justify-center text-center bg-black overflow-hidden"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        {/* 
          OPTIMIZATION: Use the <picture> element to serve modern image formats.
          - It provides a WebP source for modern browsers (smaller file size).
          - It provides a smaller JPG for mobile viewports.
          - The <img> tag is a fallback for older browsers.
        */}
        <picture>
          <img
            src={heroImage}
            alt="Professional bodybuilder training at TORQUE & TONE FITNESS"
            className="w-full h-full object-cover"
            // OPTIMIZATION: Prioritize loading of the LCP image.
            fetchPriority="high"
            loading="eager"
            // OPTIMIZATION: Provide image dimensions to prevent layout shift.
            width="1920"
            height="1080"
          />
        </picture>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div ref={textRef} className="max-w-4xl mx-auto">
          <div className="space-y-10">
            {/* Headline with flipping words */}
            <div className="animate-element">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight text-white">
                <Suspense fallback={<span className="inline-block text-gradient text-glow">{words[0]}</span>}>
                  <AnimatePresence mode="wait">
                    <MotionSpan
                      key={words[currentWord]}
                      initial={{ opacity: 0, rotateX: -90 }}
                      animate={{ opacity: 1, rotateX: 0 }}
                      exit={{ opacity: 0, rotateX: 90 }}
                      transition={{ duration: 0.7, ease: 'easeInOut' }}
                      className="inline-block text-gradient text-glow"
                    >
                      {words[currentWord]}
                    </MotionSpan>
                  </AnimatePresence>
                </Suspense>
              </h1>
            </div>

            {/* Subheadline */}
            <div className="max-w-2xl mx-auto animate-element">
              <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed">
                Push beyond your limits, redefine strength, and build the best version of yourself.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-10 animate-element">
              
               <button>
                <a href="#contact" className="btn-hero">
                  let's get started
                </a>
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </section>

   
  );
};

export default HeroSection;
