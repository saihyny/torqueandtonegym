import { useEffect, useRef, useState } from "react"; // Import useState
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
import Navbar from "@/components/Navbar";
import SchemaProvider from "@/components/schema/SchemaProvider";
import { GroupedMaskedGalleryPage } from "@/components/GroupedMaskedGalleryPage";
import GymReviews from "@/components/Testimonials";


gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false); // State for gallery expansion

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    gsap.registerPlugin(ScrollTrigger);

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

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", smoothScroll);
    });

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

  const handleGalleryToggle = () => {
    setIsGalleryExpanded((prev) => !prev);
  };

  return (
    <SchemaProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main>
          <section id="home">
            <HeroSection />
          </section>
          <section id="programs">
            <ProgramsSection />
          </section>
          <section id="trainers">
            <TrainersSection />
          </section>
          <VideoSection />
          <section id="gallery" className="text-center">
            <GroupedMaskedGalleryPage isExpanded={isGalleryExpanded} />
            <button
              onClick={handleGalleryToggle}
              className="mt-8 px-8 py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary-glow transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-glow focus:ring-opacity-50"
            >
              {isGalleryExpanded ? "Show Less" : "Show More"}
            </button>
          </section>
          <section id="success">
            {/* <SuccessStoriesSection /> */}
          </section>
          <section id="reviews">
          
          </section>
          <section id="pricing">
            <PricingSection />
          </section>
          <section id="contact">
            <ContactSection />
          </section>
        </main>
        <Footer />
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
  );
};

export default Index;