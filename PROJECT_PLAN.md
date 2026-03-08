# Terranova Project Plan

This is the continuation plan for future sessions.

## 1) Product direction (locked)

Terranova is an exploration-first knowledge atlas.

In scope:
- map-first discovery for geology, geopolitics, history, cosmology
- rich factual context (facts, key figures, sources, related items)
- lightweight personal tooling (study board, compare, local notes)
- public updates feed (Pulse)

Out of scope:
- user account system
- teacher/student roles
- learning progression tracking
- quiz/gamified classroom flows

Access model:
- PIN gate only (shared access)

## 2) Current implementation snapshot

### Frontend shipped
- Routes:
  - `/`, `/geology`, `/geopolitics`, `/history`, `/cosmology`
  - `/explore`, `/study-board`, `/pulse`
  - `/topics`, `/topics/:slug`
  - `/compare`, `/notes`
  - `/universe`
- Global search with map-focus handoff
- Detail panel with facts, key figures, sources, related, wiki snapshot
- Timeline slider + timeline player
- Layers panel (category visibility, source-only, focus mode)
- Study board (`terranova_study_board`)
- Compare workspace (`terranova_compare`)
- Local notes (`terranova_notes`)
- Pulse page with filters/trending/new-since-last-visit (`terranova-pulse-last-visit`)
- Topic hubs from static dataset (`src/data/topicHubs.ts`)

### Backend shipped
- Express API in `server/`
- persisted content store (`server/data/content-store.json`)
- domain/items/timeline/countries APIs
- cross-domain search API
- wikipedia enrichment API + cache (`server/data/wikipedia-cache.json`)
- PIN config/verify endpoints
- local CRUD for content entities

### Verification at session end
- `npm run build` passes
- `npm run test:server` passes
- `npm run server:build` passes

## 3) Confirmed gaps / pending integration

1. Pulse backend is not implemented yet as a first-class API pipeline.
   - Frontend currently falls back to `src/data/pulseMockData.ts` when `/api/pulse` is unavailable.
2. Topics are static frontend data.
   - Need backend `/api/topics` and `/api/topics/:slug` for long-term maintainability.
3. Some UX parity polish remains (e.g., related-chip behavior consistency across all domain detail panels).

## 4) Frontend backlog (if/when Lovable time is available)

### Priority A - polish and consistency
1. History detail panel: ensure related chips focus mapped events/items consistently.
2. Mobile map overlay stacking review (detail panel, layers, timeline player).
3. Improve compare flow from pulse and map detail with clearer affordances.

### Priority B - study ergonomics
1. Add glossary/term popovers for difficult concepts on topic pages.
2. Add printable/export-friendly "study sheet" layout for topic hubs.
3. Add citation copy action for source links.

### Priority C - performance/accessibility
1. Further chunk split for heavy routes (`Universe`, map-heavy pages).
2. Keyboard and focus audit for search/panels/dialogs.
3. aria labels and screen-reader pass on icon-only actions.

## 5) Backend roadmap (can continue without Lovable)

### Phase 1 - Pulse API (highest backend priority)
1. Implement `GET /api/pulse` matching `src/api/pulse-types.ts`.
2. Add query filters: `domain`, `range`, `sourceType`, `q`, `limit`.
3. Add cached storage and TTL refresh strategy.
4. Preserve source attribution quality and source-type labels.

### Phase 2 - Topics API
1. Implement `GET /api/topics` (list + summary).
2. Implement `GET /api/topics/:slug` (full topic payload).
3. Migrate frontend from `src/data/topicHubs.ts` to API with fallback.

### Phase 3 - Multi-source ingestion
Planned source sequence:
1. Wikipedia/Wikidata (already partially integrated)
2. NASA feeds (missions/discoveries)
3. USGS earthquake + geologic events
4. Curated geopolitics public feeds

Pipeline pattern:
- fetch -> normalize -> dedupe -> validate -> cache/store -> expose via API

### Phase 4 - Contract hardening
1. Add endpoint contract tests covering all frontend-used routes.
2. Tighten request validation and error shape consistency.
3. Version contract assumptions in docs.

## 6) Session restart checklist

When resuming:
1. `git pull`
2. `npm install`
3. run checks:
   - `npm run build`
   - `npm run test:server`
   - `npm run server:build`
4. choose session lane:
   - frontend/Lovable polish, or
   - backend ingestion/API lane
5. update this file with moved items (pending -> done)

## 7) Immediate next actions

1. Backend: implement `/api/pulse` and connect `usePulse` to real data-first flow.
2. Backend: add `/api/topics` contract and start replacing static topic data.
3. Frontend: run one final consistency pass on related-item navigation and mobile overlays.
