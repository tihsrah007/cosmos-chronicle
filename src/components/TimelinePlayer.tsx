import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronUp, ChevronDown, Gauge, List, X } from "lucide-react";
import type { MapPOI } from "./FullPageMap";

interface TimelinePlayerProps {
  pois: MapPOI[];
  currentYear: number;
  onYearChange: (year: number) => void;
  minYear: number;
  maxYear: number;
  accentColor: string;
  formatYear?: (year: number) => string;
  onSelectPOI: (poi: MapPOI) => void;
}

const SPEEDS = [
  { label: "0.5×", value: 0.5 },
  { label: "1×", value: 1 },
  { label: "2×", value: 2 },
  { label: "5×", value: 5 },
] as const;

const defaultFormat = (year: number): string => {
  if (year < 0) return `${Math.abs(year)} BC`;
  return `${year} AD`;
};

/** Returns POIs that are "active" at the given year */
function getActiveEvents(pois: MapPOI[], year: number): MapPOI[] {
  return pois
    .filter((p) => {
      const start = p.startYear ?? p.year;
      const end = p.endYear ?? p.year;
      if (start == null && end == null) return false;
      return (start ?? -Infinity) <= year && year <= (end ?? Infinity);
    })
    .sort((a, b) => {
      const aStart = a.startYear ?? a.year ?? 0;
      const bStart = b.startYear ?? b.year ?? 0;
      return aStart - bStart;
    });
}

/** Returns sorted major events (those with a year) for jump navigation */
function getMajorEvents(pois: MapPOI[]): MapPOI[] {
  return pois
    .filter((p) => p.startYear != null || p.year != null)
    .sort((a, b) => {
      const aY = a.startYear ?? a.year ?? 0;
      const bY = b.startYear ?? b.year ?? 0;
      return aY - bY;
    });
}

