import { GEOLOGY_CATEGORIES, GEOLOGY_POIS } from "../../../src/data/geologyData";
import {
  CONTINENTAL_POSITIONS,
  GEOLOGY_ERAS,
  GEOLOGY_TIME_EVENTS,
} from "../../../src/data/geologyTimelineData";
import {
  COUNTRY_DESCRIPTIONS,
  GEOPOLITICS_CATEGORIES,
  GEOPOLITICS_POIS,
} from "../../../src/data/geopoliticsData";
import {
  GEOPOLITICS_ERAS,
  GEOPOLITICS_TIME_EVENTS,
} from "../../../src/data/geopoliticsTimelineData";
import {
  HISTORY_CATEGORIES,
  HISTORY_ERAS,
  HISTORY_EVENTS,
} from "../../../src/data/historyData";
import type {
  ContentItem,
  ContentStoreData,
  Coordinates,
  CountryProfile,
  DomainContent,
  TimelineEvent,
} from "../types/content";

const toCoordinates = (coordinates: [number, number]): Coordinates => ({
  lng: coordinates[0],
  lat: coordinates[1],
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const geologyItems: ContentItem[] = GEOLOGY_POIS.map((poi) => ({
  id: `geology-${slugify(poi.name)}`,
  name: poi.name,
  category: poi.category,
  description: poi.description,
  details: poi.details,
  coordinates: toCoordinates(poi.coordinates),
  tags: [poi.category, "geology"],
}));

const geologyTimelineEvents: TimelineEvent[] = [
  ...GEOLOGY_TIME_EVENTS.map((event) => ({
    id: `geology-timeline-${slugify(event.name)}`,
    name: event.name,
    category: event.category,
    description: event.description,
    coordinates: toCoordinates(event.coordinates),
    startYear: -event.yearMya,
    endYear: -event.yearMya,
  })),
  ...CONTINENTAL_POSITIONS.map((position) => ({
    id: `geology-position-${slugify(position.period)}`,
    name: position.period,
    category: "Continental Position",
    description: position.description,
    coordinates: { lng: 0, lat: 0 },
    startYear: -position.yearMya,
    endYear: -position.yearMya,
  })),
];

const geopoliticsItems: ContentItem[] = GEOPOLITICS_POIS.map((poi) => ({
  id: `geopolitics-${slugify(poi.name)}`,
  name: poi.name,
  category: poi.category,
  description: poi.description,
  details: poi.details,
  coordinates: toCoordinates(poi.coordinates),
  tags: [poi.category, "geopolitics"],
}));

const geopoliticsTimelineEvents: TimelineEvent[] = GEOPOLITICS_TIME_EVENTS.map((event) => ({
  id: `geopolitics-timeline-${slugify(event.name)}`,
  name: event.name,
  category: event.category,
  description: event.description,
  coordinates: toCoordinates(event.coordinates),
  startYear: event.startYear,
  endYear: event.endYear,
}));

const historyItems: ContentItem[] = HISTORY_EVENTS.map((event) => ({
  id: `history-${slugify(event.name)}-${event.year}`,
  name: event.name,
  category: event.category,
  description: event.description,
  details: event.details,
  coordinates: toCoordinates(event.coordinates),
  startYear: event.year,
  endYear: 2025,
  yearLabel: event.yearLabel,
  tags: [event.category, "history"],
}));

const cosmologyItems: ContentItem[] = [
  {
    id: "cosmology-arecibo-observatory",
    name: "Arecibo Observatory",
    coordinates: { lng: -66.75, lat: 18.35 },
    description:
      "Historic radio telescope in Puerto Rico that operated from 1963 to 2020 and transformed radio astronomy.",
    category: "Observatory",
    details:
      "The 305 m dish discovered the first binary pulsar and supported planetary radar work for asteroid tracking.",
    tags: ["observatory", "radio astronomy", "cosmology"],
    facts: [
      "Largest single-aperture radio telescope for more than 50 years",
      "Arecibo message transmitted in 1974",
    ],
    keyFigures: [
      { label: "Dish Diameter", value: "305 m" },
      { label: "Operation", value: "1963-2020" },
    ],
    relatedItems: ["Event Horizon Telescope", "Vera C. Rubin Observatory"],
    sources: [
      { label: "NSF - Arecibo Observatory" },
      { label: "Encyclopaedia Britannica - Arecibo", url: "https://www.britannica.com/topic/Arecibo-Observatory" },
    ],
  },
  {
    id: "cosmology-alma",
    name: "Atacama Large Millimeter Array",
    coordinates: { lng: -67.75, lat: -23.02 },
    description:
      "A Chile-based array of 66 antennas observing the universe in millimeter and submillimeter wavelengths.",
    category: "Observatory",
    tags: ["observatory", "mm astronomy", "cosmology"],
    facts: ["Joint project: ESO, NSF, and NINS", "Located at 5,000 m altitude"],
    keyFigures: [
      { label: "Antennas", value: "66" },
      { label: "Altitude", value: "5,000 m" },
    ],
    relatedItems: ["James Webb Space Telescope"],
    sources: [{ label: "ALMA Observatory", url: "https://www.almaobservatory.org" }],
  },
  {
    id: "cosmology-cern-lhc",
    name: "CERN - Large Hadron Collider",
    coordinates: { lng: 6.05, lat: 46.23 },
    description:
      "The largest particle accelerator in the world, crucial for modern high-energy physics and cosmology models.",
    category: "Particle Physics",
    details:
      "The LHC confirmed the Higgs boson in 2012 and continues precision tests of the Standard Model.",
    tags: ["particle physics", "cern", "cosmology"],
    facts: ["27 km accelerator ring", "Operates near light speed proton collisions"],
    keyFigures: [
      { label: "Ring Length", value: "27 km" },
      { label: "Higgs Discovery", value: "2012" },
    ],
    relatedItems: ["Planck Satellite", "Cosmic Microwave Background - First Detection"],
    sources: [{ label: "CERN - LHC", url: "https://home.cern/science/accelerators/large-hadron-collider" }],
  },
  {
    id: "cosmology-hubble-launch",
    name: "Hubble Space Telescope (Launch Site)",
    coordinates: { lng: -80.6, lat: 28.57 },
    description:
      "Launched from Kennedy Space Center in 1990, Hubble reshaped modern astronomy with deep-space imaging.",
    category: "Space Mission",
    tags: ["space mission", "hubble", "cosmology"],
    facts: ["More than 1.5 million scientific observations", "In service since 1990"],
    keyFigures: [{ label: "Launch", value: "1990" }],
    relatedItems: ["James Webb Space Telescope"],
    sources: [{ label: "NASA - Hubble", url: "https://www.nasa.gov/mission_pages/hubble/main/index.html" }],
  },
  {
    id: "cosmology-cmb-detection",
    name: "Cosmic Microwave Background - First Detection",
    coordinates: { lng: -74.19, lat: 40.38 },
    description:
      "Bell Labs site where the CMB was identified in 1965, providing major support for Big Bang cosmology.",
    category: "Discovery",
    details:
      "Penzias and Wilson detected persistent microwave noise that matched predictions for relic radiation.",
    tags: ["cmb", "big bang", "discovery"],
    facts: ["Nobel Prize awarded in 1978", "Radiation dates to roughly 380,000 years after Big Bang"],
    keyFigures: [
      { label: "Discovery", value: "1965" },
      { label: "Nobel Prize", value: "1978" },
    ],
    relatedItems: ["Planck Satellite"],
    sources: [{ label: "NASA - Cosmic Microwave Background" }],
  },
  {
    id: "cosmology-ligo-hanford",
    name: "Gravitational Waves - LIGO Hanford",
    coordinates: { lng: -119.41, lat: 46.45 },
    description:
      "One of the LIGO detectors that measured gravitational waves directly for the first time in 2015.",
    category: "Discovery",
    tags: ["gravitational waves", "ligo", "discovery"],
    facts: ["First direct detection in September 2015"],
    keyFigures: [{ label: "Detection", value: "2015" }],
    relatedItems: ["CERN - Large Hadron Collider"],
    sources: [{ label: "LIGO Lab", url: "https://www.ligo.caltech.edu" }],
  },
  {
    id: "cosmology-eht-hub",
    name: "Event Horizon Telescope - Central Hub",
    coordinates: { lng: -71.1, lat: 42.38 },
    description:
      "Coordination center for the EHT network that captured the first black-hole shadow image.",
    category: "Observatory",
    tags: ["black hole", "eht", "observatory"],
    facts: ["First black-hole image released in 2019"],
    keyFigures: [{ label: "Milestone", value: "M87 image (2019)" }],
    relatedItems: ["Atacama Large Millimeter Array"],
    sources: [{ label: "Event Horizon Telescope", url: "https://eventhorizontelescope.org" }],
  },
  {
    id: "cosmology-mauna-kea",
    name: "Mauna Kea Observatories",
    coordinates: { lng: -155.47, lat: 19.82 },
    description:
      "Cluster of high-elevation telescopes in Hawaii used for deep-space and exoplanet research.",
    category: "Observatory",
    tags: ["observatory", "optical astronomy"],
    facts: ["Hosts Keck, Subaru, and Gemini North"],
    keyFigures: [{ label: "Elevation", value: "4,205 m" }],
    relatedItems: ["Vera C. Rubin Observatory"],
    sources: [{ label: "University of Hawaii - Maunakea" }],
  },
  {
    id: "cosmology-planck-control",
    name: "Planck Satellite (Mission Control)",
    coordinates: { lng: 8.63, lat: 49.87 },
    description:
      "ESA mission control region associated with the Planck mission, which mapped the CMB with high precision.",
    category: "Space Mission",
    tags: ["planck", "cmb", "space mission"],
    facts: ["Mission active from 2009 to 2013"],
    keyFigures: [{ label: "Mission", value: "2009-2013" }],
    relatedItems: ["Cosmic Microwave Background - First Detection"],
    sources: [{ label: "ESA - Planck" }],
  },
  {
    id: "cosmology-jwst-launch",
    name: "James Webb Space Telescope (Launch Site)",
    coordinates: { lng: -52.77, lat: 5.24 },
    description:
      "Launched from Kourou in 2021, JWST studies early galaxies and exoplanet atmospheres in infrared.",
    category: "Space Mission",
    tags: ["jwst", "space mission", "infrared"],
    facts: ["Observes from Sun-Earth L2", "Largest space telescope mirror to date"],
    keyFigures: [
      { label: "Mirror", value: "6.5 m" },
      { label: "Launch", value: "2021" },
    ],
    relatedItems: ["Hubble Space Telescope (Launch Site)"],
    sources: [{ label: "NASA - Webb Telescope", url: "https://webb.nasa.gov" }],
  },
  {
    id: "cosmology-rubin-observatory",
    name: "Vera C. Rubin Observatory",
    coordinates: { lng: -70.75, lat: -30.24 },
    description:
      "A wide-field survey observatory in Chile built for time-domain astronomy and dark-energy studies.",
    category: "Observatory",
    tags: ["rubin", "survey astronomy", "dark energy"],
    facts: ["Designed for the Legacy Survey of Space and Time"],
    keyFigures: [{ label: "Survey", value: "10 years" }],
    relatedItems: ["Atacama Large Millimeter Array"],
    sources: [{ label: "Rubin Observatory", url: "https://rubinobservatory.org" }],
  },
  {
    id: "cosmology-tunguska",
    name: "Tunguska Event Site",
    coordinates: { lng: 101.9, lat: 60.9 },
    description:
      "Site of the 1908 atmospheric explosion likely caused by an asteroid or comet fragment.",
    category: "Cosmic Event",
    tags: ["asteroid", "impact", "cosmic event"],
    facts: ["Flattened around 2,150 km² of forest"],
    keyFigures: [{ label: "Event", value: "1908" }],
    relatedItems: ["Gravitational Waves - LIGO Hanford"],
    sources: [{ label: "NASA - Near Earth Object Program" }],
  },
];

const cosmologyTimelineEras = [
  { label: "Ancient Skywatching", start: -3000, end: 1500 },
  { label: "Scientific Revolution", start: 1500, end: 1900 },
  { label: "Space Age", start: 1900, end: 2000 },
  { label: "Modern Cosmology", start: 2000, end: 2025 },
];

const cosmologyTimelineEvents: TimelineEvent[] = [
  {
    id: "cosmology-event-hubble-launch",
    name: "Hubble Launch",
    category: "Space Mission",
    description: "Launch of the Hubble Space Telescope.",
    coordinates: { lng: -80.6, lat: 28.57 },
    startYear: 1990,
    endYear: 1990,
  },
  {
    id: "cosmology-event-cmb-detection",
    name: "CMB Detection",
    category: "Discovery",
    description: "First detection of the cosmic microwave background.",
    coordinates: { lng: -74.19, lat: 40.38 },
    startYear: 1965,
    endYear: 1965,
  },
  {
    id: "cosmology-event-gravitational-waves",
    name: "Gravitational Waves Detected",
    category: "Discovery",
    description: "LIGO observed gravitational waves for the first time.",
    coordinates: { lng: -119.41, lat: 46.45 },
    startYear: 2015,
    endYear: 2015,
  },
  {
    id: "cosmology-event-jwst-launch",
    name: "JWST Launch",
    category: "Space Mission",
    description: "Launch of the James Webb Space Telescope.",
    coordinates: { lng: -52.77, lat: 5.24 },
    startYear: 2021,
    endYear: 2021,
  },
];

const countryProfiles: CountryProfile[] = Object.entries(COUNTRY_DESCRIPTIONS).map(
  ([name, description]) => ({
    id: `country-${slugify(name)}`,
    name,
    description,
  })
);

const withCounts = (domain: Omit<DomainContent, "itemCount" | "timelineEraCount">): DomainContent => ({
  ...domain,
  itemCount: domain.items.length,
  timelineEraCount: domain.timelineEras.length,
});

export const buildSeedData = (): ContentStoreData => ({
  domains: [
    withCounts({
      slug: "geology",
      title: "Geological Atlas",
      subtitle:
        "Mountains, tectonic plates, volcanoes, oceans, trenches, islands, peninsulas, and more",
      itemLabel: "locations",
      color: "hsl(160, 70%, 45%)",
      categories: [...GEOLOGY_CATEGORIES],
      items: geologyItems,
      timelineEras: [...GEOLOGY_ERAS],
      timelineEvents: geologyTimelineEvents,
      countryProfiles: [],
    }),
    withCounts({
      slug: "geopolitics",
      title: "Geopolitical Atlas",
      subtitle:
        "Explore chokepoints, conflict zones, alliances, and power dynamics across the globe",
      itemLabel: "locations",
      color: "hsl(38, 90%, 55%)",
      categories: [...GEOPOLITICS_CATEGORIES],
      items: geopoliticsItems,
      timelineEras: [...GEOPOLITICS_ERAS],
      timelineEvents: geopoliticsTimelineEvents,
      countryProfiles,
    }),
    withCounts({
      slug: "history",
      title: "Historical Atlas",
      subtitle: "Empires, wars, discoveries, and revolutions from 5000 BC to today",
      itemLabel: "events",
      color: "hsl(38, 85%, 55%)",
      categories: [...HISTORY_CATEGORIES],
      items: historyItems,
      timelineEras: [...HISTORY_ERAS],
      timelineEvents: historyItems.map((item) => ({
        id: `history-timeline-${item.id}`,
        name: item.name,
        category: item.category,
        description: item.description,
        coordinates: item.coordinates,
        startYear: item.startYear ?? 0,
        endYear: item.endYear ?? item.startYear ?? 0,
      })),
      countryProfiles: [],
    }),
    withCounts({
      slug: "cosmology",
      title: "Cosmological Atlas",
      subtitle:
        "Observatories, discoveries, space missions, and the architecture of the universe",
      itemLabel: "locations",
      color: "hsl(270, 70%, 60%)",
      categories: [
        "Observatory",
        "Discovery",
        "Space Mission",
        "Particle Physics",
        "Cosmic Event",
      ],
      items: cosmologyItems,
      timelineEras: cosmologyTimelineEras,
      timelineEvents: cosmologyTimelineEvents,
      countryProfiles: [],
    }),
  ],
});
