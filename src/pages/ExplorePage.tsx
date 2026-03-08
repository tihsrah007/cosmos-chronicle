import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Mountain, Landmark, Telescope, MapPin, Filter, ArrowRight, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDomainItems } from "@/hooks/use-domain-items";
import { useStudyBoard, makeStudyBoardId } from "@/stores/study-board";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDomainItems } from "@/hooks/use-domain-items";

const DOMAINS = [
  { slug: "history", label: "History", icon: Landmark, route: "/history", color: "hsl(38, 90%, 55%)" },
  { slug: "geopolitics", label: "Geopolitics", icon: Globe, route: "/geopolitics", color: "hsl(210, 70%, 55%)" },
  { slug: "geology", label: "Geology", icon: Mountain, route: "/geology", color: "hsl(25, 70%, 50%)" },
  { slug: "cosmology", label: "Cosmology", icon: Telescope, route: "/cosmology", color: "hsl(270, 70%, 60%)" },
] as const;

interface ExploreItem {
  name: string;
  description: string;
  category: string;
  domain: string;
  domainColor: string;
  route: string;
  details?: string;
  facts?: string[];
  keyFigures?: { label: string; value: string }[];
}

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDomains, setActiveDomains] = useState<Set<string>>(new Set(DOMAINS.map(d => d.slug)));
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const historyQuery = useDomainItems("history");
  const geopoliticsQuery = useDomainItems("geopolitics");
  const geologyQuery = useDomainItems("geology");
  const cosmologyQuery = useDomainItems("cosmology");

  const queries = [
    { query: historyQuery, domain: DOMAINS[0] },
    { query: geopoliticsQuery, domain: DOMAINS[1] },
    { query: geologyQuery, domain: DOMAINS[2] },
    { query: cosmologyQuery, domain: DOMAINS[3] },
  ];

  const isLoading = queries.some(q => q.query.isLoading);
  const hasError = queries.some(q => q.query.isError);

  const allItems: ExploreItem[] = useMemo(() => {
    const items: ExploreItem[] = [];
    for (const { query, domain } of queries) {
      if (query.data) {
        for (const item of query.data) {
          items.push({
            name: item.name,
            description: item.description,
            category: item.category,
            domain: domain.slug,
            domainColor: domain.color,
            route: domain.route,
            details: item.details,
            facts: item.facts,
            keyFigures: item.keyFigures,
          });
        }
      }
    }
    return items;
  }, [historyQuery.data, geopoliticsQuery.data, geologyQuery.data, cosmologyQuery.data]);

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      if (!activeDomains.has(item.domain)) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allItems, activeDomains, searchQuery]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    filteredItems.forEach(i => cats.add(i.category));
    return Array.from(cats).sort();
  }, [filteredItems]);

  const toggleDomain = (slug: string) => {
    setActiveDomains(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-8 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3"
          >
            Explore Everything
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Browse all locations, events, and phenomena across every domain in one place.
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="sticky top-16 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search all items…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Domain chips */}
          <div className="flex flex-wrap gap-2">
            {DOMAINS.map(d => {
              const Icon = d.icon;
              const active = activeDomains.has(d.slug);
              return (
                <button
                  key={d.slug}
                  onClick={() => toggleDomain(d.slug)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-body text-xs font-medium transition-all ${
                    active
                      ? "border-transparent text-primary-foreground"
                      : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                  }`}
                  style={active ? { backgroundColor: d.color } : {}}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {d.label}
                </button>
              );
            })}
            <span className="flex items-center px-3 py-1.5 font-body text-xs text-muted-foreground/60">
              {filteredItems.length} items
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center py-16">
            <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-body text-sm text-muted-foreground">Loading exploration data…</p>
          </div>
        ) : hasError ? (
          <div className="flex flex-col items-center py-16">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-destructive" />
            </div>
            <p className="font-body text-sm text-muted-foreground mb-2">
              Some data could not be loaded.
            </p>
            <p className="font-body text-xs text-muted-foreground/60">
              Try refreshing the page or check your connection.
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center py-16">
            <Filter className="h-8 w-8 text-muted-foreground/30 mb-4" />
            <p className="font-body text-sm text-muted-foreground">
              No items match your filters. Try broadening your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={`${item.domain}-${item.name}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(i * 0.02, 0.3) }}
                  className="group rounded-xl border border-border bg-card hover:bg-card/80 transition-all overflow-hidden"
                >
                  <div className="p-5">
                    {/* Domain + Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: item.domainColor }}
                      />
                      <span className="font-body text-[10px] uppercase tracking-wider text-muted-foreground">
                        {item.domain}
                      </span>
                      <span className="font-body text-[10px] text-muted-foreground/40">·</span>
                      <span className="font-body text-[10px] uppercase tracking-wider text-muted-foreground/60">
                        {item.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                      {item.description}
                    </p>

                    {/* Key figures preview */}
                    {item.keyFigures && item.keyFigures.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {item.keyFigures.slice(0, 2).map((fig, j) => (
                          <div key={j} className="flex-1 rounded-lg bg-secondary/50 border border-border/40 px-2.5 py-1.5">
                            <p className="font-body text-[9px] text-muted-foreground/60 uppercase tracking-wider">{fig.label}</p>
                            <p className="font-display text-xs font-bold text-foreground">{fig.value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Expandable details */}
                    {item.details && (
                      <>
                        <button
                          onClick={() => setExpandedItem(expandedItem === `${item.domain}-${item.name}` ? null : `${item.domain}-${item.name}`)}
                          className="font-body text-[11px] text-primary hover:underline mb-2"
                        >
                          {expandedItem === `${item.domain}-${item.name}` ? "Show less" : "Read more"}
                        </button>
                        <AnimatePresence>
                          {expandedItem === `${item.domain}-${item.name}` && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="font-body text-xs text-muted-foreground/80 leading-relaxed mb-2">
                                {item.details}
                              </p>
                              {item.facts && item.facts.length > 0 && (
                                <div className="space-y-1">
                                  {item.facts.map((fact, fi) => (
                                    <div key={fi} className="flex items-start gap-1.5 text-xs">
                                      <span className="text-primary mt-0.5">→</span>
                                      <span className="font-body text-muted-foreground/70">{fact}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}

                    {/* Link to map */}
                    <Link
                      to={item.route}
                      className="inline-flex items-center gap-1 mt-3 font-body text-[11px] text-muted-foreground hover:text-primary transition-colors"
                    >
                      View on map <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default ExplorePage;
