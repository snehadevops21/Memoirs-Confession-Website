import { useState } from "react";
import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import ConfessionLevels from "./sections/ConfessionLevels";
import WorldMap from "./sections/WorldMap";
import ConfessionForm from "./sections/ConfessionForm";
import ExploreFeed from "./sections/ExploreFeed";
import MidnightQuotes from "./sections/MidnightQuotes";
import MemoryWall from "./sections/MemoryWall";
import Footer from "./sections/Footer";


function App() {
  // Global state to track if background music is active
  const [isPlaying, setIsPlaying] = useState(false);

  return (
<div className="min-h-screen bg-[#0b0f19] text-white selection:bg-neon-purple selection:text-white relative overflow-x-hidden">
      {/* Navbar handles the fixed top banner and navigation */}
      <Navbar />
      {/* Immersive Background Layer */}
      <AmbientBackground />

      {/* Global Navigation Header */}
      <Navbar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      {/* Main Content Sections Wrapper */}
      <main className="pt-20 md:pt-24">
        <Hero />
        <About />
        <ConfessionLevels />
        <WorldMap />
        <ConfessionForm />
        <ExploreFeed />
        <MidnightQuotes />
        <MemoryWall />
        <Footer />
      </main>
    </div>
  );
}

export default App;