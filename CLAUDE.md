# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

The Strivers' Network — a **Payload CMS 3 + Next.js 15 (App Router)** site served as a single instance. Payload's admin/API and the public website run in the same Next app. Postgres (Neon) via `@payloadcms/db-vercel-postgres`, media on Vercel Blob, email via Resend, package manager **pnpm** (Node >= 20.9).

## Commands

```bash
pnpm dev                       # dev server — app at :3000, admin at :3000/admin
pnpm build                     # production build (also runs next-sitemap postbuild)
pnpm lint                      # ESLint (eslint-config-next); pnpm lint:fix to autofix
pnpm generate:types            # regenerate src/payload-types.ts from the Payload schema
pnpm generate:importmap        # regenerate the admin import map (see below)

pnpm test                      # int + e2e
pnpm test:int                  # Vitest (jsdom) — vitest.config.mts
pnpm test:e2e                  # Playwright — playwright.config.ts
pnpm exec vitest run path/to/file.int.spec.ts    # single int test
pnpm exec playwright test -g "test name"          # single e2e test

pnpm payload migrate:create    # create a Postgres migration after schema changes
pnpm payload migrate           # run pending migrations (server: before pnpm start)
```

Env vars needed to run: `POSTGRES_URL`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, `RESEND_API_KEY`, `NEXT_PUBLIC_SERVER_URL` (copy `.env.example` → `.env`).

## Critical workflows

- **After changing any collection, global, block, or field config, run `pnpm generate:types`.** Frontend components import their prop types from `@/payload-types` (e.g. `import type { TeamBlock as TeamBlockProps } from '@/payload-types'`), so the build breaks until types are regenerated.
- **Schema / DB:** the Postgres adapter uses `push: true` in dev, so field/collection changes auto-sync to the local DB with no migration. Point at production only with `push: false` and proper migrations, or you risk data loss.
- **Admin import map:** any config value that references a custom React component by string path (`'@/components/.../index.tsx#Export'`, as in `payload.config.ts` admin components) requires `pnpm generate:importmap`. The blocks below use only built-in field types and do NOT need this.

## Architecture

- **`src/payload.config.ts`** is the root of the backend: registers collections (`Pages, Posts, Comments, Media, Categories, Users`), globals (`Header, Footer, Settings`), the DB adapter, email, storage, and `src/plugins/index.ts` (SEO, search, redirects, form-builder, nested-docs). Types output to `src/payload-types.ts`.
- **Two App Router groups:** `src/app/(payload)` hosts the admin UI + REST/GraphQL API; `src/app/(frontend)` is the public site. Collections/globals are edited in the admin and rendered on the frontend.
- **Page rendering flow:** `src/app/(frontend)/[slug]/page.tsx` fetches a page via the Payload **local API** (`getPayload({ config })`, cached with React `cache`), respecting `draftMode()`, then renders `<RenderHero {...hero} />` + `<RenderBlocks blocks={layout} />`. Posts render similarly under `(frontend)/posts`.
- **Content model:** Pages and Posts are draft-enabled (versions + autosave) with live preview. `afterChange` hooks trigger on-demand revalidation of the frontend. Access control lives in `src/access/*` (e.g. `authenticatedOrPublished`, `admin`) and is wired per-collection.

## Layout blocks (the core extension point)

Two distinct block mechanisms — do not confuse them:

- **Pages** expose a top-level `layout` field of `type: 'blocks'` (`src/collections/Pages/index.ts`). Each block = a folder in `src/blocks/<Name>/` with `config.ts` (Payload schema) + `Component.tsx` (React render). The full block set (Content, CTA, Team, Testimonials, Stats, FAQ, Scholar Case Study, etc.) is available here.
- **Posts** embed a *limited* block set **inline inside the Lexical rich-text editor** via `BlocksFeature({ blocks: [Banner, Code, MediaBlock] })` (`src/collections/Posts/index.ts`) — not a top-level layout field.

**To add a new Pages layout block, touch three places (plus regenerate types):**
1. Create `src/blocks/<Name>/config.ts` — export a Payload `Block` with a unique `slug`, an `interfaceName` (becomes the generated TS type), and its fields.
2. Create `src/blocks/<Name>/Component.tsx` — `React.FC<...>` importing its props type from `@/payload-types`.
3. Register in `src/blocks/RenderBlocks.tsx` — import the component and add it to the `blockComponents` map keyed by the config **`slug` (the map key must equal the slug)**.
4. Register the config in the `layout.blocks` array in `src/collections/Pages/index.ts`, then run `pnpm generate:types`.

Follow existing blocks (`TeamBlock`, `Testimonials`, `CallToAction`) for conventions:
- Standard block shell: `<div className="w-full py-10 lg:py-20"><div className="container mx-auto">…`.
- Images: render via `@/components/Media` (`<Media resource={x} imgClassName="…" />`), never raw `next/image`. Uploads can be an ID or a populated object — always guard with `typeof x === 'object'`.
- Rich text: the default export `RichText` from `@/components/RichText` (`<RichText data={…} enableGutter={false} />`); define richText fields with `lexicalEditor({ features })` (see `CallToAction/config.ts`).

## Styling

- **Tailwind 3 + shadcn/ui.** The tokens actually wired into `tailwind.config.mjs` / `src/app/(frontend)/globals.css` are the generic shadcn HSL/oklch variables (`bg-card`, `text-muted-foreground`, `bg-primary`, …). Default theme is **dark** (`darkMode: [data-theme="dark"]`). Match these tokens for visual consistency with shipped blocks.
- `.cursor/DESIGN.md` is an **aspirational** design spec (Striver Purple / Achievement Gold, Funnel Display, 96px rhythm, named tokens like `surface-plum`, `scholar-card`). Those tokens/fonts are **not yet implemented** in the Tailwind config — do not assume they exist; add them first if a task requires honoring the spec.
- **Two `cn()` helpers:** `@/utilities/ui` (used by blocks/frontend components) and `@/lib/utils` (used by `src/components/ui/*` shadcn components). Both wrap clsx + tailwind-merge.
- **Safelist gotcha:** Tailwind can't detect string-interpolated class names (e.g. `` `lg:col-span-${n}` ``). Any dynamically-built class must be added to `safelist` in `tailwind.config.mjs`. Prefer static/conditional classes to avoid this.

## Conventions

- Import alias `@/*` → `src/*`.
- `next.config.js` allows remote images only from the server URL and `*.blob.vercel-storage.com`; add hosts there for new image sources.
- Analytics (Google Analytics 4 + a custom admin `/analytics` view) lives in `src/lib/ganalytics.ts`, `src/components/AnalyticsView`, and is mounted as a custom admin view in `payload.config.ts`.
