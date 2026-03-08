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
  "United States of America": "🇺🇸 GDP: $25.5T | Pop: 335M | Languages: English | Memberships: G7, G20, NATO, OECD, Five Eyes, UN Security Council (P5) | World's largest economy and military spender ($886B). 750+ overseas military bases in 80 countries. Dollar is global reserve currency.",
  "China": "🇨🇳 GDP: $17.9T | Pop: 1.41B | Languages: Mandarin, Cantonese, regional | Memberships: G20, BRICS, SCO, UN Security Council (P5) | World's 2nd largest economy. Belt and Road Initiative spans 150+ countries. Fastest military modernization. Manufacturing superpower.",
  "Russia": "🇷🇺 GDP: $1.86T | Pop: 144M | Languages: Russian | Memberships: G20, BRICS, SCO, CSTO, UN Security Council (P5) | Largest country by area (17.1M km²). Largest nuclear arsenal (~6,200 warheads). Energy superpower (oil, gas). Arctic claims.",
  "India": "🇮🇳 GDP: $3.74T | Pop: 1.44B | Languages: Hindi, English, 21 scheduled languages | Memberships: G20, BRICS, SCO, Quad | World's most populous country. Fastest-growing major economy (+7% GDP growth). Space program reaching Mars and Moon.",
  "Brazil": "🇧🇷 GDP: $2.13T | Pop: 216M | Languages: Portuguese | Memberships: G20, BRICS, Mercosur | Largest country in South America. Amazon rainforest (60% territory). Agricultural superpower: #1 in soy, coffee, sugar, beef exports.",
  "Canada": "🇨🇦 GDP: $2.14T | Pop: 40M | Languages: English, French | Memberships: G7, G20, NATO, OECD, Five Eyes, USMCA | 2nd largest country. Major oil sands (3rd largest reserves). Arctic sovereignty claims. NORAD partnership with US.",
  "Australia": "🇦🇺 GDP: $1.69T | Pop: 26M | Languages: English | Memberships: G20, AUKUS, Quad, Five Eyes, OECD | Continent-nation. Major minerals exporter (iron, lithium, rare earths). Indo-Pacific strategic partner. No recession for 30 years (pre-COVID).",
  "Germany": "🇩🇪 GDP: $4.26T | Pop: 84M | Languages: German | Memberships: G7, G20, EU, NATO, OECD | Europe's largest economy. EU's industrial engine. Major auto manufacturer. Rapid military rearmament post-2022. Energy transition (Energiewende).",
  "France": "🇫🇷 GDP: $2.78T | Pop: 68M | Languages: French | Memberships: G7, G20, EU, NATO, OECD, UN Security Council (P5) | Nuclear power (56 reactors). Largest exclusive economic zone globally. Overseas territories span all oceans.",
  "United Kingdom": "🇬🇧 GDP: $3.07T | Pop: 68M | Languages: English | Memberships: G7, G20, NATO, OECD, Five Eyes, UN Security Council (P5) | Financial capital (London). Nuclear submarine fleet (Trident). Post-Brexit independent trade policy.",
  "Japan": "🇯🇵 GDP: $4.23T | Pop: 125M | Languages: Japanese | Memberships: G7, G20, Quad, OECD | 3rd largest economy. US alliance cornerstone in Asia. Technological powerhouse. Remilitarizing amid China threat. Aging population crisis.",
  "South Korea": "🇰🇷 GDP: $1.67T | Pop: 52M | Languages: Korean | Memberships: G20, OECD | Semiconductor giant (Samsung, SK Hynix: 60% of memory chips). K-culture global influence. Conscript military. North Korea deterrence.",
  "Indonesia": "🇮🇩 GDP: $1.32T | Pop: 277M | Languages: Bahasa Indonesia, 700+ regional | Memberships: G20, ASEAN | World's largest archipelago (17,000+ islands). ASEAN's biggest economy. Nickel superpower (EV batteries). Moving capital to Nusantara.",
  "Turkey": "🇹🇷 GDP: $906B | Pop: 85M | Languages: Turkish, Kurdish | Memberships: G20, NATO | Controls Bosphorus Strait. Regional power broker in Middle East. Drone warfare pioneer (Bayraktar). EU candidate state. Straddles two continents.",
  "Saudi Arabia": "🇸🇦 GDP: $1.07T | Pop: 36M | Languages: Arabic | Memberships: G20, OPEC+, BRICS (2024) | World's largest oil exporter. Vision 2030 economic transformation. NEOM megacity project. Key Middle East power broker.",
  "Iran": "🇮🇷 GDP: $368B | Pop: 88M | Languages: Persian (Farsi), Azerbaijani, Kurdish | Memberships: BRICS (2024), SCO, OPEC | Shia power center. Nuclear program controversy. Controls Strait of Hormuz's northern shore. Proxy network across Middle East.",
  "Egypt": "🇪🇬 GDP: $387B | Pop: 110M | Languages: Arabic | Memberships: G20 (invited), African Union | Controls Suez Canal ($9.4B annual revenue). Most populous Arab nation. Bridge between Africa and Middle East. Ancient civilization.",
  "Nigeria": "🇳🇬 GDP: $477B | Pop: 224M | Languages: English, Hausa, Yoruba, Igbo, 500+ | Memberships: OPEC, ECOWAS, African Union | Africa's most populous nation. Largest African economy. Oil-dependent but diversifying. Tech hub (Lagos).",
  "South Africa": "🇿🇦 GDP: $399B | Pop: 60M | Languages: 11 official (Zulu, Xhosa, Afrikaans, English, etc.) | Memberships: G20, BRICS, African Union | Most industrialized African nation. Mineral wealth (gold, platinum, diamonds). Constitutional democracy since 1994.",
  "Mexico": "🇲🇽 GDP: $1.32T | Pop: 129M | Languages: Spanish, 68 indigenous languages | Memberships: G20, USMCA, OECD, Pacific Alliance | US's largest trading partner. Manufacturing nearshoring boom. Drug cartel challenges. Rich cultural heritage.",
  "Argentina": "🇦🇷 GDP: $631B | Pop: 46M | Languages: Spanish | Memberships: G20, Mercosur | Falklands claim. Lithium triangle member (world's 4th reserves). Vast agricultural pampas. Economic volatility and reform.",
  "Colombia": "🇨🇴 GDP: $344B | Pop: 52M | Languages: Spanish | Memberships: OECD, Pacific Alliance | Post-conflict rebuilding after FARC peace deal. Biodiversity hotspot (#2 globally). US ally in South America. Emerald producer.",
  "Pakistan": "🇵🇰 GDP: $350B | Pop: 230M | Languages: Urdu, English, Punjabi, Pashto, Sindhi | Memberships: SCO | Nuclear state (~170 warheads). 5th most populous. Strategic location between China, India, Afghanistan. CPEC corridor.",
  "Afghanistan": "🇦🇫 GDP: $14B | Pop: 41M | Languages: Pashto, Dari | Taliban governance since 2021. Rare earth minerals ($1-3T estimated). Geopolitical buffer state. Opium production hub.",
  "Iraq": "🇮🇶 GDP: $264B | Pop: 44M | Languages: Arabic, Kurdish | Memberships: OPEC | Oil-rich (5th largest reserves). Post-invasion reconstruction. Iran-US influence competition. Kurdistan autonomous region.",
  "Israel": "🇮🇱 GDP: $525B | Pop: 9.8M | Languages: Hebrew, Arabic | Regional military power. Tech startup nation (#2 globally). Undeclared nuclear capability (~90 warheads). Iron Dome defense system.",
  "Ukraine": "🇺🇦 GDP: $160B (pre-war) | Pop: 37M | Languages: Ukrainian | Active warzone since 2022. Breadbasket of Europe (top grain exporter). NATO aspirant. Largest European country by area.",
  "Poland": "🇵🇱 GDP: $688B | Pop: 38M | Languages: Polish | Memberships: EU, NATO, OECD | NATO's eastern flank. Fastest-growing EU economy. Major Ukraine support hub. Military spending 4% GDP.",
  "Norway": "🇳🇴 GDP: $579B | Pop: 5.5M | Languages: Norwegian | Memberships: NATO, OECD | Europe's energy security (oil, gas). Sovereign wealth fund ($1.6T — world's largest). Highest HDI. Arctic claims.",
  "Sweden": "🇸🇪 GDP: $585B | Pop: 10.5M | Languages: Swedish | Memberships: EU, NATO (2024), OECD | New NATO member. Defense industry (Saab Gripen, Bofors). Innovation economy. Arms exporter.",
  "Finland": "🇫🇮 GDP: $282B | Pop: 5.5M | Languages: Finnish, Swedish | Memberships: EU, NATO (2023), OECD | New NATO member. 1,340 km border with Russia. Defense readiness model (900K reservists). Nokia. Education model.",
  "Taiwan": "🇹🇼 GDP: $790B | Pop: 23M | Languages: Mandarin, Taiwanese, Hakka | Produces 90% of advanced semiconductors (TSMC). Democracy. Not UN member. US arms sales. Tech powerhouse.",
  "Philippines": "🇵🇭 GDP: $404B | Pop: 115M | Languages: Filipino, English | Memberships: ASEAN | South China Sea claimant. US mutual defense treaty. 7,641 islands. BPO industry hub. Remittance economy.",
  "Vietnam": "🇻🇳 GDP: $409B | Pop: 100M | Languages: Vietnamese | Memberships: ASEAN | Rapidly industrializing (+6% growth). South China Sea disputes. Manufacturing alternative to China. Samsung's largest factory.",
  "Thailand": "🇹🇭 GDP: $495B | Pop: 72M | Languages: Thai | Memberships: ASEAN | US treaty ally. Tourism powerhouse. Constitutional monarchy. Auto manufacturing hub ('Detroit of Asia').",
  "Myanmar": "🇲🇲 GDP: $59B | Pop: 55M | Languages: Burmese | Memberships: ASEAN | Civil war since 2021 coup. Rohingya crisis. China-India strategic buffer. Jade and gem mining. Resistance forces advancing.",
  "Ethiopia": "🇪🇹 GDP: $156B | Pop: 126M | Languages: Amharic, Oromo, Tigrinya, 80+ | Memberships: BRICS (2024), African Union (HQ) | Africa's 2nd most populous. Grand Ethiopian Renaissance Dam dispute with Egypt. Ancient civilization. Coffee origin.",
  "Kenya": "🇰🇪 GDP: $113B | Pop: 55M | Languages: Swahili, English | Memberships: African Union | East Africa's economic hub. Tech innovation (M-Pesa mobile money). Strategic port of Mombasa. Safari tourism.",
  "Democratic Republic of the Congo": "🇨🇩 GDP: $64B | Pop: 102M | Languages: French, Lingala, Swahili, Kikongo | Memberships: African Union | Cobalt superpower (70% global supply). Critical for EV batteries. Ongoing armed conflict in east. Vast mineral wealth.",
  "Morocco": "🇲🇦 GDP: $134B | Pop: 37M | Languages: Arabic, Berber, French | Memberships: African Union | Western Sahara controller. Phosphate reserves (#1 globally). EU's southern partner. Automotive manufacturing hub.",
  "Algeria": "🇩🇿 GDP: $187B | Pop: 45M | Languages: Arabic, Berber, French | Memberships: OPEC, African Union | Africa's largest country. Gas supplier to Europe. Military power. Sahara covers 80% of territory.",
  "Libya": "🇱🇾 GDP: $42B | Pop: 7M | Languages: Arabic | Memberships: OPEC, African Union | Divided governance (east/west). Africa's largest oil reserves. Mediterranean migration route. Post-Gaddafi instability.",
  "Venezuela": "🇻🇪 GDP: $92B | Pop: 29M | Languages: Spanish | Memberships: OPEC | Largest proven oil reserves globally (304B barrels). Economic crisis. 7M+ emigrated. Territorial dispute with Guyana over Essequibo.",
  "Cuba": "🇨🇺 GDP: $107B | Pop: 11M | Languages: Spanish | US embargo since 1960. Russian and Chinese influence. Caribbean strategic position. Healthcare diplomacy. Tourism economy.",
  "North Korea": "🇰🇵 GDP: $18B (est.) | Pop: 26M | Languages: Korean | Nuclear-armed (~50 warheads). Kim dynasty (3rd generation). ICBM capable (Hwasong-17). Most sanctioned nation. Cyber warfare capabilities.",
  "Mongolia": "🇲🇳 GDP: $17B | Pop: 3.4M | Languages: Mongolian | Memberships: None major (landlocked democracy) | Buffer state between Russia and China. Mineral wealth (copper, coal, gold). Fastest-growing economy in region.",
  "Kazakhstan": "🇰🇿 GDP: $220B | Pop: 20M | Languages: Kazakh, Russian | Memberships: SCO, CSTO | Central Asia's largest economy. World's #1 uranium producer. Oil reserves. Baikonur Cosmodrome (Russian space launches).",
  "Uzbekistan": "🇺🇿 GDP: $80B | Pop: 36M | Languages: Uzbek, Russian | Memberships: SCO | Central Asia's most populous. Water disputes (Aral Sea disaster). Emerging economy. Cotton and gold producer.",
  "Greenland": "🇬🇱 GDP: $3B | Pop: 57K | Languages: Greenlandic, Danish | Danish territory with self-rule. US strategic interest (Thule Air Base). Rare earth minerals beneath ice. Climate sentinel (ice sheet melting).",
  "Iceland": "🇮🇸 GDP: $27B | Pop: 380K | Languages: Icelandic | Memberships: NATO, OECD | Strategically vital for Atlantic sea lanes (GIUK gap). 100% renewable energy. Geothermal pioneer. World's oldest parliament.",
  "Italy": "🇮🇹 GDP: $2.01T | Pop: 59M | Languages: Italian | Memberships: G7, G20, EU, NATO, OECD | 3rd largest EU economy. Mediterranean naval power. Fashion and automotive (Ferrari, Fiat). Vatican City.",
  "Spain": "🇪🇸 GDP: $1.40T | Pop: 48M | Languages: Spanish, Catalan, Basque, Galician | Memberships: G20, EU, NATO, OECD | 4th largest EU economy. Tourism superpower. Renewable energy leader. Ceuta and Melilla in Africa.",
  "Netherlands": "🇳🇱 GDP: $1.01T | Pop: 18M | Languages: Dutch | Memberships: G20 (invited), EU, NATO, OECD | Port of Rotterdam (Europe's largest). ASML monopoly on EUV lithography. Agricultural exporter #2 globally. ICJ based in The Hague.",
  "Switzerland": "🇨🇭 GDP: $818B | Pop: 8.8M | Languages: German, French, Italian, Romansh | Memberships: OECD | Neutral state. Global banking center. UN European HQ (Geneva). CERN. Red Cross HQ. Highest GDP per capita in Europe.",
  "Belgium": "🇧🇪 GDP: $579B | Pop: 11.5M | Languages: Dutch, French, German | Memberships: EU, NATO, OECD | EU and NATO headquarters (Brussels). Diamond trade (Antwerp). Chocolate and pharmaceuticals.",
  "Portugal": "🇵🇹 GDP: $267B | Pop: 10.3M | Languages: Portuguese | Memberships: EU, NATO, OECD | Strategic Atlantic position. Azores (US military base). Green energy transition. Tech hub growth.",
  "Greece": "🇬🇷 GDP: $219B | Pop: 10.4M | Languages: Greek | Memberships: EU, NATO, OECD | Eastern Mediterranean strategic position. Aegean Sea disputes with Turkey. Shipping industry (#1 globally). Ancient democracy.",
  "Romania": "🇷🇴 GDP: $301B | Pop: 19M | Languages: Romanian | Memberships: EU, NATO | Black Sea strategic position. US missile defense base (Deveselu). Growing economy. IT sector boom.",
  "Czech Republic": "🇨🇿 GDP: $291B | Pop: 10.8M | Languages: Czech | Memberships: EU, NATO, OECD | Central European manufacturing hub. Arms industry. Skoda Auto. Nuclear energy expansion.",
  "Hungary": "🇭🇺 GDP: $188B | Pop: 10M | Languages: Hungarian | Memberships: EU, NATO | Controversial EU member (rule of law disputes). Close Russia ties. Automotive sector. Blocking Ukraine aid.",
  "Austria": "🇦🇹 GDP: $471B | Pop: 9.1M | Languages: German | Memberships: EU, OECD | Neutral state (not NATO). Alpine tourism. OPEC HQ (Vienna). Banking hub for Central/Eastern Europe.",
  "Denmark": "🇩🇰 GDP: $395B | Pop: 5.9M | Languages: Danish | Memberships: EU, NATO, OECD | Controls Greenland (strategic). Danish Straits access. Wind energy pioneer (Vestas, Ørsted). Pharmaceutical giant (Novo Nordisk).",
};
