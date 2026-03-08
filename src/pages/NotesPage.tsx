import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  StickyNote,
  Search,
  Pin,
  Trash2,
  Pencil,
  Check,
  X,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNotes, type Note } from "@/stores/notes";

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const NotesPage = () => {
  const navigate = useNavigate();
  const { notes, updateNote, deleteNote, togglePin } = useNotes();
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const filtered = useMemo(() => {
    let result = [...notes];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.text.toLowerCase().includes(q) ||
          n.itemId.toLowerCase().includes(q)
      );
    }
    // Pinned first, then by updatedAt
    result.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.updatedAt - a.updatedAt;
    });
    return result;
  }, [notes, search]);

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditText(note.text);
  };

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      updateNote(editingId, editText.trim());
    }
    setEditingId(null);
  };

  // Parse itemId to get display label
  const parseItemId = (itemId: string) => {
    const idx = itemId.indexOf("-");
    if (idx === -1) return { domain: "", name: itemId };
    return { domain: itemId.slice(0, idx), name: itemId.slice(idx + 1) };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-body text-sm mb-6"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <StickyNote className="h-5 w-5 text-primary" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                My Notes
              </h1>
            </div>
            <p className="font-body text-muted-foreground max-w-2xl mb-6">
              All your research notes in one place. Stored on this device only.
            </p>
          </motion.div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Notes */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20">
              <StickyNote className="h-10 w-10 text-muted-foreground/30 mb-4" />
              <p className="font-body text-sm text-muted-foreground">
                {notes.length === 0
                  ? "No notes yet. Add notes from any map detail panel or study board card."
                  : "No notes match your search."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((note, i) => {
                const { domain, name } = parseItemId(note.itemId);
                return (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`group relative rounded-xl border p-4 transition-colors ${
                      note.pinned
                        ? "bg-primary/5 border-primary/20"
                        : "bg-card border-border"
                    }`}
                  >
                    {/* Item reference */}
                    <div className="flex items-center gap-2 mb-2">
                      {domain && (
                        <span className="px-2 py-0.5 rounded-md bg-secondary border border-border font-body text-[10px] text-muted-foreground capitalize">
                          {domain}
                        </span>
                      )}
                      <span className="font-display text-sm font-semibold text-foreground truncate">
                        {name}
                      </span>
                      <span className="ml-auto font-body text-[10px] text-muted-foreground/50 shrink-0">
                        {timeAgo(note.updatedAt)}
                      </span>
                    </div>

                    {editingId === note.id ? (
                      <div>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-secondary border border-border font-body text-sm text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                          rows={3}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) saveEdit();
                            if (e.key === "Escape") setEditingId(null);
                          }}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={saveEdit}
                            className="px-3 py-1 rounded-md bg-primary text-primary-foreground font-body text-xs font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-3 py-1 rounded-md bg-secondary border border-border text-muted-foreground font-body text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed pr-20">
                          {note.text}
                        </p>
                        <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => togglePin(note.id)}
                            className={`p-1.5 rounded-md transition-colors ${
                              note.pinned ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                            }`}
                            title={note.pinned ? "Unpin" : "Pin"}
                            aria-label={note.pinned ? "Unpin note" : "Pin note"}
                          >
                            <Pin className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => startEdit(note)}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                            title="Edit"
                            aria-label="Edit note"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            title="Delete"
                            aria-label="Delete note"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Count */}
          {notes.length > 0 && (
            <p className="mt-6 font-body text-xs text-muted-foreground/50 text-center">
              {notes.length} note{notes.length !== 1 ? "s" : ""} total ·{" "}
              {notes.filter((n) => n.pinned).length} pinned
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotesPage;
