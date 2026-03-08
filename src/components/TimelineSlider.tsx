import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface Era {
  label: string;
  start: number;
  end: number;
}

interface TimelineSliderProps {
  minYear: number;
  maxYear: number;
  currentYear: number;
  onYearChange: (year: number) => void;
  eras: readonly Era[];
  accentColor: string;
  formatYear?: (year: number) => string;
}

const defaultFormatYear = (year: number): string => {
  if (year <= -1000000) return `${(year / -1000000).toFixed(1)}M BC`;
  if (year <= -1000) return `${Math.round(year / -1000)}K BC`;
  if (year < 0) return `${Math.abs(year)} BC`;
  if (year === 0) return "1 AD";
  return `${year} AD`;
};

const TimelineSlider = ({
  minYear,
  maxYear,
  currentYear,
  onYearChange,
  eras,
  accentColor,
  formatYear = defaultFormatYear,
}: TimelineSliderProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  const range = maxYear - minYear;
  const progress = ((currentYear - minYear) / range) * 100;

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    let lastTime = performance.now();
    const speed = range / 30; // traverse full range in 30 seconds
    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      onYearChange((prev) => {
        const next = typeof prev === "number" ? prev : currentYear;
        const newYear = next + speed * dt;
        if (newYear >= maxYear) {
          setIsPlaying(false);
          return maxYear;
        }
        return Math.round(newYear);
      });
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, range, maxYear]);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      onYearChange(Math.round(minYear + pct * range));
    },
    [minYear, range, onYearChange]
  );

  const handleTrackHover = useCallback(
    (e: React.MouseEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setHoveredYear(Math.round(minYear + pct * range));
    },
    [minYear, range]
  );

  const handleDrag = useCallback(
    (e: React.MouseEvent) => {
      if (e.buttons !== 1) return;
      handleTrackClick(e);
    },
    [handleTrackClick]
  );

  const currentEra = useMemo(
    () => eras.find((era) => currentYear >= era.start && currentYear <= era.end),
    [currentYear, eras]
  );

  const skipBack = () => {
    const prevEra = [...eras].reverse().find((e) => e.end < currentYear);
    if (prevEra) onYearChange(prevEra.start);
    else onYearChange(minYear);
  };

  const skipForward = () => {
    const nextEra = eras.find((e) => e.start > currentYear);
    if (nextEra) onYearChange(nextEra.start);
    else onYearChange(maxYear);
  };

  return (
    <div className="w-full">
      {/* Current year display */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <motion.span
            key={currentYear}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-lg font-bold"
            style={{ color: accentColor }}
          >
            {formatYear(currentYear)}
          </motion.span>
          {currentEra && (
            <span className="font-body text-xs text-muted-foreground px-2 py-0.5 rounded bg-secondary/50 border border-border">
              {currentEra.label}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={skipBack}
            className="p-1.5 rounded-md hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipBack className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            style={isPlaying ? { backgroundColor: `${accentColor}20`, color: accentColor } : {}}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={skipForward}
            className="p-1.5 rounded-md hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            <SkipForward className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-8 cursor-pointer select-none group"
        onClick={handleTrackClick}
        onMouseMove={(e) => {
          handleTrackHover(e);
          handleDrag(e);
        }}
        onMouseLeave={() => setHoveredYear(null)}
      >
        {/* Era backgrounds */}
        <div className="absolute inset-x-0 top-2 h-4 rounded-full bg-secondary/60 border border-border overflow-hidden">
          {eras.map((era, i) => {
            const left = ((era.start - minYear) / range) * 100;
            const width = ((era.end - era.start) / range) * 100;
            return (
              <div
                key={i}
                className="absolute top-0 h-full opacity-30 hover:opacity-50 transition-opacity"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  backgroundColor: accentColor,
                  opacity: currentEra === era ? 0.35 : 0.15,
                }}
              />
            );
          })}
          {/* Progress fill */}
          <div
            className="absolute top-0 h-full rounded-l-full transition-[width] duration-75"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${accentColor}40, ${accentColor}80)`,
            }}
          />
        </div>

        {/* Era dividers */}
        {eras.slice(1).map((era, i) => {
          const left = ((era.start - minYear) / range) * 100;
          return (
            <div
              key={i}
              className="absolute top-1 h-6 w-px bg-border"
              style={{ left: `${left}%` }}
            />
          );
        })}

        {/* Hover indicator */}
        {hoveredYear !== null && (
          <div
            className="absolute top-0 h-8 flex flex-col items-center pointer-events-none"
            style={{ left: `${((hoveredYear - minYear) / range) * 100}%` }}
          >
            <span className="absolute -top-5 text-[10px] font-body text-muted-foreground whitespace-nowrap bg-card/90 px-1.5 py-0.5 rounded border border-border">
              {formatYear(hoveredYear)}
            </span>
          </div>
        )}

        {/* Thumb */}
        <div
          className="absolute top-1 h-6 w-3 -ml-1.5 rounded-sm shadow-lg transition-[left] duration-75"
          style={{
            left: `${progress}%`,
            backgroundColor: accentColor,
            boxShadow: `0 0 12px ${accentColor}60`,
          }}
        />
      </div>

      {/* Era labels */}
      <div className="relative h-5 mt-1 hidden md:block">
        {eras.map((era, i) => {
          const left = ((era.start - minYear) / range) * 100;
          const width = ((era.end - era.start) / range) * 100;
          return (
            <button
              key={i}
              onClick={() => onYearChange(era.start)}
              className="absolute text-[9px] font-body text-muted-foreground hover:text-foreground transition-colors truncate"
              style={{ left: `${left}%`, width: `${width}%` }}
            >
              {era.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineSlider;
