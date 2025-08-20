import { useEffect, useRef, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import LazyWrapper from "@/components/LazyWrapper";
import SchemaProvider from "@/components/schema/SchemaProvider";
import { ErrorBoundary } from "@/lib/react-performance";
import { PerformanceMonitor, measureBundleSize } from "@/lib/performance";

// Lazy load heavy components to improve initial load time
const ProgramsSection = lazy(() => import("@/components/ProgramsSection"));
const TrainersSection = lazy(() => import("@/components/TrainersSection"));
const SuccessStoriesSection = lazy(() => import("@/components/SuccessStoriesSection"));
const VideoSection = lazy(() => import("@/components/VideoSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize performance monitoring
    const monitor = PerformanceMonitor.getInstance();
    monitor.init();
    measureBundleSize();
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // GSAP ticker for smooth animation frame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Global parallax animations
    gsap.registerPlugin(ScrollTrigger);

    // Background parallax
    gsap.to(".parallax-bg", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-bg",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Smooth scrolling for anchor links
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const hash = target.hash;

      if (hash) {
        const element = document.querySelector(hash);
        if (element && lenis) {
          lenis.scrollTo(element as HTMLElement, {
            duration: 1.5,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
        }
      }
    };

    // Add event listeners for smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", smoothScroll);
    });

    // Cleanup
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", smoothScroll);
      });
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (lenisRef.current) {
        gsap.ticker.remove((time) => {
          lenisRef.current?.raf(time * 1000);
        });
        lenisRef.current.destroy();
      }
    };
  }, []);

  return (
    <ErrorBoundary
      fallback={(error) => (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-4">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-hero"
            >
              Reload Page
            </button>
          </div>
        </div>
      )}
      onError={(error, errorInfo) => {
        console.error('Application error:', error, errorInfo);
        // You can send this to your error reporting service
      }}
    >
      <SchemaProvider>
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main>
          {/* Hero Section */}
          <section id="home">
            <HeroSection />
          </section>

          {/* Programs Section */}
          <section id="programs">
            <LazyWrapper fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <ProgramsSection />
            </LazyWrapper>
          </section>

          {/* Trainers Section */}
          <section id="trainers">
            <LazyWrapper fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <TrainersSection />
            </LazyWrapper>
          </section>

          {/* Video Section */}
          <LazyWrapper fallback={<div className="min-h-[300px] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <VideoSection />
          </LazyWrapper>

          {/* Success Stories Section */}
          <section id="success">
            <LazyWrapper fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <SuccessStoriesSection />
            </LazyWrapper>
          </section>

          {/* Pricing Section */}
          <section id="pricing">
            <LazyWrapper fallback={<div className="min-h-[400px] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <PricingSection />
            </LazyWrapper>
          </section>

          {/* Contact Section */}
          <section id="contact">
            <LazyWrapper fallback={<div className="min-h-[500px] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <ContactSection />
            </LazyWrapper>
          </section>
        </main>

        {/* Footer */}
        <LazyWrapper fallback={<div className="min-h-[200px] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
          <Footer />
        </LazyWrapper>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <a
            href="#contact"
            className="w-14 h-14 bg-primary hover:bg-primary-glow rounded-full flex items-center justify-center shadow-glow hover:scale-110 transition-all duration-300 group glow-pulse"
            aria-label="Join Now"
          >
            <svg
              className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </SchemaProvider>
    </ErrorBoundary>
  );
};

export default Index;