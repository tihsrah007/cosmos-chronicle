import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface DomainCardProps {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  index: number;
  facts: string[];
  slug?: string;
}

const slugRoutes: Record<string, string> = {
  History: "/history",
  Geopolitics: "/geopolitics",
  Geology: "/geology",
  Cosmology: "/cosmology",
};

const DomainCard = ({ title, description, image, icon: Icon, index, facts, slug }: DomainCardProps) => {
  const href = slug ? `/${slug}` : slugRoutes[title] || "#";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Link
        to={href}
        className="group relative overflow-hidden rounded-lg shadow-card cursor-pointer block"
      >
        {/* Image */}
        <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-card" />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/20 backdrop-blur-sm">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <span className="font-body text-xs uppercase tracking-[0.2em] text-primary">
              {title}
            </span>
          </div>

          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            {title}
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
            {description}
          </p>

          {/* Quick facts - visible on hover */}
          <div className="max-h-0 overflow-hidden transition-all duration-500 group-hover:max-h-40">
            <div className="space-y-1.5 border-t border-border/50 pt-3">
              {facts.map((fact, i) => (
                <p key={i} className="font-body text-xs text-muted-foreground/80">
                  → {fact}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default DomainCard;
