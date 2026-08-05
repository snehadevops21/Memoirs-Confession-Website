import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX, Heart, Sparkles, X, Globe2, Menu } from "lucide-react";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const scrollToConfessionForm = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById("confession-input-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToExploreFeed = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById("explore-feed");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <AnimatePresence>
        {showMusicPrompt && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-0 left-0 w-full z-60 bg-linear-to-r from-neon-purple/95 via-neon-pink/95 to-purple-900/95 text-white px-4 py-2 flex items-center justify-center gap-2 shadow-lg backdrop-blur-md text-[11px] font-medium tracking-wide text-center"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
            <span className="truncate">Want to immerse with ambient music?</span>
            <button
              onClick={startMusic}
              className="bg-white text-gray-900 px-2.5 py-0.5 rounded-full font-semibold hover:bg-gray-100 transition-all cursor-pointer shadow-sm shrink-0"
            >
              Play 🎵
            </button>
            <button
              onClick={() => setShowMusicPrompt(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-all cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed left-0 w-full z-50 px-4 py-3 md:px-12 flex items-center justify-between backdrop-blur-md border-b transition-all duration-300 ${
          showMusicPrompt ? "top-8 md:top-10" : "top-0"
        } bg-[#0b0f19]/80 border-white/5`}
      >
        <audio ref={audioRef} loop src="/music.mp3" />

        {/* Logo Area */}
        <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="logo.png" alt="Logo" className="h-8 w-auto md:h-10 object-contain" />
          <span className="text-base md:text-xl font-bold tracking-widest text-white">
            MEMOIRS
          </span>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={scrollToExploreFeed}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Globe2 className="w-3.5 h-3.5 text-neon-purple" />
            <span>Explore Feed</span>
          </button>

          <button
            onClick={scrollToConfessionForm}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-linear-to-r from-neon-purple to-neon-pink text-white shadow-md transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Confess Your Feeling</span>
          </button>

          <button
            onClick={toggleMusic}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all border cursor-pointer ${
              isPlaying 
                ? "bg-neon-purple/10 border-neon-purple/30 text-neon-purple" 
                : "bg-white/5 border-white/10 text-gray-400"
            }`}
          >
            {isPlaying ? <Music className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Ambient On" : "Muted"}</span>
          </button>
        </div>

        {/* Mobile / Tablet Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleMusic}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isPlaying ? "bg-neon-purple/20 border-neon-purple/40 text-neon-purple" : "bg-white/5 border-white/10 text-gray-400"
            }`}
          >
            {isPlaying ? <Music className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0b0f19]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl lg:hidden"
          >
            <button
              onClick={scrollToExploreFeed}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-medium uppercase bg-white/5 border border-white/10 text-white cursor-pointer"
            >
              <Globe2 className="w-4 h-4 text-neon-purple" />
              <span>Explore Feed</span>
            </button>

            <button
              onClick={scrollToConfessionForm}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-semibold uppercase bg-linear-to-r from-neon-purple to-neon-pink text-white shadow-md cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Confess Your Feeling</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}