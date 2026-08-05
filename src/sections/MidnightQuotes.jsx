import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MidnightQuotes() {
  const quotes = [
    "We are all looking at the same moon, holding completely different secrets.",
    "Sometimes, the heaviest things we carry are the words we never got to say.",
    "In the quiet of midnight, our thoughts speak the loudest.",
    "We cross paths with strangers who know the versions of us we spent years trying to forget.",
    "It hurts to watch someone you love transform into a memory right in front of your eyes.",
    "Perhaps some letters are meant to be written, loved, and left entirely unsent."
  ];

  const [index, setIndex] = useState(0);

  // Automatically cycle through quotes every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <section id ="midnight-quotes" className="py-8 px-3 relative max-w-5xl mx-auto border-t border-white/5 overflow-hidden text-center flex flex-col items-center justify-center min-h-[40vh]">
      {/* 1. Immersive Midnight Star Field Background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px 24px] opacity-60 pointer-events-none" />
      
      {/* Soft central ambient light spot */}
      <div className="absolute w-64 h-64 rounded-full bg-neon-purple/5 blur-[80px] -z-10" />

      {/* 2. Subtitle Label */}
      <motion.span 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        viewport={{ once: true }}
        className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400 mb-8 block"
      >
        Midnight Reflections
      </motion.span>

      {/* 3. Smooth Text Transition Stage */}
      <div className="max-w-3xl min-h-80px flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="text-xl sm:text-2xl md:text-3xl font-light text-transparent bg-clip-text bg-linear-to-b from-white via-gray-200 to-gray-400 leading-relaxed tracking-wide font-serif italic selection:bg-neon-pink/20"
          >
            "{quotes[index]}"
          </motion.p>
        </AnimatePresence>
      </div>

      {/* 4. Elegant Minimal Pagination Dials */}
      <div className="flex items-center gap-2 mt-8 z-10">
        {quotes.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
              index === idx ? "w-6 bg-neon-purple" : "w-1.5 bg-white/10 hover:bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}