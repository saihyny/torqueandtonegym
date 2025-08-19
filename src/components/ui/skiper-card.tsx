// src/components/ui/skiper-card.tsx

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils"; // Make sure this path is correct

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);
  return prefersReducedMotion;
};

export const SkiperCard = ({
  children,
  title,
  description,
  background,
  className,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  background?: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const mouseXSpring = useSpring(mouseX, { stiffness: 400, damping: 100 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 400, damping: 100 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["1.5deg", "-1.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-1.5deg", "1.5deg"]
  );

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25;
    const y = (clientY - top - height / 2) / 25;
    mouseX.set(x);
    mouseY.set(y);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const cardStyle = {
    transform: "translateZ(50px)",
    transformStyle: "preserve-3d" as const,
    ...(prefersReducedMotion ? {} : { rotateX, rotateY }),
  };

  const glowStyle = {
    '--x': `${mouseXSpring.get()}px`,
    '--y': `${mouseYSpring.get()}px`,
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={cardStyle}
      className={cn("group relative w-full h-full rounded-2xl bg-gradient-to-br from-gray-900 to-black p-6 transition-shadow duration-300 hover:shadow-2xl hover:shadow-white/5", className)}
    >
        {/* Mouse-following glow for background and border */}
        <div 
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
          style={{
            background: `radial-gradient(400px circle at var(--x) var(--y), rgba(107, 114, 128, 0.4), transparent 80%)`,
            ...glowStyle
          }} 
        />
        
        {/* Custom background passed from parent */}
        {background}

        {/* Content */}
        <div className="relative z-10">
            <div className="flex-grow mb-4">
              {children}
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
            <p className="text-sm font-light text-zinc-400">
              {description}
            </p>
        </div>
    </motion.div>
  );
};