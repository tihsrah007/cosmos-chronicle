import cors from "cors";
import express from "express";
import { z } from "zod";
import { createContentRepository, repository as defaultRepository } from "./content/repository";
import type { ContentRepository } from "./content/repository";
import { createWikipediaService, wikipediaService as defaultWikipediaService } from "./external/wikipediaService";
import type { WikipediaService } from "./external/wikipediaService";
import type { ContentItem, DomainContent, DomainSlug, TimelineEvent } from "./types/content";

const parseNumber = (value: unknown) => {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const domainSlugSchema = z.enum(["geology", "geopolitics", "history", "cosmology"]);

const coordinatesSchema = z.object({
  lng: z.number(),
  lat: z.number(),
});

const keyFigureSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const sourceSchema = z.object({
  label: z.string().min(1),
  url: z.string().url().optional(),
});

const itemSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  details: z.string().optional(),
  coordinates: coordinatesSchema,
  startYear: z.number().optional(),
  endYear: z.number().optional(),
  yearLabel: z.string().optional(),
  tags: z.array(z.string()).optional(),
  facts: z.array(z.string()).optional(),
  keyFigures: z.array(keyFigureSchema).optional(),
  relatedItems: z.array(z.string()).optional(),
  sources: z.array(sourceSchema).optional(),
});

const itemUpdateSchema = itemSchema.partial();

const timelineEventSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  coordinates: coordinatesSchema,
  startYear: z.number(),
  endYear: z.number().optional(),
});

const timelineEventUpdateSchema = timelineEventSchema.partial();

const countrySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

const countryUpdateSchema = countrySchema.partial();

const pinSchema = z.object({
  pin: z.string().min(1),
});

const parseDomainSlug = (slug: string): DomainSlug => domainSlugSchema.parse(slug);

const handleZodError = (error: unknown, res: express.Response) => {
  if (error instanceof z.ZodError) {
    return res.status(400).json({ error: "Invalid request payload", issues: error.issues });
  }

  throw error;
};

const domainPresentation: Record<
  DomainSlug,
  {
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
    timelineAccent: string;
  }
> = {
  geology: {
    title: "Geology",
    description:
      "The living earth beneath our feet. From tectonic forces to mineral treasures hidden deep below.",
    image: "",
    icon: "mountain",
    facts: [
      "Earth is 4.54 billion years old",
      "7 major tectonic plates in motion",
      "Over 5,000 known mineral species",
    ],
    mapConfig: {
      markerColor: "hsl(160, 70%, 45%)",
      hoverFill: "hsl(160, 40%, 25%)",
      baseFill: "hsl(220, 15%, 16%)",
      strokeColor: "hsl(220, 12%, 22%)",
      accentGradient: "linear-gradient(135deg, hsl(160, 70%, 45%), hsl(140, 60%, 35%))",
      backLabel: "Back to Terranova",
    },
    timelineAccent: "hsl(160, 70%, 45%)",
  },
  geopolitics: {
    title: "Geopolitics",
    description:
      "Borders, alliances, and power. Understand the forces driving nations and the balance of global influence.",
    image: "",
    icon: "globe",
    facts: [
      "195 sovereign nations today",
      "Trade routes spanning millennia",
      "Shifting alliances and emerging powers",
    ],
    mapConfig: {
      markerColor: "hsl(38, 90%, 55%)",
      hoverFill: "hsl(38, 60%, 30%)",
      baseFill: "hsl(220, 15%, 18%)",
      strokeColor: "hsl(220, 15%, 24%)",
      accentGradient: "linear-gradient(135deg, hsl(38, 90%, 55%), hsl(28, 85%, 45%))",
      backLabel: "Back to Terranova",
    },
    timelineAccent: "hsl(38, 90%, 55%)",
  },
  history: {
    title: "History",
    description:
      "Civilizations rise and fall. Trace the threads of empires, revolutions, and the ideas that remade the world.",
    image: "",
    icon: "landmark",
    facts: [
      "Over 5,000 years of recorded history",
      "200+ civilizations have risen and fallen",
      "Key turning points that shaped modernity",
    ],
    mapConfig: {
      markerColor: "hsl(38, 85%, 55%)",
      hoverFill: "hsl(38, 60%, 30%)",
      baseFill: "hsl(30, 10%, 16%)",
      strokeColor: "hsl(30, 8%, 22%)",
      accentGradient: "linear-gradient(135deg, hsl(38, 85%, 55%), hsl(28, 85%, 45%))",
      backLabel: "Back to Terranova",
    },
    timelineAccent: "hsl(38, 85%, 55%)",
  },
  cosmology: {
    title: "Cosmology",
    description:
      "The grand architecture of the universe. Dark matter, distant galaxies, and the origin of everything.",
    image: "",
    icon: "telescope",
    facts: [
      "Observable universe spans around 93 billion light-years",
      "The universe is about 13.8 billion years old",
      "Modern surveys map billions of galaxies",
    ],
    mapConfig: {
      markerColor: "hsl(270, 70%, 60%)",
      hoverFill: "hsl(270, 40%, 28%)",
      baseFill: "hsl(240, 15%, 14%)",
      strokeColor: "hsl(240, 12%, 20%)",
      accentGradient: "linear-gradient(135deg, hsl(270, 70%, 60%), hsl(250, 60%, 45%))",
      backLabel: "Back to Terranova",
    },
    timelineAccent: "hsl(270, 70%, 60%)",
  },
};

