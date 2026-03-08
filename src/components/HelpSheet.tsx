import { useEffect, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Bookmark,
  GitCompare,
  StickyNote,
  Route,
  Zap,
  Printer,
  BookOpen,
  Map,
  HelpCircle,
  ExternalLink,
  Keyboard,
} from "lucide-react";
import { Link } from "react-router-dom";

interface HelpSheetProps {
  open: boolean;
  onClose: () => void;
}

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded bg-muted border border-border text-[11px] font-mono text-muted-foreground">
    {children}
  </kbd>
);

const shortcuts = [
  { keys: ["⌘", "K"], alt: ["Ctrl", "K"], label: "Open Global Search" },
  { keys: ["?"], alt: null, label: "Open Help & Shortcuts" },
  { keys: ["Esc"], alt: null, label: "Close overlays / modals" },
];

const quickActions = [
  { label: "Topics", href: "/topics", icon: BookOpen },
  { label: "Compare", href: "/compare", icon: GitCompare },
  { label: "Notes", href: "/notes", icon: StickyNote },
  { label: "Trails", href: "/trails", icon: Route },
  { label: "Pulse", href: "/pulse", icon: Zap },
];

const sections = [
  {
    title: "Getting Started",
    icon: Map,
    items: [
      "Enter the PIN to unlock the atlas.",
      "Pick a domain (History, Geology, Geopolitics, Cosmology) from the home page or navbar.",
      "Click any marker on a map to open its detail panel with sources and related items.",
    ],
  },
  {
    title: "Search",
    icon: Search,
    items: [
      "Press ⌘K (or Ctrl+K) anywhere to open Global Search.",
      "Filter by domain or type keywords — results update instantly.",
      "Click a result to navigate to its map location or detail page.",
    ],
  },
  {
    title: "Study Board",
    icon: Bookmark,
    items: [
      "Save items from any detail panel to your Study Board.",
      "Organize saved items across domains for focused study.",
      '"Open on map" jumps back to the item\'s location.',
    ],
  },
  {
    title: "Compare",
    icon: GitCompare,
    items: [
      "Add up to 2 items from detail panels to Compare.",
      "View side-by-side metadata, sources, and descriptions.",
      "Print the comparison as a study sheet.",
    ],
  },
  {
    title: "Notes",
    icon: StickyNote,
    items: [
      "Create notes from any page — attach to domains or keep them general.",
      "Pin important notes to keep them at the top.",
      "Search and filter notes by content or domain.",
    ],
  },
  {
    title: "Trails",
    icon: Route,
    items: [
      "Build research trails — ordered sequences of items across domains.",
      "Add items to trails from detail panels using the trail button.",
      "Review and reorder trail stops on the Trails page.",
    ],
  },
  {
    title: "Topic Hubs",
    icon: BookOpen,
    items: [
      "Browse curated topic hubs from the Topics page.",
      "Each hub includes a glossary, key facts, and printable study sheet.",
      "Related items link back to maps for spatial context.",
    ],
  },
  {
    title: "Pulse",
    icon: Zap,
    items: [
      "Pulse shows trending and recent items across all domains.",
      "Save items or open them directly on the map.",
      "Filter by domain or trending status.",
    ],
  },
  {
    title: "Print Study Sheet",
    icon: Printer,
    items: [
      "Topic Hubs and Compare pages support print-optimized layouts.",
      "Use your browser's print dialog (⌘P / Ctrl+P) to save as PDF.",
      "Print styles hide navigation and non-essential UI.",
    ],
  },
];

const HelpSheet = ({ open, onClose }: HelpSheetProps) => {
  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="flex items-center gap-2 font-display text-lg">
            <HelpCircle className="h-5 w-5 text-primary" />
            Help & Shortcuts
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Everything you need to navigate Terranova.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 pb-6">
          {/* Keyboard Shortcuts */}
          <div className="mb-6">
            <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-foreground mb-3">
              <Keyboard className="h-4 w-4 text-primary" />
              Keyboard Shortcuts
            </h3>
            <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
              {shortcuts.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-3 py-2.5 ${
                    i < shortcuts.length - 1 ? "border-b border-border/50" : ""
                  }`}
                >
                  <span className="text-sm text-foreground">{s.label}</span>
                  <div className="flex items-center gap-1">
                    {s.keys.map((k, ki) => (
                      <span key={ki} className="flex items-center gap-0.5">
                        {ki > 0 && <span className="text-muted-foreground text-xs mx-0.5">+</span>}
                        <Kbd>{k}</Kbd>
                      </span>
                    ))}
                    {s.alt && (
                      <>
                        <span className="text-muted-foreground text-xs mx-1">/</span>
                        {s.alt.map((k, ki) => (
                          <span key={ki} className="flex items-center gap-0.5">
                            {ki > 0 && <span className="text-muted-foreground text-xs mx-0.5">+</span>}
                            <Kbd>{k}</Kbd>
                          </span>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Quick Actions */}
          <div className="mb-6">
            <h3 className="font-display text-sm font-semibold text-foreground mb-3">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((a) => (
                <Link
                  key={a.href}
                  to={a.href}
                  onClick={handleLinkClick}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-sm text-foreground hover:bg-secondary hover:border-primary/40 transition-colors"
                >
                  <a.icon className="h-3.5 w-3.5 text-primary" />
                  {a.label}
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>

          <Separator className="mb-6" />

          {/* Feature Sections */}
          <div className="space-y-5">
            {sections.map((sec) => (
              <div key={sec.title}>
                <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-foreground mb-2">
                  <sec.icon className="h-4 w-4 text-primary" />
                  {sec.title}
                </h3>
                <ul className="space-y-1.5 pl-6">
                  {sec.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground leading-relaxed list-disc"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <p className="text-xs text-muted-foreground/60 text-center pb-2">
            Press <Kbd>?</Kbd> anytime to reopen this sheet.
          </p>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default HelpSheet;
