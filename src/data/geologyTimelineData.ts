export interface GeologyTimeEvent {
  name: string;
  coordinates: [number, number];
  description: string;
  yearMya: number; // millions of years ago (0 = present)
  category: string;
}

export const GEOLOGY_ERAS = [
  { label: "Precambrian (4600–541 Mya)", start: -4600, end: -541 },
  { label: "Paleozoic (541–252 Mya)", start: -541, end: -252 },
  { label: "Mesozoic (252–66 Mya)", start: -252, end: -66 },
  { label: "Cenozoic (66–2.6 Mya)", start: -66, end: -2.6 },
  { label: "Quaternary (2.6 Mya–Present)", start: -2.6, end: 0 },
] as const;

// Continental positions at different time periods (approximate center positions)
// These represent where major landmasses were at each geological era
export interface ContinentalPosition {
  period: string;
  yearMya: number;
  description: string;
  continents: {
    name: string;
    coordinates: [number, number];
    label: string;
  }[];
}

export const CONTINENTAL_POSITIONS: ContinentalPosition[] = [
  {
    period: "Present Day",
    yearMya: 0,
    description: "Current continental arrangement. Continents continue to drift.",
    continents: [
      { name: "North America", coordinates: [-100, 45], label: "North America" },
      { name: "South America", coordinates: [-58, -15], label: "South America" },
      { name: "Europe", coordinates: [15, 50], label: "Europe" },
      { name: "Africa", coordinates: [20, 5], label: "Africa" },
      { name: "Asia", coordinates: [90, 45], label: "Asia" },
      { name: "Australia", coordinates: [135, -25], label: "Australia" },
      { name: "Antarctica", coordinates: [0, -82], label: "Antarctica" },
    ],
  },
  {
    period: "Last Ice Age",
    yearMya: 0.02,
    description: "Sea levels 120m lower. Land bridges connect continents. Massive ice sheets cover North America and Europe.",
    continents: [
      { name: "Laurentide Ice Sheet", coordinates: [-85, 55], label: "🧊 Laurentide Ice Sheet" },
      { name: "Scandinavian Ice Sheet", coordinates: [15, 62], label: "🧊 Scandinavian Ice Sheet" },
      { name: "Beringia Land Bridge", coordinates: [-170, 64], label: "🌉 Beringia" },
      { name: "Sundaland", coordinates: [110, 0], label: "🏝️ Sundaland (exposed)" },
      { name: "Sahara Green", coordinates: [10, 20], label: "🌿 Green Sahara" },
    ],
  },
  {
    period: "Late Cenozoic",
    yearMya: 10,
    description: "Himalayas rising rapidly. Americas connect via Panama. Mediterranean dries up (Messinian Crisis).",
    continents: [
      { name: "Rising Himalayas", coordinates: [84, 28], label: "⛰️ Himalayas Rising" },
      { name: "Paratethys Sea", coordinates: [45, 45], label: "🌊 Paratethys Sea" },
      { name: "Panama Gap", coordinates: [-80, 9], label: "🌊 Open Panama Seaway" },
      { name: "East African Rift", coordinates: [36, -2], label: "🔥 Rift Beginning" },
    ],
  },
  {
    period: "Early Cenozoic",
    yearMya: 50,
    description: "India collides with Asia. Australia separates from Antarctica. Atlantic widening.",
    continents: [
      { name: "India Colliding", coordinates: [70, 15], label: "💥 India Colliding with Asia" },
      { name: "Australia Drifting", coordinates: [120, -40], label: "🏝️ Australia Moving North" },
      { name: "Tethys Sea", coordinates: [40, 30], label: "🌊 Tethys Sea (closing)" },
      { name: "Young Atlantic", coordinates: [-30, 20], label: "🌊 Widening Atlantic" },
    ],
  },
  {
    period: "Late Cretaceous",
    yearMya: 66,
    description: "Asteroid strikes Chicxulub. Dinosaurs go extinct. Continents recognizable but still moving.",
    continents: [
      { name: "Chicxulub Impact", coordinates: [-89.5, 21.4], label: "☄️ Asteroid Impact" },
      { name: "Western Interior Seaway", coordinates: [-100, 40], label: "🌊 Interior Seaway" },
      { name: "India Island", coordinates: [60, 0], label: "🏝️ India (island)" },
      { name: "Deccan Traps Erupting", coordinates: [75, 18], label: "🌋 Deccan Traps" },
    ],
  },
  {
    period: "Jurassic",
    yearMya: 150,
    description: "Pangaea breaking apart. Atlantic Ocean opening. Age of dinosaurs.",
    continents: [
      { name: "Laurasia", coordinates: [-20, 40], label: "🌍 Laurasia" },
      { name: "Gondwana", coordinates: [20, -30], label: "🌍 Gondwana" },
      { name: "Young Atlantic", coordinates: [-20, 15], label: "🌊 Proto-Atlantic" },
      { name: "Tethys Ocean", coordinates: [50, 15], label: "🌊 Tethys Ocean" },
    ],
  },
  {
    period: "Triassic / Pangaea",
    yearMya: 250,
    description: "All continents united as Pangaea. Single ocean Panthalassa. Life recovering from Great Dying.",
    continents: [
      { name: "Pangaea", coordinates: [10, 0], label: "🌍 PANGAEA (all land united)" },
      { name: "Panthalassa Ocean", coordinates: [-150, 0], label: "🌊 Panthalassa (global ocean)" },
      { name: "Tethys Sea", coordinates: [50, 10], label: "🌊 Tethys Sea" },
    ],
  },
  {
    period: "Permian Extinction",
    yearMya: 252,
    description: "The Great Dying: 96% of marine species and 70% of land species go extinct.",
    continents: [
      { name: "Siberian Traps", coordinates: [90, 65], label: "🌋 Siberian Traps Erupting" },
      { name: "Pangaea Forming", coordinates: [10, 0], label: "🌍 Pangaea Assembled" },
      { name: "Dying Oceans", coordinates: [-100, 0], label: "☠️ Anoxic Oceans" },
    ],
  },
  {
    period: "Carboniferous",
    yearMya: 350,
    description: "Vast coal swamp forests. Oxygen at 35%. Giant insects. Pangaea assembling.",
    continents: [
      { name: "Laurussia", coordinates: [-10, 10], label: "🌍 Laurussia" },
      { name: "Gondwana", coordinates: [30, -40], label: "🌍 Gondwana" },
      { name: "Coal Forests", coordinates: [-10, 0], label: "🌲 Giant Coal Forests" },
      { name: "Rheic Ocean", coordinates: [10, -10], label: "🌊 Rheic Ocean (closing)" },
    ],
  },
  {
    period: "Ordovician",
    yearMya: 450,
    description: "Life explosion in oceans. First land plants. Gondwana drifts over South Pole.",
    continents: [
      { name: "Gondwana South", coordinates: [0, -50], label: "🌍 Gondwana (South Pole)" },
      { name: "Laurentia", coordinates: [-50, -10], label: "🌍 Laurentia (equatorial)" },
      { name: "Baltica", coordinates: [20, -20], label: "🌍 Baltica" },
      { name: "Iapetus Ocean", coordinates: [-20, -10], label: "🌊 Iapetus Ocean" },
    ],
  },
];

