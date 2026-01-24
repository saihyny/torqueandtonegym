import { useEffect, useRef, useState } from "react"; // Import useState
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import HeroSection from "@/components/HeroSection";
import ProgramsSection from "@/components/ProgramsSection";
import TrainersSection from "@/components/TrainersSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import VideoSection from "@/components/VideoSection";
import gymInteriorVideo from '@/assets/gym-interior.mp4';
import gymInteriorImage from '@/assets/gym-interior.jpg';
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SchemaProvider from "@/components/schema/SchemaProvider";
import { GroupedMaskedGalleryPage } from "@/components/GroupedMaskedGalleryPage";
import GymReviews from "@/components/Testimonials";
import VideoPlayer from "@/components/VideoPlayer";


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
          <VideoSection videoSrc="/videos/IMG_5614.mp4" posterSrc={gymInteriorImage} />
          <section id="gallery" className="text-center">
            <GroupedMaskedGalleryPage />
          </section>
          {/* <section id="success">
            <SuccessStoriesSection />
          </section> */}
          {/* <section id="reviews">
            <GymReviews/>
          </section> */}
          <section id="pricing">
            <PricingSection />
          </section>
          <section id="contact">
            <ContactSection />
          </section>
          {/* <VideoPlayer src="output.mp4"/> */}
        </main>
        <Footer />
        <div className="fixed bottom-8 right-8 z-50">
          <a
            href="https://wa.me/919989678960"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300 group z-50 animate-bounce-subtle"
            aria-label="Chat on WhatsApp"
          >
            <svg
              className="w-8 h-8 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          </a>
        </div>
      </div>
    </SchemaProvider>
  );
};

export default Index;