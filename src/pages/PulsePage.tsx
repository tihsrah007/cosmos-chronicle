import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Search,
  Clock,
  ExternalLink,
  MapPin,
  Filter,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Inbox,
  Sparkles,
  Plus,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { usePulse, getLastVisit, markVisit } from "@/hooks/use-pulse";
import { useStudyBoard } from "@/stores/study-board";
import type { PulseDomain, PulseSourceType, PulseUpdate } from "@/api/pulse-types";

/* ── helpers ── */

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const DOMAIN_TABS: { key: PulseDomain | "all"; label: string }[] = [
  { key: "all", label: "All Domains" },
  { key: "geopolitics", label: "Geopolitics" },
  { key: "cosmology", label: "Cosmology & Astrophysics" },
  { key: "geology", label: "Geology & Earth Science" },
  { key: "history", label: "History & Archaeology" },
];

const TIME_RANGES = [
  { key: "24h", label: "24 h", ms: 24 * 3600_000 },
  { key: "7d", label: "7 days", ms: 7 * 86400_000 },
  { key: "30d", label: "30 days", ms: 30 * 86400_000 },
] as const;

const SOURCE_TYPE_LABELS: Record<PulseSourceType, string> = {
  agency: "Agency",
  research: "Research",
  media: "Media",
  government: "Government",
  observatory: "Observatory",
};

const SOURCE_TYPE_COLORS: Record<PulseSourceType, string> = {
  agency: "hsl(38, 90%, 55%)",
  research: "hsl(210, 70%, 55%)",
  media: "hsl(280, 60%, 55%)",
  government: "hsl(160, 60%, 45%)",
  observatory: "hsl(340, 70%, 50%)",
};

const DOMAIN_COLORS: Record<PulseDomain, string> = {
  geopolitics: "hsl(38, 90%, 55%)",
  cosmology: "hsl(270, 60%, 60%)",
  geology: "hsl(160, 70%, 45%)",
  history: "hsl(25, 70%, 50%)",
};

/* ── page ── */

