import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Globe,
  Mountain,
  Landmark,
  Telescope,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TOPIC_HUBS } from "@/data/topicHubs";
import { BackButton, PageHeader, DomainBadge } from "@/components/ui/shared";
import { Lightbulb } from "lucide-react";
import { addRecent } from "@/stores/recent";

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
  useEffect(() => {
    addRecent({ path: "/topics", label: "Topic Hubs" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <BackButton to="/" label="Back to Home" />
            <PageHeader
              icon={Lightbulb}
              title="Topic Hubs"
              description="Curated knowledge hubs connecting concepts, maps, timelines, and the latest discoveries. Start exploring any topic below."
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
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
                      <DomainBadge label={hub.domain} color={color} />
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
