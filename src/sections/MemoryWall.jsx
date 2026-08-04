import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, Plus, Sparkles } from "lucide-react";

export default function MemoryWall() {
  // Collection of scattered sticky memories with varied rotations and aesthetics
  const [memories, setMemories] = useState([
    { id: 1, text: "I wish we could start over from the first day we met.", color: "border-neon-pink/30 bg-neon-pink/[0.02]", rotate: "-2deg" },
    { id: 2, text: "Told my parents I was staying at a friend's house, but I just needed a night alone to cry.", color: "border-neon-purple/30 bg-neon-purple/[0.02]", rotate: "3deg" },
    { id: 3, text: "To the stranger on the train who shared an earbud: you saved my life that afternoon.", color: "border-blue-500/30 bg-blue-500/[0.02]", rotate: "-1deg" },
    { id: 4, text: "I deleted your number today. It took me 14 months to build the courage.", color: "border-neon-pink/30 bg-neon-pink/[0.02]", rotate: "2deg" },
    { id: 5, text: "Successfully made it through a full day without checking your social profile profile updates.", color: "border-emerald-500/30 bg-emerald-500/[0.02]", rotate: "-3deg" },
    { id: 6, text: "I am secretly in love with my closest friend. They are getting married next month.", color: "border-neon-purple/30 bg-neon-purple/[0.02]", rotate: "1deg" }
  ]);

  const [input, setInput] = useState("");

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Cycle randomly through visual tilts and glowing borders
    const borderColors = [
      "border-neon-pink/30 bg-neon-pink/[0.02]",
      "border-neon-purple/30 bg-neon-purple/[0.02]",
      "border-blue-500/30 bg-blue-500/[0.02]",
      "border-emerald-500/30 bg-emerald-500/[0.02]"
    ];
    const rotations = ["-3deg", "-1deg", "2deg", "4deg", "-2deg"];
    
    const newNote = {
      id: Date.now(),
      text: input,
      color: borderColors[Math.floor(Math.random() * borderColors.length)],
      rotate: rotations[Math.floor(Math.random() * rotations.length)]
    };

    setMemories([newNote, ...memories]);
    setInput("");
  };

  return (
    <section className="py-24 px-6 relative max-w-6xl mx-auto border-t border-white/5">
      {/* Structural Header Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Left Side: Controller Console Input Sticky Box */}
        <div className="lg:sticky lg:top-28 space-y-6">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-neon-pink mb-3">Scrapbook Node</h2>
            <h3 className="text-3xl font-bold tracking-tight">The Memory Wall</h3>
            <p className="mt-3 text-gray-400 font-light text-sm leading-relaxed">
              Pin a passing thought, an unspoken word, or a simple dynamic reminder onto our collective digital corkboard.
            </p>
          </div>

          <form onSubmit={handleAddNote} className="space-y-3">
            <textarea
              maxLength="120"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Leave a floating note (max 120 characters)..."
              rows="3"
              className="w-full px-4 py-3 text-sm font-light text-white tracking-wide placeholder-gray-600 bg-white/0.01 border border-white/10 rounded-2xl focus:outline-none focus:border-neon-pink/40 resize-none transition-all leading-relaxed"
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-600 font-mono tracking-wider">{120 - input.length} units left</span>
              <button
                type="submit"
                className="px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-white bg-white/5 border border-white/10 rounded-xl flex items-center gap-1.5 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Pin Reflection
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Interactive Fluid Grid Display Canvas */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {memories.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ y: -5, scale: 1.02, zIndex: 20 }}
                  style={{ rotate: note.rotate }}
                  className={`p-6 rounded-2xl border backdrop-blur-xl transition-shadow duration-300 shadow-lg relative group flex flex-col justify-between min-h-140px cursor-grab active:cursor-grabbing ${note.color}`}
                >
                  {/* Decorative Metallic Pin Accent */}
                  <Pin className="w-3.5 h-3.5 text-gray-600 group-hover:text-neon-pink absolute top-4 right-4 transition-colors -rotate-45" />

                  <p className="text-gray-300 text-xs font-light tracking-wide leading-relaxed pr-4">
                    {note.text}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/0.02 flex items-center justify-between text-[10px] font-mono tracking-widest text-gray-600 uppercase">
                    <span>#MEMOIR_LOG</span>
                    <Sparkles className="w-3 h-2.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}