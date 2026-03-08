import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Globe, Mountain, Landmark, Telescope, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGlobalSearch } from "@/hooks/use-search";

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

const GlobalSearch = ({ open, onClose }: GlobalSearchProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { data: results, isLoading } = useGlobalSearch(query);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleSelect = (result: { domain: string }) => {
    const route = domainRoutes[result.domain];
    if (route) navigate(route);
    onClose();
  };

  const grouped = results
    ? results.reduce<Record<string, typeof results>>((acc, r) => {
        (acc[r.domain] ??= []).push(r);
        return acc;
      }, {})
    : {};

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Panel */}
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
              <div className="max-h-[60vh] overflow-y-auto">
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
                        {items.map((item, i) => (
                          <button
                            key={`${item.name}-${i}`}
                            onClick={() => handleSelect(item)}
                            className="w-full text-left px-5 py-3 hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-b-0"
                          >
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="font-display text-sm font-semibold text-foreground">{item.name}</p>
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-body font-medium bg-secondary text-muted-foreground">
                                {item.category}
                              </span>
                            </div>
                            <p className="font-body text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                          </button>
                        ))}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer hint */}
              <div className="px-5 py-2.5 border-t border-border bg-secondary/20">
                <p className="font-body text-[10px] text-muted-foreground/60 text-center">
                  Press <kbd className="px-1 py-0.5 rounded bg-secondary text-muted-foreground text-[10px]">ESC</kbd> to close · Navigate with arrow keys
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
