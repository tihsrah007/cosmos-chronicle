import FullPageMap from "@/components/FullPageMap";
import MapLoadingState from "@/components/MapLoadingState";
import { useDomainItems } from "@/hooks/use-domain-items";
import { useDomainTimeline } from "@/hooks/use-domain-timeline";
import type { MapPOI } from "@/components/FullPageMap";

const STATIC_COSMOLOGY_POIS: MapPOI[] = [
  {
    name: "Arecibo Observatory",
    coordinates: [-66.75, 18.35],
    description: "Historic radio telescope in Puerto Rico that operated from 1963 to 2020, making groundbreaking discoveries about pulsars, asteroids, and the ionosphere.",
    category: "Observatory",
    details: "The 305-meter dish was the world's largest single-aperture telescope for over 50 years. It discovered the first binary pulsar (Nobel Prize 1993) and sent the Arecibo Message toward star cluster M13 in 1974.",
  },
  {
    name: "Atacama Large Millimeter Array",
    coordinates: [-67.75, -23.02],
    description: "66 high-precision antennas in Chile's Atacama Desert observing the universe in millimeter and submillimeter wavelengths.",
    category: "Observatory",
  },
  {
    name: "CERN – Large Hadron Collider",
    coordinates: [6.05, 46.23],
    description: "The world's largest and most powerful particle accelerator, straddling the Franco-Swiss border. Confirmed the Higgs boson in 2012.",
    category: "Particle Physics",
    details: "The 27-kilometre ring of superconducting magnets accelerates protons to 99.9999991% the speed of light. Over 10,000 scientists from 100+ countries collaborate here.",
  },
  {
    name: "Hubble Space Telescope (Launch Site)",
    coordinates: [-80.60, 28.57],
    description: "Launched from Kennedy Space Center in 1990, Hubble has delivered over 1.5 million observations transforming our understanding of the cosmos.",
    category: "Space Mission",
  },
  {
    name: "Cosmic Microwave Background – First Detection",
    coordinates: [-74.19, 40.38],
    description: "In 1965, Arno Penzias and Robert Wilson detected the CMB at Bell Labs in Holmdel, New Jersey — the afterglow of the Big Bang.",
    category: "Discovery",
    details: "This accidental discovery confirmed the Big Bang theory and earned the 1978 Nobel Prize in Physics. The CMB radiation dates to ~380,000 years after the Big Bang.",
  },
  {
    name: "Gravitational Waves – LIGO Hanford",
    coordinates: [-119.41, 46.45],
    description: "One of two LIGO detectors that made the first direct observation of gravitational waves in September 2015, confirming Einstein's prediction.",
    category: "Discovery",
  },
  {
    name: "Event Horizon Telescope – Central Hub",
    coordinates: [-71.10, 42.38],
    description: "The EHT collaboration, coordinated from Harvard-Smithsonian CfA, produced the first-ever image of a black hole shadow in M87 (2019).",
    category: "Observatory",
  },
  {
    name: "Mauna Kea Observatories",
    coordinates: [-155.47, 19.82],
    description: "A collection of world-class telescopes atop Hawaii's tallest peak, including Keck, Subaru, and Gemini North.",
    category: "Observatory",
  },
  {
    name: "Planck Satellite (Mission Control)",
    coordinates: [8.63, 49.87],
    description: "ESA's Planck space observatory mapped the cosmic microwave background with unprecedented precision from 2009 to 2013.",
    category: "Space Mission",
  },
  {
    name: "James Webb Space Telescope (Launch Site)",
    coordinates: [-52.77, 5.24],
    description: "Launched from Kourou, French Guiana in 2021. JWST peers deeper into the infrared universe than any telescope before it.",
    category: "Space Mission",
    details: "The 6.5-meter gold-coated mirror and sunshield the size of a tennis court orbit the L2 Lagrange point, 1.5 million km from Earth.",
  },
  {
    name: "Vera C. Rubin Observatory",
    coordinates: [-70.75, -30.24],
    description: "Under construction in Chile, this observatory will conduct a 10-year survey mapping the entire visible sky every few nights.",
    category: "Observatory",
  },
  {
    name: "Tunguska Event Site",
    coordinates: [101.90, 60.90],
    description: "In 1908, a massive explosion flattened 2,150 km² of Siberian forest — likely an airburst from a small asteroid or comet fragment.",
    category: "Cosmic Event",
  },
];

const COSMOLOGY_CATEGORIES = [
  "Observatory",
  "Discovery",
  "Space Mission",
  "Particle Physics",
  "Cosmic Event",
] as const;

const CosmologyMap = () => {
  const itemsQuery = useDomainItems("cosmology");
  const timelineQuery = useDomainTimeline("cosmology");

  const isLoading = itemsQuery.isLoading || timelineQuery.isLoading;

  if (isLoading && !itemsQuery.data && !timelineQuery.data) {
    return <MapLoadingState message="Loading cosmological data…" />;
  }

  const pois: MapPOI[] = itemsQuery.data
    ? itemsQuery.data.map((item) => ({
        name: item.name,
        coordinates: item.coordinates,
        description: item.description,
        category: item.category,
        details: item.details,
        facts: item.facts,
        keyFigures: item.keyFigures,
        relatedItems: item.relatedItems,
        sources: item.sources,
        year: item.year,
        startYear: item.startYear,
        endYear: item.endYear,
      }))
    : STATIC_COSMOLOGY_POIS;

  const categories: readonly string[] = itemsQuery.data
    ? [...new Set(itemsQuery.data.map((i) => i.category))]
    : COSMOLOGY_CATEGORIES;

  const eras = timelineQuery.data?.eras ?? [];

  return (
    <FullPageMap
      domainSlug="cosmology"
      title="Cosmological Atlas"
      subtitle="Observatories, discoveries, space missions, and the architecture of the universe"
      pois={pois}
      categories={categories}
      markerColor="hsl(270, 70%, 60%)"
      hoverFill="hsl(270, 40%, 28%)"
      baseFill="hsl(240, 15%, 14%)"
      strokeColor="hsl(240, 12%, 20%)"
      accentGradient="linear-gradient(135deg, hsl(270, 70%, 60%), hsl(250, 60%, 45%))"
      backLabel="Back to Terranova"
      timeline={
        eras.length > 0
          ? {
              minYear: -14000,
              maxYear: 2025,
              defaultYear: 2025,
              eras,
              accentColor: "hsl(270, 70%, 60%)",
            }
          : undefined
      }
    />
  );
};

export default CosmologyMap;
