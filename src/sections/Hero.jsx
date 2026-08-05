import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Hero() {
  // Stagger variants to orchestrate child animations sequentially
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full pt-6 pb-8 flex flex-col items-center justify-center overflow-hidden bg-[#05020a]"
    >
      {/* Ambient background glows to absorb any empty space beautifully */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 w-600px h-350px rounded-full bg-linear-to-r from-neon-purple/10 to-neon-pink/5 blur-[140px] -z-10 pointer-events-none" />
      
      {/* Main Animated Logo Stage */}
      <div className="relative w-72 h-72 -mt-6 sm:-mt-10 flex items-center justify-center select-none scale-110 sm:scale-125">
        
        {/* 1. The Revolving Circular Text Ring - Brought right up close to the logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          className="absolute inset-0 w-full h-full"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
            <defs>
              {/* Radius reduced to 54 for a much tighter orbit around the logo container */}
              <path
                id="heroTextOrbitPath"
                d="M 100, 100 m -54, 0 a 54,54 0 1,1 108,0 a 54,54 0 1,1 -108,0"
              />
              {/* Neon color gradient map matching your dark theme */}
              <linearGradient id="heroNeonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <text fill="url(#heroNeonGradient)" className="font-mono text-[7px] tracking-[3.5px] uppercase font-semibold">
              <textPath href="#heroTextOrbitPath" startOffset="0%">
                Memoirs • Memoirs • Memoirs •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* 2. Central Pulse-Glowing Logo Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.03, 1],
            boxShadow: [
              "0 0 25px rgba(168, 85, 247, 0.15)", 
              "0 0 50px rgba(236, 72, 153, 0.3)", 
              "0 0 25px rgba(168, 85, 247, 0.15)"
            ]
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            boxShadow: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
          className="w-28 h-28 rounded-full bg-[#090414] border border-white/10 flex items-center justify-center relative p-1 z-10 backdrop-blur-md"
        >
          {/* Main Logo Image Layer */}
          <img 
            src="/logo.png" 
            alt="Memoirs Logo" 
            className="w-full h-full object-contain rounded-full opacity-95 drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `
                <div class="text-2xl font-serif text-pink-200 opacity-80 select-none animate-pulse">M</div>
              `;
            }}
          />
        </motion.div>

        {/* Framing Ring overlay adjusted closer as well */}
        <div className="absolute w-140px h-140px rounded-full border border-white/0.03 pointer-events-none" />
      </div>

      {/* Hero Headline Deck */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="text-center mt-2 z-10 space-y-1"
      >
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-gray-500 block">
          The Vault of Unspoken Whispers
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold font-sans tracking-tight text-white opacity-95">
          Memoirs
        </h1>
      </motion.div>

      {/* Mobile Quick Confess Button */}
      <div className="flex justify-center mt-4 mb-2 lg:hidden">
        <button
          onClick={() => {
            const el = document.getElementById("confession-input-form");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
              // Optional: if your confession form has an internal trigger/state to open or focus:
              // const inputField = el.querySelector("input, textarea");
              // if (inputField) inputField.focus();
            }
          }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-linear-to-r from-neon-purple to-neon-pink text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] active:scale-95 transition-all cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-current" />
          <span>Confess Your Feeling</span>
        </button>
      </div>

    </motion.div>
  );
}