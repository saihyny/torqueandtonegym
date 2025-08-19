import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/ProgramsSection";
import TrainersSection from "@/components/TrainersSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import VideoSection from "@/components/VideoSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"; // Import the separate Navbar component

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
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
          <ProgramsSection />
        </section>
        
        {/* Trainers Section */}
        <section id="trainers">
          <TrainersSection />
        </section>

        {/* Video Section */}
        <VideoSection />

        {/* Success Stories Section */}
        <section id="success">
          <SuccessStoriesSection />
        </section>

        {/* Pricing Section */}
        <section id="pricing">
          <PricingSection />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />

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
  );
};

export default Index;