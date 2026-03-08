export interface GeoPOI {
  name: string;
  coordinates: [number, number];
  description: string;
  category: string;
  details?: string;
}

export const GEOPOLITICS_CATEGORIES = [
  "Chokepoint",
  "Conflict Zone",
  "Disputed Territory",
  "Strategic Alliance",
  "Economic Zone",
  "Flashpoint",
  "Nuclear State",
  "Emerging Power",
] as const;

export const GEOPOLITICS_POIS: GeoPOI[] = [
  // Chokepoints
  { name: "Strait of Hormuz", coordinates: [56.3, 26.6], description: "Controls ~20% of global oil transit. One of the world's most strategically vital chokepoints.", category: "Chokepoint", details: "Between Iran and Oman/UAE. ~21 million barrels of oil pass through daily." },
  { name: "Suez Canal", coordinates: [32.3, 30.5], description: "Handles ~12% of global trade. A single blockage in 2021 cost $9.6B per day.", category: "Chokepoint", details: "193 km long, connecting Mediterranean to Red Sea. Over 19,000 ships transit annually." },
  { name: "Strait of Malacca", coordinates: [101.5, 2.5], description: "Shortest sea route between Indian and Pacific Oceans. ~25% of all traded goods pass through.", category: "Chokepoint", details: "900 km long, narrows to 2.8 km at Phillips Channel. Critical for China, Japan, South Korea." },
  { name: "Panama Canal", coordinates: [-79.9, 9.1], description: "Connects Atlantic and Pacific. Handles 5% of world trade. Expanded in 2016 for mega-ships.", category: "Chokepoint", details: "82 km long. Over 14,000 vessels transit annually. Drought threatens capacity." },
  { name: "Bab el-Mandeb", coordinates: [43.3, 12.6], description: "Gateway between Red Sea and Gulf of Aden. ~6.2 million barrels of oil daily.", category: "Chokepoint", details: "Only 26 km wide. Yemen conflict and Houthi attacks have disrupted shipping." },
  { name: "Turkish Straits", coordinates: [29.0, 41.1], description: "Bosphorus and Dardanelles control Black Sea access. Critical for Russian naval power.", category: "Chokepoint", details: "Governed by Montreux Convention (1936). Turkey controls warship transit." },
  { name: "Strait of Gibraltar", coordinates: [-5.6, 35.9], description: "Only 14.3 km wide. Gateway between Atlantic and Mediterranean.", category: "Chokepoint", details: "Over 100,000 ships per year. Separates Europe from Africa." },
  { name: "Danish Straits", coordinates: [11.0, 55.5], description: "Control access to the Baltic Sea. Critical for Northern European trade.", category: "Chokepoint", details: "Three narrow passages between Denmark, Sweden, and Germany." },

  // Conflict Zones
  { name: "Kashmir", coordinates: [75.0, 34.5], description: "Disputed territory between India, Pakistan, and China since 1947.", category: "Conflict Zone", details: "Line of Control divides the region. Three wars fought over it. Nuclear-armed neighbors." },
  { name: "Eastern Ukraine", coordinates: [37.8, 48.0], description: "Active conflict zone since 2014. Full-scale invasion by Russia in 2022.", category: "Conflict Zone", details: "Donetsk and Luhansk regions. Europe's largest conflict since WWII." },
  { name: "Syria", coordinates: [38.0, 35.0], description: "Civil war since 2011 involving multiple state and non-state actors.", category: "Conflict Zone", details: "Russian, Turkish, Iranian, and US military presence. Millions displaced." },
  { name: "Yemen", coordinates: [45.0, 15.5], description: "Civil war since 2014. Saudi-led coalition vs Houthi rebels backed by Iran.", category: "Conflict Zone", details: "Worst humanitarian crisis. Houthi attacks on Red Sea shipping since 2023." },
  { name: "Sudan", coordinates: [30.0, 15.0], description: "Civil conflict between military factions since April 2023.", category: "Conflict Zone", details: "SAF vs RSF. Millions displaced. Risk of state collapse." },
  { name: "Myanmar", coordinates: [96.0, 19.8], description: "Military coup in 2021 sparked civil war. Ethnic armed organizations resist junta.", category: "Conflict Zone", details: "Rohingya crisis. Multiple resistance movements. Strategic between India and China." },
  { name: "Gaza", coordinates: [34.4, 31.4], description: "One of the most contested and densely populated territories on Earth.", category: "Conflict Zone", details: "365 km². Over 2 million people. Blockaded since 2007." },
  { name: "Sahel Region", coordinates: [2.0, 14.0], description: "Belt of instability across West Africa. Jihadist insurgencies and coups.", category: "Conflict Zone", details: "Mali, Burkina Faso, Niger. French withdrawal. Russian Wagner presence." },

  // Disputed Territories
  { name: "South China Sea", coordinates: [114.0, 12.0], description: "Disputed waters with $3.4 trillion in annual trade. Six-nation territorial claims.", category: "Disputed Territory", details: "China's Nine-Dash Line. Spratly and Paracel Islands. Artificial island building." },
  { name: "Taiwan Strait", coordinates: [119.5, 24.0], description: "Most sensitive flashpoint in global geopolitics. 90% of advanced chip manufacturing.", category: "Disputed Territory", details: "180 km wide. TSMC produces majority of world's advanced semiconductors." },
  { name: "Crimea", coordinates: [34.1, 44.9], description: "Annexed by Russia in 2014. Internationally recognized as Ukrainian territory.", category: "Disputed Territory", details: "Strategic Black Sea naval base at Sevastopol. Kerch Bridge connects to Russia." },
  { name: "Golan Heights", coordinates: [35.8, 33.0], description: "Captured by Israel from Syria in 1967. Annexed in 1981.", category: "Disputed Territory", details: "Strategic high ground. Water resources. UN buffer zone." },
  { name: "Western Sahara", coordinates: [-13.0, 24.5], description: "Africa's last colony. Disputed between Morocco and Polisario Front.", category: "Disputed Territory", details: "Rich in phosphates and fishing. Sand wall divides the territory." },
  { name: "Kuril Islands", coordinates: [147.0, 44.5], description: "Disputed between Russia and Japan since 1945. No peace treaty signed.", category: "Disputed Territory", details: "Four southernmost islands claimed by Japan. Rich fishing grounds." },
  { name: "Falkland Islands", coordinates: [-59.0, -51.8], description: "British overseas territory claimed by Argentina. 1982 war.", category: "Disputed Territory", details: "Oil exploration potential. Strategic South Atlantic position." },

  // Strategic Alliances / Bases
  { name: "Diego Garcia", coordinates: [72.4, -7.3], description: "US/UK military base in the Indian Ocean. Strategic power projection hub.", category: "Strategic Alliance", details: "Bomber base. Naval support. Key to Middle East and Asia operations." },
  { name: "Ramstein Air Base", coordinates: [7.6, 49.4], description: "Largest US Air Force base outside the US. NATO command hub.", category: "Strategic Alliance", details: "Germany. Coordinates Ukraine aid. Air operations center for Europe/Africa." },
  { name: "Djibouti", coordinates: [43.1, 11.6], description: "Only country hosting both US and Chinese military bases.", category: "Strategic Alliance", details: "Guards Bab el-Mandeb. French, Japanese, Italian bases too." },
  { name: "Okinawa", coordinates: [127.7, 26.3], description: "Major US military presence in the Pacific. 32 military installations.", category: "Strategic Alliance", details: "70% of US facilities in Japan. Controversial local opposition." },
  { name: "Guam", coordinates: [144.8, 13.4], description: "US territory. Major Pacific military hub. 'Tip of the spear.'", category: "Strategic Alliance", details: "Anderson Air Force Base. Naval Base Guam. Missile defense installations." },

  // Economic Zones
  { name: "Shenzhen", coordinates: [114.1, 22.5], description: "China's tech manufacturing capital. $400B+ GDP.", category: "Economic Zone", details: "Home to Huawei, Tencent, BYD, DJI. Special Economic Zone since 1980." },
  { name: "Singapore", coordinates: [103.8, 1.3], description: "Global shipping and financial hub. World's busiest transshipment port.", category: "Economic Zone", details: "GDP per capita ~$65,000. Free trade agreements with 27 partners." },
  { name: "Dubai", coordinates: [55.3, 25.2], description: "Middle East's financial and logistics center. Jebel Ali: world's largest man-made port.", category: "Economic Zone", details: "Free zones attract global business. Hub connecting Europe, Asia, Africa." },
  { name: "Rotterdam", coordinates: [4.5, 51.9], description: "Europe's largest port. Gateway to the EU market of 450 million.", category: "Economic Zone", details: "Handles 470 million tonnes annually. Major energy hub." },
  { name: "Arctic Shipping Routes", coordinates: [0, 78], description: "Emerging trade routes as ice melts. Could cut Asia-Europe transit by 40%.", category: "Economic Zone", details: "Northern Sea Route along Russia. Northwest Passage through Canada." },

  // Nuclear States
  { name: "Washington D.C.", coordinates: [-77.0, 38.9], description: "US: ~5,500 nuclear warheads. World's largest military budget ($886B).", category: "Nuclear State", details: "NATO leader. Nuclear triad: ICBMs, SLBMs, strategic bombers." },
  { name: "Moscow", coordinates: [37.6, 55.8], description: "Russia: ~6,200 warheads. Largest nuclear arsenal globally.", category: "Nuclear State", details: "Modernizing delivery systems. Sarmat ICBM. Poseidon torpedo." },
  { name: "Beijing", coordinates: [116.4, 39.9], description: "China: ~500 warheads, rapidly expanding. Projected 1,500 by 2035.", category: "Nuclear State", details: "Building hundreds of new ICBM silos. Nuclear triad development." },
  { name: "Islamabad", coordinates: [73.0, 33.7], description: "Pakistan: ~170 warheads. Fastest growing nuclear arsenal.", category: "Nuclear State", details: "Tactical nuclear weapons development. India-focused deterrence." },
  { name: "New Delhi", coordinates: [77.2, 28.6], description: "India: ~164 warheads. No-first-use policy. Nuclear triad.", category: "Nuclear State", details: "Agni-V ICBM range 5,000+ km. Nuclear submarine fleet." },
  { name: "Pyongyang", coordinates: [125.7, 39.0], description: "North Korea: ~50 warheads estimated. ICBM capable.", category: "Nuclear State", details: "Hwasong-17 ICBM. Claimed hydrogen bomb. Sanctions-resistant program." },
  { name: "Tel Aviv", coordinates: [34.8, 32.1], description: "Israel: Undeclared nuclear power. Estimated 90 warheads.", category: "Nuclear State", details: "Policy of deliberate ambiguity. Dimona reactor. Jericho missiles." },

  // Emerging Powers
  { name: "Lagos", coordinates: [3.4, 6.5], description: "Nigeria: Africa's largest economy. Population to surpass 400M by 2050.", category: "Emerging Power", details: "Oil producer. Tech startup hub. ECOWAS leader." },
  { name: "Jakarta", coordinates: [106.8, -6.2], description: "Indonesia: World's 4th most populous. Growing maritime power.", category: "Emerging Power", details: "ASEAN leader. Nickel superpower for EV batteries. Moving capital to Nusantara." },
  { name: "Riyadh", coordinates: [46.7, 24.7], description: "Saudi Arabia: Vision 2030 transformation. OPEC+ leader.", category: "Emerging Power", details: "NEOM megaproject. Sports diplomacy. Balancing US and China relations." },
  { name: "Brasília", coordinates: [-47.9, -15.8], description: "Brazil: BRICS member. Amazon steward. Agricultural superpower.", category: "Emerging Power", details: "World's largest tropical forest. Major soy, beef, iron ore exporter." },
  { name: "Ankara", coordinates: [32.9, 39.9], description: "Turkey: NATO member straddling Europe and Asia. Regional power broker.", category: "Emerging Power", details: "Bayraktar drones changed modern warfare. Controls Turkish Straits." },
];

