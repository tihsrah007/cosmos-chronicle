import { useState } from "react";
import { StickyNote, Pin, Trash2, Pencil, Check, X, Plus } from "lucide-react";
import { useNotes, type Note } from "@/stores/notes";

interface NotesSectionProps {
  itemId: string;
  compact?: boolean;
}

const NotesSection = ({ itemId, compact }: NotesSectionProps) => {
  const { notes, addNote, updateNote, deleteNote, togglePin, getNotesForItem } = useNotes();
  const itemNotes = getNotesForItem(itemId);
  const sorted = [...itemNotes].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.updatedAt - a.updatedAt;
  });

  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = () => {
    if (!newText.trim()) return;
    addNote(itemId, newText.trim());
    setNewText("");
    setShowAdd(false);
  };

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

  return (
    <div className={compact ? "" : "border-t border-border pt-3"}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <StickyNote className="h-3.5 w-3.5 text-primary" />
          <span className="font-body text-xs font-semibold text-foreground uppercase tracking-wider">
            Notes {sorted.length > 0 && `(${sorted.length})`}
          </span>
        </div>
        {!showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary border border-border text-muted-foreground hover:text-foreground font-body text-[10px] transition-colors"
          >
            <Plus className="h-2.5 w-2.5" /> Add
          </button>
        )}
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="mb-2">
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Write a note…"
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border font-body text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            rows={2}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAdd();
            }}
          />
          <div className="flex gap-1.5 mt-1.5">
            <button
              onClick={handleAdd}
              disabled={!newText.trim()}
              className="px-2.5 py-1 rounded-md bg-primary text-primary-foreground font-body text-[10px] font-medium disabled:opacity-40"
            >
              Save
            </button>
            <button
              onClick={() => { setShowAdd(false); setNewText(""); }}
              className="px-2.5 py-1 rounded-md bg-secondary border border-border text-muted-foreground font-body text-[10px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes list */}
      {sorted.length > 0 && (
        <div className="space-y-1.5">
          {sorted.map((note) => (
            <div
              key={note.id}
              className={`group relative px-3 py-2 rounded-lg border transition-colors ${
                note.pinned
                  ? "bg-primary/5 border-primary/20"
                  : "bg-secondary/40 border-border/30"
              }`}
            >
              {editingId === note.id ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-secondary border border-border font-body text-xs text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                    rows={2}
                    autoFocus
                  />
                  <div className="flex gap-1 mt-1">
                    <button onClick={saveEdit} className="p-1 rounded text-primary hover:bg-primary/10">
                      <Check className="h-3 w-3" />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-1 rounded text-muted-foreground hover:text-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed pr-14">
                    {note.text}
                  </p>
                  <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => togglePin(note.id)}
                      className={`p-1 rounded transition-colors ${note.pinned ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                      title={note.pinned ? "Unpin" : "Pin"}
                    >
                      <Pin className="h-2.5 w-2.5" />
                    </button>
                    <button
                      onClick={() => startEdit(note)}
                      className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Pencil className="h-2.5 w-2.5" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-2.5 w-2.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesSection;
