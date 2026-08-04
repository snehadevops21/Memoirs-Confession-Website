import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AmbientBackground() {
  // Track mouse coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse tracking animation (Apple-level physics)
  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset by 200px so the glow centers exactly under the mouse pointer
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate 20 random positions for floating particles
  const particles = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 -z-50 bg-midnight overflow-hidden select-none pointer-events-none">
      {/* 1. Interactive Mouse Glow Spotlight */}
      <motion.div
        className="absolute w-400px h-400px rounded-full bg-linear-to-r from-neon-purple/10 to-neon-pink/10 blur-[100px]"
        style={{ x: glowX, y: glowY }}
      />

      {/* 2. Static Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-neon-purple/5 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-neon-pink/5 blur-[120px] animate-pulse-slow" />

      {/* 3. Floating Cinematic Particles */}
      {particles.map((_, i) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomScale = Math.random() * 3 + 1;
        const randomDuration = Math.random() * 20 + 10;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/25 blur-[1px]"
            style={{
              width: randomScale,
              height: randomScale,
              left: `${randomX}%`,
              top: `${randomY}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.1, 0.7, 0.1],
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}