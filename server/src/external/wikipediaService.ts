import path from "node:path";
import { WikipediaCacheStore, type WikipediaCacheEntry } from "./wikiCache";

export interface WikipediaSummary {
  title: string;
  extract: string;
  url: string;
  thumbnailUrl?: string;
  cached: boolean;
  fetchedAt: string;
}

const sanitizeKey = (title: string) =>
  title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const toSummary = (entry: WikipediaCacheEntry, cached: boolean): WikipediaSummary => ({
  title: entry.title,
  extract: entry.extract,
  url: entry.url,
  thumbnailUrl: entry.thumbnailUrl,
  cached,
  fetchedAt: entry.fetchedAt,
});

export class WikipediaService {
  constructor(
    private readonly cache: WikipediaCacheStore,
    private readonly maxAgeMs = 1000 * 60 * 60 * 24 * 7
  ) {}

  async getSummary(title: string): Promise<WikipediaSummary | null> {
    const key = sanitizeKey(title);
    if (!key) return null;

    const cached = this.cache.get(key);
    if (cached) {
      const ageMs = Date.now() - new Date(cached.fetchedAt).getTime();
      if (ageMs <= this.maxAgeMs) {
        return toSummary(cached, true);
      }
    }

    const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const response = await fetch(endpoint, {
      headers: { "User-Agent": "CosmosChronicle/1.0 (knowledge-atlas)" },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Wikipedia request failed with status ${response.status}`);
    }

    const body = (await response.json()) as {
      title?: string;
      extract?: string;
      content_urls?: { desktop?: { page?: string } };
      thumbnail?: { source?: string };
    };

    const extract = body.extract?.trim();
    const url = body.content_urls?.desktop?.page;
    const resolvedTitle = body.title?.trim() || title;

    if (!extract || !url) return null;

    const entry: WikipediaCacheEntry = {
      key,
      title: resolvedTitle,
      extract,
      url,
      thumbnailUrl: body.thumbnail?.source,
      fetchedAt: new Date().toISOString(),
    };

    const saved = this.cache.upsert(entry);
    return toSummary(saved, false);
  }

  getCacheCount() {
    return this.cache.count();
  }
}

export const createWikipediaService = (cacheFilePath?: string) => {
  const filePath =
    cacheFilePath ?? path.resolve(process.cwd(), "server/data/wikipedia-cache.json");
  const cache = new WikipediaCacheStore(filePath);
  return new WikipediaService(cache);
};

export const wikipediaService = createWikipediaService();
