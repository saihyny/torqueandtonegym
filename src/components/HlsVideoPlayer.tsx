import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';
import { useInView } from 'react-intersection-observer';

interface HlsVideoPlayerProps {
  src: string; // Path to the master .m3u8 playlist
  poster?: string; // Optional poster image
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  threshold?: number; // Intersection Observer threshold
}

const HlsVideoPlayer: React.FC<HlsVideoPlayerProps> = ({
  src,
  poster,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  className = '',
  threshold = 0.5,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const { ref, inView } = useInView({
    threshold: threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current && inView) {
      const video = videoRef.current;

      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play().catch(error => console.error("Video autoplay failed:", error));
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error("Fatal network error, trying to recover:", data);
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error("Fatal media error, trying to recover:", data);
              hls.recoverMediaError();
              break;
            default:
              console.error("Fatal HLS error, destroying HLS instance:", data);
              hls.destroy();
              break;
          }
        }
      });

      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
      };
    } else if (!Hls.isSupported() && videoRef.current && inView) {
      // Fallback for browsers that don't support HLS natively (e.g., older browsers)
      // They might support native playback of .m3u8 if it's a simple stream, but hls.js is for adaptive.
      // For broader compatibility, you might consider a <source> tag with .mp4 fallback here.
      videoRef.current.src = src;
      if (autoPlay) {
        videoRef.current.play().catch(error => console.error("Video autoplay failed:", error));
      }
    }
  }, [src, autoPlay, inView]);

  return (
    <div ref={ref} className={className} style={{ minHeight: '100px' }}>
      {inView ? (
        <video
          ref={videoRef}
          className="w-full h-full"
          poster={poster}
          controls={controls}
          loop={loop}
          muted={muted}
          playsInline
        >
          Your browser does not support the video tag or HLS playback.
        </video>
      ) : (
        <div
          className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400"
          style={{ minHeight: '200px' }}
        >
          Loading HLS Video...
        </div>
      )}
    </div>
  );
};

export default HlsVideoPlayer;