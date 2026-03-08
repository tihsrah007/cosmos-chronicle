# Terranova Atlas

Terranova is an interactive, map-first knowledge atlas for geology, geopolitics, history, and cosmology.

The product goal is simple: help curious visitors explore facts, figures, events, and context through maps, timelines, and rich detail panels.

## Project docs

- `README.md` (this file): quick start, current capabilities, API overview
- `PROJECT_PLAN.md`: detailed roadmap and pending work (frontend + backend)
- `AGENTS.md`: architecture and role-based implementation guide

## Current capabilities

Frontend:
- Domain map routes: `/geology`, `/geopolitics`, `/history`, `/cosmology`
- Additional routes: `/explore`, `/study-board`, `/pulse`, `/topics`, `/topics/:slug`, `/compare`, `/notes`, `/trails`, `/universe`
- Global search with map focus handoff
- Rich detail panel with facts, key figures, related items, sources, and Wikipedia snapshot
- Timeline slider and timeline player controls on timeline-enabled maps
- Map layer controls (category toggles, source-only mode, focus mode)
- Simple PIN gate before entering the app
- Study board (local persisted) with compare entrypoints
- Topic hubs (8 starter hubs) and compare workspace
- Local notes system (`terranova_notes`)
- Research trails system (`terranova_trails`)
- Glossary drawer + inline glossary tooltips
- Source confidence badges + citation copy action
- Print-friendly study sheet mode on Topic Hub and Compare pages
- Pulse feed UX with filters, trending tags, and map handoff

Backend:
- Express + TypeScript API in `server/`
- Local persisted content store in `server/data/content-store.json`
- Cross-domain search endpoint
- Wikipedia enrichment endpoint with cache in `server/data/wikipedia-cache.json`
- CRUD endpoints for domain items, timeline events, and geopolitics country profiles
- PIN verification endpoints for shared access

Current backend gap:
- Pulse page currently uses frontend fallback/mock data when `/api/pulse` is unavailable.
- A production `GET /api/pulse` pipeline is planned (see `PROJECT_PLAN.md`).
- Topic hubs are currently static frontend data and should be replaced by `/api/topics` contracts.

## Tech stack

- Vite + React + TypeScript
- Tailwind + shadcn/ui + Framer Motion
- React Query
- Express (local API)
- Vitest + Supertest

## Run locally

Install deps:

```sh
npm install
```

Start frontend:

```sh
npm run dev
```

Start backend (separate terminal):

```sh
npm run server:dev
```

Build checks:

```sh
npm run build
npm run test:server
npm run server:build
```

## Environment variables

- `PORT` (default: `4000`)
- `APP_PIN` (default: `0000`)

## API overview

Base URL: `http://localhost:4000/api`

Core:
- `GET /health`
- `GET /access/config`
- `POST /access/pin`

Domain content:
- `GET /domains`
- `GET /domains/:slug`
- `GET /domains/:slug/items`
- `GET /domains/:slug/timeline`
- `GET /geopolitics/countries`
- `GET /search?q=...`

Enrichment:
- `GET /enrichment/wikipedia?title=...`
- `POST /enrichment/wikipedia/batch`

Content management (local CRUD):
- `POST /domains/:slug/items`
- `PATCH /domains/:slug/items/:itemId`
- `DELETE /domains/:slug/items/:itemId`
- `POST /domains/:slug/timeline/events`
- `PATCH /domains/:slug/timeline/events/:eventId`
- `DELETE /domains/:slug/timeline/events/:eventId`
- `POST /geopolitics/countries`
- `PATCH /geopolitics/countries/:countryId`
- `DELETE /geopolitics/countries/:countryId`
- `POST /admin/reset`

## Notes

- This repo started as a Lovable-generated frontend and is now being extended with a custom backend.
- Product direction is exploration-first (no user profiles, no student progress tracking, no classroom role system).
- For next work sessions, start from `PROJECT_PLAN.md`.
