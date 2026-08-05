import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, Filter, MessageSquareHeart, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "../config/supabaseClient"; // Import client


export default function ExploreFeed() {
  // Curated premium mock data array representing safe public secrets
  const [confessions, setConfessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Pagination States (Set to 5 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categories = ["All", "Crush 💌", "Untold 🌙", "Deep ❤️", "Regret 🥀", "Stories 📖"];
    

  // Fetch from live database on mount
  useEffect(() => {
    const fetchConfessions = async () => {
      const { data, error } = await supabase
        .from('confessions')
        .select('*')
        .order('created_at', { ascending: false }); // Latest posts first

      if (error) {
        console.error("Error fetching confessions:", error);
        return;
      }

      if (data) {
        setConfessions(data); // This now correctly replaces the empty array with your DB data
      }
    };

    fetchConfessions();

    // OPTIONAL: Subscribe to real-time changes so feed updates instantly when anyone globally submits!
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'confessions' }, payload => {
        setConfessions(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Heart support reaction click counter logic
  const handleLike = (id) => {
    setConfessions(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.hasLiked ? item.likes - 1 : item.likes + 1,
          hasLiked: !item.hasLiked
        };
      }
      return item;
    }));
  };

  // Filtering algorithmic mapping
  const filteredConfessions = confessions.filter(item => {
    const matchesSearch = item.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Crush 💌") return matchesSearch && item.level.includes("Level 1");
    if (activeFilter === "Untold 🌙") return matchesSearch && item.level.includes("Level 2");
    if (activeFilter === "Deep ❤️") return matchesSearch && item.level.includes("Level 3");
    if (activeFilter === "Regret 🥀") return matchesSearch && item.level.includes("Level 4");
    if (activeFilter === "Stories 📖") return matchesSearch && item.level.includes("Level 5");
    return matchesSearch;
  });

  // Pagination Math Logic (5 items per page)
  const totalPages = Math.ceil(filteredConfessions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentConfessions = filteredConfessions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      document.getElementById("explore-feed")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id= "explore-feed" className="py-8 px-3 relative max-w-6xl mx-auto border-t border-white/5">
      {/* Header Controls Interface Layout */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h2 className="text-xs font-semibold tracking-widest uppercase text-neon-purple mb-3">Echo Sanctuary</h2>
          <h3 className="text-3xl font-bold tracking-tight">Explore Public Memoirs</h3>
        </div>

        {/* Cinematic Minimal Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search keywords or regions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/0.02 border border-white/10 focus:border-neon-purple/40 focus:outline-none text-xs font-light tracking-wide text-white transition-all"
          />
        </div>
      </div>

      {/* Horizontal Filter Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar mask-gradient">
        <Filter className="w-3.5 h-3.5 text-gray-500 shrink-0 mr-1" />
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs tracking-wide transition-all shrink-0 cursor-pointer border ${
              activeFilter === cat 
                ? "bg-white text-midnight border-white font-medium shadow-lg" 
                : "bg-white/0.02 border-white/5 text-gray-400 hover:text-white hover:border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Modern Asymmetric Masonry Column Feed Layout */}
      <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {currentConfessions.map((post) => (
            
            <motion.div
              layout
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid w-full p-6 rounded-2xl bg-white/0.01 border border-white/5 backdrop-blur-xl hover:border-white/10 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl select-none">{post.mood}</span>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-200">{post.nickname}</h4>
                      <p className="text-[10px] text-gray-500 font-light">{post.country}</p>
                    </div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 font-mono tracking-wider">
                    {post.level.split(" — ")[0]}
                  </span>
                </div>

               {/* Main Content Quote */}
                <p className="text-gray-300 text-sm font-light leading-relaxed tracking-wide italic">
                  "{post.message}"
                </p>

                {/* Music Player */}
{post.music_link && (
  <div className="mt-4">
    <a 
      href={post.music_link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-neon-purple/20 hover:border-neon-purple/50 transition-all text-xs text-gray-300 hover:text-white"
    >
      <span className="text-neon-pink">🎵</span> 
      Listen to the music shared here
    </a>
  </div>
)}
</div>

              {/* Action Reactions Strip (Support Only, No Toxicity) */}
              <div className="mt-6 pt-4 border-t border-white/0.03 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase flex items-center gap-1">
                  <MessageSquareHeart className="w-3 h-3 text-neon-purple" /> Gentle Space
                </span>
                
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all cursor-pointer border ${
                    post.hasLiked 
                      ? "bg-neon-pink/10 border-neon-pink/20 text-neon-pink shadow-[0_0_10px_rgba(236,72,153,0.15)]" 
                      : "bg-white/0.02 border-white/5 text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 transition-transform ${post.hasLiked ? "fill-neon-pink scale-110" : "group-hover:scale-105"}`} />
                  <span className="font-mono text-[11px]">{post.likes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fallback empty view check */}
      {filteredConfessions.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-gray-500 text-sm font-light">
          No echoes found under this specific emotional category yet...
        </motion.div>
      )}

      {/* Pagination Footer Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-16 pt-6 border-t border-white/5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer border ${
              currentPage === 1
                ? "opacity-40 cursor-not-allowed bg-transparent border-white/5 text-gray-500"
                : "bg-white/5 border-white/10 text-white hover:bg-neon-purple/20"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-mono text-gray-400 tracking-wider">
            Page <strong className="text-white">{currentPage}</strong> of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer border ${
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed bg-transparent border-white/5 text-gray-500"
                : "bg-white/5 border-white/10 text-white hover:bg-neon-purple/20"
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </section>
  );
}