export const GEOLOGY_TIME_EVENTS: GeologyTimeEvent[] = [
  // Formation events
  { name: "Earth Forms", coordinates: [0, 0], yearMya: 4600, description: "Accretion from solar nebula. Molten surface. Moon-forming impact.", category: "Formation" },
  { name: "First Oceans", coordinates: [0, 0], yearMya: 4400, description: "Water vapor condenses. First liquid oceans form on cooling crust.", category: "Formation" },
  { name: "First Life", coordinates: [0, 0], yearMya: 3800, description: "Earliest microbial life in hydrothermal vents. Stromatolites.", category: "Life" },
  { name: "Great Oxidation Event", coordinates: [0, 0], yearMya: 2400, description: "Cyanobacteria fill atmosphere with oxygen. Mass extinction of anaerobes.", category: "Atmosphere" },
  { name: "Snowball Earth", coordinates: [0, 0], yearMya: 717, description: "Entire planet frozen. Ice reaches equator. Lasted 57 million years.", category: "Climate" },
  { name: "Cambrian Explosion", coordinates: [0, 0], yearMya: 541, description: "Most major animal phyla appear in 20 million years. Eyes evolve.", category: "Life" },
  { name: "First Land Plants", coordinates: [0, 0], yearMya: 470, description: "Mosses and liverworts colonize land. Transform Earth's surface.", category: "Life" },
  { name: "First Forests", coordinates: [0, 0], yearMya: 385, description: "Trees evolve. Forests create soil, change atmosphere and climate.", category: "Life" },
  { name: "Pangaea Assembles", coordinates: [10, 0], yearMya: 335, description: "All continents merge into supercontinent Pangaea.", category: "Tectonics" },
  { name: "The Great Dying", coordinates: [90, 65], yearMya: 252, description: "Largest mass extinction. Siberian Traps volcanism. 96% marine species die.", category: "Extinction" },
  { name: "First Dinosaurs", coordinates: [-50, -30], yearMya: 230, description: "Small bipedal reptiles evolve. Will dominate for 165 million years.", category: "Life" },
  { name: "Pangaea Splits", coordinates: [0, 10], yearMya: 200, description: "Pangaea breaks into Laurasia (north) and Gondwana (south).", category: "Tectonics" },
  { name: "Atlantic Ocean Opens", coordinates: [-30, 20], yearMya: 180, description: "Rift between Africa and North America widens into ocean.", category: "Tectonics" },
  { name: "First Birds", coordinates: [15, 30], yearMya: 150, description: "Archaeopteryx: feathered dinosaur. Flight evolves.", category: "Life" },
  { name: "India Breaks from Africa", coordinates: [40, -20], yearMya: 130, description: "Indian plate separates and races north toward Asia.", category: "Tectonics" },
  { name: "K-Pg Extinction", coordinates: [-89.5, 21.4], yearMya: 66, description: "Chicxulub asteroid. Non-avian dinosaurs extinct. Mammals rise.", category: "Extinction" },
  { name: "India Hits Asia", coordinates: [75, 28], yearMya: 50, description: "Indian plate collides with Eurasian plate. Himalayas begin rising.", category: "Tectonics" },
  { name: "Himalayas Form", coordinates: [84, 28], yearMya: 40, description: "Collision continues. Himalayas rising. Alters global climate patterns.", category: "Mountain Building" },
  { name: "Alps Form", coordinates: [10, 46], yearMya: 35, description: "African plate pushes into Europe. Alpine orogeny.", category: "Mountain Building" },
  { name: "Andes Rising", coordinates: [-69, -15], yearMya: 30, description: "Nazca plate subduction intensifies. Andes grow rapidly.", category: "Mountain Building" },
  { name: "East African Rift Opens", coordinates: [36, -2], yearMya: 25, description: "Africa begins splitting. Rift valley, volcanoes, great lakes form.", category: "Tectonics" },
  { name: "Mediterranean Dries Up", coordinates: [18, 35], yearMya: 5.96, description: "Messinian Salinity Crisis: Mediterranean evaporates almost completely.", category: "Climate" },
  { name: "Panama Seaway Closes", coordinates: [-80, 9], yearMya: 3, description: "Isthmus of Panama connects Americas. Alters ocean currents. Ice ages begin.", category: "Tectonics" },
  { name: "Ice Ages Begin", coordinates: [-60, 70], yearMya: 2.6, description: "Pleistocene glaciation cycles. Ice sheets advance and retreat.", category: "Climate" },
  { name: "Last Glacial Maximum", coordinates: [-80, 55], yearMya: 0.02, description: "Ice sheets 3km thick over Canada and Scandinavia. Sea level 120m lower.", category: "Climate" },
  { name: "Holocene Begins", coordinates: [0, 50], yearMya: 0.012, description: "Current warm period. Glaciers retreat. Human civilization flourishes.", category: "Climate" },
];
