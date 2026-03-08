# AGENTS.md - Terranova Architecture and Working Model

This file defines how work is split across agents/contributors so sessions can continue cleanly.

## 1) System architecture

### Frontend (React, Vite)
- App shell and routes: `src/App.tsx`
- Domain map pages: `src/pages/*Map.tsx`
- Shared map engine: `src/components/FullPageMap.tsx`
- Exploration surfaces:
  - `src/components/GlobalSearch.tsx`
  - `src/pages/ExplorePage.tsx`
  - `src/pages/StudyBoardPage.tsx`
  - `src/pages/PulsePage.tsx`
  - `src/pages/TopicsIndexPage.tsx`
  - `src/pages/TopicHubPage.tsx`
  - `src/pages/ComparePage.tsx`
  - `src/pages/NotesPage.tsx`
- State stores:
  - `src/stores/study-board.ts`
  - `src/stores/notes.ts`
  - `src/stores/compare.ts`
- API contracts and clients:
  - `src/api/types.ts`
  - `src/api/pulse-types.ts`
  - `src/api/client.ts`

### Backend (Express, TypeScript)
- server entry: `server/src/index.ts`
- app/router: `server/src/app.ts`
- content repository: `server/src/content/repository.ts`
- seed/bootstrap: `server/src/content/seed.ts`
- persistence store: `server/src/content/store.ts`
- external enrichment:
  - `server/src/external/wikipediaService.ts`
  - `server/src/external/wikiCache.ts`
- persisted data files:
  - `server/data/content-store.json`
  - `server/data/wikipedia-cache.json`

## 2) Agent roles

### A) Lovable UI/UX Agent
Owns:
- visual and interaction design
- new pages/components/routing on frontend
- responsive behavior and UX polish

Must not:
- redesign product into roles/progress/gamified classroom
- break existing backend contracts without explicit coordination

Deliverables per run:
- exact file list changed/created
- exact route list added/updated
- contract assumptions for each API call

### B) Frontend Integration Agent (local)
Owns:
- API wiring correctness
- fallback behavior when backend unavailable
- route-state handoffs between pages/maps
- type safety (`src/api/types.ts`, hooks)

Definition of done:
- `npm run build` passes
- no contract mismatch between hooks and API responses

### C) Backend API Agent (local)
Owns:
- endpoint design and validation
- persistence and caching
- external data integration layer
- contract stability for frontend consumers

Definition of done:
- `npm run test:server` passes
- `npm run server:build` passes
- backward-compatible response shape unless coordinated change

### D) Data Ingestion Agent (local)
Owns:
- external source connectors (NASA/USGS/etc.)
- normalization + dedupe + source attribution
- cache and refresh strategy

Definition of done:
- deterministic ingestion outputs
- source metadata quality maintained

## 3) Contract-first rules

1. API response wrappers are canonical (`{ domains: [...] }`, `{ items: [...], total }`, etc.).
2. Frontend consumes typed contracts from `src/api/types.ts` / `src/api/pulse-types.ts`.
3. If backend shape changes, update hooks + types in same session.
4. Keep map coordinates:
   - response: `[lng, lat]`
   - write payloads: `{ lng, lat }`

## 4) Product constraints (do not drift)

- Exploration-first knowledge atlas
- PIN gate allowed
- no user account model
- no student progress tracking
- no teacher/admin classroom flows in UI

## 5) Quality gates

Before ending any engineering session:
1. `npm run build`
2. `npm run test:server`
3. `npm run server:build`
4. verify critical routes load: `/`, `/geology`, `/geopolitics`, `/history`, `/cosmology`, `/explore`, `/study-board`, `/pulse`
   and `/topics`, `/compare`, `/notes`

## 6) Handoff template for next session

When handing off, provide:
1. What changed (files + routes)
2. What is verified (commands + result)
3. What is pending (ranked)
4. Any API contracts added/changed
5. Any known mismatches between Lovable summary and repo reality

## 7) Current priority order

1. Stabilize and harden newly added frontend surfaces (Topics, Compare, Notes, Pulse interactions).
2. Replace Pulse mock fallback with real backend `/api/pulse` pipeline.
3. Add backend topics contract (`/api/topics`, `/api/topics/:slug`) to replace static frontend topic hubs.
4. Expand public-source ingestion while preserving source attribution quality.
