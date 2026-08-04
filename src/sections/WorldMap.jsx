import { useState, useEffect } from "react";
import { Search, Globe, MapPin, ArrowRight } from "lucide-react";
import { supabase } from "../config/supabaseClient";

export default function WorldMap() {
  const [geoData, setGeoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState("");
  const [countryStats, setCountryStats] = useState({});
  const [totalConfessions, setTotalConfessions] = useState(0);

  // 1. Fetch official real-world country boundaries (GeoJSON)
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
      .then((r) => r.json())
      .then((geoJson) => {
        if (geoJson && geoJson.features) {
          setGeoData(geoJson.features);
        }
      })
      .catch((err) => console.error("Error loading geographical map matrix:", err));
  }, []);

  // 2. Load live metrics from Supabase
  useEffect(() => {
    const fetchGeographicMetrics = async () => {
      const { data, error } = await supabase.from("confessions").select("country");
      if (!error && data) {
        setTotalConfessions(data.length);
        const counts = data.reduce((acc, row) => {
          if (row.country) {
            const name = row.country.trim().toLowerCase();
            acc[name] = (acc[name] || 0) + 1;
          }
          return acc;
        }, {});
        setCountryStats(counts);
      }
    };
    fetchGeographicMetrics();
  }, []);

  const linkCountryToConfessionForm = (countryName) => {
    setSelectedCountry(countryName);
    setSearchQuery(countryName);

    localStorage.setItem("selected_confession_country", countryName);
    window.dispatchEvent(new Event("country_node_updated"));

    const formElement = document.getElementById("confession-input-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Helper formula to compute the geographic center of a polygon to place text names perfectly
  const calculatePolygonCenter = (geometry) => {
    if (!geometry || !geometry.coordinates) return { x: 400, y: 200 };
    
    let coords = [];
    if (geometry.type === "Polygon") {
      coords = geometry.coordinates[0];
    } else if (geometry.type === "MultiPolygon") {
      // Find the largest polygon segment (helps place labels on the mainland instead of small islands)
      let largestPolygon = geometry.coordinates[0][0];
      geometry.coordinates.forEach(poly => {
        if (poly[0].length > largestPolygon.length) largestPolygon = poly[0];
      });
      coords = largestPolygon;
    }

    if (!coords || coords.length === 0) return { x: 400, y: 200 };

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    coords.forEach(coord => {
      const x = (coord[0] + 180) * (800 / 360);
      const y = (90 - coord[1]) * (400 / 180);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    });

    return {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2
    };
  };

  // Convert raw geographic coordinates to SVG path layout coordinates
  const convertCoordinatesToSVGPath = (feature) => {
    const { geometry } = feature;
    if (!geometry) return "";

    const project = (coord) => {
      const x = (coord[0] + 180) * (800 / 360);
      const y = (90 - coord[1]) * (400 / 180);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    };

    if (geometry.type === "Polygon") {
      return geometry.coordinates
        .map((ring) => "M" + ring.map(project).join("L") + "Z")
        .join(" ");
    } else if (geometry.type === "MultiPolygon") {
      return geometry.coordinates
        .map((polygon) =>
          polygon.map((ring) => "M" + ring.map(project).join("L") + "Z").join(" ")
        )
        .join(" ");
    }
    return "";
  };

  const activeInspectionCount = countryStats[selectedCountry.toLowerCase()] || 0;
  const filteredCountries = geoData.filter((f) =>
    f.properties?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="world-matrix" className="py-24 px-6 relative max-w-7xl mx-auto border-t border-white/5">
      <div className="absolute top-1/4 right-1/4 w-350px h-350px rounded-full bg-neon-purple/5 blur-[120px] -z-10 pointer-events-none" />

      {/* Header Info Deck */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div>
          <h2 className="text-xs font-semibold tracking-widest uppercase text-neon-pink mb-3">Live Signal Matrix</h2>
          <h3 className="text-3xl font-bold tracking-tight">Geographic Resonance</h3>
          <p className="mt-2 text-gray-400 font-light text-sm max-w-xl">
            Click directly on any country name or territory within the real map grid to select your confession origin point.
          </p>
        </div>

        <div className="flex gap-6 p-4 rounded-2xl bg-white/0.01 border border-white/5 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neon-purple/10 flex items-center justify-center border border-neon-purple/20">
              <Globe className="w-4 h-4 text-neon-purple" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-gray-500 block uppercase">Global Signals</span>
              <span className="text-lg font-semibold font-mono tracking-wide">{totalConfessions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-md mb-8 z-30">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search any country (e.g., Nepal, Germany)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0d071a] border border-white/10 focus:border-neon-pink/40 focus:outline-none text-xs font-light text-white"
          />
        </div>

        {searchQuery.trim().length > 0 && filteredCountries.length > 0 && (
          <div className="absolute left-0 w-full mt-2 rounded-xl bg-[#090414] border border-white/10 max-h-52 overflow-y-auto z-50 text-left">
            {filteredCountries.slice(0, 10).map((country, idx) => {
              const name = country.properties.name;
              return (
                <button
                  key={idx}
                  onClick={() => linkCountryToConfessionForm(name)}
                  className="w-full text-left px-5 py-2.5 text-xs font-light text-gray-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between border-b border-white/0.02"
                >
                  <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-neon-pink" /> {name}</span>
                  <span className="text-[9px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">
                    {countryStats[name.toLowerCase()] || 0} hits
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Map Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
        
        {/* Real Dynamic Interactive SVG Map Panel */}
        <div className="lg:col-span-3 rounded-3xl bg-[#07030f] border border-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col items-center justify-center p-4 min-h-460px">
          
          {geoData.length === 0 ? (
            <div className="text-xs font-mono text-gray-500 animate-pulse">Initializing global coordinate matrix...</div>
          ) : (
            <svg 
              viewBox="0 0 800 400" 
              className="w-full h-auto max-w-full aspect-2/1 select-none scale-105"
            >
              {/* Background Map Grid Matrix lines */}
              <g stroke="rgba(255, 255, 255, 0.01)" strokeWidth="0.5">
                {[...Array(36)].map((_, i) => <line key={i} x1={i * 22.2} y1={0} x2={i * 22.2} y2={400} />)}
                {[...Array(18)].map((_, i) => <line key={i} x1={0} y1={i * 22.2} x2={800} y2={i * 22.2} />)}
              </g>

              {/* Phase 1: Draw All Country Border Shapes */}
              <g>
                {geoData.map((country, idx) => {
                  const countryName = country.properties?.name || "Unknown Land";
                  const isSelected = selectedCountry.toLowerCase() === countryName.toLowerCase();
                  const isHovered = hoveredCountry.toLowerCase() === countryName.toLowerCase();
                  const totalHits = countryStats[countryName.toLowerCase()] || 0;
                  const pathString = convertCoordinatesToSVGPath(country);

                  if (!pathString) return null;

                  return (
                    <path
                      key={`path-${idx}`}
                      d={pathString}
                      className="transition-all duration-200 cursor-pointer outline-none"
                      fill={
                        isSelected
                          ? "rgba(236, 72, 153, 0.25)" 
                          : isHovered
                          ? "rgba(168, 85, 247, 0.2)" 
                          : totalHits > 0
                          ? "rgba(168, 85, 247, 0.08)" 
                          : "rgba(255, 255, 255, 0.02)"
                      }
                      stroke={
                        isSelected 
                          ? "#ec4899" 
                          : isHovered 
                          ? "#a855f7" 
                          : "rgba(255, 255, 255, 0.06)"
                      }
                      strokeWidth={isSelected || isHovered ? 1.25 : 0.4}
                      onMouseEnter={() => setHoveredCountry(countryName)}
                      onMouseLeave={() => setHoveredCountry("")}
                      onClick={() => linkCountryToConfessionForm(countryName)}
                    />
                  );
                })}
              </g>

              {/* Phase 2: Overlay Persistent Embedded Country Labels & Active Touch Elements */}
              <g pointerEvents="none">
                {geoData.map((country, idx) => {
                  const countryName = country.properties?.name || "";
                  if (!countryName) return null;

                  const isSelected = selectedCountry.toLowerCase() === countryName.toLowerCase();
                  const isHovered = hoveredCountry.toLowerCase() === countryName.toLowerCase();
                  const center = calculatePolygonCenter(country.geometry);

                  // Filter out ultra-small island tags to keep map typography tidy
                  const isExtremelySmallArea = !country.geometry.coordinates;
                  if (isExtremelySmallArea) return null;

                  return (
                    <g key={`label-${idx}`}>
                      {/* Interactive Visual Map Pin that drops instantly over selected places */}
                      {isSelected && (
                        <g transform={`translate(${center.x}, ${center.y - 8})`}>
                          <circle r="4" fill="#ec4899" className="animate-ping opacity-75" />
                          <circle r="2.5" fill="#ec4899" />
                        </g>
                      )}

                      {/* Dynamic Native Text Name Label rendered over map */}
                      <text
                        x={center.x}
                        y={center.y + 3}
                        textAnchor="middle"
                        className="font-mono tracking-tighter select-none transition-all duration-200"
                        style={{
                          fontSize: isSelected || isHovered ? "9px" : "4.5px",
                          fontWeight: isSelected || isHovered ? "bold" : "normal",
                          fill: isSelected 
                            ? "#ec4899" 
                            : isHovered 
                            ? "#a855f7" 
                            : "rgba(255, 255, 255, 0.25)",
                          opacity: isSelected || isHovered ? 1 : 0.65,
                          textShadow: isSelected || isHovered ? "0 0 6px rgba(0,0,0,0.9)" : "none"
                        }}
                      >
                        {countryName}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          )}
        </div>

        {/* Right Information HUD Panel */}
        <div className="p-6 rounded-3xl bg-white/0.01 border border-white/5 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-[10px] font-mono text-neon-pink uppercase tracking-widest">Active Target</span>
              <div className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse" />
            </div>

            <div>
              <h4 className="text-xl font-semibold tracking-wide text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neon-purple shrink-0" />
                {selectedCountry || "Global Overview"}
              </h4>
              <p className="text-xs text-gray-400 font-light mt-1">
                Selected nation variable locks immediately into submission block below.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/0.02 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-gray-500 block uppercase">Signal Density</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-mono font-bold tracking-tight text-white">{activeInspectionCount}</span>
                <span className="text-xs text-gray-400 font-light">whispers logged</span>
              </div>
            </div>
          </div>

          {selectedCountry && (
            <button
              onClick={() => linkCountryToConfessionForm(selectedCountry)}
              className="mt-6 w-full py-3 rounded-xl bg-linear-to-r from-neon-purple to-neon-pink text-white text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xl border-0 hover:brightness-110 transition-all"
            >
              Lock In {selectedCountry} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
}