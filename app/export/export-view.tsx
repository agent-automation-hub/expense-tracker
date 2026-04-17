"use client"

import { useState } from "react"

import { T } from "@/lib/design/tokens"
import { totals, tx } from "@/lib/mock/data"
import { fmtCOPraw } from "@/lib/utils/format"

import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconDownload } from "@/components/ui/icons"
import { MonoNumber } from "@/components/ui/mono-number"

const formats = [
  { id: "pdf", fmt: "PDF", sub: "Statement" },
  { id: "csv", fmt: "CSV", sub: "Raw data" },
  { id: "xlsx", fmt: "XLSX", sub: "Spreadsheet" },
]

const dateRanges = ["This month", "Last month", "This year", "Custom"]
const includeOptions = ["All transactions", "Expenses", "Earnings"]
const categoryOptions = ["All 9", "Select\u2026"]

function SummaryCell({
  label,
  val,
  color,
}: {
  label: string
  val: string | number
  color?: string
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          color: T.muted,
          letterSpacing: 1,
          textTransform: "uppercase",
          marginBottom: 3,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <MonoNumber size={13} color={color || T.ink} style={{ fontWeight: 500 }}>
        {val}
      </MonoNumber>
    </div>
  )
}

export function ExportView() {
  const [selectedFormat, setSelectedFormat] = useState("pdf")
  const [selectedRange, setSelectedRange] = useState("This month")
  const [selectedInclude, setSelectedInclude] = useState("All transactions")
  const [selectedCategory, setSelectedCategory] = useState("All 9")

  const current = formats.find((f) => f.id === selectedFormat)!

  return (
    <div style={{ flex: 1, overflow: "auto", paddingBottom: 28 }}>
      <Eyebrow style={{ marginBottom: 8 }}>Format</Eyebrow>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 8,
          marginBottom: 24,
        }}
      >
        {formats.map((f) => {
          const active = selectedFormat === f.id
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFormat(f.id)}
              style={{
                padding: "14px 10px",
                textAlign: "center",
                background: active ? T.ink : T.paper,
                color: active ? T.paper : T.ink,
                border: `1px solid ${active ? T.ink : T.rule}`,
                borderRadius: 12,
                cursor: "pointer",
                fontFamily: "inherit",
                userSelect: "none",
              }}
            >
              <div
                style={{
                  fontFamily: T.serif,
                  fontSize: 18,
                  fontWeight: 400,
                  marginBottom: 2,
                }}
              >
                {f.fmt}
              </div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>{f.sub}</div>
            </button>
          )
        })}
      </div>

      <Eyebrow style={{ marginBottom: 8 }}>Date range</Eyebrow>
      <div
        style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 20,
        }}
      >
        {dateRanges.map((l) => (
          <Chip
            key={l}
            tone={selectedRange === l ? "ink" : "ghost"}
            size="md"
            onClick={() => setSelectedRange(l)}
          >
            {l}
          </Chip>
        ))}
      </div>

      <Eyebrow style={{ marginBottom: 8 }}>Include</Eyebrow>
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {includeOptions.map((l) => (
          <Chip
            key={l}
            tone={selectedInclude === l ? "ink" : "ghost"}
            size="md"
            onClick={() => setSelectedInclude(l)}
          >
            {l}
          </Chip>
        ))}
      </div>

      <Eyebrow style={{ marginBottom: 8 }}>Categories</Eyebrow>
      <div
        style={{
          display: "flex",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        {categoryOptions.map((l) => (
          <Chip
            key={l}
            tone={selectedCategory === l ? "ink" : "ghost"}
            size="md"
            onClick={() => setSelectedCategory(l)}
          >
            {l}
          </Chip>
        ))}
      </div>

      <div
        style={{
          padding: "14px 16px",
          background: T.paper,
          border: `1px solid ${T.rule}`,
          borderRadius: 16,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Eyebrow>Preview</Eyebrow>
          <MonoNumber size={10} color={T.muted}>
            APRIL 2026
          </MonoNumber>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          <SummaryCell label="Transactions" val={tx.length} />
          <SummaryCell label="File size" val="~ 42 KB" />
          <SummaryCell
            label="Out"
            val={`COP$ ${fmtCOPraw(totals.spent)}`}
            color={T.coral}
          />
          <SummaryCell
            label="In"
            val={`COP$ ${fmtCOPraw(totals.earned)}`}
            color={T.teal}
          />
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        icon={<IconDownload size={14} />}
        style={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        Export statement &middot; {current.fmt}
      </Button>
    </div>
  )
}
