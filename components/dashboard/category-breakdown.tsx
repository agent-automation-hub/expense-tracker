"use client"

import Link from "next/link"

import { useQuery } from "@tanstack/react-query"

import { T } from "@/lib/design/tokens"
import { fmtCOPraw } from "@/lib/utils/format"

import { Button } from "@/components/ui/button"
import { DisplayNumber } from "@/components/ui/display-number"
import { Donut } from "@/components/ui/donut"
import { Dot } from "@/components/ui/dot"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconSparkle, IconUpload } from "@/components/ui/icons"
import { MonoNumber } from "@/components/ui/mono-number"

import { trpc } from "@/trpc/client"

export function CategoryBreakdown() {
  const { data: breakdown = [] } = useQuery(
    trpc.dashboard.breakdown.queryOptions(),
  )
  const { data: stats } = useQuery(trpc.dashboard.stats.queryOptions())
  const totalSpent = stats?.spent ?? 0

  const segments = breakdown.map((r) => ({
    pct: r.pct,
    color: r.color || T.faint,
  }))

  return (
    <div
      style={{
        border: `1px solid ${T.rule}`,
        borderRadius: 2,
        background: T.paper,
        padding: "22px 26px",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      <header style={{ marginBottom: 16 }}>
        <Eyebrow>Where it went</Eyebrow>
        <div
          style={{
            fontFamily: T.serif,
            fontSize: 22,
            marginTop: 4,
            letterSpacing: -0.3,
          }}
        >
          Expenses by category.
        </div>
      </header>

      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Donut
          segments={segments}
          size={170}
          thickness={18}
          center={
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: 1.4,
                  textTransform: "uppercase",
                  color: T.muted,
                }}
              >
                Total
              </div>
              <DisplayNumber size={22} style={{ marginTop: 2 }}>
                {totalSpent > 0
                  ? fmtCOPraw(totalSpent / 1000).replace(/\.\d+$/, "") + "k"
                  : "0"}
              </DisplayNumber>
            </div>
          }
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {breakdown.slice(0, 5).map((r) => (
            <div
              key={r.id ?? "uncategorized"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Dot color={r.color || T.faint} size={8} />
              <div style={{ flex: 1, fontSize: 13 }}>{r.name}</div>
              <MonoNumber size={12} color={T.muted}>
                {Math.round(r.pct * 100)}%
              </MonoNumber>
              <MonoNumber size={12} style={{ width: 86, textAlign: "right" }}>
                {fmtCOPraw(r.amount)}
              </MonoNumber>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          border: `1px solid ${T.rule}`,
          borderRadius: 2,
          padding: 18,
          background: T.ivory,
          display: "flex",
          gap: 14,
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 2,
            background: T.ink,
            color: T.paper,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <IconSparkle size={16} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>
            Drop a receipt, get a transaction.
          </div>
          <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.45 }}>
            PDFs, photos, bank statements &mdash; the AI reads them and files
            the entry.
          </div>
        </div>
        <Link href="/upload" style={{ textDecoration: "none" }}>
          <Button variant="light" size="sm" icon={<IconUpload size={12} />}>
            Upload
          </Button>
        </Link>
      </div>
    </div>
  )
}
