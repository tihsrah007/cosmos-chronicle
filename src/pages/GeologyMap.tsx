import FullPageMap from "@/components/FullPageMap";
import { GEOLOGY_POIS, GEOLOGY_CATEGORIES } from "@/data/geologyData";

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
    />
  );
};

export default GeologyMap;
