import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="relative z-10 container text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 font-body text-sm uppercase tracking-[0.3em] text-primary"
        >
          Explore the forces that shaped our world
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl font-bold leading-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        >
          From Ancient Stones
          <br />
          <span className="text-gradient-amber">to Distant Stars</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-8 max-w-2xl font-body text-lg text-muted-foreground leading-relaxed"
        >
          A journey through history, geopolitics, geology, and cosmology — 
          connecting the layers of time, earth, and space.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex justify-center gap-4"
        >
          <a
            href="#domains"
            className="rounded-lg bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow hover:scale-105"
          >
            Begin Exploring
          </a>
          <a
            href="#featured"
            className="rounded-lg border border-border px-8 py-3 font-body text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:text-primary"
          >
            Featured
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
