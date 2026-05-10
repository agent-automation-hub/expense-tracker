"use client"

import { useMemo, useRef, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import Fuse from "fuse.js"

import { T } from "@/lib/design/tokens"
import type { TransactionListItem } from "@/lib/transactions/types"
import { parseISODate } from "@/lib/utils/format"

import { TxRow } from "@/components/transactions/tx-row"
import { Calendar } from "@/components/ui/calendar"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconFilter, IconSearch } from "@/components/ui/icons"

import { trpc } from "@/trpc/client"

type TypeFilter = "all" | "out" | "in"

const TYPE_FILTERS: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "out", label: "Out" },
  { id: "in", label: "In" },
]

const fuseOptions = {
  keys: ["merchant", "note", "category.name"],
  threshold: 0.2,
  distance: 1000,
  minMatchCharLength: 2,
} as const satisfies {
  keys: string[]
  threshold: number
  distance: number
  minMatchCharLength: number
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function buildGroups(items: TransactionListItem[]) {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const today: TransactionListItem[] = []
  const yesterdayItems: TransactionListItem[] = []
  const thisWeek: TransactionListItem[] = []
  const earlier: TransactionListItem[] = []

  for (const t of items) {
    const d = parseISODate(t.date)
    if (isSameDay(d, now)) {
      today.push(t)
    } else if (isSameDay(d, yesterday)) {
      yesterdayItems.push(t)
    } else if (d >= startOfWeek) {
      thisWeek.push(t)
    } else {
      earlier.push(t)
    }
  }

  const fmt = (d: Date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
    return `${months[d.getMonth()]} ${d.getDate()}`
  }

  return [
    { label: `Today, ${fmt(now)}`, items: today },
    { label: `Yesterday, ${fmt(yesterday)}`, items: yesterdayItems },
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

  const { data: allTx = [] } = useQuery(
    trpc.transactions.list.queryOptions({ limit: 200 }),
  )

  const typeFiltered =
    typeFilter === "all" ? allTx : allTx.filter((t) => t.type === typeFilter)

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
        const ms = parseISODate(t.date).getTime()
        return ms >= startMs && ms <= endMs
      })
    } else {
      filtered = filtered.filter(
        (t) => parseISODate(t.date).getTime() === startMs,
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