const toTuple = (coordinates: { lng: number; lat: number }): [number, number] => [
  coordinates.lng,
  coordinates.lat,
];

const serializeItem = (domain: DomainSlug, item: ContentItem) => ({
  id: item.id,
  name: item.name,
  coordinates: toTuple(item.coordinates),
  description: item.description,
  category: item.category,
  details: item.details,
  year: domain === "history" ? item.startYear : undefined,
  yearLabel: item.yearLabel,
  startYear: item.startYear,
  endYear: item.endYear,
  tags: item.tags,
  facts: item.facts,
  keyFigures: item.keyFigures,
  relatedItems: item.relatedItems,
  sources: item.sources,
});

const serializeTimelineEvent = (event: TimelineEvent) => ({
  id: event.id,
  name: event.name,
  coordinates: toTuple(event.coordinates),
  description: event.description,
  category: event.category,
  startYear: event.startYear,
  endYear: event.endYear,
});

const serializeDomain = (domain: DomainContent) => {
  const presentation = domainPresentation[domain.slug];
  const minYear = domain.timelineEras.length
    ? Math.min(...domain.timelineEras.map((era) => era.start))
    : -5000;
  const maxYear = domain.timelineEras.length
    ? Math.max(...domain.timelineEras.map((era) => era.end))
    : 2025;

  return {
    slug: domain.slug,
    title: presentation.title,
    description: presentation.description,
    image: presentation.image,
    icon: presentation.icon,
    facts: presentation.facts,
    mapConfig: presentation.mapConfig,
    timeline: {
      minYear,
      maxYear,
      defaultYear: maxYear,
      eras: domain.timelineEras,
      accentColor: presentation.timelineAccent,
    },
    categories: domain.categories,
    counts: {
      items: domain.items.length,
      timelineEras: domain.timelineEras.length,
      timelineEvents: domain.timelineEvents.length,
      countryProfiles: domain.countryProfiles.length,
    },
  };
};

