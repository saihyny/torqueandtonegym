import React from 'react';
import { useInView } from 'react-intersection-observer';

interface VideoPlayerProps {
  src: string;
  poster?: string; // Optional poster image
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  threshold?: number; // Intersection Observer threshold
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  className = '',
  threshold = 0.5, // Default to 50% visibility
}) => {
  const { ref, inView } = useInView({
    threshold: threshold,
    triggerOnce: true, // Load once and then stop observing
  });

  return (
    <div ref={ref} className={className} style={{ minHeight: '100px' }}> {/* Add a min-height to prevent layout shifts */}
      {inView ? (
        <video
          className="w-full h-full" // Ensure video fills its container
          src={src}
          poster={poster}
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline // Important for mobile autoplay
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400"
          style={{ minHeight: '200px' }} // Placeholder height
        >
          Loading Video...
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;