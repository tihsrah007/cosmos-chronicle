export interface GlossaryEntry {
  term: string;
  definition: string;
  domain: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  // Geology
  { term: "Subduction", definition: "When one tectonic plate slides beneath another, descending into the mantle.", domain: "geology" },
  { term: "Divergent Boundary", definition: "A tectonic boundary where plates move apart and new crust is formed.", domain: "geology" },
  { term: "Convergent Boundary", definition: "A tectonic boundary where plates collide, causing subduction or mountain building.", domain: "geology" },
  { term: "Transform Boundary", definition: "A tectonic boundary where plates slide horizontally past each other.", domain: "geology" },
  { term: "Magma", definition: "Molten rock beneath Earth's surface. When erupted, it becomes lava.", domain: "geology" },
  { term: "Mantle", definition: "The thick layer of rock between Earth's crust and core, about 2,900 km thick.", domain: "geology" },
  { term: "Moraine", definition: "Accumulated debris (till) deposited by a glacier, marking its past extent.", domain: "geology" },
  { term: "Milankovitch Cycles", definition: "Periodic variations in Earth's orbit and axial tilt that drive glacial–interglacial cycles.", domain: "geology" },
  { term: "Pangaea", definition: "The supercontinent that existed ~335–175 million years ago, containing all major landmasses.", domain: "geology" },
  { term: "Seafloor Spreading", definition: "The process by which new oceanic crust forms at mid-ocean ridges as plates diverge.", domain: "geology" },
  { term: "Spaghettification", definition: "The tidal stretching of objects falling into a black hole due to extreme gravitational gradients.", domain: "cosmology" },

  // Geopolitics
  { term: "Chokepoint", definition: "A narrow maritime passage where shipping can be bottlenecked or blocked.", domain: "geopolitics" },
  { term: "SLOC", definition: "Sea Lines of Communication — primary maritime routes for trade and naval logistics.", domain: "geopolitics" },
  { term: "EEZ", definition: "Exclusive Economic Zone — a 200-nautical-mile zone where a state has resource rights.", domain: "geopolitics" },
  { term: "Cabotage", definition: "The right to operate transport within a country's waters, often restricted to domestic carriers.", domain: "geopolitics" },
  { term: "Petrodollar", definition: "The system of global oil trade denominated in US dollars.", domain: "geopolitics" },
  { term: "LNG", definition: "Liquefied Natural Gas — natural gas cooled to liquid form for maritime transport.", domain: "geopolitics" },
  { term: "Freedom of Navigation", definition: "The principle that ships of all nations may traverse international waters without interference.", domain: "geopolitics" },

  // History
  { term: "Caravanserai", definition: "A roadside inn providing shelter for merchants and animals along trade routes.", domain: "history" },
  { term: "Pax Mongolica", definition: "A period of Mongol peace enabling safe passage and trade across Eurasia (13th–14th century).", domain: "history" },
  { term: "Columbian Exchange", definition: "The transfer of crops, animals, diseases, and ideas between Old and New Worlds after 1492.", domain: "history" },
  { term: "Triangular Trade", definition: "The Atlantic trade system linking Europe, Africa, and the Americas in goods and enslaved people.", domain: "history" },
  { term: "Cultural Diffusion", definition: "The spread of cultural elements (ideas, technologies, religions) between societies through contact.", domain: "history" },

  // Cosmology
  { term: "Event Horizon", definition: "The boundary of a black hole beyond which nothing — not even light — can escape.", domain: "cosmology" },
  { term: "Singularity", definition: "A point of theoretically infinite density at the center of a black hole.", domain: "cosmology" },
  { term: "Hawking Radiation", definition: "Theoretical radiation emitted by black holes due to quantum effects near the event horizon.", domain: "cosmology" },
  { term: "Accretion Disk", definition: "A disk of superheated matter spiraling into a black hole, emitting intense radiation.", domain: "cosmology" },
  { term: "Gravitational Waves", definition: "Ripples in spacetime produced by accelerating massive objects, first detected by LIGO in 2015.", domain: "cosmology" },
  { term: "Redshift", definition: "The stretching of light from distant objects toward longer wavelengths, indicating recession velocity.", domain: "cosmology" },
  { term: "CMB", definition: "Cosmic Microwave Background — relic radiation from ~380,000 years after the Big Bang.", domain: "cosmology" },
  { term: "Lagrange Point", definition: "A point in space where gravitational forces of two bodies create stable equilibrium for a third object.", domain: "cosmology" },
  { term: "Dark Matter", definition: "Invisible matter that doesn't emit light but exerts gravitational influence, making up ~27% of the universe.", domain: "cosmology" },
  { term: "Dark Energy", definition: "A mysterious force driving the accelerating expansion of the universe, comprising ~68% of total energy.", domain: "cosmology" },
];

/** Build a lookup map for fast term matching */
export const GLOSSARY_MAP = new Map<string, GlossaryEntry>(
  GLOSSARY.map((e) => [e.term.toLowerCase(), e])
);
