import { Compass } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="container px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <Compass className="h-5 w-5 text-primary" />
            Terranova
          </div>
          <p className="max-w-md font-body text-sm text-muted-foreground">
            Connecting the layers of time, earth, and space. 
            Built for the endlessly curious.
          </p>
          <p className="font-body text-xs text-text-dim">
            © 2026 Terranova. Data powered by public APIs.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
