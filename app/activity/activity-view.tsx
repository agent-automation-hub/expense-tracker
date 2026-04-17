"use client"

import { useMemo, useRef, useState } from "react"

import Fuse from "fuse.js"

import { T } from "@/lib/design/tokens"
import { type Transaction, tx } from "@/lib/mock/data"

import { TxRow } from "@/components/transactions/tx-row"
import { Calendar } from "@/components/ui/calendar"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconFilter, IconSearch } from "@/components/ui/icons"

type TypeFilter = "all" | "out" | "in"

const TYPE_FILTERS: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "out", label: "Out" },
  { id: "in", label: "In" },
]

const fuseOptions = {
  keys: ["title", "note", "cat"],
  threshold: 0.2,
  distance: 1000,
  minMatchCharLength: 2,
} as const satisfies {
  keys: string[]
  threshold: number
  distance: number
  minMatchCharLength: number
}

const MONTH_ABBR: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
}

function parseTxDate(dateStr: string): Date {
  if (dateStr.startsWith("Today")) return new Date(2026, 3, 17)
  if (dateStr.startsWith("Yesterday")) return new Date(2026, 3, 16)
  const match = dateStr.match(/^(\w{3})\s+(\d{1,2})/)
  if (match) return new Date(2026, MONTH_ABBR[match[1]], parseInt(match[2]))
  return new Date(2026, 3, 17)
}

function buildGroups(items: Transaction[]) {
  const today = items.filter((t) => t.date.startsWith("Today"))
  const yesterday = items.filter((t) => t.date.startsWith("Yesterday"))
  const rest = items.filter(
    (t) => !t.date.startsWith("Today") && !t.date.startsWith("Yesterday"),
  )
  const thisWeek = rest.slice(0, 4)
  const earlier = rest.slice(4)

  return [
    { label: "Today, Apr 17", items: today },
    { label: "Yesterday, Apr 16", items: yesterday },
    { label: "This week", items: thisWeek },
    { label: "Earlier", items: earlier },
  ]
}

export function ActivityView() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all")
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [dateStart, setDateStart] = useState<Date | null>(null)
  const [dateEnd, setDateEnd] = useState<Date | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const typeFiltered =
    typeFilter === "all" ? tx : tx.filter((t) => t.type === typeFilter)

  const fuse = useMemo(
    () => new Fuse(typeFiltered, fuseOptions),
    [typeFiltered],
  )

  let filtered = searchQuery.trim()
    ? fuse.search(searchQuery.trim()).map((r) => r.item)
    : typeFiltered

  if (dateStart) {
    const startMs = dateStart.getTime()
    if (dateEnd) {
      const endMs = dateEnd.getTime()
      filtered = filtered.filter((t) => {
        const ms = parseTxDate(t.date).getTime()
        return ms >= startMs && ms <= endMs
      })
    } else {
      filtered = filtered.filter(
        (t) => parseTxDate(t.date).getTime() === startMs,
      )
    }
  }

  const groups = buildGroups(filtered)
  const hasDateFilter = dateStart !== null

  function handleSearchToggle() {
    if (searchOpen) {
      setSearchOpen(false)
      setSearchQuery("")
    } else {
      setSearchOpen(true)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  function handleDateSelect(date: Date) {
    if (!dateStart) {
      setDateStart(date)
    } else if (!dateEnd) {
      if (date.getTime() === dateStart.getTime()) {
        setDateStart(null)
      } else if (date < dateStart) {
        setDateEnd(dateStart)
        setDateStart(date)
      } else {
        setDateEnd(date)
      }
    } else {
      setDateStart(date)
      setDateEnd(null)
    }
  }

  function handleDateClear() {
    setDateStart(null)
    setDateEnd(null)
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <Eyebrow style={{ marginLeft: -0.5 }}>Activity</Eyebrow>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 36,
              fontWeight: 400,
              letterSpacing: -0.8,
              marginTop: 4,
            }}
          >
            All movement.
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {searchOpen && (
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              style={{
                height: 36,
                width: 180,
                padding: "0 14px",
                borderRadius: 999,
                background: T.paper,
                border: `1px solid ${T.rule}`,
                fontFamily: T.sans,
                fontSize: 13,
                color: T.ink,
                outline: "none",
              }}
            />
          )}
          <button
            type="button"
            onClick={handleSearchToggle}
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              background: searchOpen ? T.ink : T.paper,
              border: `1px solid ${searchOpen ? T.ink : T.rule}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: searchOpen ? T.paper : T.ink,
              cursor: "pointer",
              transition: "background 120ms ease, color 120ms ease",
            }}
          >
            <IconSearch size={13} />
          </button>
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setCalendarOpen(!calendarOpen)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                background: calendarOpen || hasDateFilter ? T.ink : T.paper,
                border: `1px solid ${calendarOpen || hasDateFilter ? T.ink : T.rule}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: calendarOpen || hasDateFilter ? T.paper : T.ink,
                cursor: "pointer",
                transition: "background 120ms ease, color 120ms ease",
              }}
            >
              <IconFilter size={13} />
            </button>
            {calendarOpen && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 9 }}
                  onClick={() => setCalendarOpen(false)}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 44,
                    right: 0,
                    zIndex: 10,
                  }}
                >
                  <Calendar
                    startDate={dateStart}
                    endDate={dateEnd}
                    onSelect={handleDateSelect}
                    onClear={handleDateClear}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 16,
          padding: 4,
          background: T.paper,
          border: `1px solid ${T.rule}`,
          borderRadius: 999,
          width: "fit-content",
        }}
      >
        {TYPE_FILTERS.map(({ id, label }) => {
          const active = typeFilter === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTypeFilter(id)}
              style={{
                height: 32,
                padding: "0 24px",
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 500,
                background: active ? T.ink : "transparent",
                color: active ? T.paper : T.muted,
                cursor: "pointer",
                border: "none",
                fontFamily: "inherit",
                transition: "background 120ms ease, color 120ms ease",
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 28 }}>
        {filtered.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "64px 0",
              color: T.muted,
              fontFamily: T.sans,
              gap: 8,
            }}
          >
            <span style={{ fontSize: 32 }}>&#8709;</span>
            <span style={{ fontSize: 14, fontWeight: 500 }}>
              No results found
            </span>
            <span style={{ fontSize: 12 }}>
              Try adjusting your filters or search terms
            </span>
          </div>
        ) : (
          groups.map(
            (g) =>
              g.items.length > 0 && (
                <div key={g.label} style={{ marginBottom: 20 }}>
                  <div style={{ marginBottom: 8 }}>
                    <Eyebrow>{g.label}</Eyebrow>
                  </div>
                  <div
                    style={{
                      background: T.paper,
                      border: `1px solid ${T.rule}`,
                      borderRadius: 16,
                      padding: "0 20px",
                      overflow: "hidden",
                    }}
                  >
                    {g.items.map((t, i) => (
                      <TxRow key={t.id} transaction={t} first={i === 0} />
                    ))}
                  </div>
                </div>
              ),
          )
        )}
      </div>
    </>
  )
}
