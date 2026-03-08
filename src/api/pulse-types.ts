// Pulse / Knowledge Pulse types — backend-ready contract

export type PulseSourceType = "agency" | "research" | "media" | "government" | "observatory";

export type PulseDomain = "geopolitics" | "cosmology" | "geology" | "history";

export interface PulseUpdate {
  id: string;
  title: string;
  summary: string;
  domain: PulseDomain;
  sourceName: string;
  sourceUrl?: string;
  sourceType: PulseSourceType;
  publishedAt: string; // ISO 8601
  tags: string[];
  coordinates?: [number, number];
  /** slug of the domain map to open (e.g. "geopolitics") */
  mapDomain?: string;
  /** name of a POI on the target map to focus */
  mapTarget?: string;
}

export interface PulseResponse {
  updates: PulseUpdate[];
  total: number;
}
