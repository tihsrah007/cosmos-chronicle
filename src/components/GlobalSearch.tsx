import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Globe, Mountain, Landmark, Telescope, MapPin, AlertCircle, Plus, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGlobalSearch } from "@/hooks/use-search";
import { useStudyBoard, makeStudyBoardId } from "@/stores/study-board";

const domainIcons: Record<string, typeof Globe> = {
  geopolitics: Globe,
  geology: Mountain,
  history: Landmark,
  cosmology: Telescope,
};

const domainRoutes: Record<string, string> = {
  geopolitics: "/geopolitics",
  geology: "/geology",
  history: "/history",
  cosmology: "/cosmology",
};

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

interface FlatResult {
  domain: string;
  name: string;
  description: string;
  category: string;
  coordinates?: [number, number];
  groupIdx: number; // index within flattened list
}

const GlobalSearch = ({ open, onClose }: GlobalSearchProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { data: results, isLoading, isError } = useGlobalSearch(query);
  const [activeIdx, setActiveIdx] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIdx(-1);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Build flat list for keyboard navigation
  const grouped = results
    ? results.reduce<Record<string, typeof results>>((acc, r) => {
        (acc[r.domain] ??= []).push(r);
        return acc;
      }, {})
    : {};

  const flatItems: FlatResult[] = [];
  Object.entries(grouped).forEach(([domain, items]) => {
    items.forEach((item) => {
      flatItems.push({ ...item, domain, groupIdx: flatItems.length });
    });
  });

  const handleSelect = useCallback((result: { domain: string; name: string; coordinates?: [number, number] }) => {
    const route = domainRoutes[result.domain];
    if (route) {
      navigate(route, {
        state: {
          focusItem: result.name,
          focusCoordinates: result.coordinates,
        },
      });
    }
    onClose();
  }, [navigate, onClose]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((prev) => (prev < flatItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((prev) => (prev > 0 ? prev - 1 : flatItems.length - 1));
      } else if (e.key === "Enter" && activeIdx >= 0 && activeIdx < flatItems.length) {
        e.preventDefault();
        handleSelect(flatItems[activeIdx]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, activeIdx, flatItems, handleSelect]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIdx < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIdx(-1);
  }, [results]);

  let flatIdx = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[10vh] left-1/2 -translate-x-1/2 z-[101] w-full max-w-2xl mx-4"
          >
            <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search across history, geology, geopolitics, cosmology…"
                  className="flex-1 bg-transparent font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-[60vh] overflow-y-auto">
                {query.length < 2 ? (
                  <div className="px-5 py-8 text-center">
                    <MapPin className="h-8 w-8 mx-auto text-muted-foreground/30 mb-3" />
                    <p className="font-body text-sm text-muted-foreground">
                      Start typing to explore facts, events, places, and entities
                    </p>
                    <div className="flex justify-center gap-3 mt-4">
                      {Object.entries(domainIcons).map(([domain, Icon]) => (
                        <button
                          key={domain}
                          onClick={() => { navigate(domainRoutes[domain]); onClose(); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border font-body text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors capitalize"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {domain}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : isError ? (
                  <div className="px-5 py-8 text-center">
                    <AlertCircle className="h-8 w-8 mx-auto text-destructive/50 mb-3" />
                    <p className="font-body text-sm text-muted-foreground">
                      Search failed. Please try again.
                    </p>
                  </div>
                ) : isLoading ? (
                  <div className="px-5 py-8 text-center">
                    <div className="h-5 w-5 mx-auto border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
                    <p className="font-body text-sm text-muted-foreground">Searching…</p>
                  </div>
                ) : results && results.length === 0 ? (
                  <div className="px-5 py-8 text-center">
                    <p className="font-body text-sm text-muted-foreground">
                      No results found for "{query}"
                    </p>
                  </div>
                ) : (
                  Object.entries(grouped).map(([domain, items]) => {
                    const Icon = domainIcons[domain] || Globe;
                    return (
                      <div key={domain}>
                        <div className="px-5 py-2 bg-secondary/30 border-b border-border flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5 text-primary" />
                          <span className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider capitalize">
                            {domain}
                          </span>
                          <span className="font-body text-xs text-muted-foreground/60">
                            {items.length} result{items.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        {items.map((item, i) => {
                          flatIdx++;
                          const idx = flatIdx;
                          return (
                            <button
                              key={`${item.name}-${i}`}
                              data-idx={idx}
                              onClick={() => handleSelect(item)}
                              onMouseEnter={() => setActiveIdx(idx)}
                              className={`w-full text-left px-5 py-3 transition-colors border-b border-border/50 last:border-b-0 ${
                                activeIdx === idx ? "bg-secondary/70" : "hover:bg-secondary/50"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-0.5">
                                <p className="font-display text-sm font-semibold text-foreground">{item.name}</p>
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-body font-medium bg-secondary text-muted-foreground">
                                  {item.category}
                                </span>
                              </div>
                              <p className="font-body text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              <div className="px-5 py-2.5 border-t border-border bg-secondary/20">
                <p className="font-body text-[10px] text-muted-foreground/60 text-center">
                  <kbd className="px-1 py-0.5 rounded bg-secondary text-muted-foreground text-[10px]">↑↓</kbd> navigate · <kbd className="px-1 py-0.5 rounded bg-secondary text-muted-foreground text-[10px]">↵</kbd> select · <kbd className="px-1 py-0.5 rounded bg-secondary text-muted-foreground text-[10px]">ESC</kbd> close
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearch;
