import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-ui";

const STORAGE_PREFIX = "terranova_map_tip_";

interface MapTipProps {
  domainSlug: string;
  hasTimeline?: boolean;
}

const tips: Record<string, string> = {
  geology: "Scroll to zoom, drag to pan. Use the timeline slider to travel through geological eras. Click any marker for details, or open Layers to filter by category.",
  geopolitics: "Hover over countries for quick info. Use the timeline to see geopolitical shifts over time. Open Layers & Legend to toggle categories or enable Focus Mode.",
  history: "Click markers to explore historical events. Drag the timeline to move through centuries, or press Play for an animated walkthrough with a live event feed.",
  cosmology: "Explore observatories and cosmic landmarks on the map. Use the timeline to trace discoveries through history. Click any marker for details and sources.",
};

const MapTip = ({ domainSlug, hasTimeline = true }: MapTipProps) => {
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();
  const key = STORAGE_PREFIX + domainSlug;

  useEffect(() => {
    try {
      if (!localStorage.getItem(key)) setVisible(true);
    } catch {}
  }, [key]);

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(key, "1"); } catch {}
  };

  const tip = tips[domainSlug] || `Scroll to zoom, drag to pan.${hasTimeline ? " Use the timeline to explore different periods." : ""} Click markers for details.`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, delay: 0.8 }}
          className="absolute top-3 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg pointer-events-auto"
        >
          <div className="flex items-start gap-2.5 rounded-lg border border-primary/20 bg-background/90 backdrop-blur-md shadow-lg px-4 py-3">
            <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="font-body text-xs text-foreground/80 leading-relaxed flex-1">{tip}</p>
            <button
              onClick={dismiss}
              className="p-1 rounded-sm text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
              aria-label="Dismiss map tip"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapTip;
