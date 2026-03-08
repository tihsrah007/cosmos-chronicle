import { useState, useCallback, memo, useMemo, ReactNode } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  Search,
  Filter,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export interface MapPOI {
  name: string;
  coordinates: [number, number];
  description: string;
  category: string;
  details?: string;
}

interface FullPageMapProps {
  title: string;
  subtitle: string;
  pois: MapPOI[];
  categories: readonly string[];
  markerColor: string;
  hoverFill: string;
  baseFill: string;
  strokeColor: string;
  accentGradient: string;
  countryDescriptions?: Record<string, string>;
  backLabel?: string;
}

const categoryColors: Record<string, string> = {
  // Geopolitics
  "Chokepoint": "hsl(38, 90%, 55%)",
  "Conflict Zone": "hsl(0, 70%, 55%)",
  "Disputed Territory": "hsl(280, 60%, 55%)",
  "Strategic Alliance": "hsl(210, 70%, 55%)",
  "Economic Zone": "hsl(160, 60%, 45%)",
  "Flashpoint": "hsl(15, 80%, 55%)",
  "Nuclear State": "hsl(340, 70%, 50%)",
  "Emerging Power": "hsl(50, 80%, 50%)",
  // Geology
  "Mountain Range": "hsl(25, 70%, 50%)",
  "Tectonic Plate Boundary": "hsl(0, 75%, 55%)",
  "Volcano": "hsl(10, 85%, 50%)",
  "Ocean & Sea": "hsl(210, 70%, 50%)",
  "Lake": "hsl(195, 70%, 50%)",
  "River": "hsl(200, 60%, 45%)",
  "Desert": "hsl(40, 70%, 55%)",
  "Canyon & Trench": "hsl(270, 50%, 50%)",
  "Island & Archipelago": "hsl(160, 60%, 45%)",
  "Peninsula": "hsl(140, 50%, 45%)",
  "Continent": "hsl(180, 40%, 40%)",
  "Canal": "hsl(220, 60%, 55%)",
  "Glacier & Ice Sheet": "hsl(200, 30%, 70%)",
  "Rift Zone": "hsl(350, 65%, 50%)",
};

