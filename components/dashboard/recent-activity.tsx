"use client"

import Link from "next/link"

import { T } from "@/lib/design/tokens"
import { tx } from "@/lib/mock/data"

import { TxRow } from "@/components/transactions/tx-row"
import { Chip } from "@/components/ui/chip"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconArrowRight } from "@/components/ui/icons"

export function RecentActivity() {
  return (
    <div
      style={{
        border: `1px solid ${T.rule}`,
        borderRadius: 2,
        background: T.paper,
        padding: "22px 26px 8px",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 16,
        }}
      >
        <div>
          <Eyebrow>Recent activity</Eyebrow>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 22,
              marginTop: 4,
              letterSpacing: -0.3,
            }}
          >
            This week, in order.
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Chip tone="ink" size="md">
            All
          </Chip>
          <Chip tone="ghost" size="md">
            Out
          </Chip>
          <Chip tone="ghost" size="md">
            In
          </Chip>
        </div>
      </header>

      <div style={{ overflow: "hidden" }}>
        {tx.slice(0, 7).map((t, i) => (
          <TxRow key={t.id} transaction={t} first={i === 0} />
        ))}
      </div>

      <div
        style={{
          padding: "10px 0 14px",
          color: T.muted,
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${T.rule}`,
          marginTop: 8,
        }}
      >
        <span>Showing 7 of 42 this month</span>
        <Link
          href="/activity"
          style={{
            color: T.ink,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
          }}
        >
          See all <IconArrowRight size={12} />
        </Link>
      </div>
    </div>
  )
}
