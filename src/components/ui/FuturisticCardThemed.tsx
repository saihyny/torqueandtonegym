// src/components/ui/FuturisticCardThemed.tsx
import { ReactNode } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

interface FuturisticCardProps {
  children: ReactNode;
  className?: string;
}

const FuturisticCardThemed = ({ children, className }: FuturisticCardProps) => {
  // Motion values to track the mouse position reactively
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // This function updates the mouseX and mouseY motion values
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    // The main container acts as a "group" for hover effects and handles mouse movement
    <motion.div
      className={`group relative w-full max-w-6xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* This div creates the dynamic "torch" and border glow effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          // useMotionTemplate allows us to create dynamic CSS properties
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(236, 72, 153, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* This div adds a subtle, flickering/pulsating border */}
      <motion.div
          className="pointer-events-none absolute -inset-0.5 rounded-xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-75"
          style={{
            background: `linear-gradient(135deg, #E63946, #F4ACB7)`, // Red-to-Pink gradient matching the theme
          }}
          animate={{
              opacity: [0, 0.75, 0, 0.75, 0], // Creates a flickering effect
          }}
          transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
          }}
      />

      {/* The main visible card with the glassmorphism effect and content */}
      <div className="relative w-full rounded-xl border border-white/10 bg-black/30 backdrop-blur-md p-8 shadow-2xl">
        {children}
      </div>
    </motion.div>
  );
};

export default FuturisticCardThemed;