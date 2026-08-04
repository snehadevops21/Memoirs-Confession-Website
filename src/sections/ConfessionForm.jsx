import { useState, useEffect } from "react";
import { motion} from "framer-motion"; 
import { Send, EyeOff, Sparkles} from "lucide-react";
import { supabase } from "../config/supabaseClient";

export default function ConfessionForm() {
  const [nickname, setNickname] = useState("");
  // Initialize from localStorage to avoid synchronous setState inside an effect
  const [country, setCountry] = useState(() => {
    try {
      return localStorage.getItem("selected_confession_country") || "";
    } catch {
      return "";
    }
  });
  const [level, setLevel] = useState(() => {
    try {
      return localStorage.getItem("selected_confession_tier") || "Level 1 — Secret Crush 💌";
    } catch {
      return "Level 1 — Secret Crush 💌";
    }
  });
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("🌙");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [musicLink, setMusicLink] = useState("");

  // Sync state with localstorage values managed by the tracking map grid
// Sync state with localstorage values managed by the tracking map grid
  useEffect(() => {
    // Initial values are read during state initialization. Effect only sets up listeners.

    // 2. Listeners for Cross-Component Communication
    const handleTierUpdate = () => {
      const updatedTier = localStorage.getItem("selected_confession_tier");
      if (updatedTier) setLevel(updatedTier);
    };

    const handleCountryUpdate = () => {
      const updatedCountry = localStorage.getItem("selected_confession_country");
      if (updatedCountry) setCountry(updatedCountry);
    };

    window.addEventListener("tier_node_updated", handleTierUpdate);
    window.addEventListener("country_node_updated", handleCountryUpdate);

    return () => {
      window.removeEventListener("tier_node_updated", handleTierUpdate);
      window.removeEventListener("country_node_updated", handleCountryUpdate);
    };
  }, []);

  const moods = ["🌙", "🖤", "🥀", "💌", "❤️", "🌧️", "✨", "💭"];
  const levels = [
    "Level 1 — Secret Crush 💌",
    "Level 2 — Untold Feelings 🌙",
    "Level 3 — Deep Confession ❤️",
    "Level 4 — Regret & Apology 🥀",
    "Level 5 — Anonymous Story 📖"
  ];

  // Smooth scroll function to bring the user directly up to the interactive map section
  const scrollToWorldMap = () => {
    const mapElement = document.getElementById("world-matrix");
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const { error } = await supabase
      .from('confessions') 
      .insert([{ 
        nickname: nickname.trim() || 'Anonymous', 
        country: country.trim(), 
        level: level, 
        message: message.trim(), 
        mood: mood,
        music_link: musicLink.trim() // ADDED THIS
      }]);

    if (error) throw error;
    alert("Confession submitted successfully!");
    // Reset form
    setMessage("");
    setNickname("");
    setMusicLink(""); 
  } catch (error) {
    alert("Error submitting: " + error.message);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section id="confession-input-form" className="py-8 px-3 relative max-w-4xl mx-auto border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-400px h-400px rounded-full bg-neon-pink/5 blur-[100px] -z-10 pointer-events-none" />

      {/* Header Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl mx-auto mb-12"
      >
        <h2 className="text-xs font-semibold tracking-widest uppercase text-neon-pink mb-3">Release the Weight</h2>
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">Write Your Anonymous Memoir</h3>
      </motion.div>

      {/* Main Form Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="p-8 md:p-12 rounded-3xl bg-white/0.01 border border-white/5 backdrop-blur-2xl shadow-3xl relative overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Nickname Row */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Nickname (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g., Silent Wanderer"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/0.02 border border-white/10 focus:border-neon-purple/50 focus:outline-none text-sm text-white tracking-wide"
              />
            </div>
            
            {/* Country Selector Row with Map Trigger Interaction */}
            <div className="flex flex-col gap-2 relative">
              <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Your Country</label>
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  readOnly
                  required
                  placeholder="Select country in map"
                  value={country}
                  onClick={scrollToWorldMap}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/0.02 border border-white/10 focus:border-neon-pink/40 focus:outline-none text-sm text-white cursor-pointer hover:bg-white/0.04 transition-all"
                />
                <button
                  type="button"
                  onClick={scrollToWorldMap}
                  className="absolute right-3 p-1 rounded-lg text-neon-pink hover:bg-neon-pink/10 transition-all cursor-pointer group"
                  title="Open Map Grid"
                >

                  {/* Custom SVG mirroring image_3d6f45.png */}
  <svg 
    viewBox="0 0 24 24" 
    className="w-5 h-5 group-hover:scale-110 transition-transform"
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Thin Pin Needle */}
    <line x1="12" y1="11" x2="12" y2="22" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Main Round Red/Pink Pin Head */}
    <circle cx="12" cy="7" r="5" fill="#ec4899" />
    {/* Inner Highlight Reflection */}
    <circle cx="13.5" cy="5.5" r="1.2" fill="#fbcfe8" opacity="0.8" />
  </svg>


                </button>
              </div>
            </div>
          </div>

          {/* Level Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Confession Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#090414] border border-white/10 focus:border-neon-purple/50 text-sm text-gray-300 cursor-pointer"
            >
              {levels.map((lvl, idx) => (
                <option key={idx} value={lvl} className="bg-[#090414] text-white">{lvl}</option>
              ))}
            </select>
          </div>

          {/* Secret Message Field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">The Unspoken Truth</label>
            <textarea 
              rows="6"
              required
              placeholder="Type your deepest secret here... what you can't tell anyone else..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white/0.02 border border-white/10 focus:border-neon-pink/50 focus:outline-none text-sm text-white resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-2">
  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">Music Link (YouTube/Spotify URL)</label>
  <input 
    type="url" 
    placeholder="https://youtube.com/watch?v=..."
    value={musicLink}
    onChange={(e) => setMusicLink(e.target.value)}
    className="w-full px-4 py-3 rounded-xl bg-white/0.02 border border-white/10 focus:border-neon-purple/50 focus:outline-none text-sm text-white"
  />
</div>

          {/* Bottom Actions Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-white/0.03">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Current Mood Frequency</span>
              <div className="flex items-center gap-1.5 bg-white/0.02 p-1.5 rounded-xl border border-white/5">
                {moods.map((m, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setMood(m)}
                    className={`w-8 h-8 rounded-lg text-sm flex items-center justify-center transition-all cursor-pointer ${mood === m ? 'bg-white/10 scale-110 border border-white/10' : 'opacity-50 hover:opacity-100'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-linear-to-r from-neon-purple to-neon-pink text-white text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Submitting..." : "Submit Anonymously"}</span>
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Security Footer Badge */}
      <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-gray-500 font-light">
        <span className="flex items-center gap-1"><EyeOff className="w-3 h-3 text-neon-purple" /> Safe Processing</span>
        <span className="w-1 h-1 bg-white/10 rounded-full" />
        <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-neon-pink" /> Complete Identity Veil</span>
      </div>
    </section>
  );
}