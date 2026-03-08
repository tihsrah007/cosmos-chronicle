import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Search, X } from "lucide-react";
import { GLOSSARY, type GlossaryEntry } from "@/data/glossary";

const domainColors: Record<string, string> = {
  geology: "hsl(25, 70%, 50%)",
  geopolitics: "hsl(38, 90%, 55%)",
  cosmology: "hsl(270, 60%, 60%)",
  history: "hsl(38, 90%, 55%)",
};

interface GlossaryDrawerProps {
  open: boolean;
  onClose: () => void;
}

const GlossaryDrawer = ({ open, onClose }: GlossaryDrawerProps) => {
  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    let results = GLOSSARY;
    if (domainFilter !== "all") {
      results = results.filter((e) => e.domain === domainFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (e) =>
          e.term.toLowerCase().includes(q) ||
          e.definition.toLowerCase().includes(q)
      );
    }
    return results.sort((a, b) => a.term.localeCompare(b.term));
  }, [search, domainFilter]);

  const domains = ["all", "geology", "geopolitics", "history", "cosmology"];

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
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-card border-l border-border shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-bold text-foreground">Glossary</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Close glossary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 pt-4 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search terms…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  autoFocus
                />
              </div>
              <div className="flex gap-1.5 mt-3 overflow-x-auto">
                {domains.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDomainFilter(d)}
                    className={`flex-shrink-0 px-2.5 py-1 rounded-md font-body text-[10px] font-medium uppercase tracking-wider border transition-colors ${
                      domainFilter === d
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground"
                    }`}
                  >
                    {d === "all" ? "All" : d}
                  </button>
                ))}
              </div>
            </div>

            {/* Terms list */}
            <div className="flex-1 overflow-y-auto px-5 pb-5">
              {filtered.length === 0 ? (
                <p className="text-center font-body text-sm text-muted-foreground py-10">
                  No terms match your search.
                </p>
              ) : (
                <div className="space-y-2 mt-2">
                  {filtered.map((entry) => (
                    <div
                      key={entry.term}
                      className="rounded-lg border border-border bg-secondary/30 p-3"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-sm font-bold text-foreground">
                          {entry.term}
                        </h3>
                        <span
                          className="px-1.5 py-0.5 rounded text-[8px] font-body font-semibold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${domainColors[entry.domain] || "hsl(38,90%,55%)"}20`,
                            color: domainColors[entry.domain] || "hsl(38,90%,55%)",
                          }}
                        >
                          {entry.domain}
                        </span>
                      </div>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">
                        {entry.definition}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-4 text-center font-body text-[10px] text-muted-foreground/50">
                {GLOSSARY.length} terms total
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GlossaryDrawer;
