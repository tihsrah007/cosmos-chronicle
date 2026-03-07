import { Landmark, Globe, Mountain, Telescope } from "lucide-react";
import DomainCard from "./DomainCard";
import historyImg from "@/assets/history-card.jpg";
import geopoliticsImg from "@/assets/geopolitics-card.jpg";
import geologyImg from "@/assets/geology-card.jpg";
import cosmologyImg from "@/assets/cosmology-card.jpg";

const domains = [
  {
    title: "History",
    description: "Civilizations rise and fall. Trace the threads of empires, revolutions, and the ideas that remade the world.",
    image: historyImg,
    icon: Landmark,
    facts: [
      "Over 5,000 years of recorded history",
      "200+ civilizations have risen and fallen",
      "Key turning points that shaped modernity",
    ],
  },
  {
    title: "Geopolitics",
    description: "Borders, alliances, and power. Understand the forces driving nations and the balance of global influence.",
    image: geopoliticsImg,
    icon: Globe,
    facts: [
      "195 sovereign nations today",
      "Trade routes spanning millennia",
      "Shifting alliances and emerging powers",
    ],
  },
  {
    title: "Geology",
    description: "The living earth beneath our feet. From tectonic forces to mineral treasures hidden deep below.",
    image: geologyImg,
    icon: Mountain,
    facts: [
      "Earth is 4.54 billion years old",
      "7 major tectonic plates in motion",
      "Over 5,000 known mineral species",
    ],
  },
  {
    title: "Cosmology",
    description: "The grand architecture of the universe. Dark matter, distant galaxies, and the origin of everything.",
    image: cosmologyImg,
    icon: Telescope,
    facts: [
      "Observable universe: 93 billion light-years",
      "~2 trillion galaxies estimated",
      "13.8 billion years since the Big Bang",
    ],
  },
];

const DomainsSection = () => {
  return (
    <section id="domains" className="relative py-24">
      <div className="container px-4">
        <div className="mb-16 text-center">
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-primary">
            Four Pillars
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Realms of Discovery
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((domain, index) => (
            <DomainCard key={domain.title} {...domain} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
