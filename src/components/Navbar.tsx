import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, Menu, X, Search, StickyNote, Route, BookOpen, HelpCircle, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalSearch from "./GlobalSearch";
import GlossaryDrawer from "./GlossaryDrawer";
import HelpSheet from "./HelpSheet";
import FirstRunTip from "./FirstRunTip";
import { useNotes } from "@/stores/notes";
import { useTrails } from "@/stores/trails";

const primaryNav = [
  { label: "History", href: "/history" },
  { label: "Geopolitics", href: "/geopolitics" },
  { label: "Geology", href: "/geology" },
  { label: "Cosmology", href: "/cosmology" },
  { label: "Universe", href: "/universe" },
  { label: "Explore", href: "/explore" },
];

const moreNav = [
  { label: "Topics", href: "/topics" },
  { label: "Study Board", href: "/study-board" },
  { label: "Pulse", href: "/pulse" },
];

const allMobileNav = [...primaryNav, ...moreNav];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const { notes } = useNotes();
  const { trails } = useTrails();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((p) => !p);
      }
      if (e.key === "?" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setHelpOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl overflow-x-hidden"
      >
        <div className="mx-auto flex h-16 items-center justify-between px-4 max-w-screen-2xl w-full">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground shrink-0">
            <Compass className="h-6 w-6 text-primary" />
            <span>Terranova</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {primaryNav.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="font-body text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}

            {/* More dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="font-body text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary flex items-center gap-0.5 whitespace-nowrap">
                  More
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                {moreNav.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link to={item.href} className="w-full cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/trails" className="w-full cursor-pointer flex items-center justify-between">
                    <span className="flex items-center gap-2"><Route className="h-3.5 w-3.5" />Trails</span>
                    {trails.length > 0 && (
                      <span className="min-w-[16px] h-4 flex items-center justify-center px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold">
                        {trails.length}
                      </span>
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/notes" className="w-full cursor-pointer flex items-center justify-between">
                    <span className="flex items-center gap-2"><StickyNote className="h-3.5 w-3.5" />Notes</span>
                    {notes.length > 0 && (
                      <span className="min-w-[16px] h-4 flex items-center justify-center px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold">
                        {notes.length}
                      </span>
                    )}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setGlossaryOpen(true)} className="cursor-pointer">
                  <BookOpen className="h-3.5 w-3.5 mr-2" />
                  Glossary
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setHelpOpen(true)} className="cursor-pointer">
                  <HelpCircle className="h-3.5 w-3.5 mr-2" />
                  Help
                  <kbd className="ml-auto px-1 py-0.5 rounded bg-muted border border-border text-[9px] font-mono">?</kbd>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-secondary border border-border px-3 py-1.5 font-body text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all whitespace-nowrap"
              aria-label="Search (Cmd+K)"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="hidden xl:inline px-1.5 py-0.5 rounded bg-background text-[10px] text-muted-foreground/60">⌘K</kbd>
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setSearchOpen(true)} className="p-2 text-muted-foreground hover:text-foreground" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <button onClick={() => setOpen(!open)} className="text-foreground" aria-label={open ? "Close menu" : "Open menu"}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4 py-6 px-4">
              {allMobileNav.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/trails"
                onClick={() => setOpen(false)}
                className="font-body text-base text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Route className="h-4 w-4" /> Trails
                {trails.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {trails.length}
                  </span>
                )}
              </Link>
              <Link
                to="/notes"
                onClick={() => setOpen(false)}
                className="font-body text-base text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <StickyNote className="h-4 w-4" /> Notes
                {notes.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {notes.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => { setGlossaryOpen(true); setOpen(false); }}
                className="font-body text-base text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-left"
              >
                <BookOpen className="h-4 w-4" /> Glossary
              </button>
              <button
                onClick={() => { setHelpOpen(true); setOpen(false); }}
                className="font-body text-base text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-left"
              >
                <HelpCircle className="h-4 w-4" /> Help
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <GlossaryDrawer open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
      <HelpSheet open={helpOpen} onClose={() => setHelpOpen(false)} />
      <FirstRunTip onOpenHelp={() => setHelpOpen(true)} />
    </>
  );
};

export default Navbar;
