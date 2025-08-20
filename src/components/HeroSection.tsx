import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { LightweightAnimations, useOptimizedAnimation } from '@/lib/animations';
import { HeroImage } from '@/components/OptimizedImage';
import BookingForm from '@/components/BookingForm';
import heroImage from '@/assets/hero-bodybuilder.jpg';


// Preload hero image for better performance
const testImg = new Image();
testImg.src = heroImage;

// The plugin is now registered in index.tsx, so we remove the registration line from here.
// gsap.registerPlugin(ScrollTrigger); // <-- REMOVED THIS LINE

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState(0);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  // Use lightweight animation hooks
  const { cssHover, tap } = useOptimizedAnimation();

  const words = ['GET STRONGER', 'GET FASTER', 'GET FITTER', 'GET BETTER'];

  // Ensure image is visible on mount
  useEffect(() => {
    if (imageRef.current) {
      // Force image visibility for better performance
      const imageContainer = imageRef.current;
      imageContainer.style.opacity = '1';
      imageContainer.style.visibility = 'visible';
      imageContainer.style.display = 'block';

      const img = imageContainer.querySelector('img');
      if (img) {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        img.style.display = 'block';
      }
    }
  }, []);

  // Word flipper (every 3s) - Start after initial render to improve LCP
  useEffect(() => {
    // Delay the animation start to improve LCP
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentWord(prev => (prev + 1) % words.length);
      }, 3000);
      return () => clearInterval(interval);
    }, 1000); // Start animations after 1 second

    return () => clearTimeout(startDelay);
  }, [words.length]);

  // GSAP animations
  useEffect(() => {
    // Make sure ScrollTrigger is available to GSAP
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Ensure image is visible immediately
    if (imageRef.current) {
      gsap.set(imageRef.current, { opacity: 1, visibility: 'visible' });
    }

    if (inView && textRef.current && imageRef.current) {
      const tl = gsap.timeline();

      // Animate headline + subtext + button
      const textElements = textRef.current.querySelectorAll('.animate-element');
      tl.fromTo(
        textElements,
        {
          y: 100,
          opacity: 0,
          rotationX: -45,
          transformOrigin: 'center bottom'
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.4,
          stagger: 0.2,
          ease: 'expo.out'
        }
      )
        .fromTo(
          imageRef.current,
          {
            scale: 1.2,
            rotationY: 10,
            transformOrigin: 'center center'
          },
          {
            scale: 1,
            rotationY: 0,
            duration: 2,
            ease: 'power2.out'
          },
          '-=1.0'
        )
        .fromTo(
          '.stats-item',
          {
            scale: 0,
            opacity: 0,
            rotation: -45
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'back.out(1.7)'
          },
          '-=0.6'
        );
    }

    // Hero image parallax
    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: self => {
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            yPercent: -25 * self.progress,
            duration: 0.3,
            ease: 'none'
          });
        }
      }
    });

    // Text glow loop
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

    return () => {
      st.kill(); // Cleanup ScrollTrigger instance on component unmount
    }
  }, [inView]);



  return (
    <section
      ref={(el: HTMLElement | null) => {
        console.log('🎯 Hero section ref callback called with:', el);
        heroRef.current = el as HTMLDivElement;
        inViewRef(el);
      }}
      className="relative min-h-screen flex items-center justify-center text-center bg-black overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{
          opacity: 1,
          visibility: 'visible',
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      >
        <HeroImage
          src={heroImage}
          alt="Professional bodybuilder training at TORQUE & TONE FITNESS"
          className="w-full h-full object-cover"
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div ref={textRef} className="max-w-4xl mx-auto">
          <div className="space-y-10">
            {/* Headline - Optimized for LCP (no initial animation) */}
            <div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-tight text-white text-gradient text-glow">
                {words[currentWord]}
              </h1>
            </div>

            {/* Subheadline */}
            <div className="max-w-2xl mx-auto animate-element">
              <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed">
                Push beyond your limits, redefine strength, and build the best version of yourself.
              </p>
            </div>

            {/* CTA - Optimized with lightweight animations */}
            <div className="pt-10 animate-element">
              <button
                className='btn-hero'
                onClick={() => window.open('https://wa.me/919963000000', '_blank')}
                {...cssHover(1.08)}
                {...tap(0.95)}
                style={{
                  ...cssHover(1.08).style,
                  willChange: 'transform',
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

   
  );
};

export default HeroSection;