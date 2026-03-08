export interface GeoPOI {
  name: string;
  coordinates: [number, number];
  description: string;
  category: string;
  details?: string;
}

export const GEOLOGY_CATEGORIES = [
  "Mountain Range",
  "Tectonic Plate Boundary",
  "Volcano",
  "Ocean & Sea",
  "Lake",
  "River",
  "Desert",
  "Canyon & Trench",
  "Island & Archipelago",
  "Peninsula",
  "Continent",
  "Canal",
  "Glacier & Ice Sheet",
  "Rift Zone",
] as const;

export const GEOLOGY_POIS: GeoPOI[] = [
  // Mountain Ranges
  { name: "Himalayas", coordinates: [84.0, 28.0], description: "Highest mountain range. Rising at ~5mm/year from Indian-Eurasian plate collision.", category: "Mountain Range", details: "2,400 km long. Contains 14 peaks above 8,000m including Everest (8,849m)." },
  { name: "Andes", coordinates: [-69.0, -15.0], description: "World's longest continental mountain range at 7,000 km.", category: "Mountain Range", details: "Nazca plate subducting under South American plate. Highest peak: Aconcagua (6,961m)." },
  { name: "Alps", coordinates: [10.0, 46.5], description: "Europe's major mountain system. Formed by African-Eurasian plate collision.", category: "Mountain Range", details: "1,200 km arc. Mont Blanc (4,809m). Source of Rhine, Rhône, Po rivers." },
  { name: "Rocky Mountains", coordinates: [-110.0, 45.0], description: "Major North American cordillera stretching 4,800 km.", category: "Mountain Range", details: "From British Columbia to New Mexico. Continental Divide. Rich mineral deposits." },
  { name: "Ural Mountains", coordinates: [59.0, 56.0], description: "Traditional boundary between Europe and Asia. Among Earth's oldest mountains.", category: "Mountain Range", details: "2,500 km long. 250-300 million years old. Rich in minerals: iron, copper, gold." },
  { name: "Atlas Mountains", coordinates: [-4.0, 32.0], description: "Northwest African range separating Mediterranean from Sahara.", category: "Mountain Range", details: "2,500 km across Morocco, Algeria, Tunisia. Highest: Toubkal (4,167m)." },
  { name: "Caucasus Mountains", coordinates: [43.0, 42.5], description: "Between Black Sea and Caspian Sea. Contains Europe's highest peak.", category: "Mountain Range", details: "Mount Elbrus (5,642m). Tectonic boundary. Extreme linguistic diversity." },
  { name: "Karakoram", coordinates: [76.5, 35.8], description: "Home to K2, world's 2nd highest peak. Most glaciated area outside poles.", category: "Mountain Range", details: "K2 at 8,611m. Siachen Glacier. Three-way border: Pakistan, China, India." },
  { name: "Hindu Kush", coordinates: [71.0, 36.0], description: "800 km range across Afghanistan and Pakistan.", category: "Mountain Range", details: "Connects Himalayas to Pamir. Historic invasion route. Tirich Mir (7,708m)." },
  { name: "Appalachian Mountains", coordinates: [-80.0, 37.0], description: "Among the oldest mountains on Earth (~480 million years).", category: "Mountain Range", details: "2,400 km. Once as tall as the Himalayas. Rich coal deposits shaped US history." },
  { name: "Scandinavian Mountains", coordinates: [14.0, 65.0], description: "Spine of the Scandinavian Peninsula. Glacially carved landscapes.", category: "Mountain Range", details: "1,700 km. Galdhøpiggen (2,469m). Deep fjords carved by ice ages." },
  { name: "Drakensberg", coordinates: [29.0, -29.0], description: "Southern Africa's Great Escarpment. Ancient basalt formations.", category: "Mountain Range", details: "1,000 km. Thabana Ntlenyana (3,482m). San rock art sites." },
  { name: "Southern Alps", coordinates: [170.0, -43.5], description: "New Zealand's spine. Pacific-Australian plate boundary.", category: "Mountain Range", details: "Aoraki/Mount Cook (3,724m). Rising at 7mm/year. Franz Josef Glacier." },

  // Tectonic Plate Boundaries
  { name: "Ring of Fire", coordinates: [155.0, 0.0], description: "40,000 km horseshoe of oceanic trenches, volcanic arcs, and seismic belts.", category: "Tectonic Plate Boundary", details: "75% of world's volcanoes. 90% of earthquakes. Encircles the Pacific Ocean." },
  { name: "Mid-Atlantic Ridge", coordinates: [-30.0, 30.0], description: "Longest mountain range on Earth (~65,000 km), mostly underwater.", category: "Tectonic Plate Boundary", details: "Divergent boundary. Plates separate at 2.5 cm/year. Iceland sits atop it." },
  { name: "East African Rift", coordinates: [36.0, -2.0], description: "Continent splitting apart. Will form a new ocean in ~10 million years.", category: "Rift Zone", details: "3,000 km. Created Great Rift Valley lakes. Active volcanism." },
  { name: "San Andreas Fault", coordinates: [-120.0, 36.0], description: "1,300 km transform fault. Pacific and North American plates slide past each other.", category: "Tectonic Plate Boundary", details: "Moves ~46 mm/year. 1906 San Francisco earthquake. 'Big One' predicted." },
  { name: "Cascadia Subduction Zone", coordinates: [-125.0, 45.0], description: "Juan de Fuca plate subducting under North America. Megathrust threat.", category: "Tectonic Plate Boundary", details: "1,000 km. Last M9 earthquake in 1700. Tsunami risk for Pacific Northwest." },
  { name: "Java Trench", coordinates: [110.0, -10.5], description: "Deepest point in Indian Ocean (7,725m). Indo-Australian plate subduction.", category: "Tectonic Plate Boundary", details: "Caused 2004 Boxing Day tsunami (M9.1). Sunda megathrust." },
  { name: "Alpine Fault", coordinates: [170.5, -43.0], description: "New Zealand's major transform fault. Pacific-Australian plate boundary.", category: "Tectonic Plate Boundary", details: "600 km. Major earthquake every ~300 years. Last in 1717. Overdue." },
  { name: "Dead Sea Transform", coordinates: [35.5, 31.5], description: "Transform fault from Red Sea to Turkey. African-Arabian plate boundary.", category: "Tectonic Plate Boundary", details: "Created Dead Sea (lowest point on land, -430m). Active seismicity." },

  // Volcanoes
  { name: "Yellowstone Caldera", coordinates: [-110.5, 44.4], description: "Supervolcano with magma chamber holding ~46,000 km³ of molten rock.", category: "Volcano", details: "Last eruption 640,000 years ago. Geyser basin. Eruption cycle ~600-700K years." },
  { name: "Mount Vesuvius", coordinates: [14.4, 40.8], description: "Destroyed Pompeii in 79 AD. Most dangerous volcano in Europe.", category: "Volcano", details: "3 million people live nearby. Last eruption 1944. Stratovolcano." },
  { name: "Mount Fuji", coordinates: [138.7, 35.4], description: "Japan's highest peak (3,776m). Active stratovolcano. Cultural icon.", category: "Volcano", details: "Last eruption 1707. Sits at triple junction of three tectonic plates." },
  { name: "Krakatoa", coordinates: [105.4, -6.1], description: "1883 eruption was one of the deadliest. Anak Krakatau still active.", category: "Volcano", details: "Explosion heard 4,800 km away. Caused global temperature drop. Tsunami." },
  { name: "Mount Etna", coordinates: [15.0, 37.7], description: "Europe's most active volcano. Constantly erupting for 500,000 years.", category: "Volcano", details: "3,357m. UNESCO site. Fertile volcanic soil supports agriculture." },
  { name: "Mauna Loa", coordinates: [-155.6, 19.5], description: "World's largest active volcano by volume. Hawaiian hotspot.", category: "Volcano", details: "4,169m above sea level, 9,170m from ocean floor base. Shield volcano." },
  { name: "Mount Kilimanjaro", coordinates: [37.4, -3.1], description: "Africa's highest peak (5,895m). Dormant stratovolcano.", category: "Volcano", details: "Three volcanic cones. Glaciers retreating rapidly. Last eruption ~360,000 years ago." },
  { name: "Eyjafjallajökull", coordinates: [-19.6, 63.6], description: "2010 eruption grounded European air traffic for weeks.", category: "Volcano", details: "Glacier-capped. Part of Iceland's volcanic zone on Mid-Atlantic Ridge." },
  { name: "Taal Volcano", coordinates: [121.0, 14.0], description: "One of the world's smallest active volcanoes. Lake within a lake.", category: "Volcano", details: "Philippines. Nested caldera. 2020 eruption displaced 376,000 people." },
  { name: "Mount Erebus", coordinates: [167.2, -77.5], description: "Antarctica's most active volcano. Southernmost active volcano on Earth.", category: "Volcano", details: "3,794m. Persistent lava lake. Discovered in 1841." },

  // Oceans & Seas
  { name: "Pacific Ocean", coordinates: [-160.0, 0.0], description: "Largest and deepest ocean. Covers more area than all land combined.", category: "Ocean & Sea", details: "165.25 million km². Average depth 4,280m. Contains Mariana Trench." },
  { name: "Atlantic Ocean", coordinates: [-40.0, 15.0], description: "2nd largest ocean. S-shaped. Separates Old and New Worlds.", category: "Ocean & Sea", details: "106.46 million km². Mid-Atlantic Ridge runs through center. Gulf Stream." },
  { name: "Indian Ocean", coordinates: [75.0, -15.0], description: "3rd largest ocean. Warmest ocean. Monsoon-driven circulation.", category: "Ocean & Sea", details: "70.56 million km². Includes Persian Gulf oil routes. Tsunami-prone." },
  { name: "Arctic Ocean", coordinates: [0.0, 85.0], description: "Smallest and shallowest ocean. Sea ice declining rapidly.", category: "Ocean & Sea", details: "14.06 million km². Losing ice at 13% per decade. Opening new shipping routes." },
  { name: "Southern Ocean", coordinates: [0.0, -65.0], description: "Encircles Antarctica. Strongest ocean current: Antarctic Circumpolar Current.", category: "Ocean & Sea", details: "Officially recognized as 5th ocean in 2021. 20.33 million km²." },
  { name: "Mediterranean Sea", coordinates: [18.0, 35.5], description: "Nearly enclosed sea between Europe, Africa, and Asia. Cradle of civilization.", category: "Ocean & Sea", details: "2.5 million km². Connected to Atlantic only by Gibraltar. Shrinking." },
  { name: "Caribbean Sea", coordinates: [-75.0, 15.0], description: "Part of the Atlantic. Major hurricane basin. Rich coral reefs.", category: "Ocean & Sea", details: "2.75 million km². Cayman Trough (7,686m). Mesoamerican Barrier Reef." },
  { name: "South China Sea", coordinates: [115.0, 10.0], description: "Marginal sea of Pacific. Geopolitically contested. Rich marine biodiversity.", category: "Ocean & Sea", details: "3.5 million km². Oil/gas reserves. Coral Triangle region." },
  { name: "Red Sea", coordinates: [38.0, 20.0], description: "Young ocean being born. Spreading center between Africa and Arabia.", category: "Ocean & Sea", details: "438,000 km². World's northernmost tropical sea. Hot brine pools." },
  { name: "Black Sea", coordinates: [34.0, 43.0], description: "Nearly landlocked sea. Anoxic below 150m—dead zone for most life.", category: "Ocean & Sea", details: "436,000 km². Connected to Mediterranean by Turkish Straits. Ancient shipwrecks preserved." },
  { name: "Caspian Sea", coordinates: [51.0, 42.0], description: "World's largest enclosed inland body of water. Technically a lake.", category: "Ocean & Sea", details: "371,000 km². Bordered by 5 nations. Oil and gas reserves. Sturgeon/caviar." },
  { name: "Sea of Japan", coordinates: [135.0, 40.0], description: "Marginal sea between Japan and mainland Asia.", category: "Ocean & Sea", details: "978,000 km². Maximum depth 3,742m. Warm Tsushima Current." },
  { name: "Coral Sea", coordinates: [155.0, -18.0], description: "Home to the Great Barrier Reef, largest living structure on Earth.", category: "Ocean & Sea", details: "4.79 million km². Great Barrier Reef: 2,300 km, visible from space." },
  { name: "Arabian Sea", coordinates: [65.0, 15.0], description: "Northwestern Indian Ocean. Major shipping lanes.", category: "Ocean & Sea", details: "3.86 million km². Monsoon-driven. Ancient trade routes." },
  { name: "Bay of Bengal", coordinates: [90.0, 13.0], description: "Largest bay in the world. Cyclone-prone.", category: "Ocean & Sea", details: "2.17 million km². Feeds the Ganges Delta. Andaman & Nicobar Islands." },
  { name: "Baltic Sea", coordinates: [20.0, 58.0], description: "Brackish inland sea of Northern Europe. Low salinity.", category: "Ocean & Sea", details: "377,000 km². Frozen in winter. Amber deposits. Nord Stream pipelines." },
  { name: "Bering Sea", coordinates: [-175.0, 58.0], description: "Connects Pacific to Arctic. Land bridge during ice ages.", category: "Ocean & Sea", details: "2 million km². Richest fishing grounds. Bering Strait only 85 km wide." },

  // Lakes
  { name: "Lake Baikal", coordinates: [108.0, 53.5], description: "World's deepest (1,642m) and oldest (25M years) lake. Contains 20% of surface freshwater.", category: "Lake", details: "31,722 km². Rift lake. 2,500+ endemic species including Baikal seal." },
  { name: "Lake Superior", coordinates: [-87.0, 47.5], description: "Largest freshwater lake by surface area (82,100 km²).", category: "Lake", details: "Part of Great Lakes. Contains 10% of world's surface freshwater. Max depth 406m." },
  { name: "Lake Victoria", coordinates: [33.0, -1.0], description: "Africa's largest lake. Source of the White Nile.", category: "Lake", details: "68,800 km². Shared by Tanzania, Uganda, Kenya. Cichlid fish diversity." },
  { name: "Lake Titicaca", coordinates: [-69.5, -15.8], description: "Highest navigable lake in the world (3,812m elevation).", category: "Lake", details: "8,372 km². Peru-Bolivia border. Uros floating islands. Ancient Tiwanaku culture." },
  { name: "Dead Sea", coordinates: [35.5, 31.5], description: "Lowest point on Earth's surface (-430m). 10x saltier than ocean.", category: "Lake", details: "Shrinking rapidly (1m/year). Jordan-Israel border. 34.2% salinity." },
  { name: "Lake Tanganyika", coordinates: [29.5, -6.0], description: "2nd deepest lake (1,470m). World's longest freshwater lake.", category: "Lake", details: "32,900 km². East African Rift. 4 countries. 350+ cichlid species." },
  { name: "Great Slave Lake", coordinates: [-114.0, 62.0], description: "North America's deepest lake (614m).", category: "Lake", details: "27,200 km². Northwest Territories, Canada. Ice-covered 8 months/year." },
  { name: "Lake Malawi", coordinates: [34.5, -12.0], description: "African Great Lake. Most fish species of any lake on Earth.", category: "Lake", details: "29,600 km². 700+ cichlid species. East African Rift. UNESCO site." },

  // Deserts
  { name: "Sahara Desert", coordinates: [10.0, 23.0], description: "World's largest hot desert (9.2M km²). Nearly the size of the US.", category: "Desert", details: "Spans 11 countries. Temperatures reach 58°C. Was green 6,000 years ago." },
  { name: "Antarctic Desert", coordinates: [0.0, -80.0], description: "Earth's largest desert by area (14.2M km²). A cold desert.", category: "Desert", details: "Average precipitation 166mm/year. Contains 70% of Earth's freshwater as ice." },
  { name: "Arabian Desert", coordinates: [47.0, 22.0], description: "2.3 million km². Includes the Rub' al Khali (Empty Quarter).", category: "Desert", details: "Rub' al Khali: largest continuous sand desert. Oil reserves underneath." },
  { name: "Gobi Desert", coordinates: [105.0, 43.0], description: "Asia's largest desert. Rain shadow of the Himalayas.", category: "Desert", details: "1.3 million km². Dinosaur fossils. Expanding southward (desertification)." },
  { name: "Atacama Desert", coordinates: [-69.5, -24.0], description: "Driest non-polar desert. Some areas haven't seen rain in centuries.", category: "Desert", details: "Chile. NASA Mars analog site. Lithium deposits. World's best stargazing." },
  { name: "Kalahari Desert", coordinates: [22.0, -23.0], description: "Semi-arid savanna spanning Botswana, Namibia, South Africa.", category: "Desert", details: "900,000 km². San (Bushmen) homeland. Okavango Delta on its edge." },

  // Canyons & Trenches
  { name: "Mariana Trench", coordinates: [142.2, 11.3], description: "Deepest point on Earth: Challenger Deep at 10,935m.", category: "Canyon & Trench", details: "2,550 km long. Pressure: 1,086 bar. Temperatures 1-4°C. Microbial life found." },
  { name: "Grand Canyon", coordinates: [-112.1, 36.1], description: "446 km long, up to 1,800m deep. 2 billion years of geological history.", category: "Canyon & Trench", details: "Colorado River carved it over 5-6 million years. UNESCO World Heritage Site." },
  { name: "Puerto Rico Trench", coordinates: [-66.0, 19.5], description: "Deepest point in the Atlantic Ocean (8,376m).", category: "Canyon & Trench", details: "Caribbean plate subducting. Tsunami risk for Caribbean islands." },
  { name: "Tonga Trench", coordinates: [-173.0, -22.0], description: "2nd deepest trench (10,882m). Fastest tectonic subduction on Earth.", category: "Canyon & Trench", details: "Pacific plate subducting at 24 cm/year. Horizon Deep." },
  { name: "Fish River Canyon", coordinates: [17.6, -27.7], description: "2nd largest canyon in the world. 160 km long, 27 km wide.", category: "Canyon & Trench", details: "Namibia. 550m deep. Formed by erosion and tectonic activity." },

  // Islands & Archipelagos
  { name: "Greenland", coordinates: [-42.0, 72.0], description: "World's largest island (2.17M km²). Ice sheet contains 7m of sea level rise.", category: "Island & Archipelago", details: "Danish territory. 80% ice-covered. Rare earth minerals beneath ice." },
  { name: "Borneo", coordinates: [115.0, 1.0], description: "3rd largest island. Shared by Malaysia, Indonesia, Brunei.", category: "Island & Archipelago", details: "Oldest rainforest (130M years). Orangutans. Mount Kinabalu (4,095m)." },
  { name: "Madagascar", coordinates: [47.0, -19.0], description: "4th largest island. Split from India 88M years ago. 90% endemic species.", category: "Island & Archipelago", details: "592,000 km². Lemurs. Unique baobab forests. Rapidly deforesting." },
  { name: "Hawaiian Islands", coordinates: [-155.5, 19.8], description: "Volcanic hotspot chain in the Pacific. Most isolated population center on Earth.", category: "Island & Archipelago", details: "Shield volcanoes. Mauna Kea (10,210m from ocean floor). Moving NW at 7 cm/year." },
  { name: "Galápagos Islands", coordinates: [-91.0, -0.5], description: "Volcanic archipelago. Darwin's laboratory of evolution.", category: "Island & Archipelago", details: "19 islands. Marine iguanas, giant tortoises. Nazca plate hotspot." },
  { name: "Iceland", coordinates: [-19.0, 65.0], description: "Island on the Mid-Atlantic Ridge. Geothermal paradise.", category: "Island & Archipelago", details: "30+ active volcanic systems. 11% glaciated. 100% renewable energy." },
  { name: "Japan Archipelago", coordinates: [138.0, 36.0], description: "6,852 islands at the junction of four tectonic plates.", category: "Island & Archipelago", details: "Most seismically active inhabited region. 111 active volcanoes." },
  { name: "New Zealand", coordinates: [174.0, -41.0], description: "Zealandia microcontinent fragment. Alpine Fault bisects South Island.", category: "Island & Archipelago", details: "Geothermal activity. Southern Alps rising 7mm/year. Fiordland." },
  { name: "Svalbard", coordinates: [16.0, 78.0], description: "Arctic archipelago between Norway and North Pole.", category: "Island & Archipelago", details: "Global Seed Vault. Polar bears outnumber humans. Permafrost." },
  { name: "Indonesian Archipelago", coordinates: [120.0, -2.0], description: "World's largest archipelago: 17,508 islands spanning 5,120 km.", category: "Island & Archipelago", details: "Ring of Fire. 130 active volcanoes. Wallace Line divides fauna." },

  // Peninsulas
  { name: "Arabian Peninsula", coordinates: [47.0, 23.0], description: "World's largest peninsula (3.24M km²). Sits on the Arabian Plate.", category: "Peninsula", details: "Mostly desert. World's largest oil reserves. Separated from Africa by Red Sea rift." },
  { name: "Indian Subcontinent", coordinates: [78.0, 22.0], description: "Tectonic plate that collided with Eurasia, creating the Himalayas.", category: "Peninsula", details: "4.4 million km². Deccan Traps (massive basalt flows). Monsoon climate." },
  { name: "Scandinavian Peninsula", coordinates: [15.0, 64.0], description: "Largest peninsula in Europe. Glacially sculpted fjords.", category: "Peninsula", details: "1,850 km long. Post-glacial rebound: rising 1 cm/year. Baltic Shield bedrock." },
  { name: "Iberian Peninsula", coordinates: [-4.0, 40.0], description: "Southwestern Europe. Spain and Portugal. Mediterranean-Atlantic divide.", category: "Peninsula", details: "583,000 km². Pyrenees separate from France. Strait of Gibraltar." },
  { name: "Korean Peninsula", coordinates: [127.5, 37.5], description: "1,100 km peninsula between Sea of Japan and Yellow Sea.", category: "Peninsula", details: "Mountainous terrain. DMZ divides North and South. Tectonic stability." },
  { name: "Italian Peninsula", coordinates: [12.5, 42.0], description: "Boot-shaped. Apennine Mountains form the spine. Active volcanism.", category: "Peninsula", details: "Vesuvius, Etna, Stromboli. Subduction of African plate. Earthquake-prone." },
  { name: "Kamchatka Peninsula", coordinates: [159.0, 56.0], description: "Russia's volcanic frontier. 160 volcanoes, 29 active.", category: "Peninsula", details: "1,250 km long. Brown bears. Pacific Ring of Fire. Geysers." },
  { name: "Malay Peninsula", coordinates: [101.5, 7.0], description: "Connects mainland Asia to Maritime Southeast Asia.", category: "Peninsula", details: "1,127 km long. Strait of Malacca. Tropical rainforest. Tin deposits." },
  { name: "Sinai Peninsula", coordinates: [33.5, 29.5], description: "Triangular peninsula connecting Africa to Asia.", category: "Peninsula", details: "60,000 km². Red Sea Rift. Mount Sinai. Suez Canal on western edge." },
  { name: "Balkans Peninsula", coordinates: [22.0, 42.0], description: "Southeastern European peninsula. Complex tectonic history.", category: "Peninsula", details: "Dinaric Alps. Seismic activity. Adriatic and Aegean coastlines." },
  { name: "Antarctic Peninsula", coordinates: [-60.0, -65.0], description: "Fastest-warming region on Earth. Extension of the Andes.", category: "Peninsula", details: "1,300 km. Warming 3°C in 50 years. Ice shelf collapses." },

  // Continents
  { name: "Africa", coordinates: [20.0, 5.0], description: "2nd largest continent. Oldest continental crust. Splitting along East African Rift.", category: "Continent", details: "30.37 million km². 54 countries. Great Rift Valley. Sahara expansion." },
  { name: "Antarctica", coordinates: [0.0, -82.0], description: "5th largest continent. 98% ice-covered. Contains 70% of Earth's freshwater.", category: "Continent", details: "14.2 million km². No permanent population. Coldest: -89.2°C. Ozone hole." },
  { name: "Asia", coordinates: [90.0, 45.0], description: "Largest continent. 44.58M km². Most diverse geology on Earth.", category: "Continent", details: "Highest (Everest) and lowest (Dead Sea) points. Himalayas still rising." },
  { name: "Europe", coordinates: [15.0, 50.0], description: "6th largest continent. Geologically, western peninsula of Eurasia.", category: "Continent", details: "10.18 million km². Alps, Pyrenees, Scandinavian ice sheet legacy." },
  { name: "North America", coordinates: [-100.0, 45.0], description: "3rd largest continent. From Arctic to tropics.", category: "Continent", details: "24.71M km². Rocky Mountains, Grand Canyon, Yellowstone supervolcano." },
  { name: "South America", coordinates: [-58.0, -15.0], description: "4th largest continent. Andes, Amazon, and Atacama.", category: "Continent", details: "17.84M km². Amazon Basin: largest river by volume. Patagonian ice fields." },
  { name: "Oceania", coordinates: [140.0, -25.0], description: "Smallest continental region. Australia + Pacific Islands.", category: "Continent", details: "8.53M km². Great Barrier Reef. Uluru. Ring of Fire islands." },

  // Canals
  { name: "Suez Canal (Geological)", coordinates: [32.3, 30.5], description: "163 km artificial waterway connecting Mediterranean and Red Sea.", category: "Canal", details: "Cut through Isthmus of Suez. No locks. Sea level canal. Widened in 2015." },
  { name: "Panama Canal (Geological)", coordinates: [-79.9, 9.1], description: "82 km canal across the Isthmus of Panama. Uses locks to raise ships 26m.", category: "Canal", details: "Culebra Cut through Continental Divide. Gatun Lake artificial lake." },
  { name: "Kiel Canal", coordinates: [9.9, 54.3], description: "98 km canal connecting North Sea and Baltic Sea across Germany.", category: "Canal", details: "World's busiest artificial waterway by vessel count. No locks." },
  { name: "Corinth Canal", coordinates: [22.9, 37.9], description: "6.4 km canal cutting through the Isthmus of Corinth, Greece.", category: "Canal", details: "Cut through solid rock. 80m deep walls. Too narrow for modern ships." },

  // Glaciers & Ice Sheets
  { name: "Antarctic Ice Sheet", coordinates: [0.0, -75.0], description: "Largest single mass of ice on Earth. 26.5 million km³.", category: "Glacier & Ice Sheet", details: "If melted: 58m sea level rise. East sheet stable; West sheet vulnerable." },
  { name: "Greenland Ice Sheet", coordinates: [-42.0, 72.0], description: "2nd largest ice body. Contains 7.2m of potential sea level rise.", category: "Glacier & Ice Sheet", details: "1.71 million km². Losing 280 billion tonnes/year. Ice cores show 100K+ years of climate." },
  { name: "Vatnajökull", coordinates: [-16.8, 64.4], description: "Europe's largest glacier by volume. Covers active volcanoes.", category: "Glacier & Ice Sheet", details: "Iceland. 7,900 km². Up to 1,000m thick. Subglacial eruptions cause jökulhlaups." },
  { name: "Perito Moreno Glacier", coordinates: [-73.0, -50.5], description: "One of few advancing glaciers. Spectacular calving events.", category: "Glacier & Ice Sheet", details: "Argentina. 250 km². 5 km wide terminus. Southern Patagonian Ice Field." },
  { name: "Siachen Glacier", coordinates: [77.1, 35.4], description: "World's highest battleground. 2nd longest non-polar glacier.", category: "Glacier & Ice Sheet", details: "76 km long. India-Pakistan dispute. Soldiers at 6,000m+ elevation." },
];