export const createApp = (
  customRepository: ContentRepository = defaultRepository,
  wikiService: WikipediaService = defaultWikipediaService
) => {
  const app = express();
  const accessPin = process.env.APP_PIN ?? "0000";

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/access/config", (_req, res) => {
    res.json({ pinRequired: true });
  });

  app.post("/api/access/pin", (req, res) => {
    try {
      const payload = pinSchema.parse(req.body);
      if (payload.pin !== accessPin) {
        return res.status(401).json({ ok: false, error: "Invalid PIN" });
      }

      return res.json({ ok: true });
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  app.get("/api/domains", (_req, res) => {
    const domains = customRepository
      .listDomains()
      .map((summary) => customRepository.getDomain(summary.slug))
      .filter((domain): domain is DomainContent => Boolean(domain))
      .map(serializeDomain);
    res.json({ domains });
  });

  app.get("/api/domains/:slug", (req, res) => {
    const domain = customRepository.getDomain(req.params.slug);

    if (!domain) {
      return res.status(404).json({ error: `Unknown domain '${req.params.slug}'` });
    }

    return res.json({ domain: serializeDomain(domain) });
  });

  app.get("/api/domains/:slug/items", (req, res) => {
    const items = customRepository.getDomainItems(req.params.slug, {
      search: typeof req.query.search === "string" ? req.query.search : undefined,
      category: typeof req.query.category === "string" ? req.query.category : undefined,
      year: parseNumber(req.query.year),
      limit: parseNumber(req.query.limit),
    });

    if (!items) {
      return res.status(404).json({ error: `Unknown domain '${req.params.slug}'` });
    }

    const slug = parseDomainSlug(req.params.slug);
    return res.json({ items: items.map((item) => serializeItem(slug, item)), total: items.length });
  });

  app.get("/api/domains/:slug/timeline", (req, res) => {
    const domain = customRepository.getDomain(req.params.slug);

    if (!domain) {
      return res.status(404).json({ error: `Unknown domain '${req.params.slug}'` });
    }

    const events = customRepository.getDomainTimelineEvents(req.params.slug, {
      search: typeof req.query.search === "string" ? req.query.search : undefined,
      category: typeof req.query.category === "string" ? req.query.category : undefined,
      year: parseNumber(req.query.year),
    });

    return res.json({
      eras: domain.timelineEras,
      events: events?.map(serializeTimelineEvent) ?? [],
      total: events?.length ?? 0,
    });
  });

  app.get("/api/geopolitics/countries", (req, res) => {
    const search = typeof req.query.search === "string" ? req.query.search : undefined;
    const countries = customRepository.getCountryProfiles(search);
    res.json({ countries, total: countries.length });
  });

  app.get("/api/search", (req, res) => {
    try {
      const q = typeof req.query.q === "string" ? req.query.q : "";
      const domainParam = typeof req.query.domain === "string" ? req.query.domain : undefined;
      const domain = domainParam ? parseDomainSlug(domainParam) : undefined;
      const limit = parseNumber(req.query.limit) ?? 40;
      const results = customRepository.search(q, domain, limit);
      return res.json({ results, total: results.length });
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  app.get("/api/enrichment/wikipedia", async (req, res) => {
    try {
      const title = typeof req.query.title === "string" ? req.query.title : "";
      if (title.trim().length < 2) {
        return res.status(400).json({ error: "title query param must be at least 2 characters" });
      }

      const summary = await wikiService.getSummary(title);
      if (!summary) return res.status(404).json({ error: "No summary found" });

      return res.json({ summary });
    } catch (error) {
      return res.status(502).json({ error: "External source lookup failed", details: String(error) });
    }
  });

  app.post("/api/enrichment/wikipedia/batch", async (req, res) => {
    try {
      const domainParam = typeof req.body?.domain === "string" ? req.body.domain : undefined;
      const domain = domainParam ? parseDomainSlug(domainParam) : undefined;
      const limit = typeof req.body?.limit === "number" ? Math.max(1, req.body.limit) : 8;
      const targets = domain
        ? customRepository.getDomainItems(domain, { limit }) ?? []
        : customRepository
            .listDomains()
            .flatMap((entry) => customRepository.getDomainItems(entry.slug, { limit: 3 }) ?? []);

      const uniqueTargets = Array.from(new Map(targets.map((item) => [item.name, item])).values()).slice(0, limit);

      const entries = await Promise.all(
        uniqueTargets.map(async (item) => ({
          name: item.name,
          summary: await wikiService.getSummary(item.name),
        }))
      );

      const cachedCount = entries.filter((entry) => entry.summary?.cached).length;
      const fetchedCount = entries.filter((entry) => entry.summary && !entry.summary.cached).length;

      return res.json({
        entries,
        total: entries.length,
        cachedCount,
        fetchedCount,
        cacheSize: wikiService.getCacheCount(),
      });
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  app.post("/api/domains/:slug/items", (req, res) => {
    try {
      const slug = parseDomainSlug(req.params.slug);
      const payload = itemSchema.parse(req.body);
      const item = customRepository.createItem(slug, payload);
      return res.status(201).json({ item: serializeItem(slug, item) });
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  app.patch("/api/domains/:slug/items/:itemId", (req, res) => {
    try {
      const slug = parseDomainSlug(req.params.slug);
      const payload = itemUpdateSchema.parse(req.body);
      const item = customRepository.updateItem(slug, req.params.itemId, payload);

      if (!item) return res.status(404).json({ error: "Item not found" });
      return res.json({ item: serializeItem(slug, item) });
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  app.delete("/api/domains/:slug/items/:itemId", (req, res) => {
    try {
      const slug = parseDomainSlug(req.params.slug);
      const deleted = customRepository.deleteItem(slug, req.params.itemId);
      if (!deleted) return res.status(404).json({ error: "Item not found" });
      return res.status(204).send();
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  app.post("/api/domains/:slug/timeline/events", (req, res) => {
    try {
      const slug = parseDomainSlug(req.params.slug);
      const payload = timelineEventSchema.parse(req.body);
      const event = customRepository.createTimelineEvent(slug, payload);
      return res.status(201).json({ event: serializeTimelineEvent(event) });
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  app.patch("/api/domains/:slug/timeline/events/:eventId", (req, res) => {
    try {
      const slug = parseDomainSlug(req.params.slug);
      const payload = timelineEventUpdateSchema.parse(req.body);
      const event = customRepository.updateTimelineEvent(slug, req.params.eventId, payload);
      if (!event) return res.status(404).json({ error: "Timeline event not found" });
      return res.json({ event: serializeTimelineEvent(event) });
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  app.delete("/api/domains/:slug/timeline/events/:eventId", (req, res) => {
    try {
      const slug = parseDomainSlug(req.params.slug);
      const deleted = customRepository.deleteTimelineEvent(slug, req.params.eventId);
      if (!deleted) return res.status(404).json({ error: "Timeline event not found" });
      return res.status(204).send();
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  app.post("/api/geopolitics/countries", (req, res) => {
    try {
      const payload = countrySchema.parse(req.body);
      const country = customRepository.createCountryProfile(payload);
      return res.status(201).json({ country });
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  app.patch("/api/geopolitics/countries/:countryId", (req, res) => {
    try {
      const payload = countryUpdateSchema.parse(req.body);
      const country = customRepository.updateCountryProfile(req.params.countryId, payload);
      if (!country) return res.status(404).json({ error: "Country profile not found" });
      return res.json({ country });
    } catch (error) {
      return handleZodError(error, res);
    }
  });

  app.delete("/api/geopolitics/countries/:countryId", (req, res) => {
    const deleted = customRepository.deleteCountryProfile(req.params.countryId);
    if (!deleted) return res.status(404).json({ error: "Country profile not found" });
    return res.status(204).send();
  });

  app.post("/api/admin/reset", (_req, res) => {
    const data = customRepository.reset();
    res.json({ ok: true, domains: data.domains.length });
  });

  return app;
};

export const createAppWithStore = (storeFilePath: string) => createApp(createContentRepository(storeFilePath));

export const createAppWithStores = (storeFilePath: string, wikiCacheFilePath: string) =>
  createApp(createContentRepository(storeFilePath), createWikipediaService(wikiCacheFilePath));
