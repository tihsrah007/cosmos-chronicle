import path from "node:path";
import {
  type ContentFilters,
  type ContentItem,
  type CountryProfile,
  type CreateContentItemInput,
  type CreateCountryProfileInput,
  type CreateTimelineEventInput,
  type DomainContent,
  type DomainSlug,
  type DomainSummary,
  type SearchResult,
  type TimelineEvent,
  type UpdateContentItemInput,
  type UpdateCountryProfileInput,
  type UpdateTimelineEventInput,
} from "../types/content";
import { buildSeedData } from "./seed";
import { FileContentStore } from "./store";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const matchesSearch = (item: ContentItem, query?: string) => {
  if (!query) return true;

  const normalized = query.toLowerCase();
  return [
    item.name,
    item.category,
    item.description,
    item.details,
    item.yearLabel,
    item.facts?.join(" "),
    item.relatedItems?.join(" "),
  ]
    .filter(Boolean)
    .some((value) => value!.toLowerCase().includes(normalized));
};

const matchesCategory = (item: ContentItem, category?: string) => {
  if (!category) return true;
  return item.category.toLowerCase() === category.toLowerCase();
};

const matchesYear = (item: ContentItem, year?: number) => {
  if (year === undefined) return true;

  if (item.startYear !== undefined && item.endYear !== undefined) {
    return year >= item.startYear && year <= item.endYear;
  }

  if (item.startYear !== undefined) {
    return item.startYear <= year;
  }

  return true;
};

const applyFilters = (items: ContentItem[], filters: ContentFilters) => {
  const filtered = items.filter(
    (item) =>
      matchesSearch(item, filters.search) &&
      matchesCategory(item, filters.category) &&
      matchesYear(item, filters.year)
  );

  if (!filters.limit || filters.limit < 1) return filtered;
  return filtered.slice(0, filters.limit);
};

const updateDomainCounts = (domain: DomainContent): DomainContent => ({
  ...domain,
  itemCount: domain.items.length,
  timelineEraCount: domain.timelineEras.length,
});

export class ContentRepository {
  constructor(private readonly store: FileContentStore) {}

  listDomains(): DomainSummary[] {
    return this.store
      .read()
      .domains.map(({ items, timelineEras, timelineEvents, countryProfiles, ...summary }) => ({
        ...summary,
        itemCount: items.length,
        timelineEraCount: timelineEras.length,
      }));
  }

  getDomain(slug: string): DomainContent | undefined {
    return this.store.read().domains.find((domain) => domain.slug === slug);
  }

  getDomainItems(slug: string, filters: ContentFilters = {}) {
    const domain = this.getDomain(slug);
    if (!domain) return null;
    return applyFilters(domain.items, filters);
  }

  getDomainTimelineEvents(slug: string, filters: ContentFilters = {}) {
    const domain = this.getDomain(slug);
    if (!domain) return null;

    return domain.timelineEvents.filter((event) => {
      if (filters.search) {
        const normalized = filters.search.toLowerCase();
        const searchMatch = [event.name, event.category, event.description].some((value) =>
          value.toLowerCase().includes(normalized)
        );
        if (!searchMatch) return false;
      }

      if (filters.category && event.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }

      if (filters.year !== undefined) {
        return filters.year >= event.startYear && filters.year <= event.endYear;
      }

      return true;
    });
  }

  getCountryProfiles(search?: string) {
    const domain = this.getDomain("geopolitics");
    if (!domain) return [];

    if (!search) return domain.countryProfiles;

    const normalized = search.toLowerCase();
    return domain.countryProfiles.filter(
      (country) =>
        country.name.toLowerCase().includes(normalized) ||
        country.description.toLowerCase().includes(normalized)
    );
  }

  search(query: string, domain?: DomainSlug, limit = 40): SearchResult[] {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    const state = this.store.read();
    const domains = domain
      ? state.domains.filter((entry) => entry.slug === domain)
      : state.domains;

    const results: SearchResult[] = [];

    domains.forEach((entry) => {
      entry.items.forEach((item) => {
        const haystack = [
          item.name,
          item.category,
          item.description,
          item.details,
          item.facts?.join(" "),
          item.relatedItems?.join(" "),
          item.tags.join(" "),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(normalized)) return;

        results.push({
          domain: entry.slug,
          name: item.name,
          description: item.description,
          category: item.category,
          coordinates: [item.coordinates.lng, item.coordinates.lat],
        });
      });

      if (entry.slug === "geopolitics") {
        entry.countryProfiles.forEach((country) => {
          const haystack = `${country.name} ${country.description}`.toLowerCase();
          if (!haystack.includes(normalized)) return;

          results.push({
            domain: "geopolitics",
            name: country.name,
            description: country.description,
            category: "Country Profile",
          });
        });
      }
    });

    return results.slice(0, Math.max(1, limit));
  }

  createItem(slug: DomainSlug, input: CreateContentItemInput): ContentItem {
    const state = this.store.read();
    const domain = state.domains.find((entry) => entry.slug === slug);
    if (!domain) throw new Error(`Unknown domain '${slug}'`);

    const item: ContentItem = {
      id: `${slug}-${slugify(input.name)}-${Date.now()}`,
      name: input.name,
      category: input.category,
      description: input.description,
      details: input.details,
      coordinates: input.coordinates,
      startYear: input.startYear,
      endYear: input.endYear,
      yearLabel: input.yearLabel,
      tags: input.tags?.length ? input.tags : [input.category, slug],
      facts: input.facts,
      keyFigures: input.keyFigures,
      relatedItems: input.relatedItems,
      sources: input.sources,
    };

    domain.items.push(item);
    if (!domain.categories.includes(item.category)) domain.categories.push(item.category);
    this.persistDomain(state.domains, domain);
    return item;
  }