export const COUNTRY_DESCRIPTIONS: Record<string, string> = {
  "United States of America": "World's largest economy ($25.5T GDP). NATO leader. Global military presence across 750+ bases in 80 countries.",
  "China": "World's 2nd largest economy. Belt and Road Initiative spans 150+ countries. Fastest military modernization.",
  "Russia": "Largest country by area (17.1M km²). Energy superpower. Permanent UN Security Council member.",
  "India": "World's most populous country (1.4B+). Fastest-growing major economy. Space program reaching Mars.",
  "Brazil": "Largest country in South America. Amazon rainforest covers 60% of territory. Agricultural superpower.",
  "Canada": "2nd largest country. NATO member. Major oil sands reserves. Arctic sovereignty claims.",
  "Australia": "Continent-nation. AUKUS alliance. Major minerals exporter. Indo-Pacific strategic partner.",
  "Germany": "Europe's largest economy. EU's industrial engine. NATO's European pillar.",
  "France": "Nuclear power. UN Security Council member. Largest exclusive economic zone globally.",
  "United Kingdom": "Financial capital (London). Nuclear submarine fleet. Five Eyes intelligence alliance.",
  "Japan": "3rd largest economy. US alliance cornerstone in Asia. Technological powerhouse.",
  "South Korea": "Semiconductor giant (Samsung, SK Hynix). K-culture global influence. North Korea deterrence.",
  "Indonesia": "World's largest archipelago (17,000+ islands). ASEAN's biggest economy. Nickel superpower.",
  "Turkey": "NATO member controlling Bosphorus. Regional power in Middle East. Drone warfare pioneer.",
  "Saudi Arabia": "World's largest oil exporter. OPEC leader. Vision 2030 economic transformation.",
  "Iran": "Shia power center. Nuclear program controversy. Controls Strait of Hormuz's northern shore.",
  "Egypt": "Controls Suez Canal. Most populous Arab nation. Bridge between Africa and Middle East.",
  "Nigeria": "Africa's most populous nation (220M+). Largest African economy. Oil-dependent.",
  "South Africa": "BRICS member. Most industrialized African nation. Mineral wealth.",
  "Mexico": "US's largest trading partner. Manufacturing nearshoring boom. Drug cartel challenges.",
  "Argentina": "Falklands claim. Lithium triangle member. G20 economy.",
  "Colombia": "Post-conflict rebuilding. Biodiversity hotspot. US ally in South America.",
  "Pakistan": "Nuclear state. 5th most populous. Strategic location between China, India, Afghanistan.",
  "Afghanistan": "Taliban governance since 2021. Rare earth minerals. Geopolitical buffer state.",
  "Iraq": "Oil-rich. Post-invasion reconstruction. Iran-US influence competition.",
  "Israel": "Regional military power. Tech startup nation. Undeclared nuclear capability.",
  "Ukraine": "Active warzone since 2022. Breadbasket of Europe. NATO aspirant.",
  "Poland": "NATO's eastern flank. Fastest-growing EU economy. Major Ukraine support hub.",
  "Norway": "NATO member. Europe's energy security (oil, gas). Sovereign wealth fund ($1.4T).",
  "Sweden": "New NATO member (2024). Defense industry (Saab, Bofors). Innovation economy.",
  "Finland": "New NATO member (2023). 1,340 km border with Russia. Defense readiness model.",
  "Taiwan": "Produces 90% of advanced semiconductors. Democracy with 23 million people.",
  "Philippines": "South China Sea claimant. US mutual defense treaty. 7,641 islands.",
  "Vietnam": "Rapidly industrializing. South China Sea disputes. Manufacturing alternative to China.",
  "Thailand": "US treaty ally. ASEAN founding member. Tourism economy.",
  "Myanmar": "Civil war since 2021 coup. Rohingya crisis. China-India strategic buffer.",
  "Ethiopia": "Africa's 2nd most populous. Grand Ethiopian Renaissance Dam dispute. Regional power.",
  "Kenya": "East Africa's economic hub. Tech innovation (M-Pesa). Strategic port of Mombasa.",
  "Democratic Republic of the Congo": "Cobalt superpower (70% of global supply). Critical for EV batteries. Ongoing conflict.",
  "Morocco": "Western Sahara controller. Phosphate reserves. EU's southern neighbor.",
  "Algeria": "Africa's largest country. Gas supplier to Europe. Military power.",
  "Libya": "Divided governance. Oil reserves. Mediterranean migration route.",
  "Venezuela": "Largest proven oil reserves globally. Economic crisis. Territorial dispute with Guyana.",
  "Cuba": "US embargo since 1960. Russian and Chinese influence. Caribbean strategic position.",
  "North Korea": "Nuclear-armed hermit kingdom. Kim dynasty. Missile threat to region.",
  "Mongolia": "Buffer state between Russia and China. Mineral wealth. Democracy in Central Asia.",
  "Kazakhstan": "Central Asia's largest economy. Uranium producer. Russia-China influence zone.",
  "Uzbekistan": "Central Asia's most populous. Water disputes. Emerging economy.",
  "Greenland": "Danish territory. US strategic interest. Rare earth minerals. Climate sentinel.",
  "Iceland": "NATO member. Strategically vital for Atlantic sea lanes. Geothermal energy leader.",
};
