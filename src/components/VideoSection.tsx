import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Play, Volume2 } from 'lucide-react';
// Register GSAP plugins. This should be done once in your application's entry file,
// but is included here for completeness of the component.
gsap.registerPlugin(ScrollTrigger);

interface VideoSectionProps {
  videoSrc: string;
  posterSrc: string;
}

const VideoSection = ({ videoSrc, posterSrc }: VideoSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (inView && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay policy gracefully
      });
    }
  }, [inView]);

  // useGSAP is the modern way to use GSAP in React.
  // It automatically handles cleanup, preventing memory leaks.
  useGSAP(() => {
    // --- 1. OPTIMIZED PARALLAX EFFECT ---
    // Instead of using onUpdate, we create a single timeline controlled by ScrollTrigger.
    // This is far more performant as it doesn't run JS on every scroll frame.
    // We animate the `yPercent` property to move the image.
    gsap.to('.parallax-bg video', {
      yPercent: -20, // Move the image up by 20% of its height
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom', // When the top of the section hits the bottom of the viewport
        end: 'bottom top',   // When the bottom of the section hits the top of the viewport
        scrub: true,         // Smoothly links the animation progress to the scrollbar
      },
    });

    // --- 2. CONTINUOUS FLOATING ANIMATION ---
    // This animation runs continuously and is not dependent on the `inView` trigger.
    // Setting it up here ensures it's created only once when the component mounts.
    gsap.to('.video-float', {
      y: -20,
      rotation: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.5,
    });
  }, { scope: sectionRef }); // Scope the selectors to this component

  // --- 3. ENTRANCE ANIMATION (TRIGGERS ONCE) ---
  // This hook is dependent on `inView` and will only run the entrance animation
  // when the component becomes visible.
  useGSAP(() => {
    if (inView) {
      const tl = gsap.timeline();

      // Premium text reveal animation
      tl.fromTo('.video-animate', {
        y: 100,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      })
      // Stats animation
      .fromTo('.video-stats', {
        scale: 0.5,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'elastic.out(1, 0.75)'
      }, '-=0.5')
      // CTA buttons animation
      .fromTo('.video-cta', {
        y: 50,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.7)'
      }, '-=0.5');
    }
  }, { dependencies: [inView], scope: sectionRef });

  return (
    // We combine the refs into the main section element.
    <section ref={(el) => {
      sectionRef.current = el;
      inViewRef(el);
    }} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background with Parallax */}
      {/* We apply the `will-change` property via CSS (or inline style) to hint to the browser
          that this element's transform will be animated, allowing for optimization. */}
      <div className="absolute inset-0 z-0 parallax-bg" style={{ willChange: 'transform' }}>
        {/* <img 
          src={gymInteriorImage}
          alt="TORQUE & TONE FITNESS gym interior"
          className="w-full h-[120%] object-cover" // Height is > 100% to have room for parallax
        /> */}
        <video
          ref={videoRef}
          className='w-full h-[120%] object-cover'
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={posterSrc}
          aria-label="Gym interior video background"
          tabIndex={-1}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 animate-pulse-slow" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl video-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl video-float" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-primary rounded-full video-float glow-primary" />
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white rounded-full video-float" />
        <div className="absolute top-1/2 left-10 w-3 h-3 bg-primary/50 rounded-full video-float" />
        <div className="absolute top-1/4 right-10 w-2 h-2 bg-white/50 rounded-full video-float" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 relative z-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-oswald font-bold text-white leading-tight video-animate">
            EVERY REP COUNTS.
            <br />
            <span className="text-gradient text-glow">
              EVERY DROP OF SWEAT MATTERS.
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto video-animate">
            Experience the intensity, passion, and dedication that makes TORQUE & TONE FITNESS 
            the premier destination for serious athletes and fitness enthusiasts.
          </p>

          <div className="pt-8 video-animate">
            <div className="relative inline-block group cursor-pointer">
              <div className="relative">
                <div className="w-24 h-24 bg-primary/90 rounded-full flex items-center justify-center group-hover:bg-primary transition-all duration-300 group-hover:scale-110 glow-pulse">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </div>
                <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping" />
                <div className="absolute inset-0 border border-primary/20 rounded-full animate-pulse" />
                <div className="absolute -inset-4 border border-primary/10 rounded-full animate-pulse-slow" />
              </div>
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-white text-sm font-semibold flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  Watch Our Story
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center space-y-2 video-stats">
              <div className="text-4xl md:text-5xl font-oswald font-bold text-primary glow-primary">
                2025
              </div>
              <div className="text-sm text-white/70 uppercase tracking-wider">
                Founded
              </div>
            </div>
            <div className="text-center space-y-2 video-stats">
              <div className="text-4xl md:text-5xl font-oswald font-bold text-primary glow-primary">
                500+
              </div>
              <div className="text-sm text-white/70 uppercase tracking-wider">
                Members
              </div>
            </div>
            <div className="text-center space-y-2 video-stats">
              <div className="text-4xl md:text-5xl font-oswald font-bold text-primary glow-primary">
                15K+
              </div>
              <div className="text-sm text-white/70 uppercase tracking-wider">
                Workouts
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 video-cta">
            <Button className="btn-hero text-lg px-10 py-4 glow-pulse">
              Join Now
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-white/5 backdrop-blur-sm px-10 py-4 hover:glow-primary transition-all duration-300"
            >
              Schedule Tour
            </Button>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-15" />
    </section>
  );
};

export default VideoSection;