const TimelinePlayer = ({
  pois,
  currentYear,
  onYearChange,
  minYear,
  maxYear,
  accentColor,
  formatYear = defaultFormat,
  onSelectPOI,
}: TimelinePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showFeed, setShowFeed] = useState(true);
  const [showSpeedPicker, setShowSpeedPicker] = useState(false);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const feedRef = useRef<HTMLDivElement>(null);

  const range = maxYear - minYear;
  const activeEvents = useMemo(() => getActiveEvents(pois, currentYear), [pois, currentYear]);
  const majorEvents = useMemo(() => getMajorEvents(pois), [pois]);

  // Auto-play loop
  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = null;
      lastTimeRef.current = 0;
      return;
    }

    const baseSpeed = range / 60; // traverse full range in ~60 seconds at 1x

    const tick = (timestamp: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const yearDelta = baseSpeed * speed * dt;
      onYearChange((prev: number) => {
        const next = prev + yearDelta;
        if (next >= maxYear) {
          setIsPlaying(false);
          return maxYear;
        }
        return Math.round(next);
      });

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, speed, range, maxYear]);

  const jumpPrev = useCallback(() => {
    const prev = [...majorEvents].reverse().find((e) => (e.startYear ?? e.year ?? 0) < currentYear);
    if (prev) onYearChange(prev.startYear ?? prev.year ?? minYear);
    else onYearChange(minYear);
  }, [majorEvents, currentYear, minYear, onYearChange]);

  const jumpNext = useCallback(() => {
    const next = majorEvents.find((e) => (e.startYear ?? e.year ?? 0) > currentYear);
    if (next) onYearChange(next.startYear ?? next.year ?? maxYear);
    else onYearChange(maxYear);
  }, [majorEvents, currentYear, maxYear, onYearChange]);

  // Auto-scroll feed to keep active events visible
  useEffect(() => {
    if (feedRef.current && activeEvents.length > 0) {
      const firstActive = feedRef.current.querySelector("[data-active='true']");
      firstActive?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeEvents]);

  return (
    <>
      {/* Floating controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2.5 rounded-lg backdrop-blur-sm border border-border shadow-lg transition-colors"
          style={
            isPlaying
              ? { backgroundColor: `${accentColor}20`, borderColor: `${accentColor}40`, color: accentColor }
              : { backgroundColor: "hsl(var(--card) / 0.9)", color: "hsl(var(--muted-foreground))" }
          }
          title={isPlaying ? "Pause" : "Play timeline"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        {/* Speed */}
        <div className="relative">
          <button
            onClick={() => setShowSpeedPicker(!showSpeedPicker)}
            className="p-2.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors shadow-lg"
            title="Playback speed"
          >
            <Gauge className="h-4 w-4" />
          </button>
          <AnimatePresence>
            {showSpeedPicker && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-12 top-0 flex gap-1 rounded-lg bg-card/95 backdrop-blur-xl border border-border shadow-lg p-1.5"
              >
                {SPEEDS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => { setSpeed(s.value); setShowSpeedPicker(false); }}
                    className={`px-2.5 py-1.5 rounded-md font-body text-[11px] font-medium transition-colors ${
                      speed === s.value
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground bg-secondary/50"
                    }`}
                    style={speed === s.value ? { backgroundColor: accentColor } : {}}
                  >
                    {s.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Jump prev/next */}
        <button
          onClick={jumpPrev}
          className="p-2.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors shadow-lg"
          title="Previous event"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={jumpNext}
          className="p-2.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors shadow-lg"
          title="Next event"
        >
          <ChevronDown className="h-4 w-4" />
        </button>

        {/* Toggle feed */}
        <button
          onClick={() => setShowFeed(!showFeed)}
          className={`p-2.5 rounded-lg backdrop-blur-sm border border-border shadow-lg transition-colors ${
            showFeed ? "bg-primary text-primary-foreground" : "bg-card/90 text-muted-foreground hover:text-foreground"
          }`}
          title="Event feed"
        >
          <List className="h-4 w-4" />
        </button>
      </div>

      {/* Event Feed Panel */}
      <AnimatePresence>
        {showFeed && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-4 right-16 z-20 w-72 max-h-[calc(100%-8rem)] rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-lg overflow-hidden flex flex-col"
          >
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-display text-sm font-bold text-foreground">Event Feed</h3>
                <p className="font-body text-[10px] text-muted-foreground">
                  {activeEvents.length} active at {formatYear(currentYear)}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {isPlaying && (
                  <span
                    className="inline-block w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
                <button
                  onClick={() => setShowFeed(false)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div ref={feedRef} className="flex-1 overflow-y-auto scrollbar-thin">
              {majorEvents.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="font-body text-xs text-muted-foreground">
                    No timeline events available.
                  </p>
                </div>
              ) : (
                majorEvents.map((event) => {
                  const eventYear = event.startYear ?? event.year ?? 0;
                  const endYear = event.endYear ?? event.year ?? eventYear;
                  const isActive = eventYear <= currentYear && currentYear <= endYear;
                  const isPast = endYear < currentYear;

                  return (
                    <button
                      key={event.name}
                      data-active={isActive}
                      onClick={() => onSelectPOI(event)}
                      className={`w-full text-left px-4 py-2.5 border-b border-border/40 transition-colors ${
                        isActive
                          ? "bg-secondary/60"
                          : isPast
                          ? "opacity-50 hover:opacity-80"
                          : "hover:bg-secondary/30"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            backgroundColor: isActive ? accentColor : "hsl(var(--muted-foreground))",
                          }}
                        />
                        <p className={`font-display text-xs font-semibold truncate ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {event.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pl-3.5">
                        <span className="font-body text-[10px] text-muted-foreground/60">
                          {formatYear(eventYear)}
                          {endYear !== eventYear ? ` – ${formatYear(endYear)}` : ""}
                        </span>
                        <span className="font-body text-[10px] text-muted-foreground/40">·</span>
                        <span className="font-body text-[10px] text-muted-foreground/40 truncate">
                          {event.category}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Speed indicator */}
            <div className="px-4 py-2 border-t border-border bg-secondary/20 flex items-center justify-between">
              <span className="font-body text-[10px] text-muted-foreground/60">
                {isPlaying ? "Playing" : "Paused"} · {speed}× speed
              </span>
              <span className="font-body text-[10px] text-muted-foreground/60">
                {activeEvents.length} active
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TimelinePlayer;
