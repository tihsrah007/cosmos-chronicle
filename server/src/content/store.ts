import fs from "node:fs";
import path from "node:path";
import type { ContentStoreData } from "../types/content";

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export class FileContentStore {
  private readonly filePath: string;
  private readonly seedFactory: () => ContentStoreData;
  private data: ContentStoreData;

  constructor(filePath: string, seedFactory: () => ContentStoreData) {
    this.filePath = filePath;
    this.seedFactory = seedFactory;
    this.data = this.load();
  }

  read(): ContentStoreData {
    return clone(this.data);
  }

  write(nextData: ContentStoreData): ContentStoreData {
    this.data = clone(nextData);
    this.persist();
    return this.read();
  }

  reset(): ContentStoreData {
    this.data = this.seedFactory();
    this.persist();
    return this.read();
  }

  private load(): ContentStoreData {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });

    if (!fs.existsSync(this.filePath)) {
      const seeded = this.seedFactory();
      fs.writeFileSync(this.filePath, JSON.stringify(seeded, null, 2));
      return clone(seeded);
    }

    const fileContents = fs.readFileSync(this.filePath, "utf8");
    return JSON.parse(fileContents) as ContentStoreData;
  }

  private persist() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
  }
}
