import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DomainsSection from "@/components/DomainsSection";
import WorldMap from "@/components/WorldMap";
import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DomainsSection />
      <WorldMap />
      <FeaturedSection />
      <Footer />
    </div>
  );
};

export default Index;
