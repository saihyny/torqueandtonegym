import { ReactNode } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

interface ThemedGlowCardProps {
  children: ReactNode;
  className?: string;
}

const ThemedGlowCard = ({ children, className }: ThemedGlowCardProps) => {
  // Motion values to track the mouse position reactively
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // This function updates the mouseX and mouseY motion values on mouse move
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    // The main container acts as a "group" to trigger hover effects on children
    // and captures the mouse movement for the entire card area.
    <div
      className={`group relative w-full max-w-6xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* 
        This is the glowing "torch" effect.
        - It's positioned slightly outside the parent (-inset-px) to create the border glow.
        - It starts with opacity-0 and transitions to opacity-100 only on 'group-hover'.
        - The background is a large, soft radial gradient centered on the mouse position.
          This creates both the content spotlight and the border glow in one element.
      */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 border-3 border-white/30 glow-pulse "
        style={{
          background: useMotionTemplate`
            radial-gradient(
              900px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.30), /* Theme-matched pink glow */
              transparent 80%
            )
          `,
        }}
      />
      
      {/* The main visible card with the glassmorphism effect and content */}
      <div className="relative rounded-xl border border-white/10 bg-black/30 p-8 shadow-2xl backdrop-blur-md">
        {children}
      </div>
    </div>
  );
};

export default ThemedGlowCard;