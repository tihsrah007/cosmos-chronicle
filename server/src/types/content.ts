export type DomainSlug = "geology" | "geopolitics" | "history" | "cosmology";

export interface Coordinates {
  lng: number;
  lat: number;
}

export interface TimelineEra {
  label: string;
  start: number;
  end: number;
}

export interface TimelineEvent {
  id: string;
  name: string;
  category: string;
  description: string;
  coordinates: Coordinates;
  startYear: number;
  endYear: number;
}

export interface KeyFigure {
  label: string;
  value: string;
}

export interface SourceReference {
  label: string;
  url?: string;
}

export interface ContentItem {
  id: string;
  name: string;
  category: string;
  description: string;
  details?: string;
  coordinates: Coordinates;
  startYear?: number;
  endYear?: number;
  yearLabel?: string;
  tags: string[];
  facts?: string[];
  keyFigures?: KeyFigure[];
  relatedItems?: string[];
  sources?: SourceReference[];
}

export interface CountryProfile {
  id: string;
  name: string;
  description: string;
}

export interface DomainSummary {
  slug: DomainSlug;
  title: string;
  subtitle: string;
  itemLabel: string;
  color: string;
  categories: string[];
  itemCount: number;
  timelineEraCount: number;
}

export interface DomainContent extends DomainSummary {
  items: ContentItem[];
  timelineEras: TimelineEra[];
  timelineEvents: TimelineEvent[];
  countryProfiles: CountryProfile[];
}

export interface ContentFilters {
  search?: string;
  category?: string;
  year?: number;
  limit?: number;
}

export interface CreateContentItemInput {
  name: string;
  category: string;
  description: string;
  details?: string;
  coordinates: Coordinates;
  startYear?: number;
  endYear?: number;
  yearLabel?: string;
  tags?: string[];
  facts?: string[];
  keyFigures?: KeyFigure[];
  relatedItems?: string[];
  sources?: SourceReference[];
}

export interface UpdateContentItemInput extends Partial<CreateContentItemInput> {}

export interface CreateTimelineEventInput {
  name: string;
  category: string;
  description: string;
  coordinates: Coordinates;
  startYear: number;
  endYear?: number;
}

export interface UpdateTimelineEventInput extends Partial<CreateTimelineEventInput> {}

export interface CreateCountryProfileInput {
  name: string;
  description: string;
}

export interface UpdateCountryProfileInput extends Partial<CreateCountryProfileInput> {}

export interface ContentStoreData {
  domains: DomainContent[];
}

export interface SearchResult {
  domain: DomainSlug;
  name: string;
  description: string;
  category: string;
  coordinates?: [number, number];
}
