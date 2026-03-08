import { useState, useCallback, useMemo, memo, useEffect } from "react";
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
  Clock,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import TimelineSlider from "@/components/TimelineSlider";
import TimelinePlayer from "@/components/TimelinePlayer";
import DetailPanel from "@/components/DetailPanel";
import MapLoadingState from "@/components/MapLoadingState";
import MapErrorState from "@/components/MapErrorState";
import { useDomainItems } from "@/hooks/use-domain-items";
import { useDomainTimeline } from "@/hooks/use-domain-timeline";
// Static fallbacks
import {
  HISTORY_EVENTS,
  HISTORY_ERAS,
  HISTORY_CATEGORIES as STATIC_CATEGORIES,
  type HistoryEvent,
} from "@/data/historyData";
import type { ApiMapItem } from "@/api/types";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const categoryColors: Record<string, string> = {
  "Empire & Civilization": "hsl(38, 85%, 55%)",
  "War & Conflict": "hsl(0, 70%, 55%)",
  "Invention & Discovery": "hsl(200, 70%, 55%)",
  "Trade & Exploration": "hsl(160, 60%, 45%)",
  "Revolution & Reform": "hsl(280, 60%, 55%)",
  "Religion & Culture": "hsl(50, 80%, 50%)",
  "Plague & Disaster": "hsl(15, 80%, 50%)",
  "Migration & Settlement": "hsl(120, 50%, 45%)",
};

function apiItemToHistoryEvent(item: ApiMapItem): HistoryEvent {
  return {
    name: item.name,
    coordinates: item.coordinates,
    description: item.description,
    category: item.category,
    year: item.year ?? 0,
    yearLabel: item.yearLabel ?? String(item.year ?? 0),
    details: item.details,
    facts: item.facts,
    keyFigures: item.keyFigures,
    relatedItems: item.relatedItems,
    sources: item.sources,
  };
}

