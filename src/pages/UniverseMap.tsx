import { useState, useRef, useMemo, useCallback, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars, Line } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Play, Pause, Info, X, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

// ------- Astronomical data -------

interface PlanetData {
  name: string;
  radius: number;        // visual radius
  orbitRadius: number;    // AU scaled
  orbitalPeriod: number;  // Earth years
  color: string;
  description: string;
  facts: string[];
  rings?: boolean;
}

const PLANETS: PlanetData[] = [
  {
    name: "Mercury",
    radius: 0.12,
    orbitRadius: 3.9,
    orbitalPeriod: 0.24,
    color: "#a0856c",
    description: "The smallest planet and closest to the Sun, with extreme temperature swings.",
    facts: ["Diameter: 4,879 km", "Day length: 59 Earth days", "No atmosphere to retain heat"],
  },
  {
    name: "Venus",
    radius: 0.18,
    orbitRadius: 5.5,
    orbitalPeriod: 0.615,
    color: "#e8cda0",
    description: "Earth's 'sister planet' with a thick, toxic atmosphere and runaway greenhouse effect.",
    facts: ["Surface temp: 465°C", "Rotates backwards", "Atmosphere: 96% CO₂"],
  },
  {
    name: "Earth",
    radius: 0.2,
    orbitRadius: 7.2,
    orbitalPeriod: 1.0,
    color: "#4a90d9",
    description: "The only known planet to harbor life, with liquid water on its surface.",
    facts: ["Diameter: 12,742 km", "71% covered in water", "1 natural satellite (Moon)"],
  },
  {
    name: "Mars",
    radius: 0.15,
    orbitRadius: 9.0,
    orbitalPeriod: 1.88,
    color: "#c1440e",
    description: "The Red Planet, with the tallest volcano and deepest canyon in the solar system.",
    facts: ["Olympus Mons: 21.9 km tall", "Thin CO₂ atmosphere", "2 small moons"],
  },
  {
    name: "Jupiter",
    radius: 0.55,
    orbitRadius: 13.0,
    orbitalPeriod: 11.86,
    color: "#c88b3a",
    description: "The largest planet, a gas giant with a Great Red Spot storm lasting centuries.",
    facts: ["Diameter: 139,820 km", "79+ moons", "Magnetic field 20,000× Earth's"],
  },
  {
    name: "Saturn",
    radius: 0.48,
    orbitRadius: 17.5,
    orbitalPeriod: 29.46,
    color: "#e8d5a3",
    description: "Famous for its spectacular ring system made of ice and rock particles.",
    facts: ["Rings span 282,000 km", "Density less than water", "82+ moons"],
    rings: true,
  },
  {
    name: "Uranus",
    radius: 0.35,
    orbitRadius: 22.0,
    orbitalPeriod: 84.01,
    color: "#73c2d9",
    description: "An ice giant that rotates on its side, likely from an ancient collision.",
    facts: ["Axial tilt: 97.7°", "Coldest atmosphere: −224°C", "27 known moons"],
  },
  {
    name: "Neptune",
    radius: 0.33,
    orbitRadius: 27.0,
    orbitalPeriod: 164.8,
    color: "#3f54ba",
    description: "The windiest planet with supersonic storms and a deep blue atmosphere.",
    facts: ["Wind speeds: 2,100 km/h", "14 known moons", "Discovered mathematically before visually"],
  },
];

// ------- 3D Components -------

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group>
      <pointLight position={[0, 0, 0]} intensity={2} color="#fff5e0" distance={100} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#ffd54f" />
      </mesh>
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial color="#ffd54f" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function OrbitRing({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color="hsl(220, 15%, 16%)"
      lineWidth={0.5}
      transparent
      opacity={0.4}
    />
  );
}

function Planet({
  data,
  timeYears,
  isPlaying,
  onSelect,
  isSelected,
}: {
  data: PlanetData;
  timeYears: number;
  isPlaying: boolean;
  onSelect: (p: PlanetData) => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  // Compute orbital position based on timeYears
  const angle = (timeYears / data.orbitalPeriod) * Math.PI * 2;
  const x = Math.cos(angle) * data.orbitRadius;
  const z = Math.sin(angle) * data.orbitRadius;

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[x, 0, z]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(data);
        }}
      >
        <sphereGeometry args={[data.radius, 24, 24]} />
        <meshStandardMaterial color={data.color} roughness={0.7} />
      </mesh>
      {/* Saturn's rings */}
      {data.rings && (
        <mesh rotation={[Math.PI * 0.45, 0, 0]}>
          <ringGeometry args={[data.radius * 1.4, data.radius * 2.2, 64]} />
          <meshBasicMaterial color={data.color} transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}
      {/* Label */}
      <Html
        position={[0, data.radius + 0.4, 0]}
        center
        distanceFactor={15}
        style={{ pointerEvents: "none" }}
      >
        <span
          className="font-body text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap"
          style={{
            color: isSelected ? data.color : "hsl(40, 20%, 92%)",
            backgroundColor: "hsla(220, 18%, 10%, 0.8)",
            border: isSelected ? `1px solid ${data.color}` : "1px solid hsla(220, 15%, 16%, 0.6)",
          }}
        >
          {data.name}
        </span>
      </Html>
    </group>
  );
}

