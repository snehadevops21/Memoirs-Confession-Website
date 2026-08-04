import { Shield, HeartHandshake, Eye, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-0 border-t border-white/5 bg-midnight relative overflow-hidden">
      {/* Structural Framing Grid */}
      <div className="max-w-6xl mx-auto px-5 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pb-12 border-b border-white/0.03">
        

          {/* Trust Badges & Safety Safeguards */}
          <div className="space-y-2">
            <span className="font-mono text-[20px] uppercase tracking-widest text-gray-200 block">
              Guarantees
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400 font-light">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/0.01 border border-white/5">
                <Shield className="w-3 h-3 text-neon-purple shrink-0" />
                <span>Zero Logs</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/0.01 border border-white/5">
                <Eye className="w-3 h-3 text-neon-pink shrink-0" />
                <span>No Trackers</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/0.01 border border-white/5">
                <HeartHandshake className="w-3 h-3 text-blue-400 shrink-0" />
                <span>Pure Support</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/0.01 border border-white/5">
                <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>100% Free</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Metadata & Copyright Bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[14px] font-mono tracking-wide text-gray-400">
          <p>© {currentYear} MEMOIRS • Speak into the void safely.</p>
          
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-white transition-colors duration-200">Terms of Silence</a>
            <a href="#levels" className="hover:text-white transition-colors duration-200">Privacy Encryption</a>

          </div>
        </div>
      </div>
    </footer>
  );
}