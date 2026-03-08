import { useState, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Mountain, Landmark, X, ZoomIn, ZoomOut, RotateCcw, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type MapMode = "geopolitics" | "geology";

interface PointOfInterest {
  name: string;
  coordinates: [number, number];
  description: string;
  mode: MapMode;
  category: string;
}

const POINTS_OF_INTEREST: PointOfInterest[] = [
  // Geopolitical
  { name: "Strait of Hormuz", coordinates: [56.3, 26.6], description: "Controls ~20% of global oil transit. One of the world's most strategically vital chokepoints.", mode: "geopolitics", category: "Chokepoint" },
  { name: "South China Sea", coordinates: [114.0, 12.0], description: "Disputed waters with $3.4 trillion in annual trade. Territorial claims by six nations.", mode: "geopolitics", category: "Disputed Zone" },
  { name: "Suez Canal", coordinates: [32.3, 30.5], description: "Handles ~12% of global trade. A single blockage in 2021 cost $9.6B per day.", mode: "geopolitics", category: "Chokepoint" },
  { name: "Kashmir", coordinates: [75.0, 34.5], description: "Disputed territory between India, Pakistan, and China since 1947.", mode: "geopolitics", category: "Conflict Zone" },
  { name: "Arctic Circle", coordinates: [0, 78], description: "Emerging geopolitical frontier as ice melts, revealing new shipping routes and resources.", mode: "geopolitics", category: "Emerging" },
  { name: "Taiwan Strait", coordinates: [119.5, 24.0], description: "One of the most sensitive flashpoints in global geopolitics. Home to 90% of advanced chip manufacturing.", mode: "geopolitics", category: "Flashpoint" },
  // Geological
  { name: "Ring of Fire", coordinates: [155.0, 0.0], description: "A 40,000 km horseshoe of oceanic trenches, volcanic arcs, and seismic belts.", mode: "geology", category: "Tectonic" },
  { name: "Mid-Atlantic Ridge", coordinates: [-30.0, 30.0], description: "The longest mountain range on Earth, mostly underwater. Where tectonic plates diverge.", mode: "geology", category: "Tectonic" },
  { name: "East African Rift", coordinates: [36.0, -2.0], description: "A continent slowly splitting apart. Will form a new ocean in ~10 million years.", mode: "geology", category: "Rift Zone" },
  { name: "Yellowstone Caldera", coordinates: [-110.5, 44.4], description: "A supervolcano with a magma chamber holding ~46,000 km³ of molten rock.", mode: "geology", category: "Volcanic" },
  { name: "Mariana Trench", coordinates: [142.2, 11.3], description: "Deepest point on Earth at ~11,034m. Pressure is 1,000x sea-level atmosphere.", mode: "geology", category: "Oceanic" },
  { name: "Himalayas", coordinates: [84.0, 28.0], description: "Still rising at ~5mm/year from the collision of the Indian and Eurasian plates.", mode: "geology", category: "Tectonic" },
];

const modeConfig = {
  geopolitics: {
    icon: Landmark,
    label: "Geopolitics",
    markerColor: "hsl(38, 90%, 55%)",
    hoverFill: "hsl(38, 60%, 30%)",
    baseFill: "hsl(220, 15%, 18%)",
    strokeColor: "hsl(220, 15%, 24%)",
  },
  geology: {
    icon: Mountain,
    label: "Geology",
    markerColor: "hsl(160, 70%, 45%)",
    hoverFill: "hsl(160, 40%, 25%)",
    baseFill: "hsl(220, 15%, 16%)",
    strokeColor: "hsl(220, 12%, 22%)",
  },
};

const WorldMap = () => {
  const [mode, setMode] = useState<MapMode>("geopolitics");
  const [selected, setSelected] = useState<PointOfInterest | null>(null);
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [20, 20],
    zoom: 1.5,
  });

  const config = modeConfig[mode];
  const filteredPOIs = POINTS_OF_INTEREST.filter((p) => p.mode === mode);

  const handleZoomIn = () => {
    if (position.zoom >= 8) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [20, 20], zoom: 1.5 });
    setSelected(null);
  };

  const handleMarkerClick = (poi: PointOfInterest) => {
    setSelected(poi);
    setPosition({ coordinates: poi.coordinates, zoom: 4 });
  };

  return (
    <section id="explore" className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${config.markerColor}, transparent 70%)`,
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <span className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Interactive Atlas
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore the <span className="text-gradient-amber">World</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Toggle between geopolitical hotspots and geological wonders. Click markers to dive deeper.
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-border bg-card p-1 gap-1">
            {(Object.keys(modeConfig) as MapMode[]).map((m) => {
              const Icon = modeConfig[m].icon;
              const isActive = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => { setMode(m); setSelected(null); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-body text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {modeConfig[m].label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-xl border border-border bg-card overflow-hidden shadow-card"
        >
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            {[
              { icon: ZoomIn, action: handleZoomIn, label: "Zoom in" },
              { icon: ZoomOut, action: handleZoomOut, label: "Zoom out" },
              { icon: RotateCcw, action: handleReset, label: "Reset" },
            ].map(({ icon: Icon, action, label }) => (
              <button
                key={label}
                onClick={action}
                title={label}
                className="p-2 rounded-lg bg-secondary/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
            {[...new Set(filteredPOIs.map((p) => p.category))].map((cat) => (
              <span
                key={cat}
                className="px-2 py-1 rounded-md bg-secondary/80 backdrop-blur-sm border border-border font-body text-xs text-muted-foreground"
              >
                {cat}
              </span>
            ))}
          </div>

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 140 }}
            style={{ width: "100%", height: "auto", aspectRatio: "2 / 1" }}
          >
            <ZoomableGroup
              center={position.coordinates}
              zoom={position.zoom}
              onMoveEnd={({ coordinates, zoom }) =>
                setPosition({ coordinates: coordinates as [number, number], zoom })
              }
              maxZoom={8}
              minZoom={1}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={config.baseFill}
                      stroke={config.strokeColor}
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: config.hoverFill, outline: "none", cursor: "pointer" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {filteredPOIs.map((poi) => (
                <Marker
                  key={poi.name}
                  coordinates={poi.coordinates}
                  onClick={() => handleMarkerClick(poi)}
                >
                  <g
                    style={{ cursor: "pointer" }}
                    transform="translate(-6, -6)"
                  >
                    <circle
                      r={6}
                      cx={6}
                      cy={6}
                      fill={config.markerColor}
                      opacity={0.3}
                      stroke="none"
                    >
                      <animate
                        attributeName="r"
                        from="6"
                        to="14"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.3"
                        to="0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      r={4}
                      cx={6}
                      cy={6}
                      fill={config.markerColor}
                      stroke="hsl(220, 20%, 7%)"
                      strokeWidth={1.5}
                    />
                  </g>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>

          {/* Info Panel */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 left-4 z-30 max-w-xs w-full rounded-xl border border-border bg-card/95 backdrop-blur-xl p-5 shadow-card"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <span
                  className="inline-block px-2 py-0.5 rounded-md text-xs font-body font-semibold mb-2"
                  style={{
                    backgroundColor: `${config.markerColor}20`,
                    color: config.markerColor,
                  }}
                >
                  {selected.category}
                </span>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {selected.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {selected.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(WorldMap);
