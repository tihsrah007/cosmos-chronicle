import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

const timelineEvents = [
  {
    era: "13.8 Billion Years Ago",
    title: "The Big Bang",
    description: "The universe begins — an infinitely dense singularity expands, giving birth to space, time, and all matter.",
    domain: "Cosmology",
  },
  {
    era: "4.54 Billion Years Ago",
    title: "Formation of Earth",
    description: "From cosmic dust and gas, our planet coalesces. Volcanic forces shape the young Earth's crust and atmosphere.",
    domain: "Geology",
  },
  {
    era: "3,200 BCE",
    title: "Rise of Mesopotamia",
    description: "Between the Tigris and Euphrates, humanity builds its first cities, invents writing, and lays the foundations of civilization.",
    domain: "History",
  },
  {
    era: "1648 CE",
    title: "Peace of Westphalia",
    description: "The modern nation-state is born. Treaties ending the Thirty Years' War establish the principles of sovereignty that still govern our world.",
    domain: "Geopolitics",
  },
];

const domainColors: Record<string, string> = {
  Cosmology: "text-primary",
  Geology: "text-primary",
  History: "text-primary",
  Geopolitics: "text-primary",
};

const FeaturedSection = () => {
  return (
    <section id="featured" className="relative py-24 bg-secondary/30">
      <div className="container px-4">
        <div className="mb-16 text-center">
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-primary">
            Through the Ages
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            A Timeline of Everything
          </h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-12 pl-20 md:w-1/2 md:pl-0 ${
                index % 2 === 0
                  ? "md:pr-12 md:text-right"
                  : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 top-2 h-4 w-4 rounded-full border-2 border-primary bg-background md:left-auto md:right-auto md:-translate-x-1/2 md:left-[calc(100%)] data-[side=right]:md:left-0"
                style={{
                  left: index % 2 === 0 ? undefined : '0',
                  right: index % 2 === 0 ? '-8px' : undefined,
                }}
              />

              <span className={`font-body text-xs uppercase tracking-wider ${domainColors[event.domain]}`}>
                {event.domain}
              </span>
              <p className="mt-1 font-body text-xs text-muted-foreground">
                <Clock className="mr-1 inline h-3 w-3" />
                {event.era}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                {event.title}
              </h3>
              <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 font-body text-sm text-primary transition-all hover:gap-3"
          >
            Explore the full timeline
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSection;
