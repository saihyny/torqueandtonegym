import React from "react";
import MaskedDiv from "././ui/masked-div";

// Define the type for the props
interface GroupedMaskedGalleryPageProps {
  isExpanded: boolean;
}

// Define the gallery items as an array of objects
const galleryItems = [
  {
    maskType: "type-1" as const,
    size: 0.45,
    className: "rotate-180",
    videoSrc:
      "https://videos.pexels.com/video-files/18069803/18069803-uhd_1440_2560_24fps.mp4",
  },
  {
    maskType: "type-1" as const,
    size: 0.45,
    className: "my-4",
    videoSrc:
      "https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4",
  },

  {
    maskType: "type-3" as const,
    className: "my-4",
    videoSrc:
      "https://videos.pexels.com/video-files/18069166/18069166-uhd_2560_1440_24fps.mp4",
  },
  {
    maskType: "type-4" as const,
    className: "my-4",
    videoSrc:
      "https://videos.pexels.com/video-files/18069701/18069701-uhd_2560_1440_24fps.mp4",
  },
  {
    maskType: "type-2" as const,
    className: "my-4",
    videoSrc:
      "https://videos.pexels.com/video-files/18069232/18069232-uhd_2560_1440_24fps.mp4",
  },
];

export function GroupedMaskedGalleryPage({
  isExpanded,
}: GroupedMaskedGalleryPageProps) {
  // Determine the number of items to display
  const itemsToShow = isExpanded ? galleryItems.length : 2;
  const visibleItems = galleryItems.slice(0, itemsToShow);

  return (
    <div className="items-between m-auto mt-40 flex max-w-5xl flex-wrap justify-center gap-5">
      {visibleItems.map((item, index) => (
        <MaskedDiv
          key={index}
          maskType={item.maskType}
          size={item.size}
          className={item.className}
        >
          <video
            className="cursor-pointer transition-all duration-300 hover:scale-105"
            autoPlay
            loop
            muted
          >
            <source src={item.videoSrc} type="video/mp4" />
          </video>
        </MaskedDiv>
      ))}
    </div>
  );
}
