import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, Menu, X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import GlobalSearch from "./GlobalSearch";

const navItems = [
  { label: "History", href: "/history" },
  { label: "Geopolitics", href: "/geopolitics" },
  { label: "Geology", href: "/geology" },
  { label: "Cosmology", href: "/cosmology" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((p) => !p);
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
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <Compass className="h-6 w-6 text-primary" />
            <span>Terranova</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="font-body text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-secondary border border-border px-3 py-1.5 font-body text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 rounded bg-background text-[10px] text-muted-foreground/60">⌘K</kbd>
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={() => setSearchOpen(true)} className="p-2 text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
            </button>
            <button onClick={() => setOpen(!open)} className="text-foreground">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="container flex flex-col gap-4 py-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Global keyboard shortcut */}
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
