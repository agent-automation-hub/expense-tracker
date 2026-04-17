# Ledger — Personal Expense Tracker

A personal finance app for tracking expenses and earnings in Colombian Pesos (COP). Built with an editorial-minimal fintech aesthetic — the interface bets on _glanceability_: know in two seconds whether this month is red or green.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Database**: Supabase (PostgreSQL) via Drizzle ORM + `postgres.js` driver
- **Styling**: Inline styles with a design token system (no CSS-in-JS library, Tailwind present but only used for globals reset)
- **Fonts**: Fraunces (serif display), Inter (sans UI), JetBrains Mono (mono amounts) — loaded via `next/font/google`
- **Package manager**: pnpm
- **Linting/Formatting**: ESLint + Prettier (no semicolons, import sort via `@trivago/prettier-plugin-sort-imports`)

## Project Structure

```
app/
├── layout.tsx              # Root layout — fonts, metadata
├── globals.css             # Reset, CSS vars, keyframes
├── page.tsx                # Dashboard (hero stats + activity + categories)
├── activity/page.tsx       # All transactions, grouped by day
├── add/page.tsx            # Add transaction form (expense/earning toggle)
├── categories/page.tsx     # Category list with amounts
├── export/page.tsx         # Export wizard (PDF/CSV/XLSX)
├── review/page.tsx         # AI extraction review with confidence scores
└── upload/page.tsx         # AI file upload (drop zone + queue)

components/
├── dashboard/
│   ├── hero-stats.tsx      # Earned / Spent / Net balance with sparkline
│   ├── recent-activity.tsx # Last 7 transactions card
│   └── category-breakdown.tsx  # Donut chart + top categories + AI promo
├── layout/
│   ├── app-shell.tsx       # Full-height flex shell (sidebar + main)
│   ├── sidebar.tsx         # Nav links, quick add buttons, user avatar
│   └── top-bar.tsx         # Greeting, search, filter, add button
├── transactions/
│   ├── tx-row.tsx          # Desktop transaction row (grid layout)
│   ├── mobile-tx-row.tsx   # Mobile transaction row (flex layout)
│   ├── review-row.tsx      # AI review row with confidence dot
│   └── upload-row.tsx      # File upload progress (scanning/extracted/ready)
└── ui/                     # Atom-level components
    ├── action-card.tsx     # Quick action card (coral/teal tone)
    ├── button.tsx          # Multi-variant button (primary/ghost/coral/teal/light) × 3 sizes
    ├── chip.tsx            # Pill/chip — 5 tones (neutral/ink/coral/teal/ghost) × 2 sizes
    ├── display-number.tsx  # Serif display number with tabular font features
    ├── donut.tsx           # SVG donut chart with stroke segments + center content
    ├── dot.tsx             # Color swatch dot
    ├── eyebrow.tsx         # Small uppercase label
    ├── field.tsx           # Form field row (label + value or custom right node)
    ├── icons.tsx           # 16 SVG icon components
    ├── mono-number.tsx     # Monospace tabular number
    ├── rule.tsx            # Hairline divider
    ├── sparkline.tsx       # SVG bar sparkline
    └── type-glyph.tsx      # Transaction type indicator (+/−) with colored background

lib/
├── db/
│   ├── index.ts            # Drizzle client (`prepare: false` for Supabase pooling)
│   └── schema.ts           # Full schema: 6 tables, 6 enums, relations
├── design/
│   └── tokens.ts           # Design tokens (T object) + catColors map
├── mock/
│   └── data.ts             # Mock data: categories, transactions, totals, breakdown, spark
└── utils/
    └── format.ts           # fmtCOP() and fmtCOPraw() currency formatters

drizzle/                    # Migration output from drizzle-kit
drizzle.config.ts           # Drizzle Kit config
base/                       # Original design mockup (JSX reference, not used at runtime)
```

## Database Schema (Drizzle)

6 tables in `lib/db/schema.ts`:

| Table                       | Purpose                                 |
| --------------------------- | --------------------------------------- |
| `profiles`                  | User profiles (linked to Supabase Auth) |
| `categories`                | Expense/income categories per user      |
| `transactions`              | All financial transactions              |
| `uploaded_files`            | Files uploaded for AI extraction        |
| `ai_extractions`            | AI extraction jobs per uploaded file    |
| `ai_extracted_transactions` | Individual entries extracted by AI      |

6 enums: `category_scope`, `transaction_type`, `transaction_status`, `upload_status`, `extraction_status`, `review_status`.

Circular FK between `transactions.aiExtractionId` and `aiExtractedTransactions.confirmedTransactionId` is handled by omitting the inline `.references()` on `transactions.aiExtractionId` — the relation is defined in `transactionsRelations` only.

**Connection**: Use Supabase Transaction Pooler (port 6543) with `{ prepare: false }`.

## Design System

All visual values live in `lib/design/tokens.ts` as the `T` object:

- **Colors**: ivory (#F4F1EC), paper (#FBF9F5), ink (#141311), muted (#8A847B), rule (#E4DFD5)
- **Semantic**: coral (#D66A4E) = money out/expenses, teal (#3E8B85) = money in/earnings
- **Fonts**: `T.serif` (Fraunces), `T.sans` (Inter), `T.mono` (JetBrains Mono)
- **Category colors**: `catColors` map — rent=ink, food=coral, trans=#E89B7D, etc.

Components use inline `style={{}}` props referencing `T.*` tokens directly. No CSS modules or Tailwind utility classes in components.

## Key Design Decisions

- **Light mode only** (for now)
- **Web-first** — mobile components exist (`mobile-tx-row.tsx`) but pages are desktop-focused
- **Mock data** — all API calls are mocked via `lib/mock/data.ts`. Real Supabase integration is the next step.
- **No RLS yet** — Row Level Security was explored but deferred
- **Inline styles** — deliberate choice to keep the editorial aesthetic tightly coupled to tokens, no class-based styling

## Development

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm format       # Prettier (writes)
pnpm format:check # Prettier (check only)
```

## What's Next

- Wire up Supabase auth + real data queries (replace mock data)
- Add Row Level Security policies
- Mobile responsive layouts
- Transaction CRUD operations
- AI file upload + extraction pipeline
- Export functionality (PDF/CSV/XLSX generation)
