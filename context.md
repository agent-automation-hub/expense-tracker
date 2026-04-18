# Ledger — Personal Expense Tracker

A personal finance app for tracking expenses and earnings in Colombian Pesos (COP). Built with an editorial-minimal fintech aesthetic — the interface bets on *glanceability*: know in two seconds whether this month is red or green.

Installable as a PWA (home-screen app, standalone display, offline shell cache).

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19, Turbopack)
- **Auth & DB**: Supabase (PostgreSQL + Auth) via `@supabase/ssr`
- **ORM**: Drizzle ORM + `postgres.js` driver (for direct DB queries when needed)
- **Styling**: Inline styles with a design token system (no CSS-in-JS library, Tailwind present but only used for the global reset)
- **Fonts**: Fraunces (serif display), Inter (sans UI), JetBrains Mono (mono amounts) — loaded via `next/font/google`
- **PWA**: Native Next.js Metadata API for manifest + Apple icons, custom service worker in `public/sw.js`
- **Package manager**: pnpm
- **Linting/Formatting**: ESLint + Prettier (no semicolons, import sort via `@trivago/prettier-plugin-sort-imports`)

## Project Structure

```
app/
├── layout.tsx               # Root layout — fonts, metadata, viewport, SW registrar
├── globals.css              # Reset, CSS vars, safe-area insets, keyframes
├── manifest.ts              # PWA Web App Manifest (standalone, theme ink/ivory)
├── icon.tsx                 # 32×32 favicon (ImageResponse)
├── apple-icon.tsx           # 180×180 Apple touch icon (ImageResponse)
├── page.tsx                 # Dashboard (hero stats + activity + categories)
├── activity/
│   ├── page.tsx             # Server component (user fetch + shell)
│   └── activity-view.tsx    # Client view — transactions grouped by day, type filter
├── add/page.tsx             # Add transaction form (expense/earning toggle)
├── categories/page.tsx      # Category list with amounts
├── export/page.tsx          # Export wizard (PDF/CSV/XLSX)
├── review/page.tsx          # AI extraction review with confidence scores
├── upload/page.tsx          # AI file upload (drop zone + queue)
└── auth/
    ├── actions.ts           # Server action: logout()
    ├── callback/route.ts    # OAuth / magic link callback
    ├── login/page.tsx       # Login form
    └── register/page.tsx    # Register form

components/
├── dashboard/
│   ├── hero-stats.tsx           # Earned / Spent / Net balance with sparkline
│   ├── recent-activity.tsx      # Last 7 transactions card
│   └── category-breakdown.tsx   # Donut chart + top categories + AI promo
├── layout/
│   ├── app-shell.tsx        # Full-height flex shell (sidebar + main)
│   ├── sidebar.tsx          # Nav links, quick add buttons, user avatar
│   └── top-bar.tsx          # Greeting, search, filter, add button
├── transactions/
│   ├── tx-row.tsx           # Desktop transaction row (grid layout)
│   ├── mobile-tx-row.tsx    # Mobile transaction row (flex layout)
│   ├── review-row.tsx       # AI review row with confidence dot
│   └── upload-row.tsx       # File upload progress (scanning/extracted/ready)
├── pwa/
│   └── service-worker-registrar.tsx  # Client component — registers /sw.js in production only
└── ui/                      # Atom-level components
    ├── action-card.tsx      # Quick action card (coral/teal tone)
    ├── button.tsx           # Multi-variant button (primary/ghost/coral/teal/light) × 3 sizes
    ├── calendar.tsx         # Date picker / calendar component
    ├── chip.tsx             # Pill/chip — 5 tones (neutral/ink/coral/teal/ghost) × 2 sizes
    ├── display-number.tsx   # Serif display number with tabular font features
    ├── donut.tsx            # SVG donut chart with stroke segments + center content
    ├── dot.tsx              # Color swatch dot
    ├── eyebrow.tsx          # Small uppercase tracked label
    ├── field.tsx            # Form field row (label + value or custom right node)
    ├── icons.tsx            # SVG icon components
    ├── mono-number.tsx      # Monospace tabular number
    ├── rule.tsx             # Hairline divider
    ├── sparkline.tsx        # SVG bar sparkline
    └── type-glyph.tsx       # Transaction type indicator (+/−) with colored background

lib/
├── db/
│   ├── index.ts             # Drizzle client (`prepare: false` for Supabase pooling)
│   └── schema.ts            # Full schema: 6 tables, 6 enums, relations
├── supabase/
│   ├── client.ts            # Browser Supabase client
│   ├── server.ts            # Server Supabase client (reads cookies via next/headers)
│   └── middleware.ts        # Session refresh + auth redirect logic used by proxy.ts
├── design/
│   └── tokens.ts            # Design tokens (T object) + catColors map
├── mock/
│   └── data.ts              # Mock transaction data (still used on dashboard/activity)
└── utils/
    └── format.ts            # fmtCOP() and fmtCOPraw() currency formatters

public/
├── sw.js                    # Service worker — network-first HTML, cache-first assets
├── icon.svg                 # PWA manifest icon (any purpose, rounded)
└── icon-maskable.svg        # PWA manifest icon (maskable, safe-zone 80%)

drizzle/                     # Migration output from drizzle-kit
drizzle.config.ts            # Drizzle Kit config
proxy.ts                     # Next.js 16 edge middleware — runs Supabase session refresh + auth gating
base/                        # Original design mockup (JSX reference, not used at runtime — gitignored)
```

## Auth & Session Flow

Next.js 16 renamed `middleware.ts` → `proxy.ts`. Our `proxy.ts` at the root delegates to `lib/supabase/middleware.ts#updateSession()`, which:

