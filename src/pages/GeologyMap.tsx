import FullPageMap from "@/components/FullPageMap";
import MapLoadingState from "@/components/MapLoadingState";
import { useDomainItems } from "@/hooks/use-domain-items";
import { useDomainTimeline } from "@/hooks/use-domain-timeline";
// Static fallbacks
import { GEOLOGY_POIS, GEOLOGY_CATEGORIES } from "@/data/geologyData";
import { GEOLOGY_ERAS } from "@/data/geologyTimelineData";
import type { MapPOI } from "@/components/FullPageMap";

const formatGeologyYear = (year: number): string => {
  if (year <= -1000000) return `${(year / -1000000).toFixed(1)}M years ago`;
  if (year <= -1000) return `${Math.round(year / -1000)}K years ago`;
  if (year < 0) return `${Math.abs(year)} years ago`;
  return "Present";
};

const GeologyMap = () => {
  const itemsQuery = useDomainItems("geology");
  const timelineQuery = useDomainTimeline("geology");

  const isLoading = itemsQuery.isLoading || timelineQuery.isLoading;

  if (isLoading && !itemsQuery.data && !timelineQuery.data) {
    return <MapLoadingState message="Loading geological data…" />;
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
      }))
    : GEOLOGY_POIS;

  const categories: readonly string[] = itemsQuery.data
    ? [...new Set(itemsQuery.data.map((i) => i.category))]
    : GEOLOGY_CATEGORIES;

  const eras = timelineQuery.data?.eras ?? [...GEOLOGY_ERAS];

  return (
    <FullPageMap
      domainSlug="geology"
      title="Geological Atlas"
      subtitle="Mountains, tectonic plates, volcanoes, oceans, trenches, islands, peninsulas, and more"
      pois={pois}
      categories={categories}
      markerColor="hsl(160, 70%, 45%)"
      hoverFill="hsl(160, 40%, 25%)"
      baseFill="hsl(220, 15%, 16%)"
      strokeColor="hsl(220, 12%, 22%)"
      accentGradient="linear-gradient(135deg, hsl(160, 70%, 45%), hsl(140, 60%, 35%))"
      backLabel="Back to Terranova"
      timeline={{
        minYear: -4600,
        maxYear: 0,
        defaultYear: 0,
        eras,
        accentColor: "hsl(160, 70%, 45%)",
        formatYear: formatGeologyYear,
      }}
    />
  );
};

export default GeologyMap;