const PulsePage = () => {
  const navigate = useNavigate();
  const { data: updates, isLoading, isError } = usePulse();
  const { addItem, hasItem } = useStudyBoard();
  const [activeDomain, setActiveDomain] = useState<PulseDomain | "all">("all");
  const [timeRange, setTimeRange] = useState<string>("30d");
  const [sourceFilter, setSourceFilter] = useState<PulseSourceType | "all">("all");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const lastVisit = useMemo(() => getLastVisit(), []);

  // Mark visit on mount
  useEffect(() => {
    markVisit();
  }, []);

  const rangeMs = TIME_RANGES.find((r) => r.key === timeRange)?.ms ?? 30 * 86400_000;

  const filtered = useMemo(() => {
    if (!updates) return [];
    const cutoff = Date.now() - rangeMs;
    return updates.filter((u) => {
      if (activeDomain !== "all" && u.domain !== activeDomain) return false;
      if (new Date(u.publishedAt).getTime() < cutoff) return false;
      if (sourceFilter !== "all" && u.sourceType !== sourceFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !u.title.toLowerCase().includes(q) &&
          !u.summary.toLowerCase().includes(q) &&
          !u.tags.some((t) => t.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });
  }, [updates, activeDomain, timeRange, sourceFilter, search, rangeMs]);

  const newSinceLastVisit = useMemo(
    () => (lastVisit ? filtered.filter((u) => new Date(u.publishedAt).getTime() > lastVisit) : []),
    [filtered, lastVisit],
  );

  const trendingTags = useMemo(() => {
    const counts = new Map<string, number>();
    filtered.forEach((u) => u.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag);
  }, [filtered]);

  const handleOpenOnMap = (u: PulseUpdate) => {
    if (!u.mapDomain) return;
    navigate(`/${u.mapDomain}`, {
      state: {
        focusItem: u.mapTarget,
        focusCoordinates: u.coordinates,
      },
    });
  };

  /* ── render ── */

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-body text-sm mb-6"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Knowledge <span className="text-primary">Pulse</span>
              </h1>
            </div>
            <p className="font-body text-muted-foreground max-w-2xl">
              Fresh discoveries and updates across geopolitics, cosmology, geology, and history — curated for explorers.
            </p>
          </motion.div>

          {/* Domain Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
            {DOMAIN_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveDomain(tab.key)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-body text-sm font-medium transition-all border ${
                  activeDomain === tab.key
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground hover:border-primary/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search + Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search updates, tags…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border font-body text-sm transition-all ${
                showFilters
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="flex flex-wrap gap-6 p-4 rounded-xl border border-border bg-card">
                  {/* Time Range */}
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Time Range
                    </p>
                    <div className="flex gap-2">
                      {TIME_RANGES.map((r) => (
                        <button
                          key={r.key}
                          onClick={() => setTimeRange(r.key)}
                          className={`px-3 py-1 rounded-md font-body text-xs transition-all border ${
                            timeRange === r.key
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground"
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Source Type */}
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Source Type
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSourceFilter("all")}
                        className={`px-3 py-1 rounded-md font-body text-xs transition-all border ${
                          sourceFilter === "all"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground"
                        }`}
                      >
                        All
                      </button>
                      {(Object.keys(SOURCE_TYPE_LABELS) as PulseSourceType[]).map((st) => (
                        <button
                          key={st}
                          onClick={() => setSourceFilter(st)}
                          className={`px-3 py-1 rounded-md font-body text-xs transition-all border ${
                            sourceFilter === st
                              ? "text-primary-foreground border-transparent"
                              : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground"
                          }`}
                          style={
                            sourceFilter === st
                              ? { backgroundColor: SOURCE_TYPE_COLORS[st] }
                              : {}
                          }
                        >
                          {SOURCE_TYPE_LABELS[st]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trending Topics */}
          {trendingTags.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Trending Topics
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearch(tag)}
                    className="px-3 py-1 rounded-full bg-secondary/60 border border-border font-body text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* "What changed since last visit" */}
          {newSinceLastVisit.length > 0 && lastVisit > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-xl border border-primary/30 bg-primary/5"
            >
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-body text-sm font-semibold text-foreground">
                  {newSinceLastVisit.length} new update{newSinceLastVisit.length !== 1 ? "s" : ""} since your last visit
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground">
                Highlighted below with a golden accent.
              </p>
            </motion.div>
          )}

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-3" />
              <p className="font-body text-sm text-muted-foreground">Loading pulse updates…</p>
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-24">
              <AlertCircle className="h-8 w-8 text-destructive mb-3" />
              <p className="font-body text-sm text-muted-foreground">Failed to load updates. Showing fallback data.</p>
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24">
              <Inbox className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="font-body text-sm text-muted-foreground">No updates match your current filters.</p>
            </div>
          )}

          {/* Cards */}
          {!isLoading && filtered.length > 0 && (
            <div className="space-y-4">
              {filtered.map((u, i) => {
                const isNew = lastVisit > 0 && new Date(u.publishedAt).getTime() > lastVisit;
                return (
                  <motion.article
                    key={u.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className={`group relative rounded-xl border bg-card p-5 transition-all hover:border-primary/40 ${
                      isNew ? "border-primary/50 shadow-glow" : "border-border"
                    }`}
                  >
                    {/* New badge */}
                    {isNew && (
                      <span className="absolute -top-2 right-4 px-2 py-0.5 rounded-full bg-primary text-primary-foreground font-body text-[10px] font-bold uppercase tracking-wider">
                        New
                      </span>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Domain color bar */}
                      <div
                        className="hidden sm:block w-1 self-stretch rounded-full flex-shrink-0"
                        style={{ backgroundColor: DOMAIN_COLORS[u.domain] }}
                      />

                      <div className="flex-1 min-w-0">
                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className="px-2 py-0.5 rounded-md font-body text-[10px] font-semibold uppercase tracking-wider"
                            style={{
                              backgroundColor: `${SOURCE_TYPE_COLORS[u.sourceType]}20`,
                              color: SOURCE_TYPE_COLORS[u.sourceType],
                            }}
                          >
                            {SOURCE_TYPE_LABELS[u.sourceType]}
                          </span>
                          <span className="font-body text-xs text-muted-foreground">
                            {u.sourceName}
                          </span>
                          <span className="text-muted-foreground/40">·</span>
                          <span className="font-body text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {timeAgo(u.publishedAt)}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-lg font-bold text-foreground mb-1.5 leading-snug">
                          {u.title}
                        </h3>

                        {/* Summary */}
                        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                          {u.summary}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {u.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-secondary/60 border border-border font-body text-[10px] text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 flex-wrap">
                          {u.sourceUrl && (
                            <a
                              href={u.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 font-body text-xs text-primary hover:underline"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Read Source
                            </a>
                          )}
                          {u.mapDomain && (
                            <button
                              onClick={() => handleOpenOnMap(u)}
                              className="flex items-center gap-1.5 font-body text-xs text-primary hover:underline"
                            >
                              <MapPin className="h-3 w-3" />
                              Open on Map
                            </button>
                          )}
                          {(() => {
                            const boardId = `${u.domain}-${u.title}`;
                            const onBoard = hasItem(boardId);
                            return (
                              <>
                                <button
                                  onClick={() => {
                                    if (!onBoard) {
                                      addItem({
                                        name: u.title,
                                        domain: u.domain,
                                        category: u.sourceType,
                                        description: u.summary,
                                        coordinates: u.coordinates,
                                        sources: u.sourceUrl ? [{ label: u.sourceName, url: u.sourceUrl }] : [],
                                      });
                                    }
                                  }}
                                  disabled={onBoard}
                                  className={`flex items-center gap-1.5 font-body text-xs transition-colors ${
                                    onBoard ? "text-primary/60" : "text-primary hover:underline"
                                  }`}
                                >
                                  {onBoard ? <><Check className="h-3 w-3" /> Saved</> : <><Plus className="h-3 w-3" /> Study Board</>}
                                </button>
                                {/* Save + Open combo */}
                                {!onBoard && u.mapDomain && (
                                  <button
                                    onClick={() => {
                                      addItem({
                                        name: u.title,
                                        domain: u.domain,
                                        category: u.sourceType,
                                        description: u.summary,
                                        coordinates: u.coordinates,
                                        sources: u.sourceUrl ? [{ label: u.sourceName, url: u.sourceUrl }] : [],
                                      });
                                      handleOpenOnMap(u);
                                    }}
                                    className="flex items-center gap-1.5 font-body text-xs text-primary hover:underline"
                                  >
                                    <Plus className="h-3 w-3" />
                                    Save & Open
                                  </button>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PulsePage;
