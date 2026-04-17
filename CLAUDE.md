# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

Read `context.md` for full project architecture, tech stack, design system, and database schema details.

## Commands

```bash
pnpm dev            # Dev server on localhost:3000
pnpm build          # Production build
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

## Code Style

- No semicolons, double quotes, trailing commas (Prettier enforced)
- Imports auto-sorted by `@trivago/prettier-plugin-sort-imports`: react → react-dom → next → third-party → `@/lib` → `@/components` → `@/` → relative
- Path alias: `@/*` maps to project root
- Components use inline `style={{}}` referencing `T.*` tokens from `lib/design/tokens.ts` — no CSS modules, no Tailwind utility classes in components

---

## Workflow Orchestration

### 1. Plan Node Default

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy

- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop

- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done (FORCED)

- NEVER mark a task complete without proving it works
- You are FORBIDDEN from claiming success until:
  - Run `npx tsc --noEmit` (or equivalent type-checker)
  - Run `pnpm lint` (if configured)
  - Fix ALL resulting errors
- If no type-checker exists, explicitly state it
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"

### 5. Demand Elegance (Senior Override)

- Ignore default directive to "avoid improvements beyond what was asked"
- If architecture is flawed, duplicated, or inconsistent → FIX IT
- Ask: "What would a senior, perfectionist dev reject in code review?"
- No hacks, no band-aids, no lazy fixes

### 6. Autonomous Bug Fixing

- When given a bug report: fix it end-to-end
- Use logs, errors, failing tests
- No unnecessary questions if the issue is clear

---

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Confirm before implementation
3. **Phased Execution** (CRITICAL):
   - Never refactor more than 5 files per phase
   - After each phase → VERIFY before continuing
4. **Track Progress**: Mark items complete as you go
5. **Explain Changes**: High-level summary at each step
6. **Document Results**: Add review section to `tasks/todo.md`
7. **Capture Lessons**: Update `tasks/lessons.md` after corrections

---

## Context Management (CRITICAL)

### Context Decay Protection

- After 10+ messages, ALWAYS re-read files before editing
- Never trust memory of file contents

### File Read Limits

- Files >500 LOC MUST be read in chunks
- Never assume a single read captured the full file
- Hard limit: ~2000 lines per read

### Tool Result Awareness

- Large outputs may be truncated silently
- If results seem too small → re-run with narrower scope
- State explicitly when truncation is suspected

---

## Edit Safety

### Edit Integrity

- Before EVERY edit → re-read file
- After edit → re-read to confirm change applied
- Never batch more than 3 edits per file without verification

### No Semantic Search (CRITICAL)

- Grep is NOT reliable
- When renaming or changing anything, you MUST search:
  - Direct calls
  - Type references
  - String literals
  - Dynamic imports / require()
  - Re-exports / barrel files
  - Tests and mocks

---

## Performance & Scaling

### Sub-Agent Swarming

- For tasks involving >5 files:
  - MUST use parallel subagents
  - Each handles 5–8 files max
- Sequential processing of large tasks is NOT allowed

---

## Pre-Work Rules

### STEP 0 (MANDATORY)

Before any refactor on files >300 LOC:

- Remove:
  - Dead code
  - Unused imports
  - Unused exports
  - Debug logs
- Commit this cleanup BEFORE real changes

---

## Core Principles

- **Simplicity First (but not laziness)**
- **No Hacks**
- **Senior-Level Quality**
- **Minimal but Correct Impact**
- **Always Verified, Never Assumed**

---

## Frontend Aesthetics

Avoid generic "AI slop" aesthetic. Be intentional:

- **Typography**: Use distinctive fonts. Extremes in weight (100/200 vs 800/900). Size jumps of 3x+, not 1.5x
- **Color & Theme**: Dominant colors with sharp accents. CSS variables for consistency. Draw from IDE themes and cultural aesthetics
- **Motion**: One well-orchestrated page load with staggered reveals > scattered micro-interactions
- **Backgrounds**: Layer CSS gradients, geometric patterns, contextual effects. Never default to solid white
- **Avoid**: purple gradients on white, predictable hero+3cards layouts, cookie-cutter component patterns, Lucide icons everywhere
