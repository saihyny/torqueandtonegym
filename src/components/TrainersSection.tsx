import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Badge } from "@/components/ui/badge";
import {
  Instagram,
  Twitter,
  Linkedin,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";
import firstTriner from "@/assets/FirstTrainer.jpg";

// CSS Imports
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./ui/swiper-custom.css";

// --- TYPES ---
interface Trainer {
  id: number;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  image: string;
  experience: string;
  rating: number;
  clients: string;
  socialLinks: { instagram: string; twitter: string; linkedin: string };
  contact: { phone: string; email: string };
  details: {
    summary: string;
    strengths: string[];
  };
}

interface CarouselProps {
  trainers: Trainer[];
  activeIndex: number;
  onSlideChange: (index: number) => void;
  onSwiperReady: (swiper: SwiperType) => void;
}

// --- SINGLE UNIFIED CAROUSEL COMPONENT ---
const UnifiedTrainerCarousel: React.FC<CarouselProps> = ({
  trainers,
  activeIndex,
  onSlideChange,
  onSwiperReady,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      onSlideChange(swiper.activeIndex);
    },
    [onSlideChange]
  );

  const TrainerCard = ({ trainer }: { trainer: Trainer }) => (
    <div className="relative w-full h-full text-white group overflow-hidden">
      <img
        src={trainer.image}
        alt={trainer.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent md:from-black/90" />
      <div className="relative z-10 flex flex-col justify-end h-full p-4 md:p-6 space-y-2 md:space-y-3">
        <div className="md:hidden flex items-center justify-between mb-2 text-xs">
          <div className="flex items-center space-x-3">
            <span className="bg-primary/20 px-2 py-1 rounded text-primary">
              ★ {trainer.rating}
            </span>
            <span className="text-gray-300">{trainer.experience}</span>
            <span className="text-gray-300">{trainer.clients} clients</span>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="bg-primary/30 text-primary border-primary/50 self-start backdrop-blur-md shadow-lg text-xs md:text-sm"
        >
          {trainer.specialty}
        </Badge>
        <h3 className="text-2xl md:text-3xl font-bold font-oswald text-white glow-primary text-glow drop-shadow-lg leading-tight">
          {trainer.name}
        </h3>
        <p className="text-sm md:text-base font-medium text-primary/90 mb-1">
          {trainer.title}
        </p>
        <p className="text-sm text-gray-200 drop-shadow-sm leading-relaxed line-clamp-2 md:line-clamp-none">
          {trainer.bio}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 md:gap-3">
            {[
              { href: trainer.socialLinks.instagram, icon: Instagram },
              { href: trainer.socialLinks.twitter, icon: Twitter },
              { href: trainer.socialLinks.linkedin, icon: Linkedin },
            ].map(({ href, icon: Icon }, idx) => (
              <a
                key={idx}
                href={href}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 backdrop-blur-sm shadow-lg"
                aria-label={`${trainer.name} social link ${idx + 1}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="md:hidden flex items-center gap-2">
            <a
              href={`tel:${trainer.contact.phone}`}
              className="w-8 h-8 bg-green-500/80 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 backdrop-blur-sm"
              aria-label={`Call ${trainer.name}`}
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${trainer.contact.email}`}
              className="w-8 h-8 bg-blue-500/80 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 backdrop-blur-sm"
              aria-label={`Email ${trainer.name}`}
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const commonSwiperProps = {
    onSwiper: onSwiperReady,
    grabCursor: true,
    centeredSlides: true,
    loop: false, // Loop can cause issues with state management, keeping it false is safer
    slidesPerView: 1 as const,
    spaceBetween: 0,
    initialSlide: activeIndex,
    speed: 400,
    onSlideChange: handleSlideChange,
    onBeforeInit: (swiper: SwiperType) => {
      swiper.params.initialSlide = activeIndex;
      swiper.activeIndex = activeIndex;
    },
  };

  if (isMobile) {
    return (
      <div className="relative w-full max-w-[420px] mx-auto">
        <div className="relative w-full h-[480px]">
          <div className="w-full h-full bg-gradient-to-br from-[#1c1c1d] to-[#2a2a2e] border border-white/20 rounded-3xl p-3 shadow-2xl">
            <Swiper
              {...commonSwiperProps}
              pagination={{
                el: ".swiper-pagination-mobile",
                clickable: true,
                dynamicBullets: true,
                bulletClass: "custom-swiper-bullet",
                bulletActiveClass: "custom-swiper-bullet-active",
              }}
              modules={[Pagination]}
              className="w-full h-full"
            >
              {trainers.map((trainer) => (
                <SwiperSlide
                  key={trainer.id}
                  className="!w-full !h-full rounded-2xl overflow-hidden"
                >
                  <TrainerCard trainer={trainer} />
                </SwiperSlide>
              ))}
              <div className="swiper-pagination-mobile !bottom-4 !left-1/2 !transform !-translate-x-1/2"></div>
            </Swiper>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-[450px] h-[550px]">
      <div className="absolute top-0 left-0 w-full h-full bg-[#2a2a2e] border border-white/10 rounded-2xl transform-gpu rotate-[-4deg] scale-[0.90] translate-y-[20px] z-10 opacity-60"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[#2a2a2e] border border-white/10 rounded-2xl transform-gpu rotate-[2deg] scale-[0.95] translate-y-[10px] z-20 opacity-80"></div>
      <div className="relative z-30 w-full h-full bg-gradient-to-br from-[#1c1c1d] to-[#2a2a2e] border border-white/20 rounded-2xl p-4 overflow-hidden shadow-2xl">
        <Swiper
          {...commonSwiperProps}
          effect={"coverflow"}
          slidesPerView={"auto"}
          speed={600}
          coverflowEffect={{
            rotate: 0,
            stretch: -80,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{
            el: ".swiper-pagination-desktop",
            clickable: true,
            dynamicBullets: true,
            bulletClass: "custom-swiper-bullet",
            bulletActiveClass: "custom-swiper-bullet-active",
          }}
          modules={[EffectCoverflow, Pagination]}
          className="w-full h-full"
        >
          {trainers.map((trainer) => (
            <SwiperSlide
              key={trainer.id}
              className="!w-[400px] !h-[450px] rounded-xl overflow-hidden bg-gray-900 shadow-lg"
            >
              <TrainerCard trainer={trainer} />
            </SwiperSlide>
          ))}
          <div className="swiper-pagination-desktop !bottom-2"></div>
        </Swiper>
      </div>
    </div>
  );
};

// --- MAIN TRAINERS COMPONENT (REFACTORED) ---
const TrainersSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // Changed breakpoint to lg
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const trainers = useMemo<Trainer[]>(
    () => [
      // ... (Your trainers data remains unchanged)
      {
        id: 1,
        name: "Uday Kiran",
        title: "Owner & Head Coach",
        specialty: "Strength & Conditioning",
        bio: "Founder of the gym and a former Cult Fit coach with a deep passion for fitness.",
        image: firstTriner,
        experience: "8+ Years",
        rating: 4.9,
        clients: "500+",
        socialLinks: { instagram: "#", twitter: "#", linkedin: "#" },
        contact: { phone: "+91 98765 43210", email: "uday@elitegym.com" },
        details: {
          summary:
            "As the owner and head coach, Uday brings a wealth of knowledge from his time as a premier coach at Cult Fit. His philosophy is built on a foundation of strength and functional movement, ensuring every client achieves their peak physical potential.",
          strengths: [
            "Advanced Strength Training",
            "Bodybuilding & Hypertrophy",
            "Functional Fitness",
            "Nutritional Guidance",
            "Injury Prevention",
          ],
        },
      },
      {
        id: 2,
        name: "Sarah Phoenix",
        title: "HIIT Specialist",
        specialty: "HIIT & Cardio",
        bio: "High-energy trainer who loves pushing clients to their cardiovascular limits.",
        image:
          "https://cdn.qwenlm.ai/output/f4a73dc5-136f-4636-abd8-42b2379febd7/t2i/39827052-bdcb-4469-9e82-55d768617375/1755540039.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiZjRhNzNkYzUtMTM2Zi00NjM2LWFiZDgtNDJiMjM3OWZlYmQ3IiwicmVzb3VyY2VfaWQiOiIxNzU1NTQwMDM5IiwicmVzb3VyY2VfY2hhdF9pZCI6ImNkYzA2OTM2LTQ1YjUtNDljNS1hOGYwLTlhOGVhZDkzNWQwZSJ9.2XpKWby-pG1W_DuoRnsBGyaCjDSl6A8XZo8Bwk5jVQk&x-oss-process=image/resize,m_mfit,w_450,h_450",
        experience: "6+ Years",
        rating: 4.8,
        clients: "400+",
        socialLinks: { instagram: "#", twitter: "#", linkedin: "#" },
        contact: { phone: "+91 98765 43211", email: "sarah@elitegym.com" },
        details: {
          summary:
            "Sarah is a certified HIIT instructor with a knack for creating fun, challenging, and effective cardio workouts. She believes in the power of high-intensity training to transform both body and mind.",
          strengths: [
            "High-Intensity Interval Training",
            "Cardiovascular Endurance",
            "Group Fitness Motivation",
            "Metabolic Conditioning",
            "Fat Loss Strategies",
          ],
        },
      },
      {
        id: 3,
        name: "Mike Rodriguez",
        title: "Strength Coach",
        specialty: "Powerlifting & CrossFit",
        bio: "Former competitive powerlifter who specializes in strength training and CrossFit.",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        experience: "10+ Years",
        rating: 4.9,
        clients: "300+",
        socialLinks: { instagram: "#", twitter: "#", linkedin: "#" },
        contact: { phone: "+91 98765 43212", email: "mike@elitegym.com" },
        details: {
          summary:
            "Mike brings competitive powerlifting experience to help clients build serious strength. His methodical approach ensures proper form and progressive overload for maximum results.",
          strengths: [
            "Powerlifting Technique",
            "Olympic Lifting",
            "CrossFit Training",
            "Strength Programming",
            "Competition Prep",
          ],
        },
      },
      {
        id: 4,
        name: "Emma Thompson",
        title: "Yoga & Wellness Coach",
        specialty: "Yoga & Flexibility",
        bio: "Certified yoga instructor focused on mindful movement and holistic wellness.",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        experience: "7+ Years",
        rating: 4.9,
        clients: "450+",
        socialLinks: { instagram: "#", twitter: "#", linkedin: "#" },
        contact: { phone: "+91 98765 43213", email: "emma@elitegym.com" },
        details: {
          summary:
            "Emma combines traditional yoga practices with modern wellness approaches. She helps clients improve flexibility, reduce stress, and develop a deeper mind-body connection.",
          strengths: [
            "Hatha & Vinyasa Yoga",
            "Meditation & Mindfulness",
            "Flexibility Training",
            "Stress Management",
            "Holistic Wellness",
          ],
        },
      },
    ],
    []
  );

  const activeTrainer = useMemo(
    () => trainers[activeIndex] || trainers[0],
    [trainers, activeIndex]
  );

  const handleSlideChange = useCallback(
    (newIndex: number) => {
      const safeIndex = Math.max(0, Math.min(newIndex, trainers.length - 1));
      if (safeIndex !== activeIndex) {
        setActiveIndex(safeIndex);
      }
    },
    [trainers.length, activeIndex]
  );

  // Sync swiper when external state changes
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== activeIndex) {
      swiperRef.current.slideTo(activeIndex, 400);
    }
  }, [activeIndex]);

  const createNavigationHandler = useCallback(
    (direction: "prev" | "next") => () => {
      if (isTransitioning || !swiperRef.current) return;
      setIsTransitioning(true);
      if (direction === "prev") {
        swiperRef.current.slidePrev();
      } else {
        swiperRef.current.slideNext();
      }
      setTimeout(() => setIsTransitioning(false), 450);
    },
    [isTransitioning]
  );

  const handlePrev = useMemo(
    () => createNavigationHandler("prev"),
    [createNavigationHandler]
  );
  const handleNext = useMemo(
    () => createNavigationHandler("next"),
    [createNavigationHandler]
  );

  const goToTrainer = useCallback(
    (index: number) => {
      if (isTransitioning || !swiperRef.current || index === activeIndex)
        return;
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 450);
    },
    [activeIndex, isTransitioning]
  );

  return (
    <section className="section bg-gradient-to-br from-background via-background to-gray-900 text-white relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-10 md:top-20 left-5 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white glow-primary text-glow leading-tight">
            ELITE TRAINERS
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our world-class team of certified trainers, each bringing
            unique expertise and dedication to help you achieve your fitness
            goals.
          </p>
        </div>

        {/* --- REFACTORED LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24 gap-y-12 lg:items-start">
          {/* Left Column: Carousel & Navigation */}
          <div className="flex flex-col items-center justify-center">
            <UnifiedTrainerCarousel
              trainers={trainers}
              activeIndex={activeIndex}
              onSlideChange={handleSlideChange}
              onSwiperReady={(swiper) => {
                swiperRef.current = swiper;
              }}
            />
            {/* Navigation Controls */}
            <div className="mt-8 flex flex-col items-center gap-y-6 w-full max-w-md">
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={handlePrev}
                  disabled={isTransitioning}
                  className="group w-12 h-12 rounded-full bg-white/10 border-2 border-primary/50 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm shadow-lg disabled:opacity-50"
                  aria-label="Previous Trainer"
                >
                  <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
                </button>

                <div className="flex items-center gap-2.5">
                  {trainers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTrainer(index)}
                      disabled={isTransitioning}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                          : "bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to ${trainers[index].name}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className="group w-12 h-12 rounded-full bg-white/10 border-2 border-primary/50 text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-sm shadow-lg disabled:opacity-50"
                  aria-label="Next Trainer"
                >
                  <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {trainers.map((trainer, index) => (
                  <button
                    key={trainer.id}
                    onClick={() => goToTrainer(index)}
                    disabled={isTransitioning}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white active:scale-95"
                    } disabled:opacity-50`}
                  >
                    {trainer.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Trainer Details */}
          <div className="w-full max-w-xl mx-auto text-center lg:text-left">
            <div
              className={`transition-opacity duration-400 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="mb-8">
                <h3 className="text-4xl md:text-5xl font-oswald font-bold text-white glow-primary text-glow">
                  {activeTrainer.name}
                </h3>
                <p className="mt-2 text-lg md:text-xl font-semibold text-primary">
                  {activeTrainer.title}
                </p>
                <div className="hidden md:flex items-center justify-center lg:justify-start space-x-6 text-sm mt-4">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-primary">★</span>
                    <span>{activeTrainer.rating} Rating</span>
                  </div>
                  <div className="text-muted-foreground">
                    {activeTrainer.experience}
                  </div>
                  <div className="text-muted-foreground">
                    {activeTrainer.clients} Happy Clients
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                {activeTrainer.details.summary}
              </p>

              <div className="space-y-4">
                <h4 className="text-xl md:text-2xl font-semibold border-b-2 border-primary/30 pb-3 text-white">
                  Strengths & Specialties
                </h4>
                <ul className="space-y-3">
                  {activeTrainer.details.strengths.map((strength, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-base md:text-lg"
                    >
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                      <span className="text-gray-200">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden md:block mt-8 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm">
                  <a
                    href={`tel:${activeTrainer.contact.phone}`}
                    className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Phone className="w-4 h-4" />{" "}
                    <span>{activeTrainer.contact.phone}</span>
                  </a>
                  <a
                    href={`mailto:${activeTrainer.contact.email}`}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Mail className="w-4 h-4" />{" "}
                    <span>{activeTrainer.contact.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;