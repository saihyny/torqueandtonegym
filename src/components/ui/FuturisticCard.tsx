// src/components/ui/FuturisticCard.tsx
import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface FuturisticCardProps {
  children: ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const FuturisticCard = ({ children, className, ...props }: FuturisticCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glowingBorder, setGlowingBorder] = useState<'top' | 'right' | 'bottom' | 'left'>('top');
  const cardRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });

      // Determine which border is closest to the cursor
      const topDist = y;
      const bottomDist = rect.height - y;
      const leftDist = x;
      const rightDist = rect.width - x;

      const minDist = Math.min(topDist, bottomDist, leftDist, rightDist);
      if (minDist === topDist) setGlowingBorder('top');
      else if (minDist === bottomDist) setGlowingBorder('bottom');
      else if (minDist === leftDist) setGlowingBorder('left');
      else setGlowingBorder('right');
    }
  };

  useEffect(() => {
    controls.start({
      '--x': `${mousePosition.x}px`,
      '--y': `${mousePosition.y}px`,
      transition: { type: 'spring', stiffness: 300, damping: 30, mass: 0.5 },
    });
  }, [mousePosition, controls]);

  const borderVariants = {
    initial: { opacity: 0.3 },
    hover: { opacity: 1 },
    top: { top: 0, right: 'auto', bottom: 'auto', left: 0, width: '100%', height: '2px' },
    right: { top: 0, right: 0, bottom: 'auto', left: 'auto', width: '2px', height: '100%' },
    bottom: { top: 'auto', right: 0, bottom: 0, left: 'auto', width: '100%', height: '2px' },
    left: { top: 0, right: 'auto', bottom: 'auto', left: 0, width: '2px', height: '100%' },
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        ref={cardRef}
        className={`relative p-8 w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl
                    bg-white/10 backdrop-blur-lg border border-white/20
                    ${className}`}
        onMouseMove={handleMouseMove}
        initial="initial"
        whileHover="hover"
        animate={controls}
        {...props}
        style={{
          // Custom properties for the radial cursor glow
          '--x': `${mousePosition.x}px`,
          '--y': `${mousePosition.y}px`,
        } as React.CSSProperties}
      >
        {/* Animated Background Gradient (Soft Neon Glow) */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, hsl(240, 100%, 80%), hsl(280, 100%, 80%), hsl(320, 100%, 80%))',
          }}
          animate={{
            filter: ['blur(40px)', 'blur(60px)', 'blur(40px)'],
            opacity: [0.5, 0.7, 0.5],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Radial Cursor Glow */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(350px at var(--x) var(--y), rgba(150, 100, 255, 0.25), transparent 80%)`,
          }}
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
        
        {/* Border Glows */}
        {['top', 'right', 'bottom', 'left'].map((border) => (
          <motion.div
            key={border}
            className="absolute z-20 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            variants={borderVariants}
            animate={glowingBorder === border ? 'hover' : 'initial'}
            // @ts-ignore
            custom={border}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={borderVariants[border as keyof typeof borderVariants]}
          />
        ))}

        {/* Content */}
        <div className="relative z-20">
            {/* Placeholder Content Example */}
            {/* <h2 className="text-4xl font-bold text-white mb-4">Futuristic Card</h2>
            <p className="text-lg text-white/80 mb-6">
            This card features a glassmorphism background, a dynamic neon border, and a radial glow that follows your cursor.
            </p>
            <button className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-200">
            Learn More
            </button> */}
            {children}
        </div>
      </motion.div>
    </div>
  );
};

export default FuturisticCard;