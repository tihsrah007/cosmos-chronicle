// Shared API response types

export interface ApiDomain {
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: string; // lucide icon name
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
    eras: TimelineEra[];
    accentColor: string;
  };
}

export interface TimelineEra {
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
  // History-specific
  year?: number;
  yearLabel?: string;
  // Geology timeline-specific
  startYear?: number;
  endYear?: number;
  yearMya?: number;
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

export interface ApiDomainTimeline {
  eras: TimelineEra[];
  events: ApiTimelineEvent[];
  continentalPositions?: ApiContinentalPosition[];
}
