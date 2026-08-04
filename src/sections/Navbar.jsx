import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX, Heart, Sparkles, X, Globe2 } from "lucide-react";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const audioRef = useRef(null);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowMusicPrompt(false);
        })
        .catch(err => console.log("Playback failed:", err));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Playback failed:", err));
      }
    }
  };

  // Scroll function to jump to the Confession Form
  const scrollToConfessionForm = () => {
    const formElement = document.getElementById("confession-input-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Scroll function to jump to the Explore Feed
  const scrollToExploreFeed = () => {
    const feedElement = document.getElementById("explore-feed");
    if (feedElement) {
      feedElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Music Popup Prompt Banner */}
      <AnimatePresence>
        {showMusicPrompt && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-0 w-full z-60 bg-linear-to-r from-neon-purple/90 via-neon-pink/90 to-purple-900/90 text-white px-4 py-2.5 flex items-center justify-center gap-3 shadow-lg backdrop-blur-md text-xs font-medium tracking-wide"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Want to immerse yourself with ambient background music?</span>
            <button
              onClick={startMusic}
              className="bg-white text-gray-900 px-3 py-1 rounded-full font-semibold hover:bg-gray-100 transition-all cursor-pointer shadow-sm"
            >
              Play Music 🎵
            </button>
            <button
              onClick={() => setShowMusicPrompt(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-all cursor-pointer ml-2"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed left-0 w-full z-50 px-6 py-4 md:px-12 flex items-center justify-between bg-midnight/30 backdrop-blur-md border-b border-white/5 transition-all duration-300 ${
          showMusicPrompt ? "top-10" : "top-0"
        }`}
      >
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

        {/* Right Controls Area */}
<div className="flex items-center gap-3">
          {/* Explore Feed Navigation Button */}
          <motion.button
            onClick={scrollToExploreFeed}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <Globe2 className="w-3.5 h-3.5 text-neon-purple" />
            <span>Explore Feed</span>
          </motion.button>

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
                <span>Ambient On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Audio Muted</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.nav>
    </>
  );
}