import React, { useState, useEffect } from "react";
import MaskedDiv from "./ui/masked-div"; // Adjust path as needed
import { equipmentData, EquipmentItem } from "@/data/equipmentData"; // Adjust path as needed

// Re-using the MaskedDivWithCarousel component from before, it's perfect for internal image cycling.
// IMPORTANT: Keep this component identical to the one provided in the previous response,
// or ensure it's in a shared utility file if used in multiple places.
interface MaskedDivWithCarouselProps {
  item: EquipmentItem;
  maskType: "type-1" | "type-2" | "type-3";
  size: number;
  className?: string;
  interval?: number; // Time in ms to change images
}

const MaskedDivWithCarousel: React.FC<MaskedDivWithCarouselProps> = ({
  item,
  maskType,
  size,
  className,
  interval = 3000, // Default to 3 seconds for internal image change
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Reset image index when the item (equipmentData) changes
    setCurrentImageIndex(0);
    if (item.imagePaths.length <= 1) return; // No need for carousel if 0 or 1 image

    const imageChangeInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % item.imagePaths.length
      );
    }, interval);

    return () => clearInterval(imageChangeInterval); // Cleanup on unmount
  }, [item, interval]); // Dependency on 'item' means reset when the item itself changes

  const currentImagePath = item.imagePaths[currentImageIndex];

  return (
    <MaskedDiv
      maskType={maskType}
      size={size}
      className={className}
    >
      {currentImagePath ? (
        <img
          src={currentImagePath}
          alt={`${item.name} - ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
    </MaskedDiv>
  );
};

// New component for the 4-div responsive layout
export function GroupedMaskedGalleryPage() {
  const itemsPerView = 4; // We will always show 4 masked divs
  const [startIndex, setStartIndex] = useState(0); // Index for the first item displayed

  // Calculate the items that will be displayed in the 4 slots
  const displayedItems = Array.from({ length: itemsPerView }).map((_, i) => {
    const itemIndex = (startIndex + i) % equipmentData.length;
    return equipmentData[itemIndex];
  });

  const goToNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % equipmentData.length);
  };

  const goToPrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + equipmentData.length) % equipmentData.length);
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-between items-center bg-gray-900 text-white p-4 sm:p-6 md:p-8">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 mt-4 sm:mt-8">Our Equipment Showcase</h2>

      <div className="flex-grow w-full max-w-screen-xl flex flex-col justify-center items-center">
        {/* Main content grid for 4 divs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full max-h-[calc(100vh-200px)]"> {/* Adjust max-h based on header/footer */}
          {displayedItems.map((item, index) => (
            <div key={item.name + index} className="flex flex-col items-center justify-center p-2 bg-gray-800 rounded-lg shadow-lg relative overflow-hidden">
              <MaskedDivWithCarousel
                item={item}
                maskType={"type-4"} // Enforce type-1
                size={1} // Make the masked div take up available space within its container
                className="w-full h-full flex items-center justify-center" // Ensure it fills its parent
                interval={4000} // Images inside masked div change every 4 seconds
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent  p-4 pt-8 text-center">
                <h3 className="text-white text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons below the grid */}
      <div className="flex justify-center items-center gap-8 mt-8 mb-4">
        <button
          onClick={goToPrev}
          className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 focus:outline-none text-xl w-12 h-12 flex items-center justify-center"
          aria-label="Previous equipment set"
        >
          {'<'}
        </button>
        <button
          onClick={goToNext}
          className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 focus:outline-none text-xl w-12 h-12 flex items-center justify-center"
          aria-label="Next equipment set"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}