"use client"

import { useQuery } from "@tanstack/react-query"

import { T } from "@/lib/design/tokens"
import { fmtCOPraw } from "@/lib/utils/format"

import { Chip } from "@/components/ui/chip"
import { DisplayNumber } from "@/components/ui/display-number"
import { Eyebrow } from "@/components/ui/eyebrow"
import { MonoNumber } from "@/components/ui/mono-number"
import { Sparkline } from "@/components/ui/sparkline"

import { trpc } from "@/trpc/client"

const MONTHS_SHORT = [
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

export function HeroStats() {
  const { data } = useQuery(trpc.dashboard.stats.queryOptions())
  const earned = data?.earned ?? 0
  const spent = data?.spent ?? 0
  const balance = data?.balance ?? 0
  const spark = data?.spark ?? []
  const month = data?.month ?? new Date().getMonth() + 1
  const year = data?.year ?? new Date().getFullYear()

  const daysInMonth = new Date(year, month, 0).getDate()
  const startLabel = `${MONTHS_SHORT[month - 1]} 01`
  const endLabel = `${MONTHS_SHORT[month - 1]} ${daysInMonth}`

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
      <StatCard label="Earned · in" color={T.teal} amount={earned}>
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
            this month
          </Chip>
        </div>
      </StatCard>

      <div style={{ background: T.rule }} />

      <StatCard label="Spent · out" color={T.coral} amount={spent}>
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
            this month
          </Chip>
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
            {fmtCOPraw(balance)}
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
              {startLabel}
            </MonoNumber>
            <MonoNumber size={10} color={T.muted}>
              {endLabel}
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
