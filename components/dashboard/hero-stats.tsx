"use client"

import { T } from "@/lib/design/tokens"
import { spark, totals } from "@/lib/mock/data"
import { fmtCOPraw } from "@/lib/utils/format"

import { Chip } from "@/components/ui/chip"
import { DisplayNumber } from "@/components/ui/display-number"
import { Eyebrow } from "@/components/ui/eyebrow"
import { MonoNumber } from "@/components/ui/mono-number"
import { Sparkline } from "@/components/ui/sparkline"

export function HeroStats() {
  return (
    <section
      style={{
        border: `1px solid ${T.rule}`,
        borderRadius: 2,
        background: T.paper,
        display: "grid",
        gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
        overflow: "hidden",
        marginBottom: 16,
      }}
    >
      <StatCard label="Earned \u00B7 in" color={T.teal} amount={totals.earned}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
            color: T.muted,
            fontSize: 12,
          }}
        >
          <Chip tone="teal" size="sm">
            + 12.4%
          </Chip>
          <span>vs March</span>
        </div>
      </StatCard>

      <div style={{ background: T.rule }} />

      <StatCard label="Spent \u00B7 out" color={T.coral} amount={totals.spent}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
            color: T.muted,
            fontSize: 12,
          }}
        >
          <Chip tone="coral" size="sm">
            &minus; 3.1%
          </Chip>
          <span>vs March</span>
        </div>
      </StatCard>

      <div style={{ background: T.rule }} />

      <div style={{ padding: "26px 30px 24px" }}>
        <Eyebrow>Net balance</Eyebrow>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            marginTop: 14,
          }}
        >
          <DisplayNumber size={52} weight={400}>
            <span style={{ fontSize: 24, fontWeight: 400, marginRight: 6 }}>
              COP$
            </span>
            {fmtCOPraw(totals.balance)}
          </DisplayNumber>
        </div>
        <div style={{ marginTop: 8 }}>
          <Sparkline
            data={spark}
            width={320}
            height={36}
            color={T.ink}
            soft={T.faint}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            <MonoNumber size={10} color={T.muted}>
              Apr 01
            </MonoNumber>
            <MonoNumber size={10} color={T.muted}>
              Apr 30
            </MonoNumber>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({
  label,
  color,
  amount,
  children,
}: {
  label: string
  color: string
  amount: number
  children: React.ReactNode
}) {
  return (
    <div style={{ padding: "26px 30px 24px" }}>
      <Eyebrow>{label}</Eyebrow>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          marginTop: 14,
        }}
      >
        <DisplayNumber size={52} color={color} weight={400}>
          <span
            style={{ fontSize: 24, fontWeight: 400, marginRight: 6, color }}
          >
            COP$
          </span>
          {fmtCOPraw(amount)}
        </DisplayNumber>
      </div>
      {children}
    </div>
  )
}
