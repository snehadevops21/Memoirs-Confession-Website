import { motion } from "framer-motion";
import { Shield, EyeOff, Heart } from "lucide-react";

export default function About() {
  const cardData = [
    {
      icon: <EyeOff className="w-6 h-6 text-neon-purple" />,
      title: "100% Anonymous",
      desc: "No profiles, no email trackers, and no traces. Just your raw, honest words set free."
    },
    {
      icon: <Shield className="w-6 h-6 text-neon-pink" />,
      title: "Safe Sanctuary",
      desc: "A toxic-free digital space intentionally crafted to protect your vulnerability."
    },
    {
      icon: <Heart className="w-6 h-6 text-purple-400" />,
      title: "Shared Solace",
      desc: "Find deep comfort in reading the hidden truths of others across the world."
    }
  ];

  return (
    <section className="py-24 px-6 relative max-w-6xl mx-auto border-t border-white/5">
      {/* Scroll-triggered Header Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-xs font-semibold tracking-widest uppercase text-neon-purple mb-3">
          Behind the Screen
        </h2>
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
          A place where emotions can be shared anonymously and safely.
        </h3>
        <p className="mt-4 text-gray-400 font-light leading-relaxed">
          Memoirs is a premium interactive gallery for your unsaid letters, secret crushes, and silent regrets. We believe that some things are too heavy to carry alone, but easier to whisper into the void.
        </p>
      </motion.div>

{/* 1-Column Stacked Row Format */}
      <div className="grid grid-cols-1 gap-6">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ x: 5, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-white/0.02 border border-white/5 backdrop-blur-xl hover:border-white/10 hover:bg-white/0.04 transition-all duration-300 group shadow-2xl flex items-start gap-6"
          >
            {/* Icon Box Container */}
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-neon-purple/30 transition-all duration-300 shadow-inner">
              {card.icon}
            </div>
            
            {/* Text Content */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-2 tracking-wide">{card.title}</h4>
              <p className="text-gray-400 font-light text-sm leading-relaxed">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}