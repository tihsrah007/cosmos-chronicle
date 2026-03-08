import fs from "node:fs";
import path from "node:path";

export interface WikipediaCacheEntry {
  key: string;
  title: string;
  extract: string;
  url: string;
  thumbnailUrl?: string;
  fetchedAt: string;
}

interface WikipediaCacheFile {
  entries: WikipediaCacheEntry[];
}

const emptyFile: WikipediaCacheFile = { entries: [] };

export class WikipediaCacheStore {
  private readonly filePath: string;
  private data: WikipediaCacheFile;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.data = this.load();
  }

  get(key: string): WikipediaCacheEntry | undefined {
    return this.data.entries.find((entry) => entry.key === key);
  }

  upsert(entry: WikipediaCacheEntry): WikipediaCacheEntry {
    const index = this.data.entries.findIndex((existing) => existing.key === entry.key);
    if (index === -1) {
      this.data.entries.push(entry);
    } else {
      this.data.entries[index] = entry;
    }

    this.persist();
    return entry;
  }

  count(): number {
    return this.data.entries.length;
  }

  private load(): WikipediaCacheFile {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });

    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify(emptyFile, null, 2));
      return { entries: [] };
    }

    const raw = fs.readFileSync(this.filePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<WikipediaCacheFile>;
    return {
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
    };
  }

  private persist() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }
}
