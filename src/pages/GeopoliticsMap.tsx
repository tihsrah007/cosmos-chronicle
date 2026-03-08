import FullPageMap from "@/components/FullPageMap";
import {
  GEOPOLITICS_POIS,
  GEOPOLITICS_CATEGORIES,
  COUNTRY_DESCRIPTIONS,
} from "@/data/geopoliticsData";

const GeopoliticsMap = () => {
  return (
    <FullPageMap
      title="Geopolitical Atlas"
      subtitle="Explore chokepoints, conflict zones, alliances, and power dynamics across the globe"
      pois={GEOPOLITICS_POIS}
      categories={GEOPOLITICS_CATEGORIES}
      markerColor="hsl(38, 90%, 55%)"
      hoverFill="hsl(38, 60%, 30%)"
      baseFill="hsl(220, 15%, 18%)"
      strokeColor="hsl(220, 15%, 24%)"
      accentGradient="linear-gradient(135deg, hsl(38, 90%, 55%), hsl(28, 85%, 45%))"
      countryDescriptions={COUNTRY_DESCRIPTIONS}
      backLabel="Back to Terranova"
    />
  );
};

export default GeopoliticsMap;
