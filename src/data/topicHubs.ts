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
      { term: "Continental Drift", definition: "Wegener's hypothesis that continents were once joined as Pangaea and drifted apart." },
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
    slug: "volcanic-arcs-subduction",
    title: "Volcanic Arcs & Subduction",
    domain: "geology",
    overview:
      "When oceanic crust subducts beneath another plate, water lowers the melting point of the mantle wedge above, generating magma that rises to form volcanic arcs. These systems produce the most explosive eruptions on Earth and are responsible for chains like the Andes, Cascades, and the islands of Japan and Indonesia.",
    keyConcepts: [
      { term: "Subduction Zone", definition: "Where one tectonic plate slides beneath another, creating a deep trench and volcanic activity." },
      { term: "Island Arc", definition: "A curved chain of volcanic islands formed above a subducting oceanic plate (e.g., Japan, Philippines)." },
      { term: "Continental Arc", definition: "Volcanic chain on the edge of a continent, like the Cascades or Andes." },
      { term: "Andesitic Magma", definition: "Intermediate-composition magma typical of subduction zones, named after the Andes." },
      { term: "Back-Arc Basin", definition: "A region of extension behind a volcanic arc, often with its own spreading center." },
      { term: "Megathrust Earthquake", definition: "The most powerful earthquake type, occurring at subduction zone interfaces." },
    ],
    timelineHighlights: [
      { year: "79 AD", event: "Vesuvius eruption buries Pompeii" },
      { year: "1815", event: "Tambora eruption — largest in recorded history, causes 'Year Without a Summer'" },
      { year: "1883", event: "Krakatoa eruption heard 5,000 km away" },
      { year: "1980", event: "Mount St. Helens lateral blast" },
      { year: "2004", event: "Sumatra M9.1 megathrust triggers Indian Ocean tsunami" },
    ],
    mapItems: [
      { name: "Ring of Fire", domain: "geology" },
      { name: "Cascadia Subduction Zone", domain: "geology" },
      { name: "Java Trench", domain: "geology" },
      { name: "Andes", domain: "geology" },
    ],
    sources: [
      { label: "Smithsonian Global Volcanism Program", url: "https://volcano.si.edu/" },
      { label: "USGS Volcano Hazards", url: "https://www.usgs.gov/programs/VHP" },
    ],
    relatedPulseTags: ["Volcano", "Earthquake", "Tectonic", "Ring of Fire"],
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
      { term: "Cabotage", definition: "The right to operate sea transport within a country's waters, often restricted to domestic carriers." },
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
    slug: "global-energy-corridors",
    title: "Global Energy Corridors",
    domain: "geopolitics",
    overview:
      "The world's energy flows through a network of pipelines, shipping lanes, and LNG terminals that connect producers to consumers. These corridors determine geopolitical alliances, vulnerability to supply disruptions, and the strategic calculus of major powers. Control over energy transit is as important as control over the resources themselves.",
    keyConcepts: [
      { term: "Petrodollar System", definition: "Global oil trade denominated in USD, linking energy markets to US financial dominance." },
      { term: "LNG Terminal", definition: "Liquefied Natural Gas facilities that enable maritime gas transport between continents." },
      { term: "Pipeline Politics", definition: "How pipeline routes determine alliances — Nord Stream, BTC, TAPI, etc." },
      { term: "Energy Security", definition: "A nation's ability to guarantee reliable and affordable energy supply." },
      { term: "Strategic Petroleum Reserve", definition: "Government-held oil stockpiles to buffer against supply disruptions." },
      { term: "Energy Transition", definition: "The global shift from fossil fuels to renewable sources, reshaping geopolitical power." },
    ],
    timelineHighlights: [
      { year: "1960", event: "OPEC founded to coordinate oil production" },
      { year: "1973", event: "Arab oil embargo reshapes global energy policy" },
      { year: "2006", event: "Russia-Ukraine gas dispute disrupts European supply" },
      { year: "2022", event: "Nord Stream pipeline sabotage" },
      { year: "2023", event: "EU diversifies to LNG, accelerates renewables" },
    ],
    mapItems: [
      { name: "Strait of Hormuz", domain: "geopolitics" },
      { name: "Bab el-Mandeb", domain: "geopolitics" },
      { name: "Danish Straits", domain: "geopolitics" },
    ],
    sources: [
      { label: "IEA World Energy Outlook", url: "https://www.iea.org/reports/world-energy-outlook-2023" },
      { label: "EIA International", url: "https://www.eia.gov/international/" },
    ],
    relatedPulseTags: ["Energy", "Oil", "Gas", "Pipeline", "OPEC"],
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
      { term: "Pax Mongolica", definition: "Period of Mongol peace enabling safe passage across the entire Eurasian landmass." },
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
    slug: "empires-maritime-trade",
    title: "Empires & Maritime Trade",
    domain: "history",
    overview:
      "From Phoenician galleys to Portuguese caravels, maritime trade transformed civilizations. Control of sea routes determined the rise and fall of empires, spread diseases and religions, and created the first truly global economy. The Age of Exploration connected continents and reshaped human history forever.",
    keyConcepts: [
      { term: "Age of Exploration", definition: "15th–17th century European voyages that mapped and colonized much of the world." },
      { term: "Triangular Trade", definition: "Atlantic trade system linking Europe, Africa, and the Americas in goods, enslaved people, and raw materials." },
      { term: "Spice Trade", definition: "Lucrative trade in Asian spices that motivated European maritime expansion." },
      { term: "East India Companies", definition: "State-chartered corporations (Dutch VOC, British EIC) that dominated colonial trade." },
      { term: "Columbian Exchange", definition: "Transfer of crops, animals, diseases, and ideas between Old and New Worlds after 1492." },
      { term: "Naval Supremacy", definition: "The doctrine that control of the seas determines global power — from Carthage to the British Empire." },
    ],
    timelineHighlights: [
      { year: "~1000 BC", event: "Phoenicians establish Mediterranean trade network" },
      { year: "1492", event: "Columbus reaches the Americas" },
      { year: "1498", event: "Vasco da Gama reaches India by sea" },
      { year: "1602", event: "Dutch East India Company (VOC) founded" },
      { year: "1805", event: "Battle of Trafalgar secures British naval supremacy" },
    ],
    mapItems: [
      { name: "Strait of Gibraltar", domain: "geopolitics" },
      { name: "Strait of Malacca", domain: "geopolitics" },
      { name: "Suez Canal", domain: "geopolitics" },
    ],
    sources: [
      { label: "National Geographic Maritime History", url: "https://www.nationalgeographic.com/" },
      { label: "Smithsonian Ocean", url: "https://ocean.si.edu/" },
    ],
    relatedPulseTags: ["Maritime", "Trade", "Shipping", "Empire"],
  },
  {
    slug: "black-holes",
    title: "Black Holes & Gravitational Waves",
    domain: "cosmology",
    overview:
      "Regions of spacetime where gravity is so extreme that nothing — not even light — can escape. Predicted by general relativity and confirmed through gravitational waves and direct imaging. Black holes range from stellar mass (a few solar masses) to supermassive (billions of solar masses at galaxy centers).",
    keyConcepts: [
      { term: "Event Horizon", definition: "The boundary beyond which nothing can return. The 'point of no return'." },
      { term: "Singularity", definition: "The theoretical point of infinite density at a black hole's center." },
      { term: "Hawking Radiation", definition: "Theoretical radiation emitted by black holes due to quantum effects near the event horizon." },
      { term: "Accretion Disk", definition: "Superheated matter spiraling into the black hole, emitting intense radiation." },
      { term: "Gravitational Waves", definition: "Ripples in spacetime produced by accelerating massive objects, detected by LIGO/Virgo." },
      { term: "Spaghettification", definition: "The tidal stretching of objects falling into a black hole." },
    ],
    timelineHighlights: [
      { year: "1916", event: "Schwarzschild solution predicts black holes from general relativity" },
      { year: "1971", event: "Cygnus X-1 identified as first black hole candidate" },
      { year: "2015", event: "LIGO detects gravitational waves from merging black holes" },
      { year: "2019", event: "Event Horizon Telescope captures first black hole image (M87*)" },
      { year: "2022", event: "Sagittarius A* imaged — the Milky Way's own supermassive black hole" },
    ],
    mapItems: [],
    sources: [
      { label: "NASA Black Holes", url: "https://science.nasa.gov/astrophysics/focus-areas/black-holes" },
      { label: "Event Horizon Telescope", url: "https://eventhorizontelescope.org/" },
      { label: "LIGO Lab", url: "https://www.ligo.caltech.edu/" },
    ],
    relatedPulseTags: ["Black Holes", "Gravitational Waves", "LIGO"],
  },
  {
    slug: "space-telescopes-cmb",
    title: "Space Telescopes & Cosmic Background",
    domain: "cosmology",
    overview:
      "Orbital observatories peer into the cosmos free from atmospheric distortion. From Hubble to JWST to Planck, space telescopes have revolutionized our understanding of the universe's age, expansion rate, exoplanets, and the cosmic microwave background — the afterglow of the Big Bang that reveals the universe's earliest structure.",
    keyConcepts: [
      { term: "Hubble Space Telescope", definition: "Launched 1990. Operates in visible/UV/near-IR. Transformed modern astronomy." },
      { term: "James Webb Space Telescope", definition: "Launched 2021. Infrared telescope studying the earliest galaxies and exoplanet atmospheres." },
      { term: "Cosmic Microwave Background", definition: "Relic radiation from 380,000 years after the Big Bang, mapped by COBE, WMAP, and Planck." },
      { term: "Lagrange Point L2", definition: "Gravitationally stable point 1.5M km from Earth where JWST orbits." },
      { term: "Planck Satellite", definition: "ESA mission (2009–2013) that produced the most precise CMB map." },
      { term: "Redshift", definition: "Stretching of light from distant objects, revealing their velocity and distance." },
    ],
    timelineHighlights: [
      { year: "1965", event: "Penzias and Wilson discover the CMB" },
      { year: "1989", event: "COBE satellite launches, confirms Big Bang predictions" },
      { year: "1990", event: "Hubble Space Telescope launches" },
      { year: "2009", event: "Planck satellite maps CMB with unprecedented precision" },
      { year: "2021", event: "JWST launches, reaches L2 orbit" },
      { year: "2023", event: "Euclid launches to map dark matter and dark energy" },
    ],
    mapItems: [],
    sources: [
      { label: "NASA JWST", url: "https://webb.nasa.gov/" },
      { label: "ESA Planck", url: "https://www.esa.int/Science_Exploration/Space_Science/Planck" },
      { label: "ESA Hubble", url: "https://esahubble.org/" },
    ],
    relatedPulseTags: ["JWST", "Hubble", "Euclid", "Exoplanets", "Dark Matter", "Cosmic Web"],
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
      { term: "Heinrich Events", definition: "Massive iceberg discharge events that disrupted ocean circulation during ice ages." },
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
];