  updateItem(slug: DomainSlug, itemId: string, input: UpdateContentItemInput): ContentItem | null {
    const state = this.store.read();
    const domain = state.domains.find((entry) => entry.slug === slug);
    if (!domain) throw new Error(`Unknown domain '${slug}'`);

    const item = domain.items.find((entry) => entry.id === itemId);
    if (!item) return null;

    Object.assign(item, {
      ...input,
      coordinates: input.coordinates ?? item.coordinates,
      tags: input.tags ?? item.tags,
      facts: input.facts ?? item.facts,
      keyFigures: input.keyFigures ?? item.keyFigures,
      relatedItems: input.relatedItems ?? item.relatedItems,
      sources: input.sources ?? item.sources,
    });

    if (!domain.categories.includes(item.category)) domain.categories.push(item.category);
    this.persistDomain(state.domains, domain);
    return item;
  }

  deleteItem(slug: DomainSlug, itemId: string): boolean {
    const state = this.store.read();
    const domain = state.domains.find((entry) => entry.slug === slug);
    if (!domain) throw new Error(`Unknown domain '${slug}'`);

    const initialLength = domain.items.length;
    domain.items = domain.items.filter((entry) => entry.id !== itemId);

    if (domain.items.length === initialLength) return false;

    this.persistDomain(state.domains, domain);
    return true;
  }

  createTimelineEvent(slug: DomainSlug, input: CreateTimelineEventInput): TimelineEvent {
    const state = this.store.read();
    const domain = state.domains.find((entry) => entry.slug === slug);
    if (!domain) throw new Error(`Unknown domain '${slug}'`);

    const event: TimelineEvent = {
      id: `${slug}-timeline-${slugify(input.name)}-${Date.now()}`,
      name: input.name,
      category: input.category,
      description: input.description,
      coordinates: input.coordinates,
      startYear: input.startYear,
      endYear: input.endYear ?? input.startYear,
    };

    domain.timelineEvents.push(event);
    this.persistDomain(state.domains, domain);
    return event;
  }

  updateTimelineEvent(
    slug: DomainSlug,
    eventId: string,
    input: UpdateTimelineEventInput
  ): TimelineEvent | null {
    const state = this.store.read();
    const domain = state.domains.find((entry) => entry.slug === slug);
    if (!domain) throw new Error(`Unknown domain '${slug}'`);

    const event = domain.timelineEvents.find((entry) => entry.id === eventId);
    if (!event) return null;

    Object.assign(event, {
      ...input,
      coordinates: input.coordinates ?? event.coordinates,
      endYear: input.endYear ?? event.endYear,
    });

    this.persistDomain(state.domains, domain);
    return event;
  }

  deleteTimelineEvent(slug: DomainSlug, eventId: string): boolean {
    const state = this.store.read();
    const domain = state.domains.find((entry) => entry.slug === slug);
    if (!domain) throw new Error(`Unknown domain '${slug}'`);

    const initialLength = domain.timelineEvents.length;
    domain.timelineEvents = domain.timelineEvents.filter((entry) => entry.id !== eventId);

    if (domain.timelineEvents.length === initialLength) return false;

    this.persistDomain(state.domains, domain);
    return true;
  }

  createCountryProfile(input: CreateCountryProfileInput): CountryProfile {
    const state = this.store.read();
    const domain = state.domains.find((entry) => entry.slug === "geopolitics");
    if (!domain) throw new Error("Missing geopolitics domain");

    const country: CountryProfile = {
      id: `country-${slugify(input.name)}-${Date.now()}`,
      name: input.name,
      description: input.description,
    };

    domain.countryProfiles.push(country);
    this.persistDomain(state.domains, domain);
    return country;
  }

  updateCountryProfile(
    countryId: string,
    input: UpdateCountryProfileInput
  ): CountryProfile | null {
    const state = this.store.read();
    const domain = state.domains.find((entry) => entry.slug === "geopolitics");
    if (!domain) throw new Error("Missing geopolitics domain");

    const country = domain.countryProfiles.find((entry) => entry.id === countryId);
    if (!country) return null;

    Object.assign(country, input);
    this.persistDomain(state.domains, domain);
    return country;
  }

  deleteCountryProfile(countryId: string): boolean {
    const state = this.store.read();
    const domain = state.domains.find((entry) => entry.slug === "geopolitics");
    if (!domain) throw new Error("Missing geopolitics domain");

    const initialLength = domain.countryProfiles.length;
    domain.countryProfiles = domain.countryProfiles.filter((entry) => entry.id !== countryId);

    if (domain.countryProfiles.length === initialLength) return false;

    this.persistDomain(state.domains, domain);
    return true;
  }

  reset() {
    return this.store.reset();
  }

  private persistDomain(domains: DomainContent[], updatedDomain: DomainContent) {
    const nextDomains = domains.map((domain) =>
      domain.slug === updatedDomain.slug ? updateDomainCounts(updatedDomain) : updateDomainCounts(domain)
    );

    this.store.write({
      domains: nextDomains,
    });
  }
}

export const createContentRepository = (storeFilePath?: string) => {
  const resolvedPath =
    storeFilePath ?? path.resolve(process.cwd(), "server/data/content-store.json");
  return new ContentRepository(new FileContentStore(resolvedPath, buildSeedData));
};

export const repository = createContentRepository();
