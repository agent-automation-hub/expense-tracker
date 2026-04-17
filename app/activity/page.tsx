import { T } from "@/lib/design/tokens"
import { tx, catMap } from "@/lib/mock/data"
import { AppShell } from "@/components/layout/app-shell"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Chip } from "@/components/ui/chip"
import { TxRow } from "@/components/transactions/tx-row"
import { IconSearch, IconFilter } from "@/components/ui/icons"

const groups = [
  {
    label: "Today, Apr 17",
    items: tx.filter((t) => t.date.startsWith("Today")),
  },
  {
    label: "Yesterday, Apr 16",
    items: tx.filter((t) => t.date.startsWith("Yesterday")),
  },
  { label: "This week", items: tx.slice(3, 7) },
  { label: "Earlier", items: tx.slice(7) },
]

export default function ActivityPage() {
  return (
    <AppShell>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <Eyebrow>Activity</Eyebrow>
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
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              background: T.paper,
              border: `1px solid ${T.rule}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.ink,
            }}
          >
            <IconSearch size={13} />
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              background: T.paper,
              border: `1px solid ${T.rule}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.ink,
            }}
          >
            <IconFilter size={13} />
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
        {["All", "Out", "In"].map((label, i) => (
          <div
            key={label}
            style={{
              height: 32,
              padding: "0 24px",
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 500,
              background: i === 0 ? T.ink : "transparent",
              color: i === 0 ? T.paper : T.muted,
              cursor: "pointer",
            }}
          >
            {label}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        <Chip tone="ink" size="md">
          April
        </Chip>
        <Chip tone="ghost" size="md">
          All categories
        </Chip>
        <Chip tone="ghost" size="md">
          + Filter
        </Chip>
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 28 }}>
        {groups.map(
          (g) =>
            g.items.length > 0 && (
              <div key={g.label} style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 8,
                  }}
                >
                  <Eyebrow>{g.label}</Eyebrow>
                  <span
                    style={{
                      fontFamily: T.mono,
                      fontSize: 10,
                      color: T.muted,
                    }}
                  >
                    {g.items.length}
                  </span>
                </div>
                <div
                  style={{
                    background: T.paper,
                    border: `1px solid ${T.rule}`,
                    borderRadius: 2,
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
    </AppShell>
  )
}
