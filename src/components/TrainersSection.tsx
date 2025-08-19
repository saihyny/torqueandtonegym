import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Badge } from "@/components/ui/badge"; // Assuming you have this component
import { Instagram, Twitter, Linkedin } from "lucide-react";

// CSS Imports
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./ui/swiper-custom.css"; // Your custom styles for pagination

// --- REUSABLE CARD CAROUSEL COMPONENT (Modified) ---

interface CarouselProps {
  items: {
    id: number | string;
    Component: React.ComponentType;
  }[];
  autoplayDelay?: number;
}

const CardCarousel: React.FC<CarouselProps> = ({
  items,
  autoplayDelay = 5000,
}) => {
  return (
    // This is the main container that holds the background cards and the Swiper
    <div className="relative w-[450px] h-[550px]">
      {/* Background Card 2 (Furthest Back) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#2a2a2e] border border-white/10 rounded-2xl transform-gpu rotate-[-4deg] scale-[0.90] translate-y-[20px] z-10"></div>
      
      {/* Background Card 1 (Middle) */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#2a2a2e] border border-white/10 rounded-2xl transform-gpu rotate-[2deg] scale-[0.95] translate-y-[10px] z-20"></div>

      {/* This div is now the front card that CONTAINS the Swiper */}
      <div className="relative z-30 w-full h-full bg-[#1c1c1d] border border-white/10 rounded-2xl p-4 overflow-hidden">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: -80,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="w-full h-full"
        >
          {items.map((item) => (
            <SwiperSlide
              key={item.id}
              // Adjusted width and height to fit inside the new padded container
              className="!w-[400px] !h-[450px] rounded-2xl overflow-hidden bg-gray-900"
            >
              <item.Component />
            </SwiperSlide>
          ))}
          
          {/* The pagination element is now inside the Swiper container */}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </div>
  );
};

// --- TRAINERS SECTION COMPONENT (Your Existing Logic) ---

const TrainersSection = () => {
  // Your existing trainers data
  const trainers = [
    {
      id: 1,
      name: 'Marcus Steel',
      specialty: 'Strength & Conditioning',
      bio: 'Former Olympic weightlifting competitor specializing in strength training and athletic performance.',
      image: 'https://cdn.qwenlm.ai/output/f4a73dc5-136f-4636-abd8-42b2379febd7/t2i/39827052-bdcb-4469-9e82-55d768617375/1755540039.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiZjRhNzNkYzUtMTM2Zi00NjM2LWFiZDgtNDJiMjM3OWZlYmQ3IiwicmVzb3VyY2VfaWQiOiIxNzU1NTQwMDM5IiwicmVzb3VyY2VfY2hhdF9pZCI6ImNkYzA2OTM2LTQ1YjUtNDljNS1hOGYwLTlhOGVhZDkzNWQwZSJ9.2XpKWby-pG1W_DuoRnsBGyaCjDSl6A8XZo8Bwk5jVQk&x-oss-process=image/resize,m_mfit,w_450,h_450',
      socialLinks: { instagram: '#', twitter: '#', linkedin: '#' }
    },
    {
      id: 2,
      name: 'Sarah Phoenix',
      specialty: 'HIIT & Cardio',
      bio: 'High-energy trainer who loves pushing clients to their cardiovascular limits.',
      image: 'https://cdn.qwenlm.ai/output/f4a73dc5-136f-4636-abd8-42b2379febd7/t2i/39827052-bdcb-4469-9e82-55d768617375/1755540039.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiZjRhNzNkYzUtMTM2Zi00NjM2LWFiZDgtNDJiMjM3OWZlYmQ3IiwicmVzb3VyY2VfaWQiOiIxNzU1NTQwMDM5IiwicmVzb3VyY2VfY2hhdF9pZCI6ImNkYzA2OTM2LTQ1YjUtNDljNS1hOGYwLTlhOGVhZDkzNWQwZSJ9.2XpKWby-pG1W_DuoRnsBGyaCjDSl6A8XZo8Bwk5jVQk&x-oss-process=image/resize,m_mfit,w_450,h_450', 
      socialLinks: { instagram: '#', twitter: '#', linkedin: '#' }
    },
     {
      id: 3,
      name: 'Sarah Phoenix',
      specialty: 'HIIT & Cardio',
      bio: 'High-energy trainer who loves pushing clients to their cardiovascular limits.',
      image: 'https://cdn.qwenlm.ai/output/f4a73dc5-136f-4636-abd8-42b2379febd7/t2i/39827052-bdcb-4469-9e82-55d768617375/1755540039.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiZjRhNzNkYzUtMTM2Zi00NjM2LWFiZDgtNDJiMjM3OWZlYmQ3IiwicmVzb3VyY2VfaWQiOiIxNzU1NTQwMDM5IiwicmVzb3VyY2VfY2hhdF9pZCI6ImNkYzA2OTM2LTQ1YjUtNDljNS1hOGYwLTlhOGVhZDkzNWQwZSJ9.2XpKWby-pG1W_DuoRnsBGyaCjDSl6A8XZo8Bwk5jVQk&x-oss-process=image/resize,m_mfit,w_450,h_450', 
      socialLinks: { instagram: '#', twitter: '#', linkedin: '#' }
    },
     {
      id: 3,
      name: 'Sarah Phoenix',
      specialty: 'HIIT & Cardio',
      bio: 'High-energy trainer who loves pushing clients to their cardiovascular limits.',
      image: 'https://cdn.qwenlm.ai/output/f4a73dc5-136f-4636-abd8-42b2379febd7/t2i/39827052-bdcb-4469-9e82-55d768617375/1755540039.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiZjRhNzNkYzUtMTM2Zi00NjM2LWFiZDgtNDJiMjM3OWZlYmQ3IiwicmVzb3VyY2VfaWQiOiIxNzU1NTQwMDM5IiwicmVzb3VyY2VfY2hhdF9pZCI6ImNkYzA2OTM2LTQ1YjUtNDljNS1hOGYwLTlhOGVhZDkzNWQwZSJ9.2XpKWby-pG1W_DuoRnsBGyaCjDSl6A8XZo8Bwk5jVQk&x-oss-process=image/resize,m_mfit,w_450,h_450', 
      socialLinks: { instagram: '#', twitter: '#', linkedin: '#' }
    },
     {
      id: 4,
      name: 'Sarah Phoenix',
      specialty: 'HIIT & Cardio',
      bio: 'High-energy trainer who loves pushing clients to their cardiovascular limits.',
      image: 'https://cdn.qwenlm.ai/output/f4a73dc5-136f-4636-abd8-42b2379febd7/t2i/39827052-bdcb-4469-9e82-55d768617375/1755540039.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiZjRhNzNkYzUtMTM2Zi00NjM2LWFiZDgtNDJiMjM3OWZlYmQ3IiwicmVzb3VyY2VfaWQiOiIxNzU1NTQwMDM5IiwicmVzb3VyY2VfY2hhdF9pZCI6ImNkYzA2OTM2LTQ1YjUtNDljNS1hOGYwLTlhOGVhZDkzNWQwZSJ9.2XpKWby-pG1W_DuoRnsBGyaCjDSl6A8XZo8Bwk5jVQk&x-oss-process=image/resize,m_mfit,w_450,h_450', 
      socialLinks: { instagram: '#', twitter: '#', linkedin: '#' }
    },
     {
      id: 5,
      name: 'Sarah Phoenix',
      specialty: 'HIIT & Cardio',
      bio: 'High-energy trainer who loves pushing clients to their cardiovascular limits.',
      image: 'https://cdn.qwenlm.ai/output/f4a73dc5-136f-4636-abd8-42b2379febd7/t2i/39827052-bdcb-4469-9e82-55d768617375/1755540039.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiZjRhNzNkYzUtMTM2Zi00NjM2LWFiZDgtNDJiMjM3OWZlYmQ3IiwicmVzb3VyY2VfaWQiOiIxNzU1NTQwMDM5IiwicmVzb3VyY2VfY2hhdF9pZCI6ImNkYzA2OTM2LTQ1YjUtNDljNS1hOGYwLTlhOGVhZDkzNWQwZSJ9.2XpKWby-pG1W_DuoRnsBGyaCjDSl6A8XZo8Bwk5jVQk&x-oss-process=image/resize,m_mfit,w_450,h_450', 
      socialLinks: { instagram: '#', twitter: '#', linkedin: '#' }
    },
    // ... add other trainers here
  ];

  const carouselItems = trainers.map(trainer => ({
    id: trainer.id,
    Component: () => (
      <div className="relative w-full h-full text-white">
        <img 
          src={trainer.image} 
          alt={trainer.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end h-full p-6 space-y-3">
          <Badge 
            variant="secondary" 
            className="bg-primary/20 text-primary border-primary/30 self-start backdrop-blur-sm"
          >
            {trainer.specialty}
          </Badge>
          <h3 className="text-3xl font-bold font-oswald text-white drop-shadow-md">
            {trainer.name}
          </h3>
          <p className="text-sm text-gray-300 drop-shadow-sm leading-relaxed">
            {trainer.bio}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href={trainer.socialLinks.instagram} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300 backdrop-blur-sm"><Instagram className="w-4 h-4" /></a>
            <a href={trainer.socialLinks.twitter} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300 backdrop-blur-sm"><Twitter className="w-4 h-4" /></a>
            <a href={trainer.socialLinks.linkedin} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300 backdrop-blur-sm"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <section className="section bg-background relative py-16 lg:py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold">ELITE TRAINERS</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Meet our world-class team of certified trainers. Each brings unique expertise, 
              passion, and dedication to help you achieve your fitness goals.
            </p>
          </div>
          
          {/* Container to center the new stacked card carousel */}
          <div className="h-[600px] flex items-center justify-center">
            <CardCarousel items={carouselItems} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainersSection;