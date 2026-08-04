import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, BookOpen, ChevronRight, Lock, Flame, Heart, MessageSquare, ShieldAlert } from "lucide-react";

export default function ConfessionLevels() {
  const [activeTier, setActiveTier] = useState(null);

  const tiers = [
    {
      id: "level-1",
      levelNumber: "Level 1",
      title: "Secret Crush",
      emoji: "💌",
      icon: Heart,
      color: "from-pink-500/20 to-rose-500/5",
      borderColor: "group-hover:border-pink-500/30",
      accentText: "text-pink-400",
      description: "Innocent alignments, unspoken infatuations, and quiet school-yard or office longings left unsaid.",
    },
    {
      id: "level-2",
      levelNumber: "Level 2",
      title: "Untold Feelings",
      emoji: "🌙",
      icon: MessageSquare,
      color: "from-purple-500/20 to-indigo-500/5",
      borderColor: "group-hover:border-purple-500/30",
      accentText: "text-purple-400",
      description: "Words left sitting on the tip of your tongue late at night. Complicated relational dynamics.",
    },
    {
      id: "level-3",
      levelNumber: "Level 3",
      title: "Deep Confession",
      emoji: "❤️",
      icon: Flame,
      color: "from-red-500/20 to-orange-500/5",
      borderColor: "group-hover:border-red-500/30",
      accentText: "text-red-400",
      description: "Heavy truths, profound realizations, and burning declarations of deep love or masked vulnerabilities.",
    },
    {
      id: "level-4",
      levelNumber: "Level 4",
      title: "Regret & Apology",
      emoji: "🥀",
      icon: ShieldAlert,
      color: "from-amber-500/20 to-yellow-500/5",
      borderColor: "group-hover:border-amber-500/30",
      accentText: "text-amber-400",
      description: "Seeking closure. Sentences that start with 'I wish I never...' or 'I'm sorry for how it ended.'",
    },
    {
      id: "level-5",
      levelNumber: "Level 5",
      title: "Anonymous Story",
      emoji: "📖",
      icon: Lock,
      color: "from-crimson-500/20 to-stone-500/5",
      borderColor: "group-hover:border-[#ec4899]/30",
      accentText: "text-neon-pink",
      description: "Unfiltered, multi-layered life logs. Complex underground realities kept under complete identity lock.",
    }
  ];

  // Navigation handlers to guide the conversational flow smoothly
const handleWriteRoute = (fullTitle) => {
  // Save the full string (e.g., "Level 3 — Deep Confession ❤️")
  localStorage.setItem("selected_confession_tier", fullTitle);
  
  // Trigger the sync event
  window.dispatchEvent(new Event("tier_node_updated"));

  // Scroll to form
  const formElement = document.getElementById("confession-input-form");
  if (formElement) {
    formElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

const handleReadRoute = () => {
  const element = document.getElementById("explore-feed");
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    console.error("ExploreFeed ID not found! Ensure the Feed section has id='explore-feed'");
  }
};

  return (
    <section id="confession-tiers" className="py-24 px-6 relative max-w-7xl mx-auto border-t border-white/5">
      {/* Background Ambience Layout */}
      <div className="absolute bottom-1/4 left-10 w-300px h-300px rounded-full bg-neon-purple/5 blur-[100px] -z-10 pointer-events-none" />

      {/* Header Deck */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-neon-pink">Resonance Matrix</h2>
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Explore the Confession Tiers</h3>
        <p className="text-gray-400 font-light text-sm max-w-xl mx-auto">
          Select a localized frequency dimension to drop your own raw signal trace or listen to existing world lines.
        </p>
      </div>

      {/* Tiers Vertical Grid Deck */}
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {tiers.map((tier) => {
          const TierIcon = tier.icon;
          const isOpen = activeTier === tier.id;

          return (
            <div 
              key={tier.id}
              className="group border border-white/5 rounded-2xl bg-[#090414]/40 backdrop-blur-xl transition-all duration-300 overflow-hidden"
            >
              {/* Row Header Trigger */}
              <button
                onClick={() => setActiveTier(isOpen ? null : tier.id)}
                className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/0.01 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${tier.color} border border-white/10 flex items-center justify-center shrink-0 shadow-inner`}>
                    <TierIcon className={`w-5 h-5 ${tier.accentText}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-wider text-gray-500 uppercase">{tier.levelNumber}</span>
                      <span className="text-xs">{tier.emoji}</span>
                    </div>
                    <h4 className="text-lg font-medium text-white tracking-wide mt-0.5">{tier.title}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <span className="text-xs font-mono text-gray-500 group-hover:text-gray-300 transition-colors hidden sm:inline">
                    {isOpen ? "Close Terminal" : "Initialize Node"}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </div>
              </button>

              {/* Sub-Panel Content Overlay */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-t border-white/0.03 bg-black/30"
                  >
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                      
                      {/* Meta Text Info Column */}
                      <div className="md:col-span-3 space-y-2">
                        <p className="text-xs font-light leading-relaxed text-gray-400">
                          {tier.description}
                        </p>
                      </div>

                      {/* Interactive Dual Action Routing Dashboard */}
                      <div className="md:col-span-2 flex flex-col sm:flex-row md:flex-col gap-3 w-full">
                        {/* Option 1: Write Confession */}
                        <button
                          onClick={() => handleWriteRoute(`${tier.levelNumber} — ${tier.title} ${tier.emoji}`)}
                          className="flex-1 py-3 px-4 rounded-xl bg-white/0.03 hover:bg-neon-pink/10 border border-white/10 hover:border-neon-pink/30 text-xs font-mono tracking-wider uppercase text-white hover:text-neon-pink flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                        >
                          <PenTool className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                          <span>Write Confession</span>
                        </button>

                        {/* Option 2: Read Confession */}
                        <button
                          onClick={handleReadRoute}
                          className="flex-1 py-3 px-4 rounded-xl bg-linear-to-r from-neon-purple/80 to-neon-pink/80 hover:brightness-110 text-xs font-mono tracking-wider uppercase text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg group/btn"
                        >
                          <BookOpen className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                          <span>Read Feed</span>
                        </button>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}