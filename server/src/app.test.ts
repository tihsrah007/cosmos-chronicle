import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createAppWithStore } from "./app";

describe("Cosmos Chronicle content API", () => {
  const storePath = path.join(os.tmpdir(), `cosmos-chronicle-test-${process.pid}.json`);

  beforeEach(() => {
    if (fs.existsSync(storePath)) fs.unlinkSync(storePath);
  });

  const app = () => createAppWithStore(storePath);

  it("reports health", async () => {
    const response = await request(app()).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("validates simple access pin", async () => {
    const fail = await request(app()).post("/api/access/pin").send({ pin: "9999" });
    expect(fail.status).toBe(401);

    const success = await request(app()).post("/api/access/pin").send({ pin: "0000" });
    expect(success.status).toBe(200);
    expect(success.body.ok).toBe(true);
  });

  it("lists all four discovery domains", async () => {
    const response = await request(app()).get("/api/domains");

    expect(response.status).toBe(200);
    expect(response.body.domains).toHaveLength(4);
    expect(response.body.domains.map((domain: { slug: string }) => domain.slug)).toEqual([
      "geology",
      "geopolitics",
      "history",
      "cosmology",
    ]);
    expect(response.body.domains[0].facts.length).toBeGreaterThan(0);
    expect(response.body.domains[0].mapConfig).toBeDefined();
  });

  it("returns cosmology domain details", async () => {
    const response = await request(app()).get("/api/domains/cosmology");

    expect(response.status).toBe(200);
    expect(response.body.domain.slug).toBe("cosmology");
    expect(response.body.domain.icon).toBe("telescope");
  });

  it("filters history events by year", async () => {
    const response = await request(app()).get("/api/domains/history/items").query({ year: -500 });

    expect(response.status).toBe(200);
    expect(response.body.total).toBeGreaterThan(0);
    expect(
      response.body.items.every((item: { startYear?: number }) =>
        item.startYear !== undefined ? item.startYear <= -500 : true
      )
    ).toBe(true);
  });

  it("returns rich cosmology item metadata", async () => {
    const response = await request(app())
      .get("/api/domains/cosmology/items")
      .query({ search: "Arecibo" });

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(1);
    expect(response.body.items[0].facts.length).toBeGreaterThan(0);
    expect(response.body.items[0].keyFigures.length).toBeGreaterThan(0);
    expect(response.body.items[0].sources.length).toBeGreaterThan(0);
  });

  it("filters geopolitics country profiles by search query", async () => {
    const response = await request(app())
      .get("/api/geopolitics/countries")
      .query({ search: "semiconductors" });

    expect(response.status).toBe(200);
    expect(response.body.total).toBeGreaterThan(0);
    expect(
      response.body.countries.some((country: { name: string }) => country.name === "Taiwan")
    ).toBe(true);
  });

  it("supports global search", async () => {
    const response = await request(app()).get("/api/search").query({ q: "black hole" });

    expect(response.status).toBe(200);
    expect(response.body.total).toBeGreaterThan(0);
    expect(response.body.results.some((result: { domain: string }) => result.domain === "cosmology")).toBe(
      true
    );
  });

  it("creates and persists a new geology item", async () => {
    const createResponse = await request(app()).post("/api/domains/geology/items").send({
      name: "Test Basin",
      category: "Lake",
      description: "A seeded test location.",
      coordinates: { lng: 12.5, lat: -7.1 },
      facts: ["Used in tests"],
    });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.item.name).toBe("Test Basin");

    const listResponse = await request(app())
      .get("/api/domains/geology/items")
      .query({ search: "Test Basin" });

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.total).toBe(1);
    expect(Array.isArray(listResponse.body.items[0].coordinates)).toBe(true);
  });

  it("updates and deletes a geopolitics country profile", async () => {
    const createResponse = await request(app()).post("/api/geopolitics/countries").send({
      name: "Testland",
      description: "Initial description",
    });

    expect(createResponse.status).toBe(201);
    const countryId = createResponse.body.country.id;

    const updateResponse = await request(app())
      .patch(`/api/geopolitics/countries/${countryId}`)
      .send({ description: "Updated description" });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.country.description).toBe("Updated description");

    const deleteResponse = await request(app()).delete(`/api/geopolitics/countries/${countryId}`);
    expect(deleteResponse.status).toBe(204);
  });

  it("returns 404 for unknown domains", async () => {
    const response = await request(app()).get("/api/domains/astronomy");

    expect(response.status).toBe(404);
    expect(response.body.error).toContain("Unknown domain");
  });
});
