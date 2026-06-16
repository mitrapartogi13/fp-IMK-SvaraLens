---
name: svaralens-figma-to-next
description: SvaraLens IMK final project — generating Next.js pages from a Figma design
metadata:
  type: project
---

Building the SvaraLens app (IMK SEM 4 final project) by translating a Figma design (file key `QQ9wgRanAQpEiENk73iGhg`, "IMK") into Next.js App Router pages.

Decisions:
- Generate pages as **TypeScript (.tsx)** even though the scaffold is plain JS — requires adding tsconfig + React types and converting layout/page.
- Folder structure under `/app` to be proposed for user approval *after* reading the design (user chose "I'll decide after you see it").
- Stack: Next 16, React 19, Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline` in app/globals.css).

Status (2026-06-16): DONE — all 10 unique screens generated as TypeScript App Router pages; `next build` + `eslint` pass clean. Figma file key `QQ9wgRanAQpEiENk73iGhg`, single page `0:1`.

Implementation notes:
- The Figma MCP **tool-call limit** (Starter plan) was hit after a few reads — could NOT use `get_design_context`. Built instead from the full `get_metadata` XML, whose layer names encode HTML tag + utility classes (e.g. `h2.font-headline-xl-mobile`, `button.w-full`) and whose text-node names carry the real copy. If revisiting, the rich metadata + a couple of screenshots is enough; design-context calls are scarce.
- Routes: `/` (onboarding gesture), `/obat/{scan,detail,riwayat,calendar}`, `/kemasan/{scan,detail,riwayat,calendar}`, `/pengaturan`. The 3 "Modal Container" / "Frame" frames are all the same Juni-2026 date-picker → one `CalendarModal` component. "Setting" and "Page Pengaturan" are duplicates → one page.
- Shared chrome in `app/components/`: BottomNav (DOKUMEN/OBAT/KEMASAN), AppHeader, VoiceGuideBadge, BacaSuaraButton (Web Speech `id-ID`), ScanScreen, DetailScreen, HistoryCard, SearchBar, CalendarModal, PhoneFrame, Icons.
- Design tokens in globals.css `@theme`: primary `#ffc700`, ink `#0a0a0a`, high-contrast accessibility theme. Font scale driven live by `--font-scale` from Pengaturan.
- Riwayat-kemasan card titles were renamed to packaging names (Ultra Milk / Biskuit Gandum) since the Figma prototype reused medicine names with nutrition data — a placeholder artifact.

REBUILD (2026-06-16, later same day): user supplied a full written spec that supersedes the Figma-derived structure. App re-architected to that spec; `next build` + `eslint` clean. New IA:
- Tabs: DOKUMEN / OBAT / KEMASAN. Routes: `/`→redirect `/splash`; `/splash`, `/tutorial` (4 gesture steps), `/dokumen` (+`/voice-search`, `/[id]` TTS reader), `/kemasan` (camera) + `/scan-success` + `/[id]` + `/riwayat`, `/obat` (placeholder), `/pengaturan`.
- `app/context/SettingsContext.tsx`: theme/fontSize/volume/audioSpeed/hasVisited persisted to localStorage key `svaralens:settings`; applies `.dark` class + `--font-scale` to <html>. Hydration-from-storage effect has an intentional `react-hooks/set-state-in-effect` disable (render-time read would cause SSR mismatch).
- Theming via CSS vars that flip on `html.dark` (tokens: paper/ink/heading/surface/muted/line; primary `#FBBF24` constant). Use `border-line` (not border-ink) so borders re-theme.
- `app/hooks/useSpeech.ts`: Web Speech API, rate by audioSpeed (lambat .7/normal 1/cepat 1.4), volume from settings. Dokumen `/[id]` has its own paragraph-by-paragraph reader (play/pause, LEWATI PARAGRAF, BACA ULANG, active-paragraph highlight).
- Mock data in `app/data/content.ts` (DOCUMENTS, PACKAGES). Kemasan camera uses getUserMedia with dark-gradient fallback.
- `next.config.mjs` sets `turbopack.root = __dirname` to silence multi-lockfile warning (a `C:\Users\Mitra\pnpm-lock.yaml` exists higher up).
- Pengaturan: every control calls `update()` (live + persisted); SIMPAN shows "✓ TERSIMPAN". BottomNav hidden on `/`, `/splash`, `/tutorial`, `/pengaturan`, `/dokumen/voice-search`.

DEV-SERVER GOTCHA (important): the project path contains spaces (`SEM 4`, `Interaksi Manusia Komputer`, `Final Project`) AND there's a stray `C:\Users\Mitra\pnpm-lock.yaml` in the home dir, so Next infers the workspace root as `C:\Users\Mitra`. Under that root, **Turbopack dev HMR panics** (`TurbopackInternalError: Resource path "app/components/BottomNav.tsx" needs to be on project filesystem …`) and retries ~3×/sec → constant reload/glitching in the browser. `next build` is unaffected (no HMR). FIX: `dev` script uses `next dev --webpack` (Webpack handles the spaced path fine); build/start stay on Turbopack. Do NOT set `turbopack.root`/`outputFileTracingRoot` to a spaced path — that triggers the same panic (a different manifestation). The multi-lockfile warning is cosmetic; leave it. Don't delete the home pnpm-lock (outside project, not ours).
