import FullPageMap from "@/components/FullPageMap";
import MapLoadingState from "@/components/MapLoadingState";
import MapErrorState from "@/components/MapErrorState";
import { useDomainItems } from "@/hooks/use-domain-items";
import { useDomainTimeline } from "@/hooks/use-domain-timeline";
import { useGeopoliticsCountries } from "@/hooks/use-geopolitics-countries";
// Static fallbacks
import {
  GEOPOLITICS_POIS,
  GEOPOLITICS_CATEGORIES,
  COUNTRY_DESCRIPTIONS,
} from "@/data/geopoliticsData";
import { GEOPOLITICS_ERAS } from "@/data/geopoliticsTimelineData";
import type { MapPOI } from "@/components/FullPageMap";

const GeopoliticsMap = () => {
  const itemsQuery = useDomainItems("geopolitics");
  const timelineQuery = useDomainTimeline("geopolitics");
  const countriesQuery = useGeopoliticsCountries();

  const isLoading = itemsQuery.isLoading || timelineQuery.isLoading;
  const isError = itemsQuery.isError && timelineQuery.isError;

  if (isLoading && !itemsQuery.data && !timelineQuery.data) {
    return <MapLoadingState message="Loading geopolitical data…" />;
  }

  // Build POIs from API or fallback
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
    : GEOPOLITICS_POIS;

  // Build categories from data
  const categories: readonly string[] = itemsQuery.data
    ? [...new Set(itemsQuery.data.map((i) => i.category))]
    : GEOPOLITICS_CATEGORIES;

  // Build country descriptions from API or fallback
  const countryDescriptions: Record<string, string> = countriesQuery.data
    ? Object.fromEntries(countriesQuery.data.map((c) => [c.name, c.description]))
    : COUNTRY_DESCRIPTIONS;

  // Timeline from API or fallback
  const eras = timelineQuery.data?.eras ?? [...GEOPOLITICS_ERAS];

  return (
    <FullPageMap
      domainSlug="geopolitics"
      title="Geopolitical Atlas"
      subtitle="Explore chokepoints, conflict zones, alliances, and power dynamics across the globe"
      pois={pois}
      categories={categories}
      markerColor="hsl(38, 90%, 55%)"
      hoverFill="hsl(38, 60%, 30%)"
      baseFill="hsl(220, 15%, 18%)"
      strokeColor="hsl(220, 15%, 24%)"
      accentGradient="linear-gradient(135deg, hsl(38, 90%, 55%), hsl(28, 85%, 45%))"
      countryDescriptions={countryDescriptions}
      backLabel="Back to Terranova"
      timeline={{
        minYear: -5000,
        maxYear: 2025,
        defaultYear: 2025,
        eras,
        accentColor: "hsl(38, 90%, 55%)",
        formatYear: (y) => (y < 0 ? `${Math.abs(y)} BC` : `${y} AD`),
      }}
    />
  );
};

export default GeopoliticsMap;
