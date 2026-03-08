export interface GeopoliticsTimeEvent {
  name: string;
  coordinates: [number, number];
  description: string;
  startYear: number;
  endYear: number;
  category: string;
}

export const GEOPOLITICS_ERAS = [
  { label: "Ancient (5000–500 BC)", start: -5000, end: -500 },
  { label: "Classical (500 BC–500 AD)", start: -500, end: 500 },
  { label: "Medieval (500–1500)", start: 500, end: 1500 },
  { label: "Colonial (1500–1800)", start: 1500, end: 1800 },
  { label: "Imperial (1800–1945)", start: 1800, end: 1945 },
  { label: "Modern (1945–Today)", start: 1945, end: 2025 },
] as const;

export const GEOPOLITICS_TIME_EVENTS: GeopoliticsTimeEvent[] = [
  // Ancient empires
  { name: "Egyptian Civilization", coordinates: [31.2, 30.0], startYear: -3100, endYear: -30, description: "One of the longest-lasting civilizations. Pharaohs, pyramids, and the Nile.", category: "Empire" },
  { name: "Sumerian City-States", coordinates: [45.0, 31.5], startYear: -4500, endYear: -2000, description: "First civilization. Invented writing, the wheel, and mathematics.", category: "Empire" },
  { name: "Akkadian Empire", coordinates: [44.0, 33.0], startYear: -2334, endYear: -2154, description: "Sargon of Akkad: first empire in history. United Mesopotamia.", category: "Empire" },
  { name: "Babylonian Empire", coordinates: [44.4, 32.5], startYear: -1894, endYear: -539, description: "Hammurabi's Code. Hanging Gardens. Nebuchadnezzar II.", category: "Empire" },
  { name: "Hittite Empire", coordinates: [34.0, 40.0], startYear: -1600, endYear: -1178, description: "Anatolian iron-age superpower. Rivaled Egypt.", category: "Empire" },
  { name: "Zhou Dynasty", coordinates: [112.0, 34.5], startYear: -1046, endYear: -256, description: "Longest Chinese dynasty. Mandate of Heaven concept.", category: "Empire" },
  { name: "Assyrian Empire", coordinates: [43.0, 36.0], startYear: -2500, endYear: -609, description: "Brutal military empire. Library of Ashurbanipal.", category: "Empire" },

  // Classical
  { name: "Achaemenid Persian Empire", coordinates: [52.7, 32.7], startYear: -550, endYear: -330, description: "From Egypt to India. Cyrus the Great. Royal Road.", category: "Empire" },
  { name: "Athenian Democracy", coordinates: [23.7, 38.0], startYear: -508, endYear: -338, description: "Birthplace of democracy. Golden Age of Pericles.", category: "Political System" },
  { name: "Roman Republic & Empire", coordinates: [12.5, 41.9], startYear: -509, endYear: 476, description: "From city-state to greatest empire. Law, roads, architecture.", category: "Empire" },
  { name: "Maurya Empire", coordinates: [77.0, 25.0], startYear: -322, endYear: -185, description: "Unified India. Ashoka spread Buddhism.", category: "Empire" },
  { name: "Han Dynasty", coordinates: [112.0, 34.0], startYear: -206, endYear: 220, description: "Silk Road. Paper invention. Chinese golden age.", category: "Empire" },
  { name: "Gupta Empire", coordinates: [83.0, 26.0], startYear: 320, endYear: 550, description: "India's Golden Age. Mathematics (zero), astronomy, art.", category: "Empire" },
  { name: "Sasanian Empire", coordinates: [52.0, 33.0], startYear: 224, endYear: 651, description: "Last great Persian empire before Islam. Rival of Rome.", category: "Empire" },

  // Medieval
  { name: "Byzantine Empire", coordinates: [29.0, 41.0], startYear: 330, endYear: 1453, description: "Eastern Roman Empire. Constantinople. Preserved Greek knowledge.", category: "Empire" },
  { name: "Umayyad Caliphate", coordinates: [36.3, 33.5], startYear: 661, endYear: 750, description: "Largest Islamic empire. Spain to Central Asia.", category: "Empire" },
  { name: "Abbasid Caliphate", coordinates: [44.4, 33.3], startYear: 750, endYear: 1258, description: "Islamic Golden Age. Baghdad: world's greatest city.", category: "Empire" },
  { name: "Carolingian Empire", coordinates: [6.0, 49.0], startYear: 768, endYear: 888, description: "Charlemagne unifies Western Europe. Holy Roman Empire precursor.", category: "Empire" },
  { name: "Tang Dynasty", coordinates: [109.0, 34.0], startYear: 618, endYear: 907, description: "China's cosmopolitan golden age. Poetry, art, Silk Road.", category: "Empire" },
  { name: "Song Dynasty", coordinates: [120.0, 30.0], startYear: 960, endYear: 1279, description: "Technological peak: gunpowder, compass, printing, paper money.", category: "Empire" },
  { name: "Mongol Empire", coordinates: [105.0, 47.0], startYear: 1206, endYear: 1368, description: "Largest contiguous land empire. Genghis Khan to Kublai Khan.", category: "Empire" },
  { name: "Mali Empire", coordinates: [-8.0, 12.6], startYear: 1235, endYear: 1600, description: "West African gold empire. Mansa Musa: richest ever.", category: "Empire" },
  { name: "Ottoman Empire", coordinates: [29.0, 41.0], startYear: 1299, endYear: 1922, description: "624 years. Three continents. Constantinople to Mecca.", category: "Empire" },
  { name: "Aztec Empire", coordinates: [-99.1, 19.4], startYear: 1325, endYear: 1521, description: "Mesoamerican empire. Tenochtitlan: population 200,000.", category: "Empire" },
  { name: "Inca Empire", coordinates: [-72.0, -13.5], startYear: 1438, endYear: 1533, description: "Largest pre-Columbian empire. 4,000 km of Andes.", category: "Empire" },

  // Colonial & Imperial
  { name: "Spanish Empire", coordinates: [-3.7, 40.4], startYear: 1492, endYear: 1898, description: "First global empire. Americas, Philippines, Netherlands.", category: "Empire" },
  { name: "Portuguese Empire", coordinates: [-9.1, 38.7], startYear: 1415, endYear: 1999, description: "First and longest European colonial empire. Brazil, Africa, Asia.", category: "Empire" },
  { name: "British Empire", coordinates: [-0.1, 51.5], startYear: 1583, endYear: 1997, description: "Largest empire in history. 'Sun never sets.' 35.5M km².", category: "Empire" },
  { name: "Mughal Empire", coordinates: [77.2, 28.6], startYear: 1526, endYear: 1857, description: "Indo-Islamic empire. Taj Mahal. 150M population.", category: "Empire" },
  { name: "Qing Dynasty", coordinates: [116.4, 39.9], startYear: 1644, endYear: 1912, description: "Last Chinese dynasty. Largest territory. Opium Wars.", category: "Empire" },
  { name: "Russian Empire", coordinates: [37.6, 55.8], startYear: 1721, endYear: 1917, description: "Largest contiguous empire. Peter the Great to Nicholas II.", category: "Empire" },
  { name: "French Colonial Empire", coordinates: [2.3, 48.9], startYear: 1534, endYear: 1980, description: "2nd largest colonial empire. Africa, Southeast Asia, Caribbean.", category: "Empire" },
  { name: "German Empire", coordinates: [13.4, 52.5], startYear: 1871, endYear: 1918, description: "Bismarck's unification. Industrial powerhouse. WWI.", category: "Empire" },
  { name: "Austro-Hungarian Empire", coordinates: [16.4, 48.2], startYear: 1867, endYear: 1918, description: "Dual monarchy. Multi-ethnic empire. Dissolved after WWI.", category: "Empire" },

  // Modern era
  { name: "Soviet Union", coordinates: [37.6, 55.8], startYear: 1922, endYear: 1991, description: "Communist superpower. Space race. Cold War.", category: "Political System" },
  { name: "Nazi Germany", coordinates: [13.4, 52.5], startYear: 1933, endYear: 1945, description: "Third Reich. WWII aggressor. Holocaust.", category: "Political System" },
  { name: "NATO Alliance", coordinates: [-77.0, 38.9], startYear: 1949, endYear: 2025, description: "Western military alliance. 32 member nations.", category: "Alliance" },
  { name: "European Union", coordinates: [4.4, 50.8], startYear: 1993, endYear: 2025, description: "27-nation economic and political union. Single market.", category: "Alliance" },
  { name: "People's Republic of China", coordinates: [116.4, 39.9], startYear: 1949, endYear: 2025, description: "World's 2nd largest economy. 1.4 billion people.", category: "Political System" },
  { name: "BRICS", coordinates: [116.4, 39.9], startYear: 2009, endYear: 2025, description: "Emerging powers bloc. 45% of world population.", category: "Alliance" },
  { name: "United Nations", coordinates: [-74.0, 40.7], startYear: 1945, endYear: 2025, description: "193 member states. International peacekeeping and cooperation.", category: "Alliance" },
];
