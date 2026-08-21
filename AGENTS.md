# Repository Guidelines

## Project Overview

The Strivers' Network is one Next.js 15 App Router application with Payload CMS 3 embedded in-process. The public site, Payload admin, REST/GraphQL APIs, and scheduled jobs ship together. Content is stored in Postgres (Neon), media in Vercel Blob, and email is sent through Resend.

## Architecture & Data Flow

- `src/payload.config.ts` is the composition root. It registers collections, globals, plugins, Postgres, Blob storage, email, admin customizations, and job authorization.
- `src/app/(payload)` exposes Payload admin/API routes; `src/app/(frontend)` contains the public site. Do not introduce a separate backend or make HTTP calls from server components back into this same app.
- Public pages use Payload's typed local API: server component → `getPayload({ config })` → React `cache()` query → `RenderHero` / `RenderBlocks` → block component. `src/app/(frontend)/[slug]/page.tsx` is the reference flow and honors `draftMode()`.
- Payload collection hooks perform push-based cache invalidation with `revalidatePath` and `revalidateTag`; see `src/collections/Pages/hooks/revalidatePage.ts`. Preserve the `context.disableRevalidate` escape hatch used by imports or bulk operations.
- Access control is declarative and collection-scoped. Compose the small Payload `Access` functions in `src/access/*`; some return row-level `where` filters rather than booleans.
- Pages and Posts use different block systems. Pages have a top-level `layout` blocks field. Posts embed only `Banner`, `Code`, and `MediaBlock` inside Lexical rich text.

### Adding a Pages layout block

1. Add `src/blocks/<Name>/config.ts` with a unique `slug`, `interfaceName`, and fields.
2. Add `src/blocks/<Name>/Component.tsx`, using generated props from `@/payload-types`.
3. Register the component under the exact same slug in `src/blocks/RenderBlocks.tsx`.
4. Register the block config in `src/collections/Pages/index.ts` and run `pnpm generate:types`.

## Key Directories

- `src/app/(frontend)`: public App Router pages, route handlers, global styles, and sitemap routes.
- `src/app/(payload)`: generated/wired Payload admin and API routes.
- `src/collections`: Payload schemas and lifecycle hooks for Pages, Posts, Comments, Media, Categories, and Users.
- `src/blocks`: page layout schemas and their React renderers; `RenderBlocks.tsx` is the dispatcher.
- `src/access`: reusable role, authentication, and publication-state policies.
- `src/components`: shared frontend, admin, media, rich-text, and shadcn components.
- `src/Header`, `src/Footer`, `src/Settings`: Payload globals and frontend renderers.
- `src/providers`: client-side theme contexts; there is no Redux/Zustand store.
- `src/plugins`: Payload plugin composition for SEO, search, redirects, forms, and nested docs.
- `src/lib`: server integrations such as GA4 analytics.

Content lives in Postgres, not a checked-in `content/` or `data/` directory. There is no separate `scripts/` directory or committed CI workflow.

## Development Commands

Run commands from the repository root with pnpm:

```bash
pnpm dev                       # app :3000; Payload admin :3000/admin
pnpm build                     # Next production build, then next-sitemap postbuild
pnpm start                     # serve an existing production build
pnpm ci                        # run Payload migrations, then build
pnpm lint                      # configured lint command; pnpm lint:fix applies fixes
pnpm exec tsc --noEmit         # ad hoc typecheck; no package script exists
pnpm generate:types            # regenerate src/payload-types.ts after schema changes
pnpm generate:importmap        # regenerate admin imports after string-path component changes
pnpm payload migrate:create    # create a production schema migration
pnpm payload migrate           # apply pending migrations
```

Development uses Payload database `push: true`, so local schema changes auto-sync. Production must use migrations and `push: false`; never point development push mode at production data. `pnpm build` also generates sitemap/robots output through `next-sitemap.config.cjs`.

## Code Conventions & Common Patterns

