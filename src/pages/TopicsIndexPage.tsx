import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  BookOpen,
  Lightbulb,
  Globe,
  Mountain,
  Landmark,
  Telescope,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TOPIC_HUBS } from "@/data/topicHubs";

const domainColors: Record<string, string> = {
  geology: "hsl(25, 70%, 50%)",
  geopolitics: "hsl(38, 90%, 55%)",
  cosmology: "hsl(270, 60%, 60%)",
  history: "hsl(38, 90%, 55%)",
};

const domainIcons: Record<string, typeof Globe> = {
  geology: Mountain,
  geopolitics: Globe,
  cosmology: Telescope,
  history: Landmark,
};

const TopicsIndexPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-body text-sm mb-6"
            >
              <ChevronLeft className="h-4 w-4" /> Back to Home
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Topic Hubs
              </h1>
            </div>
            <p className="font-body text-muted-foreground max-w-2xl mb-10">
              Curated knowledge hubs connecting concepts, maps, timelines, and the latest discoveries. Start exploring any topic below.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPIC_HUBS.map((hub, i) => {
              const color = domainColors[hub.domain] || "hsl(38, 90%, 55%)";
              const Icon = domainIcons[hub.domain] || BookOpen;
              return (
                <motion.div
                  key={hub.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/topics/${hub.slug}`}
                    className="group block rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-glow transition-all h-full"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-4 w-4" style={{ color }} />
                      <span
                        className="px-2 py-0.5 rounded-md text-[10px] font-body font-semibold uppercase tracking-wider"
                        style={{ backgroundColor: `${color}20`, color }}
                      >
                        {hub.domain}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {hub.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                      {hub.overview}
                    </p>
                    <div className="flex items-center gap-3 text-muted-foreground/60 font-body text-[10px]">
                      <span>{hub.keyConcepts.length} concepts</span>
                      <span>·</span>
                      <span>{hub.timelineHighlights.length} events</span>
                      {hub.mapItems.length > 0 && (
                        <>
                          <span>·</span>
                          <span>{hub.mapItems.length} map items</span>
                        </>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TopicsIndexPage;
