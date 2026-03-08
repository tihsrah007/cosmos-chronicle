// Shared API response types

export interface ApiDomain {
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  facts: string[];
  mapConfig: {
    markerColor: string;
    hoverFill: string;
    baseFill: string;
    strokeColor: string;
    accentGradient: string;
    backLabel: string;
  };
  timeline?: {
    minYear: number;
    maxYear: number;
    defaultYear: number;
    eras: ApiTimelineEra[];
    accentColor: string;
  };
}

export interface ApiTimelineEra {
  label: string;
  start: number;
  end: number;
}

export interface ApiMapItem {
  name: string;
  coordinates: [number, number];
  description: string;
  category: string;
  details?: string;
  year?: number;
  yearLabel?: string;
  startYear?: number;
  endYear?: number;
  yearMya?: number;
  facts?: string[];
  keyFigures?: { label: string; value: string }[];
  relatedItems?: string[];
  sources?: { label: string; url?: string }[];
}

export interface ApiCountryInfo {
  name: string;
  description: string;
}

export interface ApiTimelineEvent {
  name: string;
  coordinates: [number, number];
  description: string;
  category: string;
  startYear?: number;
  endYear?: number;
  yearMya?: number;
}

export interface ApiContinentalPosition {
  period: string;
  yearMya: number;
  description: string;
  continents: {
    name: string;
    coordinates: [number, number];
    label: string;
  }[];
}

export interface ApiSearchResult {
  domain: string;
  name: string;
  description: string;
  category: string;
  coordinates?: [number, number];
}

// Wrapped backend response types
export interface DomainsResponse {
  domains: ApiDomain[];
}

export interface DomainResponse {
  domain: ApiDomain;
}

export interface DomainItemsResponse {
  items: ApiMapItem[];
  total: number;
}

export interface DomainTimelineResponse {
  eras: ApiTimelineEra[];
  events: ApiTimelineEvent[];
  total: number;
}

export interface CountriesResponse {
  countries: ApiCountryInfo[];
  total: number;
}

export interface SearchResponse {
  results: ApiSearchResult[];
  total: number;
}
