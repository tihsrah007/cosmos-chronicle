import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Plus, Trash2, Pencil, GripVertical, Image, MapPin, X, Save, ChevronDown, ChevronUp,
} from "lucide-react";
import {
  useLessons, useCreateLesson, useUpdateLesson, useDeleteLesson,
  useCreateSlide, useUpdateSlide, useDeleteSlide,
} from "@/hooks/use-lessons";
import type { ApiLesson, ApiSlide } from "@/api/types";
import MapLoadingState from "@/components/MapLoadingState";
import MapErrorState from "@/components/MapErrorState";

/* ─── Lesson Form (create / edit) ─── */
interface LessonFormData {
  domain: string;
  title: string;
  description: string;
  coverImage: string;
}

const emptyLesson: LessonFormData = { domain: "history", title: "", description: "", coverImage: "" };

const LessonForm = ({
  initial = emptyLesson,
  onSave,
  onCancel,
  saving,
}: {
  initial?: LessonFormData;
  onSave: (d: LessonFormData) => void;
  onCancel: () => void;
  saving: boolean;
}) => {
  const [form, setForm] = useState<LessonFormData>(initial);
  const set = (k: keyof LessonFormData, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="rounded-xl border border-border bg-card p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="font-body text-xs text-muted-foreground mb-1 block">Domain</label>
          <select
            value={form.domain}
            onChange={(e) => set("domain", e.target.value)}
            className="w-full bg-secondary border border-border rounded-lg px-3 py-2 font-body text-sm text-foreground"
          >
            <option value="history">History</option>
            <option value="geopolitics">Geopolitics</option>
            <option value="geology">Geology</option>
          </select>
        </div>
        <div>
          <label className="font-body text-xs text-muted-foreground mb-1 block">Title</label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className="w-full bg-secondary border border-border rounded-lg px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground"
            placeholder="Lesson title"
          />
        </div>
      </div>
      <div>
        <label className="font-body text-xs text-muted-foreground mb-1 block">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={2}
          className="w-full bg-secondary border border-border rounded-lg px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Brief description"
        />
      </div>
      <div>
        <label className="font-body text-xs text-muted-foreground mb-1 block">Cover Image URL</label>
        <input
          value={form.coverImage}
          onChange={(e) => set("coverImage", e.target.value)}
          className="w-full bg-secondary border border-border rounded-lg px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground"
          placeholder="https://..."
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-secondary border border-border font-body text-sm text-foreground hover:bg-secondary/80 transition-colors">
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          disabled={!form.title || saving}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary font-body text-sm font-semibold text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
};

/* ─── Slide Editor ─── */
const SlideEditor = ({
  slide,
  lessonId,
  onDelete,
}: {
  slide: ApiSlide;
  lessonId: string;
  onDelete: () => void;
}) => {
  const update = useUpdateSlide(lessonId);
  const [title, setTitle] = useState(slide.title);
  const [content, setContent] = useState(slide.content);
  const [mapIds, setMapIds] = useState(slide.mapItemIds.join(", "));
  const [imageUrl, setImageUrl] = useState(slide.imageUrl ?? "");
  const dirty = title !== slide.title || content !== slide.content || mapIds !== slide.mapItemIds.join(", ") || imageUrl !== (slide.imageUrl ?? "");

  const save = () => {
    update.mutate({
      slideId: slide.id,
      title,
      content,
      mapItemIds: mapIds.split(",").map((s) => s.trim()).filter(Boolean),
      imageUrl: imageUrl || undefined,
    });
  };

  return (
    <div className="rounded-lg border border-border bg-background p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground/50" />
          <span className="font-body text-xs text-muted-foreground">Slide #{slide.order}</span>
        </div>
        <div className="flex items-center gap-1">
          {dirty && (
            <button onClick={save} disabled={update.isPending} className="p-1.5 rounded-md hover:bg-secondary transition-colors text-primary">
              <Save className="h-3.5 w-3.5" />
            </button>
          )}
          <button onClick={onDelete} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-secondary border border-border rounded-lg px-3 py-2 font-body text-sm text-foreground"
        placeholder="Slide title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="w-full bg-secondary border border-border rounded-lg px-3 py-2 font-body text-sm text-foreground resize-none"
        placeholder="Slide content…"
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="font-body text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <Image className="h-3 w-3" /> Image URL
          </label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full bg-secondary border border-border rounded-lg px-3 py-1.5 font-body text-xs text-foreground"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="font-body text-xs text-muted-foreground mb-1 flex items-center gap-1">
            <MapPin className="h-3 w-3" /> Map Item IDs (comma-separated)
          </label>
          <input
            value={mapIds}
            onChange={(e) => setMapIds(e.target.value)}
            className="w-full bg-secondary border border-border rounded-lg px-3 py-1.5 font-body text-xs text-foreground"
            placeholder="rome, athens"
          />
        </div>
      </div>
    </div>
  );
};

/* ─── Lesson Row (expandable) ─── */
const LessonRow = ({ lesson }: { lesson: ApiLesson }) => {
  const [open, setOpen] = useState(false);
  const deleteLesson = useDeleteLesson();
  const [editing, setEditing] = useState(false);
  const updateLesson = useUpdateLesson(lesson.id);
  const createSlide = useCreateSlide(lesson.id);
  const deleteSlide = useDeleteSlide(lesson.id);
  const slides = [...lesson.slides].sort((a, b) => a.order - b.order);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-secondary/40 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="px-2 py-0.5 rounded-md bg-secondary font-body text-xs text-muted-foreground capitalize">
            {lesson.domain}
          </span>
          <h3 className="font-display text-base font-semibold text-foreground truncate">{lesson.title}</h3>
          <span className="font-body text-xs text-muted-foreground">{slides.length} slides</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); setEditing(true); }}
            className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); if (confirm("Delete this lesson?")) deleteLesson.mutate(lesson.id); }}
            className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 pb-4">
            <LessonForm
              initial={{ domain: lesson.domain, title: lesson.title, description: lesson.description, coverImage: lesson.coverImage ?? "" }}
              onSave={(d) => { updateLesson.mutate(d); setEditing(false); }}
              onCancel={() => setEditing(false)}
              saving={updateLesson.isPending}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="border-t border-border px-5 py-4 space-y-3">
              {slides.map((slide) => (
                <SlideEditor
                  key={slide.id}
                  slide={slide}
                  lessonId={lesson.id}
                  onDelete={() => { if (confirm("Delete this slide?")) deleteSlide.mutate(slide.id); }}
                />
              ))}

              <button
                onClick={() =>
                  createSlide.mutate({
                    title: "New Slide",
                    content: "",
                    order: slides.length + 1,
                    mapItemIds: [],
                  })
                }
                disabled={createSlide.isPending}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-border font-body text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors w-full justify-center"
              >
                <Plus className="h-4 w-4" />
                Add Slide
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main Page ─── */
const LessonManage = () => {
  const { data: lessons, isLoading, isError, refetch } = useLessons();
  const [creating, setCreating] = useState(false);
  const create = useCreateLesson();

  if (isLoading) return <MapLoadingState message="Loading lessons…" />;
  if (isError) return <MapErrorState message="Failed to load lessons" onRetry={() => refetch()} />;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/lessons" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-display text-lg font-bold text-foreground">Manage Lessons</h1>
          </div>
          <button
            onClick={() => setCreating(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary font-body text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Lesson
          </button>
        </div>
      </div>

      <div className="container py-10 space-y-4">
        <AnimatePresence>
          {creating && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <LessonForm
                onSave={(d) => { create.mutate(d); setCreating(false); }}
                onCancel={() => setCreating(false)}
                saving={create.isPending}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {!lessons?.length && !creating ? (
          <div className="text-center py-20">
            <p className="font-body text-muted-foreground">No lessons yet. Create your first one above.</p>
          </div>
        ) : (
          lessons?.map((lesson) => <LessonRow key={lesson.id} lesson={lesson} />)
        )}
      </div>
    </div>
  );
};

export default LessonManage;
