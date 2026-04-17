"use client"

import { useState } from "react"

import { T } from "@/lib/design/tokens"
import { type Transaction, tx } from "@/lib/mock/data"

import { TxRow } from "@/components/transactions/tx-row"
import { Eyebrow } from "@/components/ui/eyebrow"

type TypeFilter = "all" | "out" | "in"

const TYPE_FILTERS: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "out", label: "Out" },
  { id: "in", label: "In" },
]

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

  const filtered =
    typeFilter === "all" ? tx : tx.filter((t) => t.type === typeFilter)
  const groups = buildGroups(filtered)

  return (
    <>
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
        {groups.map(
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
        )}
      </div>
    </>
  )
}
