import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Filter, ArrowLeft } from "lucide-react";
import { useLessons } from "@/hooks/use-lessons";
import { useStudentProgress } from "@/hooks/use-student-progress";
import { Progress } from "@/components/ui/progress";
import MapLoadingState from "@/components/MapLoadingState";
import MapErrorState from "@/components/MapErrorState";

const DOMAINS = [
  { value: "", label: "All Domains" },
  { value: "history", label: "History" },
  { value: "geopolitics", label: "Geopolitics" },
  { value: "geology", label: "Geology" },
];

const LessonsList = () => {
  const [domain, setDomain] = useState("");
  const { data: lessons, isLoading, isError, refetch } = useLessons(domain || undefined);
  const { data: progress } = useStudentProgress();

  if (isLoading) return <MapLoadingState message="Loading lessons…" />;
  if (isError) return <MapErrorState message="Failed to load lessons" onRetry={() => refetch()} />;

  const progressMap = new Map(progress?.map((p) => [p.lessonId, p]));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <BookOpen className="h-5 w-5 text-primary" />
            <h1 className="font-display text-lg font-bold text-foreground">Lessons</h1>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="bg-secondary border border-border rounded-lg px-3 py-1.5 font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {DOMAINS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-10">
        {!lessons?.length ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="font-body text-muted-foreground">No lessons found{domain ? ` for ${domain}` : ""}.</p>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson, i) => {
              const prog = progressMap.get(lesson.id);
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/lessons/${lesson.id}`}
                    className="group block rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all hover:shadow-glow"
                  >
                    {lesson.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={lesson.coverImage}
                          alt={lesson.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-secondary font-body text-xs text-muted-foreground capitalize mb-2">
                        {lesson.domain}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                        {lesson.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-3">
                        {lesson.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-body text-xs text-muted-foreground">
                          {lesson.slides.length} slide{lesson.slides.length !== 1 ? "s" : ""}
                        </span>
                        {prog && (
                          <div className="flex items-center gap-2 w-24">
                            <Progress value={prog.completionPercent} className="h-1.5" />
                            <span className="font-body text-xs text-primary font-medium">
                              {prog.completionPercent}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Teacher link */}
        <div className="mt-12 text-center">
          <Link
            to="/lessons/manage"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary border border-border px-5 py-2.5 font-body text-sm text-foreground hover:bg-secondary/80 transition-colors"
          >
            Manage Lessons (Teacher)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonsList;
