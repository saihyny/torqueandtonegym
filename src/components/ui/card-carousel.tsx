import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

// CSS Imports
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./swiper-custom.css"; // We still need our custom styles for the dots

interface CarouselProps {
  items: {
    id: number | string;
    Component: React.ComponentType;
  }[];
  autoplayDelay?: number;
}

export const CardCarousel: React.FC<CarouselProps> = ({
  items,
  autoplayDelay = 5000,
}) => {
  return (
    // This is the outer frame that matches the documentation's style
    <div className="w-full max-w-6xl mx-auto p-4 rounded-2xl bg-[#1c1c1d]/30 border border-white/10 backdrop-blur-sm">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        // This is the key change for spacing and appearance
        coverflowEffect={{
          rotate: 0,
          stretch: -80, // Creates space between slides
          depth: 200,   // Increases the 3D effect
          modifier: 1,  // Controls how slides are scaled
          slideShadows: false, // Disabling shadows for a cleaner look
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
        className="w-full"
      >
        {items.map((item) => (
          <SwiperSlide
            key={item.id}
            // Note the explicit width and height to maintain consistency
            className="!w-[400px] !h-[500px] rounded-2xl overflow-hidden bg-gray-900"
          >
            <item.Component />
          </SwiperSlide>
        ))}
        
        {/* The pagination element is now inside the styled frame */}
        <div className="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};