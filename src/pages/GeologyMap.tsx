import FullPageMap from "@/components/FullPageMap";
import { GEOLOGY_POIS, GEOLOGY_CATEGORIES } from "@/data/geologyData";
import { GEOLOGY_ERAS } from "@/data/geologyTimelineData";

const formatGeologyYear = (year: number): string => {
  if (year <= -1000000) return `${(year / -1000000).toFixed(1)}M years ago`;
  if (year <= -1000) return `${Math.round(year / -1000)}K years ago`;
  if (year < 0) return `${Math.abs(year)} years ago`;
  return "Present";
};

const GeologyMap = () => {
  return (
    <FullPageMap
      title="Geological Atlas"
      subtitle="Mountains, tectonic plates, volcanoes, oceans, trenches, islands, peninsulas, and more"
      pois={GEOLOGY_POIS}
      categories={GEOLOGY_CATEGORIES}
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
        eras: GEOLOGY_ERAS,
        accentColor: "hsl(160, 70%, 45%)",
        formatYear: formatGeologyYear,
      }}
    />
  );
};

export default GeologyMap;