const FullPageMap = ({
  title,
  subtitle,
  pois,
  categories,
  markerColor,
  hoverFill,
  baseFill,
  strokeColor,
  accentGradient,
  countryDescriptions,
  backLabel = "Back to Home",
}: FullPageMapProps) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<MapPOI | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [position, setPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({ coordinates: [20, 15], zoom: 1.8 });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    new Set(categories)
  );
  const [showFilters, setShowFilters] = useState(false);
  const [showList, setShowList] = useState(false);
  const [hoveredPOI, setHoveredPOI] = useState<MapPOI | null>(null);

  const filteredPOIs = pois.filter(
    (p) =>
      activeCategories.has(p.category) &&
      (searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleZoomIn = useCallback(() => {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.min(pos.zoom * 1.5, 12),
    }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setPosition((pos) => ({
      ...pos,
      zoom: Math.max(pos.zoom / 1.5, 1),
    }));
  }, []);

  const handleReset = useCallback(() => {
    setPosition({ coordinates: [20, 15], zoom: 1.8 });
    setSelected(null);
  }, []);

  const handleMarkerClick = useCallback((poi: MapPOI) => {
    setSelected(poi);
    setPosition({ coordinates: poi.coordinates, zoom: 5 });
  }, []);

  const toggleCategory = useCallback((cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  }, []);

  const getMarkerColor = (category: string) =>
    categoryColors[category] || markerColor;

  return (
    <div className="fixed inset-0 bg-background flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="relative z-30 flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-body text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{backLabel}</span>
          </button>
          <div className="h-5 w-px bg-border" />
          <div>
            <h1 className="font-display text-lg font-bold text-foreground leading-tight">
              {title}
            </h1>
            <p className="font-body text-xs text-muted-foreground hidden md:block">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-secondary border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary w-40 md:w-56"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg border border-border transition-colors ${
              showFilters
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Filter className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowList(!showList)}
            className={`p-2 rounded-lg border border-border transition-colors ${
              showList
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <MapPin className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="z-20 border-b border-border bg-card/90 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 md:px-6 py-3 flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = activeCategories.has(cat);
                const color = categoryColors[cat] || markerColor;
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1 rounded-full font-body text-xs font-medium transition-all border ${
                      isActive
                        ? "border-transparent text-primary-foreground"
                        : "border-border text-muted-foreground hover:text-foreground bg-secondary/50"
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: color, borderColor: color }
                        : {}
                    }
                  >
                    {cat}
                    <span className="ml-1.5 opacity-70">
                      {pois.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full opacity-5 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${markerColor}, transparent 70%)`,
          }}
        />

        {/* Map */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 140 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup
            center={position.coordinates}
            zoom={position.zoom}
            onMoveEnd={({ coordinates, zoom }) =>
              setPosition({
                coordinates: coordinates as [number, number],
                zoom,
              })
            }
            maxZoom={12}
            minZoom={1}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const hasDescription =
                    countryDescriptions && countryDescriptions[countryName];
                  const isHovered = hoveredCountry === countryName;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isHovered && hasDescription ? hoverFill : baseFill}
                      stroke={strokeColor}
                      strokeWidth={0.5}
                      onMouseEnter={() => setHoveredCountry(countryName)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => {
                        if (hasDescription) {
                          setSelected({
                            name: countryName,
                            coordinates: [0, 0],
                            description: countryDescriptions![countryName],
                            category: "Country",
                          });
                        }
                      }}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          fill: hasDescription ? hoverFill : baseFill,
                          outline: "none",
                          cursor: hasDescription ? "pointer" : "default",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {filteredPOIs.map((poi) => {
              const color = getMarkerColor(poi.category);
              return (
                <Marker
                  key={poi.name}
                  coordinates={poi.coordinates}
                  onClick={() => handleMarkerClick(poi)}
                  onMouseEnter={() => setHoveredPOI(poi)}
                  onMouseLeave={() => setHoveredPOI(null)}
                >
                  <g style={{ cursor: "pointer" }} transform="translate(-10, -10)">
                    {/* Invisible larger hit area */}
                    <circle
                      r={16}
                      cx={10}
                      cy={10}
                      fill="transparent"
                      stroke="none"
                    />
                    <circle
                      r={10}
                      cx={10}
                      cy={10}
                      fill={color}
                      opacity={0.25}
                      stroke="none"
                    >
                      <animate
                        attributeName="r"
                        from="10"
                        to="20"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.25"
                        to="0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      r={6}
                      cx={10}
                      cy={10}
                      fill={color}
                      stroke="hsl(220, 20%, 7%)"
                      strokeWidth={1.5}
                    />
                  </g>
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>

        {/* POI Hover Tooltip */}
        <AnimatePresence>
          {hoveredPOI && !selected && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 max-w-xs w-full px-4 py-3 rounded-lg bg-card/95 backdrop-blur-xl border border-border shadow-lg pointer-events-none"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getMarkerColor(hoveredPOI.category) }}
                />
                <p className="font-display text-sm font-semibold text-foreground truncate">
                  {hoveredPOI.name}
                </p>
              </div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {hoveredPOI.description}
              </p>
              <span
                className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-body font-medium"
                style={{
                  backgroundColor: `${getMarkerColor(hoveredPOI.category)}20`,
                  color: getMarkerColor(hoveredPOI.category),
                }}
              >
                {hoveredPOI.category}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Country Tooltip */}
        <AnimatePresence>
          {hoveredCountry && !selected && !hoveredPOI && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-lg bg-card/95 backdrop-blur-xl border border-border shadow-lg"
            >
              <p className="font-display text-sm font-semibold text-foreground">
                {hoveredCountry}
              </p>
              {countryDescriptions?.[hoveredCountry] && (
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  Click for details
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoom Controls */}
        <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
          {[
            { icon: ZoomIn, action: handleZoomIn, label: "Zoom in" },
            { icon: ZoomOut, action: handleZoomOut, label: "Zoom out" },
            { icon: RotateCcw, action: handleReset, label: "Reset" },
          ].map(({ icon: Icon, action, label }) => (
            <button
              key={label}
              onClick={action}
              title={label}
              className="p-2.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:bg-card transition-colors shadow-lg"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border font-body text-xs text-muted-foreground">
            {filteredPOIs.length} locations
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border font-body text-xs text-muted-foreground">
            Zoom: {position.zoom.toFixed(1)}x
          </span>
        </div>

        {/* Info Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 left-4 z-30 max-w-sm w-full rounded-xl border border-border bg-card/95 backdrop-blur-xl p-6 shadow-lg"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <span
                className="inline-block px-2.5 py-0.5 rounded-md text-xs font-body font-semibold mb-3"
                style={{
                  backgroundColor: `${getMarkerColor(selected.category)}20`,
                  color: getMarkerColor(selected.category),
                }}
              >
                {selected.category}
              </span>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                {selected.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                {selected.description}
              </p>
              {selected.details && (
                <div className="pt-3 border-t border-border">
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    {selected.details}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* POI List Panel */}
        <AnimatePresence>
          {showList && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-4 right-16 z-30 w-72 max-h-[calc(100%-2rem)] rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-lg overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-border">
                <h3 className="font-display text-sm font-bold text-foreground">
                  All Locations ({filteredPOIs.length})
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {categories
                  .filter((cat) => activeCategories.has(cat))
                  .map((cat) => {
                    const catPOIs = filteredPOIs.filter(
                      (p) => p.category === cat
                    );
                    if (catPOIs.length === 0) return null;
                    return (
                      <div key={cat} className="border-b border-border last:border-b-0">
                        <div
                          className="px-4 py-2 font-body text-xs font-semibold uppercase tracking-wider"
                          style={{
                            color: categoryColors[cat] || markerColor,
                          }}
                        >
                          {cat} ({catPOIs.length})
                        </div>
                        {catPOIs.map((poi) => (
                          <button
                            key={poi.name}
                            onClick={() => handleMarkerClick(poi)}
                            className={`w-full text-left px-4 py-2 hover:bg-secondary/50 transition-colors ${
                              selected?.name === poi.name
                                ? "bg-secondary/70"
                                : ""
                            }`}
                          >
                            <p className="font-body text-sm text-foreground truncate">
                              {poi.name}
                            </p>
                            <p className="font-body text-xs text-muted-foreground truncate">
                              {poi.description.slice(0, 60)}...
                            </p>
                          </button>
                        ))}
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default memo(FullPageMap);