function SolarSystemScene({
  timeYears,
  isPlaying,
  selectedPlanet,
  onSelectPlanet,
}: {
  timeYears: number;
  isPlaying: boolean;
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (p: PlanetData) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <Stars radius={200} depth={100} count={3000} factor={4} saturation={0} />
      <Sun />
      {PLANETS.map((planet) => (
        <group key={planet.name}>
          <OrbitRing radius={planet.orbitRadius} />
          <Planet
            data={planet}
            timeYears={timeYears}
            isPlaying={isPlaying}
            onSelect={onSelectPlanet}
            isSelected={selectedPlanet?.name === planet.name}
          />
        </group>
      ))}
    </>
  );
}

// ------- Main Page -------

const UniverseMap = () => {
  const navigate = useNavigate();
  const [timeYears, setTimeYears] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Animation loop for timeline playback
  const animate = useCallback((timestamp: number) => {
    if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
    const delta = (timestamp - lastTimeRef.current) / 1000;
    lastTimeRef.current = timestamp;
    setTimeYears(prev => prev + delta * speed * 0.5);
    animRef.current = requestAnimationFrame(animate);
  }, [speed]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = null;
      lastTimeRef.current = 0;
    } else {
      lastTimeRef.current = 0;
      animRef.current = requestAnimationFrame(animate);
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, animate]);

  const handleReset = useCallback(() => {
    setTimeYears(0);
    if (isPlaying) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      animRef.current = null;
      lastTimeRef.current = 0;
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeYears(parseFloat(e.target.value));
  };

  const formatTime = (years: number) => {
    const earthDays = Math.round(years * 365.25);
    if (Math.abs(years) < 1) return `${earthDays} Earth days`;
    return `${years.toFixed(1)} Earth years`;
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="relative z-30 flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-body text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Terranova</span>
          </button>
          <div className="h-5 w-px bg-border" />
          <div>
            <h1 className="font-display text-lg font-bold text-foreground leading-tight">
              Interactive Solar System
            </h1>
            <p className="font-body text-xs text-muted-foreground hidden md:block">
              Explore planetary orbits and movements through time
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border font-body text-xs text-muted-foreground">
            {formatTime(timeYears)}
          </span>
        </div>
      </header>

      {/* 3D Canvas */}
      <div className="flex-1 relative">
        <Canvas
          camera={{ position: [0, 25, 35], fov: 50, near: 0.1, far: 500 }}
          style={{ background: "hsl(220, 20%, 4%)" }}
        >
          <Suspense fallback={null}>
            <SolarSystemScene
              timeYears={timeYears}
              isPlaying={isPlaying}
              selectedPlanet={selectedPlanet}
              onSelectPlanet={setSelectedPlanet}
            />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={5}
              maxDistance={80}
              makeDefault
            />
          </Suspense>
        </Canvas>

        {/* Planet info panel */}
        <AnimatePresence>
          {selectedPlanet && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute top-4 left-4 z-30 w-80 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-lg overflow-hidden"
            >
              <div className="p-5">
                <button
                  onClick={() => setSelectedPlanet(null)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
                <div
                  className="w-3 h-3 rounded-full mb-3"
                  style={{ backgroundColor: selectedPlanet.color }}
                />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {selectedPlanet.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  {selectedPlanet.description}
                </p>
                <div className="space-y-1.5">
                  {selectedPlanet.facts.map((fact, i) => (
                    <div key={i} className="flex items-start gap-2 px-3 py-2 rounded-lg bg-secondary/40 border border-border/30">
                      <span className="text-primary font-body text-xs mt-0.5">→</span>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-secondary/60 border border-border/50 px-3 py-2">
                    <p className="font-body text-[9px] text-muted-foreground/60 uppercase tracking-wider">Orbit</p>
                    <p className="font-display text-xs font-bold text-foreground">{selectedPlanet.orbitRadius.toFixed(1)} AU</p>
                  </div>
                  <div className="rounded-lg bg-secondary/60 border border-border/50 px-3 py-2">
                    <p className="font-body text-[9px] text-muted-foreground/60 uppercase tracking-wider">Year</p>
                    <p className="font-display text-xs font-bold text-foreground">{selectedPlanet.orbitalPeriod} Earth yr</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-2">
          <button
            onClick={handleReset}
            title="Reset time"
            className="p-2.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors shadow-lg"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border font-body text-xs text-muted-foreground">
            8 planets
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm border border-border font-body text-xs text-muted-foreground">
            Speed: {speed}×
          </span>
        </div>
      </div>

      {/* Timeline Bar */}
      <div className="z-30 border-t border-border bg-card/90 backdrop-blur-xl px-4 md:px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>

          {/* Time slider */}
          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={200}
              step={0.1}
              value={timeYears % 200}
              onChange={handleSliderChange}
              className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
            />
            <div className="flex justify-between mt-1">
              <span className="font-body text-[10px] text-muted-foreground">0 years</span>
              <span className="font-body text-[10px] text-primary font-medium">{formatTime(timeYears)}</span>
              <span className="font-body text-[10px] text-muted-foreground">200 years</span>
            </div>
          </div>

          {/* Speed control */}
          <div className="flex items-center gap-1.5">
            {[0.5, 1, 2, 5, 10].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 rounded font-body text-[10px] font-medium transition-colors ${
                  speed === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniverseMap;