1. Creates a Supabase SSR client bound to the request cookies.
2. Calls `auth.getUser()` to refresh the session.
3. **Auth gating**: if there's no user and the route is not `/auth/*`, redirects to `/auth/login`. If there IS a user and they hit `/auth/login` or `/auth/register`, redirects to `/`.
4. Returns a `NextResponse` with refreshed session cookies.

The matcher excludes `_next/static`, `_next/image`, and static assets, so the middleware runs on every page and API request.

Server components read the user via `createClient()` from `lib/supabase/server.ts`. Browser clients (forms) use `lib/supabase/client.ts`.

## PWA

The app is installable on desktop Chrome, Android Chrome, and iOS Safari (Add to Home Screen).

- **Manifest** (`app/manifest.ts`): `display: standalone`, `theme_color: #141311`, `background_color: #F4F1EC`, category `finance`, two icons (regular + maskable).
- **Icons**: SVG icons in `public/` (scalable, zero-font-dep — uses Georgia/Times fallback serif "L"). Favicon and Apple touch icon are generated via `next/og` `ImageResponse` in `app/icon.tsx` and `app/apple-icon.tsx`.
- **Service worker** (`public/sw.js`): versioned caches (`ledger-v1-static` and `ledger-v1-runtime`). Strategy:
  - Navigation requests → network-first, cache fallback.
  - `_next/static/*` + image/font/css/js assets → cache-first.
  - `/api/*` and cross-origin (Supabase) → bypass, always network.
- **Registration**: `ServiceWorkerRegistrar` client component only registers in `NODE_ENV === "production"` to avoid dev HMR conflicts.
- **iOS standalone polish**: `env(safe-area-inset-*)` on body + `overscroll-behavior-y: none` for app-like feel.

## Database Schema (Drizzle)

6 tables in `lib/db/schema.ts`:

| Table                       | Purpose                                  |
|-----------------------------|------------------------------------------|
| `profiles`                  | User profiles (linked to Supabase Auth)  |
| `categories`                | Expense/income categories per user       |
| `transactions`              | All financial transactions               |
| `uploaded_files`            | Files uploaded for AI extraction         |
| `ai_extractions`            | AI extraction jobs per uploaded file     |
| `ai_extracted_transactions` | Individual entries extracted by AI       |

6 enums: `category_scope`, `transaction_type`, `transaction_status`, `upload_status`, `extraction_status`, `review_status`.

Circular FK between `transactions.aiExtractionId` and `aiExtractedTransactions.confirmedTransactionId` is handled by omitting the inline `.references()` on `transactions.aiExtractionId` — the relation is defined in `transactionsRelations` only.

**Connection**: Use Supabase Transaction Pooler (port 6543) with `{ prepare: false }`.

## Design System

All visual values live in `lib/design/tokens.ts` as the `T` object:

- **Colors**: ivory (#F4F1EC), paper (#FBF9F5), ink (#141311), ink2 (#2B2926), muted (#8A847B), faint (#C8C2B6), rule (#E4DFD5), rule2 (#EAE5DB)
- **Semantic**: coral (#D66A4E) = money out/expenses (+ coralSoft/coralBg), teal (#3E8B85) = money in/earnings (+ tealSoft/tealBg)
- **Fonts**: `T.serif` (Fraunces), `T.sans` (Inter), `T.mono` (JetBrains Mono)
- **Category colors**: `catColors` map — rent=ink, food=coral, trans=#E89B7D, etc.

Components use inline `style={{}}` props referencing `T.*` tokens directly. No CSS modules or Tailwind utility classes in components.

## Key Design Decisions

- **Light mode only** (for now) — `theme_color` in the manifest still declares a dark variant for PWA chrome in dark-mode devices.
- **Web-first, mobile-ready** — `mobile-tx-row.tsx` exists; layout adapts reasonably on narrow viewports thanks to safe-area insets and the PWA standalone mode.
- **Real auth, mock data** — Supabase auth is wired end-to-end (login, register, logout, session refresh via proxy). Transactions/categories still come from `lib/mock/data.ts`; wiring to real DB queries is the next milestone.
- **No RLS yet** — Row Level Security was explored but deferred until real data queries ship.
- **Inline styles** — deliberate choice to keep the editorial aesthetic tightly coupled to tokens, no class-based styling.
- **`proxy.ts` over `middleware.ts`** — adopted Next.js 16's new naming; runs Supabase session refresh + auth gating.

## Development

```bash
pnpm dev            # Dev server on localhost:3000 (SW disabled)
pnpm build          # Production build
pnpm start          # Production server (required to test SW/PWA locally)
pnpm lint           # ESLint
pnpm format         # Prettier (writes)
pnpm format:check   # Prettier (check only)
npx tsc --noEmit    # Type-check without emitting
```

Drizzle migrations:

```bash
npx drizzle-kit generate   # Generate migration from schema changes
npx drizzle-kit push       # Push schema directly to database
npx drizzle-kit migrate    # Run pending migrations
```

## Environment Variables

Required in `.env`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `DATABASE_URL` (Supabase Transaction Pooler, port 6543)

## What's Next

- Replace mock data with real Supabase queries (transactions, categories, totals)
- Add Row Level Security policies
- Full mobile responsive layouts (sidebar collapse, bottom nav)
- Transaction CRUD operations wired to the form at `/add`
- AI file upload + extraction pipeline (`uploaded_files` → `ai_extractions` → `ai_extracted_transactions` → confirmed `transactions`)
- Export functionality (PDF/CSV/XLSX generation)
- Push notifications (PWA — requires separate subscription flow)
