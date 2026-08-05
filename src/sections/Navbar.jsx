import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX, Heart, Sparkles, X, Globe2, Menu, Layers, BookOpen, Moon, Info } from "lucide-react";

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef(null);

  const startMusic = () => {
    setShowMusicPrompt(false);
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
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

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <audio ref={audioRef} loop src="/music.mp3" muted={!isPlaying} />

      {/* Music Prompt Banner */}
      <AnimatePresence>
        {showMusicPrompt && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full bg-linear-to-r from-neon-purple/95 via-neon-pink/95 to-purple-900/95 text-white px-4 py-2 flex items-center justify-center gap-2 shadow-lg backdrop-blur-md text-[11px] font-medium tracking-wide text-center overflow-hidden"
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

      {/* Main Navbar */}
      <nav className="w-full px-4 py-3 md:px-12 flex items-center justify-between backdrop-blur-md border-b bg-[#0b0f19]/80 border-white/5 transition-all">
        {/* Logo Area */}
        <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="logo.png" alt="Logo" className="h-8 w-auto md:h-10 object-contain" />
          <span className="text-base md:text-xl font-bold tracking-widest text-white">
            MEMOIRS
          </span>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={() => scrollToSection("about-section")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-medium tracking-wide uppercase bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-purple-400" />
            <span>About</span>
          </button>

          <button
            onClick={() => scrollToSection("explore-feed")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-medium tracking-wide uppercase bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Globe2 className="w-3.5 h-3.5 text-neon-purple" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => scrollToSection("confession-input-form")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-linear-to-r from-neon-purple to-neon-pink text-white shadow-md transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Confess</span>
          </button>

          <button
            onClick={() => scrollToSection("confession-levels")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-medium tracking-wide uppercase bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-neon-pink" />
            <span>Levels</span>
          </button>

          <button
            onClick={() => scrollToSection("memory-wall")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-medium tracking-wide uppercase bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Wall</span>
          </button>

          <button
            onClick={() => scrollToSection("midnight-quotes")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-medium tracking-wide uppercase bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Quotes</span>
          </button>

          <button
            onClick={() => scrollToSection("world-map")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-medium tracking-wide uppercase bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Globe2 className="w-3.5 h-3.5 text-neon-pink" />
            <span>World Map</span>
          </button>

          <button
            onClick={toggleMusic}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-medium tracking-wide uppercase transition-all border cursor-pointer ${
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
      </nav>

      {/* Mobile Dropdown Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-0 top-full bg-[#0b0f19]/95 backdrop-blur-xl border-b border-white/10 p-5 flex flex-col gap-3 shadow-2xl lg:hidden"
          >
            <button
              onClick={() => scrollToSection("about-section")}
              className="flex items-center gap-3 w-full py-2.5 px-4 rounded-xl text-xs font-medium uppercase bg-white/5 border border-white/10 text-white cursor-pointer"
            >
              <Info className="w-4 h-4 text-purple-400" />
              <span>About</span>
            </button>

            <button
              onClick={() => scrollToSection("explore-feed")}
              className="flex items-center gap-3 w-full py-2.5 px-4 rounded-xl text-xs font-medium uppercase bg-white/5 border border-white/10 text-white cursor-pointer"
            >
              <Globe2 className="w-4 h-4 text-neon-purple" />
              <span>Explore Feed</span>
            </button>

            <button
              onClick={() => scrollToSection("confession-input-form")}
              className="flex items-center gap-3 w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase bg-linear-to-r from-neon-purple to-neon-pink text-white shadow-md cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Confess Your Feeling</span>
            </button>

            <button
              onClick={() => scrollToSection("confession-levels")}
              className="flex items-center gap-3 w-full py-2.5 px-4 rounded-xl text-xs font-medium uppercase bg-white/5 border border-white/10 text-white cursor-pointer"
            >
              <Layers className="w-4 h-4 text-neon-pink" />
              <span>Confession Levels</span>
            </button>

            <button
              onClick={() => scrollToSection("memory-wall")}
              className="flex items-center gap-3 w-full py-2.5 px-4 rounded-xl text-xs font-medium uppercase bg-white/5 border border-white/10 text-white cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Memory Wall</span>
            </button>

            <button
              onClick={() => scrollToSection("midnight-quotes")}
              className="flex items-center gap-3 w-full py-2.5 px-4 rounded-xl text-xs font-medium uppercase bg-white/5 border border-white/10 text-white cursor-pointer"
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Midnight Quotes</span>
            </button>

            <button
              onClick={() => scrollToSection("world-map")}
              className="flex items-center gap-3 w-full py-2.5 px-4 rounded-xl text-xs font-medium uppercase bg-white/5 border border-white/10 text-white cursor-pointer"
            >
              <Globe2 className="w-4 h-4 text-neon-pink" />
              <span>World Map</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}