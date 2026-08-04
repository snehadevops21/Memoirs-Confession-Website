import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX, Heart } from "lucide-react";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  // Attempt to autoplay muted on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(true);
        })
        .catch(err => console.log("Autoplay blocked:", err));
    }
  }, []);

  // Toggle playback and handle audio logic
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying && isMuted) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // If it's paused or muted, play and unmute
        audioRef.current.muted = false;
        audioRef.current.play().catch(err => console.log("Playback failed:", err));
        setIsPlaying(true);
        setIsMuted(false);
      }
    }
  };

  // Automatically start music on the very first user interaction (click/touch anywhere)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => console.log("Autoplay blocked by browser policy:", err));
      }
      // Clean up listeners after the first interaction fires successfully
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("scroll", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, []);

// Scroll function to jump to the ConfessionForm
  const scrollToConfessionForm = () => {
    const formElement = document.getElementById("confession-input-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 flex items-center justify-between bg-midnight/30 backdrop-blur-md border-b border-white/5"
    >
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop src="/music.mp3" />

      {/* Logo Area */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img 
          src="logo.png" 
          alt="Logo" 
          className="h-10 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]" 
        />
        <span className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-white via-purple-300 to-white/80 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]">
          MEMOIRS
        </span>
      </motion.div>

{/* Right Controls Area: Music Toggle + Confess CTA */}
      <div className="flex items-center gap-4">
        {/* Confess Your Feeling CTA Button */}
        <motion.button
          onClick={scrollToConfessionForm}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-linear-to-r from-neon-purple to-neon-pink text-white shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all cursor-pointer"
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Confess Your Feeling</span>
        </motion.button>

        {/* Music Toggle Area */}
        <motion.button
          onClick={toggleMusic}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 border backdrop-blur-sm cursor-pointer ${
            isPlaying 
              ? "bg-neon-purple/10 border-neon-purple/30 text-neon-purple shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
              : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
          }`}
        >
          {isPlaying ? (
            <>
              <motion.span 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-neon-purple rounded-full"
              />
              <Music className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ambient On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Audio Muted</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.nav>
  );
}