import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useLesson } from "@/hooks/use-lessons";
import { useStudentProgress, useUpdateStudentProgress } from "@/hooks/use-student-progress";
import { Progress } from "@/components/ui/progress";
import MapLoadingState from "@/components/MapLoadingState";
import MapErrorState from "@/components/MapErrorState";

const LessonDetail = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { data: lesson, isLoading, isError, refetch } = useLesson(lessonId ?? "");
  const { data: allProgress } = useStudentProgress();
  const updateProgress = useUpdateStudentProgress();

  const [slideIdx, setSlideIdx] = useState(0);

  // Restore last viewed slide from progress
  const myProgress = allProgress?.find((p) => p.lessonId === lessonId);
  useEffect(() => {
    if (lesson && myProgress?.lastSlideId) {
      const idx = lesson.slides.findIndex((s) => s.id === myProgress.lastSlideId);
      if (idx >= 0) setSlideIdx(idx);
    }
  }, [lesson?.id]); // only on first load

  if (isLoading) return <MapLoadingState message="Loading lesson…" />;
  if (isError || !lesson) return <MapErrorState message="Failed to load lesson" onRetry={() => refetch()} />;

  const slides = [...lesson.slides].sort((a, b) => a.order - b.order);
  const currentSlide = slides[slideIdx];
  const total = slides.length;
  const pct = total > 0 ? Math.round(((slideIdx + 1) / total) * 100) : 0;

  const navigate = (dir: -1 | 1) => {
    const next = slideIdx + dir;
    if (next < 0 || next >= total) return;
    setSlideIdx(next);
    // fire progress update
    if (lessonId && slides[next]) {
      updateProgress.mutate({
        lessonId,
        completedSlides: next + 1,
        lastSlideId: slides[next].id,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/lessons" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="font-display text-sm font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">
              {lesson.title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body text-xs text-muted-foreground">
              {slideIdx + 1}/{total}
            </span>
            <Progress value={pct} className="w-20 h-1.5" />
            <span className="font-body text-xs text-primary font-medium">{pct}%</span>
          </div>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <AnimatePresence mode="wait">
          {currentSlide && (
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-3xl"
            >
              <div className="rounded-xl border border-border bg-card p-8 sm:p-12">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {currentSlide.title}
                </h2>

                {currentSlide.imageUrl && (
                  <img
                    src={currentSlide.imageUrl}
                    alt={currentSlide.title}
                    className="w-full rounded-lg mb-6 max-h-80 object-cover"
                  />
                )}

                <div className="font-body text-base leading-relaxed text-secondary-foreground whitespace-pre-wrap">
                  {currentSlide.content}
                </div>

                {currentSlide.mapItemIds.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {currentSlide.mapItemIds.map((id) => (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary border border-border font-body text-xs text-muted-foreground"
                      >
                        <MapPin className="h-3 w-3 text-primary" />
                        {id}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={() => navigate(-1)}
            disabled={slideIdx === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-secondary border border-border font-body text-sm text-foreground disabled:opacity-30 hover:bg-secondary/80 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>
          <button
            onClick={() => navigate(1)}
            disabled={slideIdx === total - 1}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary font-body text-sm font-semibold text-primary-foreground disabled:opacity-30 hover:bg-primary/90 transition-colors"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
