import { useMemo, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  BookOpen,
  MapPin,
  Clock,
  ExternalLink,
  Zap,
  Lightbulb,
  Printer,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TOPIC_HUBS } from "@/data/topicHubs";
import { usePulse } from "@/hooks/use-pulse";
import AddToTrailButton from "@/components/AddToTrailButton";
import GlossaryTooltip from "@/components/GlossaryTooltip";
import { SourceConfidenceBadge, CopyCitationButton, inferSourceType } from "@/components/SourceBadge";

const domainColors: Record<string, string> = {
  geology: "hsl(25, 70%, 50%)",
  geopolitics: "hsl(38, 90%, 55%)",
  cosmology: "hsl(270, 60%, 60%)",
  history: "hsl(38, 90%, 55%)",
};

const domainRoutes: Record<string, string> = {
  geology: "/geology",
  geopolitics: "/geopolitics",
  cosmology: "/cosmology",
  history: "/history",
};

const TopicHubPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const hub = TOPIC_HUBS.find((h) => h.slug === slug);
  const { data: pulseUpdates } = usePulse();

  const relatedPulse = useMemo(() => {
    if (!pulseUpdates || !hub) return [];
    return pulseUpdates
      .filter((u) =>
        hub.relatedPulseTags.some((tag) =>
          u.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
        )
      )
      .slice(0, 5);
  }, [pulseUpdates, hub]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleOpenAllSources = useCallback(() => {
    if (!hub) return;
    hub.sources.forEach((src) => {
      if (src.url) window.open(src.url, "_blank", "noopener,noreferrer");
    });
  }, [hub]);

  if (!hub) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex flex-col items-center justify-center py-20">
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Topic Not Found</h1>
          <p className="font-body text-muted-foreground mb-4">This topic hub doesn't exist yet.</p>
          <Link to="/explore" className="text-primary hover:underline font-body text-sm">
            Browse Explore →
          </Link>
        </div>
      </div>
    );
  }

  const color = domainColors[hub.domain] || "hsl(38, 90%, 55%)";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container max-w-4xl">
          {/* Back */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-body text-sm"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              <div className="flex items-center gap-2 print:hidden">
                <AddToTrailButton
                  step={{
                    type: "topic",
                    label: hub.title,
                    ref: hub.slug,
                    domain: hub.domain,
                  }}
                />
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 font-body text-[11px] font-medium transition-colors"
                  aria-label="Print study sheet"
                >
                  <Printer className="h-3 w-3" /> Study Sheet
                </button>
              </div>
            </div>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-2.5 py-0.5 rounded-md text-xs font-body font-semibold uppercase tracking-wider"
                style={{ backgroundColor: `${color}20`, color }}
              >
                {hub.domain}
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {hub.title}
            </h1>
            <div className="font-body text-muted-foreground leading-relaxed max-w-3xl mb-10">
              <GlossaryTooltip text={hub.overview} />
            </div>
          </motion.div>

          {/* Key Concepts */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-4 w-4 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">Key Concepts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {hub.keyConcepts.map((c) => (
                <div
                  key={c.term}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <h3 className="font-display text-sm font-bold text-foreground mb-1">{c.term}</h3>
                  <div className="font-body text-xs text-muted-foreground leading-relaxed">
                    <GlossaryTooltip text={c.definition} />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Timeline Highlights */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">Timeline Highlights</h2>
            </div>
            <div className="space-y-2">
              {hub.timelineHighlights.map((t, i) => (
                <div key={i} className="flex items-start gap-4 px-4 py-3 rounded-lg bg-secondary/40 border border-border/30">
                  <span className="font-display text-sm font-bold text-primary whitespace-nowrap min-w-[80px]">
                    {t.year}
                  </span>
                  <p className="font-body text-sm text-muted-foreground">{t.event}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Map-Linked Items */}
          {hub.mapItems.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-primary" />
                <h2 className="font-display text-xl font-bold text-foreground">Explore on Map</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {hub.mapItems.map((item) => (
                  <button
                    key={`${item.domain}-${item.name}`}
                    onClick={() =>
                      navigate(domainRoutes[item.domain] || "/", {
                        state: { focusItem: item.name },
                      })
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border font-body text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  >
                    <MapPin className="h-3 w-3" />
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {/* Related Pulse Updates */}
          {relatedPulse.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-4 w-4 text-primary" />
                <h2 className="font-display text-xl font-bold text-foreground">Related Pulse Updates</h2>
              </div>
              <div className="space-y-3">
                {relatedPulse.map((u) => (
                  <Link
                    key={u.id}
                    to="/pulse"
                    className="block rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
                  >
                    <h3 className="font-display text-sm font-bold text-foreground mb-1">{u.title}</h3>
                    <p className="font-body text-xs text-muted-foreground line-clamp-2">{u.summary}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {u.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-secondary/60 border border-border font-body text-[10px] text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Sources with badges + copy citation + open all */}
          {hub.sources.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-4 w-4 text-primary" />
                <h2 className="font-display text-xl font-bold text-foreground">Sources</h2>
                {hub.sources.some((s) => s.url) && (
                  <button
                    onClick={handleOpenAllSources}
                    className="ml-auto font-body text-[10px] text-primary hover:underline print:hidden"
                  >
                    Open all sources ↗
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {hub.sources.map((src, i) => {
                  const srcType = inferSourceType(src.label, src.url);
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <SourceConfidenceBadge type={srcType} />
                      {src.url ? (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {src.label} <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="font-body text-sm text-muted-foreground">{src.label}</span>
                      )}
                      <CopyCitationButton label={src.label} url={src.url} />
                    </div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* Browse other hubs */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="print:hidden"
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Explore More Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {TOPIC_HUBS.filter((h) => h.slug !== slug).map((h) => (
                <Link
                  key={h.slug}
                  to={`/topics/${h.slug}`}
                  className="rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
                >
                  <span
                    className="inline-block px-2 py-0.5 rounded-md text-[10px] font-body font-semibold uppercase mb-2"
                    style={{
                      backgroundColor: `${domainColors[h.domain] || color}20`,
                      color: domainColors[h.domain] || color,
                    }}
                  >
                    {h.domain}
                  </span>
                  <h3 className="font-display text-sm font-bold text-foreground">{h.title}</h3>
                </Link>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TopicHubPage;