- TypeScript is strict. Use `@/*` for `src/*` and `@payload-config` for `src/payload.config.ts`.
- Follow existing functional React and Payload config-object patterns. Keep server rendering as the default; add `'use client'` only for browser state, effects, or event handlers.
- Block folders use PascalCase names and paired `config.ts` / `Component.tsx` files. Collection/global modules conventionally export Payload config objects from `index.ts`.
- Generated `src/payload-types.ts` is the source of frontend schema props. Regenerate it; do not hand-edit it.
- No dependency-injection container is used. Dependencies are direct ES imports plus Payload's composed configuration and request context.
- Global client state is limited to React Context in `src/providers`; page content is fetched on the server, not through a client query store.
- Async server reads use `async`/`await`, React `cache()` for repeated Payload queries, and concurrent `Promise.all` where independent. External analytics calls in `src/lib/ganalytics.ts` fail soft with `null`; Payload hooks generally let lifecycle errors propagate. Match the local boundary rather than swallowing every error.
- Use early guards for union-shaped Payload values, especially uploads: IDs and populated objects must be distinguished with `typeof value === 'object'`.
- Render uploads with `@/components/Media` and rich text with `@/components/RichText`; do not create parallel renderers.
- Styling uses Tailwind CSS 3 and shadcn tokens. Dark mode is selected by `[data-theme="dark"]`. Prefer static or conditional class strings; add unavoidable generated utilities to `tailwind.config.mjs` safelist.
- Use the local `cn()` convention: `@/utilities/ui` for frontend/blocks and `@/lib/utils` within `src/components/ui`.
- ESLint extends `next/core-web-vitals` and `next/typescript`; unused values prefixed with `_` are accepted. Prettier is installed but has no committed config or script, so preserve nearby formatting.

## Important Files

- `src/payload.config.ts`: backend composition root and generated-type destination.
- `src/app/(frontend)/[slug]/page.tsx`: canonical page query/render path.
- `src/collections/Pages/index.ts`: layout blocks, drafts, preview, hooks, and access wiring.
- `src/blocks/RenderBlocks.tsx`: slug-to-component registry.
- `src/payload-types.ts`: generated CMS types; never edit manually.
- `package.json`: authoritative commands, versions, runtime, and package-manager constraints.
- `tsconfig.json`: strict compiler settings and aliases.
- `next.config.js`: Payload integration, redirects, server URL, and remote-image allowlist.
- `tailwind.config.mjs` and `components.json`: Tailwind/shadcn theme and aliases.
- `eslint.config.mjs`: lint rules and ignored paths.
- `next-sitemap.config.cjs`: post-build sitemap and robots generation.
- `vercel.json`: daily `/api/payload-jobs/run` cron schedule.
- `redirects.js`: static Next.js redirects.

## Runtime/Tooling Preferences

- Use Node `^18.20.2` or `>=20.9.0` and pnpm `10.20.0`, as pinned in `package.json`. Do not create npm or Yarn lockfiles.
- Keep `.npmrc` settings (`legacy-peer-deps=true`, `enable-pre-post-scripts=true`) when installing dependencies.
- The project is ESM (`"type": "module"`); CommonJS-only configuration uses `.cjs`.
- Required runtime configuration includes Postgres, Payload secret, Blob storage, Resend, and the public server URL. No `.env.example` is committed despite README references. Never print or commit `.env`; document new variables without secret values.
- Vercel is the deployment target. A build may require valid Payload/Postgres configuration, and remote image hosts must be explicitly allowed in `next.config.js`.

## Testing & QA

`package.json` declares:

```bash
pnpm test                       # integration, then end-to-end
pnpm test:int                   # Vitest via ./vitest.config.mts
pnpm test:e2e                   # Playwright via playwright.config.ts
pnpm exec vitest run path/to/file.int.spec.ts
pnpm exec playwright test -g "test name"
```

Current limitation: no test files, fixtures, mocks, `vitest.config.mts`, or `playwright.config.ts` are committed. The declared test commands therefore cannot run until those configs and suites are added. No coverage thresholds or CI test gate exist. Do not claim test coverage from installed dependencies alone.

For changes that can be checked today, run the narrowest applicable command plus `pnpm exec tsc --noEmit`; use `pnpm build` for production/build-path changes. When establishing tests, follow the documented `*.int.spec.ts` convention for Vitest and keep Playwright scenarios focused on public/admin user flows.