const HistoryMap = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemsQuery = useDomainItems("history");
  const timelineQuery = useDomainTimeline("history");

  const [selected, setSelected] = useState<HistoryEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<HistoryEvent | null>(null);
  const [position, setPosition] = useState<{
    coordinates: [number, number];
    zoom: number;
  }>({ coordinates: [20, 15], zoom: 1.8 });
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showList, setShowList] = useState(false);
  const [currentYear, setCurrentYear] = useState(-3000);
  const [showTimeline, setShowTimeline] = useState(true);

  // Use API data or fall back to static
  const allEvents: HistoryEvent[] = useMemo(() => {
    if (itemsQuery.data) return itemsQuery.data.map(apiItemToHistoryEvent);
    return HISTORY_EVENTS;
  }, [itemsQuery.data]);

  const eras = useMemo(() => {
    if (timelineQuery.data?.eras) return timelineQuery.data.eras;
    return [...HISTORY_ERAS];
  }, [timelineQuery.data]);

  const categories = useMemo(
    () => [...new Set(allEvents.map((e) => e.category))],
    [allEvents]
  );

  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());

  // Sync categories when data arrives
  useMemo(() => {
    if (categories.length > 0 && activeCategories.size === 0) {
      setActiveCategories(new Set(categories));
    }
  }, [categories]);

  // Auto-focus from global search navigation
  useEffect(() => {
    const state = location.state as { focusItem?: string; focusCoordinates?: [number, number] } | null;
    if (state?.focusItem && allEvents.length > 0) {
      const match = allEvents.find(e => e.name === state.focusItem);
      if (match) {
        handleEventClick(match);
      } else if (state.focusCoordinates) {
        setPosition({ coordinates: state.focusCoordinates, zoom: 5 });
      }
      // Clear state to prevent re-focus on re-render
      window.history.replaceState({}, "");
    }
  }, [allEvents, location.state]);

  const timeFilteredEvents = useMemo(
    () => allEvents.filter((e) => e.year <= currentYear + 100),
    [allEvents, currentYear]
  );

  const filteredEvents = useMemo(
    () =>
      timeFilteredEvents.filter(
        (e) =>
          activeCategories.has(e.category) &&
          (searchQuery === "" ||
            e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.yearLabel.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [timeFilteredEvents, activeCategories, searchQuery]
  );

  const handleZoomIn = useCallback(() => {
    setPosition((pos) => ({ ...pos, zoom: Math.min(pos.zoom * 1.5, 12) }));
  }, []);
  const handleZoomOut = useCallback(() => {
    setPosition((pos) => ({ ...pos, zoom: Math.max(pos.zoom / 1.5, 1) }));
  }, []);
  const handleReset = useCallback(() => {
    setPosition({ coordinates: [20, 15], zoom: 1.8 });
    setSelected(null);
  }, []);
  const handleEventClick = useCallback((event: HistoryEvent) => {
    setSelected(event);
    setPosition({ coordinates: event.coordinates, zoom: 5 });
  }, []);
  const toggleCategory = useCallback((cat: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const getColor = (category: string) =>
    categoryColors[category] || "hsl(38, 85%, 55%)";

  const formatYear = (year: number) =>
    year < 0 ? `${Math.abs(year)} BC` : `${year} AD`;

  // Loading / error states
  if (itemsQuery.isLoading && !itemsQuery.data) {
    return <MapLoadingState message="Loading historical data…" />;
  }
  if (itemsQuery.isError && !itemsQuery.data) {
    // Fall through to static data — already handled by allEvents fallback
  }

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
            <span className="hidden sm:inline">Back to Terranova</span>
          </button>
          <div className="h-5 w-px bg-border" />
          <div>
            <h1 className="font-display text-lg font-bold text-foreground leading-tight">
              Historical Atlas
            </h1>
            <p className="font-body text-xs text-muted-foreground hidden md:block">
              Empires, wars, discoveries, and revolutions from 5000 BC to today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-secondary border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary w-40 md:w-56"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg border border-border transition-colors ${showFilters ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
          >
            <Filter className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className={`p-2 rounded-lg border border-border transition-colors ${showTimeline ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
          >
            <Clock className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowList(!showList)}
            className={`p-2 rounded-lg border border-border transition-colors ${showList ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
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
            className="z-20 border-b border-border bg-card/90 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 md:px-6 py-3 flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = activeCategories.has(cat);
                const color = getColor(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1 rounded-full font-body text-xs font-medium transition-all border ${isActive ? "border-transparent text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground bg-secondary/50"}`}
                    style={
                      isActive
                        ? { backgroundColor: color, borderColor: color }
                        : {}
                    }
                  >
                    {cat}
                    <span className="ml-1.5 opacity-70">
                      {timeFilteredEvents.filter((e) => e.category === cat).length}
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
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full opacity-5 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsl(38, 85%, 55%), transparent 70%)",
          }}
        />

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
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="hsl(30, 10%, 16%)"
                    stroke="hsl(30, 8%, 22%)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "hsl(30, 15%, 22%)", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {filteredEvents.map((event) => {
              const color = getColor(event.category);
              const isRecent = event.year >= currentYear - 300;
              const opacity = isRecent ? 1 : 0.5;
              return (
                <Marker
                  key={event.name + event.year}
                  coordinates={event.coordinates}
                  onClick={() => handleEventClick(event)}
                  onMouseEnter={() => setHoveredEvent(event)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <g
                    style={{ cursor: "pointer", opacity }}
                    transform="translate(-10, -10)"
                  >
                    <circle
                      r={16}
                      cx={10}
                      cy={10}
                      fill="transparent"
                      stroke="none"
                    />
                    {isRecent && (
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
                    )}
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

        {/* Hover Tooltip */}
        <AnimatePresence>
          {hoveredEvent && !selected && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-32 left-1/2 -translate-x-1/2 z-30 max-w-xs w-full px-4 py-3 rounded-lg bg-card/95 backdrop-blur-xl border border-border shadow-lg pointer-events-none"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: getColor(hoveredEvent.category),
                  }}
                />
                <p className="font-display text-sm font-semibold text-foreground truncate">
                  {hoveredEvent.name}
                </p>
                <span className="font-body text-xs text-muted-foreground ml-auto">
                  {hoveredEvent.yearLabel}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {hoveredEvent.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoom Controls */}
        <div className="absolute bottom-28 right-6 z-20 flex flex-col gap-2">
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
        <div className="absolute bottom-28 left-6 z-20 flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border font-body text-xs text-muted-foreground">
            {filteredEvents.length} events
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border font-body text-xs text-muted-foreground">
            Zoom: {position.zoom.toFixed(1)}x
          </span>
        </div>

        {/* Info Panel */}
        <AnimatePresence>
          {selected && (
            <DetailPanel
              domainSlug="history"
              item={{
                name: selected.name,
                coordinates: selected.coordinates,
                description: selected.description,
                category: selected.category,
                details: selected.details,
                facts: selected.facts,
                keyFigures: selected.keyFigures,
                relatedItems: selected.relatedItems,
                sources: selected.sources,
              }}
              accentColor={getColor(selected.category)}
              onClose={() => setSelected(null)}
            />
          )}
        </AnimatePresence>

        {/* POI List Panel */}
        <AnimatePresence>
          {showList && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-16 z-30 w-72 max-h-[calc(100%-8rem)] rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-lg overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-border">
                <h3 className="font-display text-sm font-bold text-foreground">
                  Events ({filteredEvents.length})
                </h3>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {categories
                  .filter((cat) => activeCategories.has(cat))
                  .map((cat) => {
                    const catEvents = filteredEvents.filter(
                      (e) => e.category === cat
                    );
                    if (catEvents.length === 0) return null;
                    return (
                      <div
                        key={cat}
                        className="border-b border-border last:border-b-0"
                      >
                        <div
                          className="px-4 py-2 font-body text-xs font-semibold uppercase tracking-wider"
                          style={{ color: getColor(cat) }}
                        >
                          {cat} ({catEvents.length})
                        </div>
                        {catEvents.map((event) => (
                          <button
                            key={event.name}
                            onClick={() => handleEventClick(event)}
                            className={`w-full text-left px-4 py-2 hover:bg-secondary/50 transition-colors ${selected?.name === event.name ? "bg-secondary/70" : ""}`}
                          >
                            <div className="flex items-center justify-between">
                              <p className="font-body text-sm text-foreground truncate">
                                {event.name}
                              </p>
                              <span className="font-body text-[10px] text-muted-foreground ml-2 shrink-0">
                                {event.yearLabel}
                              </span>
                            </div>
                            <p className="font-body text-xs text-muted-foreground truncate">
                              {event.description.slice(0, 60)}...
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

      {/* Timeline Bar */}
      <AnimatePresence>
        {showTimeline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="z-30 border-t border-border bg-card/90 backdrop-blur-xl px-4 md:px-6 py-3"
          >
            <TimelineSlider
              minYear={-5000}
              maxYear={2025}
              currentYear={currentYear}
              onYearChange={setCurrentYear}
              eras={eras}
              accentColor="hsl(38, 85%, 55%)"
              formatYear={formatYear}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(HistoryMap);
