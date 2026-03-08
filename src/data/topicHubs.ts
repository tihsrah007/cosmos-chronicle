export interface TopicHub {
  slug: string;
  title: string;
  domain: string;
  overview: string;
  keyConcepts: { term: string; definition: string }[];
  timelineHighlights: { year: string; event: string }[];
  mapItems: { name: string; domain: string }[];
  sources: { label: string; url?: string }[];
  relatedPulseTags: string[];
}

export const TOPIC_HUBS: TopicHub[] = [
  {
    slug: "plate-tectonics",
    title: "Plate Tectonics",
    domain: "geology",
    overview:
      "The theory that Earth's outer shell is divided into large plates that glide over the mantle. Their interactions cause earthquakes, volcanoes, mountain-building, and oceanic trench formation. Developed in the 1960s, plate tectonics unified decades of observations about continental drift and seafloor spreading.",
    keyConcepts: [
      { term: "Divergent Boundary", definition: "Plates move apart, creating new crust. Example: Mid-Atlantic Ridge." },
      { term: "Convergent Boundary", definition: "Plates collide, causing subduction or mountain-building. Example: Himalayas." },
      { term: "Transform Boundary", definition: "Plates slide horizontally past each other. Example: San Andreas Fault." },
      { term: "Subduction Zone", definition: "One plate dives beneath another into the mantle, creating deep trenches and volcanoes." },
      { term: "Seafloor Spreading", definition: "New oceanic crust forms at mid-ocean ridges as plates diverge." },
    ],
    timelineHighlights: [
      { year: "1912", event: "Alfred Wegener proposes continental drift" },
      { year: "1960s", event: "Harry Hess describes seafloor spreading" },
      { year: "1965", event: "J. Tuzo Wilson proposes transform faults" },
      { year: "1968", event: "Plate tectonics theory formalized" },
    ],
    mapItems: [
      { name: "Ring of Fire", domain: "geology" },
      { name: "Mid-Atlantic Ridge", domain: "geology" },
      { name: "East African Rift", domain: "geology" },
      { name: "San Andreas Fault", domain: "geology" },
      { name: "Himalayas", domain: "geology" },
    ],
    sources: [
      { label: "USGS Plate Tectonics", url: "https://www.usgs.gov/programs/earthquake-hazards/plate-tectonics" },
      { label: "Nature Geoscience", url: "https://www.nature.com/ngeo/" },
    ],
    relatedPulseTags: ["Plate Tectonics", "Earthquake", "Tectonic", "GPS"],
  },
  {
    slug: "trade-chokepoints",
    title: "Trade Chokepoints",
    domain: "geopolitics",
    overview:
      "Strategic narrow waterways through which a disproportionate share of global trade passes. Control of these passages shapes naval strategy, energy security, and international commerce. A single disruption can cascade into global supply chain crises.",
    keyConcepts: [
      { term: "Chokepoint", definition: "A narrow passage where shipping can be bottlenecked or blocked." },
      { term: "Freedom of Navigation", definition: "The principle that ships of all nations can traverse international waters." },
      { term: "SLOC", definition: "Sea Lines of Communication — the primary maritime routes for trade and naval logistics." },
      { term: "Exclusive Economic Zone", definition: "200 nautical mile zone where a state has special resource rights." },
    ],
    timelineHighlights: [
      { year: "1869", event: "Suez Canal opens" },
      { year: "1914", event: "Panama Canal opens" },
      { year: "1936", event: "Montreux Convention governs Turkish Straits" },
      { year: "2021", event: "Ever Given blocks Suez Canal for 6 days" },
      { year: "2023", event: "Houthi attacks disrupt Red Sea shipping" },
    ],
    mapItems: [
      { name: "Strait of Hormuz", domain: "geopolitics" },
      { name: "Suez Canal", domain: "geopolitics" },
      { name: "Strait of Malacca", domain: "geopolitics" },
      { name: "Panama Canal", domain: "geopolitics" },
      { name: "Bab el-Mandeb", domain: "geopolitics" },
      { name: "Turkish Straits", domain: "geopolitics" },
      { name: "Strait of Gibraltar", domain: "geopolitics" },
    ],
    sources: [
      { label: "EIA World Chokepoints", url: "https://www.eia.gov/international/analysis/special-topics/World_Oil_Transit_Chokepoints" },
      { label: "CFR Backgrounder", url: "https://www.cfr.org" },
    ],
    relatedPulseTags: ["Trade", "Shipping", "Maritime", "Suez Canal"],
  },
  {
    slug: "black-holes",
    title: "Black Holes",
    domain: "cosmology",
    overview:
      "Regions of spacetime where gravity is so extreme that nothing — not even light — can escape. Predicted by general relativity and confirmed through gravitational waves and direct imaging. Black holes range from stellar mass (a few solar masses) to supermassive (billions of solar masses at galaxy centers).",
    keyConcepts: [
      { term: "Event Horizon", definition: "The boundary beyond which nothing can return. The 'point of no return'." },
      { term: "Singularity", definition: "The theoretical point of infinite density at a black hole's center." },
      { term: "Hawking Radiation", definition: "Theoretical radiation emitted by black holes due to quantum effects near the event horizon." },
      { term: "Accretion Disk", definition: "Superheated matter spiraling into the black hole, emitting intense radiation." },
      { term: "Spaghettification", definition: "The tidal stretching of objects falling into a black hole." },
    ],
    timelineHighlights: [
      { year: "1916", event: "Schwarzschild solution predicts black holes from general relativity" },
      { year: "1971", event: "Cygnus X-1 identified as first black hole candidate" },
      { year: "2015", event: "LIGO detects gravitational waves from merging black holes" },
      { year: "2019", event: "Event Horizon Telescope captures first black hole image (M87*)" },
    ],
    mapItems: [],
    sources: [
      { label: "NASA Black Holes", url: "https://science.nasa.gov/astrophysics/focus-areas/black-holes" },
      { label: "Event Horizon Telescope", url: "https://eventhorizontelescope.org/" },
    ],
    relatedPulseTags: ["Black Holes", "Gravitational Waves", "LIGO"],
  },
  {
    slug: "climate-glaciation",
    title: "Climate & Glaciation",
    domain: "geology",
    overview:
      "Earth's climate has oscillated between greenhouse and icehouse states over billions of years. Ice ages have dramatically reshaped continents, carved valleys, deposited sediments, and influenced species evolution. Understanding past glaciation is critical for projecting future climate behavior.",
    keyConcepts: [
      { term: "Milankovitch Cycles", definition: "Periodic changes in Earth's orbit and tilt that trigger glacial-interglacial cycles." },
      { term: "Glacial Period", definition: "An extended period of reduced temperature when ice sheets expand." },
      { term: "Interglacial", definition: "Warmer period between glacials. We currently live in one (the Holocene)." },
      { term: "Snowball Earth", definition: "Hypothesis that Earth was nearly entirely ice-covered 700 million years ago." },
      { term: "Moraine", definition: "Accumulated debris deposited by a glacier, marking its past extent." },
    ],
    timelineHighlights: [
      { year: "~720 Ma", event: "Snowball Earth glaciation" },
      { year: "~300 Ma", event: "Karoo Ice Age during Pangaea" },
      { year: "~2.6 Ma", event: "Current Quaternary glaciation begins" },
      { year: "~20,000 ya", event: "Last Glacial Maximum — ice sheets reach New York and London latitudes" },
      { year: "~11,700 ya", event: "Holocene begins — current interglacial period" },
    ],
    mapItems: [
      { name: "Antarctic Ice Sheet", domain: "geology" },
      { name: "Greenland Ice Sheet", domain: "geology" },
    ],
    sources: [
      { label: "NOAA Paleoclimatology", url: "https://www.ncei.noaa.gov/products/paleoclimatology" },
      { label: "IPCC Reports", url: "https://www.ipcc.ch/" },
    ],
    relatedPulseTags: ["Ice Sheet", "Climate", "Glacier"],
  },
  {
    slug: "silk-road-networks",
    title: "Silk Road Networks",
    domain: "history",
    overview:
      "A vast network of trade routes connecting East Asia to the Mediterranean from roughly the 2nd century BC to the 15th century AD. The Silk Road facilitated the exchange of goods (silk, spices, gold), ideas (religions, technologies), and diseases across civilizations.",
    keyConcepts: [
      { term: "Caravanserai", definition: "Roadside inns providing shelter for merchants and their animals along trade routes." },
      { term: "Silk", definition: "Prized Chinese export that gave the routes their name. Production secrets were closely guarded." },
      { term: "Cultural Diffusion", definition: "Spread of Buddhism, Islam, and Christianity along trade routes." },
      { term: "Maritime Silk Road", definition: "Sea routes connecting China to Southeast Asia, India, Arabia, and East Africa." },
    ],
    timelineHighlights: [
      { year: "130 BC", event: "Zhang Qian's diplomatic missions open the route" },
      { year: "1st c. AD", event: "Roman demand for silk peaks" },
      { year: "7th c.", event: "Tang Dynasty golden age of Silk Road trade" },
      { year: "13th c.", event: "Mongol Empire secures routes (Pax Mongolica)" },
      { year: "1453", event: "Fall of Constantinople disrupts overland trade" },
    ],
    mapItems: [
      { name: "Silk Road", domain: "history" },
      { name: "Mongol Empire", domain: "history" },
    ],
    sources: [
      { label: "UNESCO Silk Roads", url: "https://en.unesco.org/silkroad" },
      { label: "British Museum", url: "https://www.britishmuseum.org/" },
    ],
    relatedPulseTags: ["Silk Road", "Central Asia", "Trade"],
  },
  {
    slug: "space-telescopes",
    title: "Space Telescopes",
    domain: "cosmology",
    overview:
      "Orbital observatories that peer into the cosmos free from atmospheric distortion. From Hubble to JWST, space telescopes have revolutionized our understanding of the universe's age, expansion rate, exoplanets, and the earliest galaxies.",
    keyConcepts: [
      { term: "Hubble Space Telescope", definition: "Launched 1990. Operates in visible/UV/near-IR. Transformed modern astronomy." },
      { term: "James Webb Space Telescope", definition: "Launched 2021. Infrared telescope studying the earliest galaxies and exoplanet atmospheres." },
      { term: "Lagrange Point L2", definition: "Gravitationally stable point 1.5M km from Earth where JWST orbits." },
      { term: "Adaptive Optics", definition: "Technology that compensates for atmospheric turbulence in ground-based telescopes." },
    ],
    timelineHighlights: [
      { year: "1990", event: "Hubble Space Telescope launches" },
      { year: "2003", event: "Spitzer Space Telescope (infrared) launches" },
      { year: "2009", event: "Kepler discovers thousands of exoplanets" },
      { year: "2021", event: "JWST launches, reaches L2 orbit" },
      { year: "2023", event: "Euclid launches to map dark matter" },
    ],
    mapItems: [],
    sources: [
      { label: "NASA JWST", url: "https://webb.nasa.gov/" },
      { label: "ESA Hubble", url: "https://esahubble.org/" },
    ],
    relatedPulseTags: ["JWST", "Hubble", "Euclid", "Exoplanets"],
  },
];
