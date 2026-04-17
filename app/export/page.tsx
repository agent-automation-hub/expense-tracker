import Link from "next/link"

import { T } from "@/lib/design/tokens"
import { totals, tx } from "@/lib/mock/data"
import { fmtCOPraw } from "@/lib/utils/format"

import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconDownload, IconX } from "@/components/ui/icons"
import { MonoNumber } from "@/components/ui/mono-number"

const formats = [
  { fmt: "PDF", sub: "Statement", active: true },
  { fmt: "CSV", sub: "Raw data", active: false },
  { fmt: "XLSX", sub: "Spreadsheet", active: false },
]

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

export default function ExportPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        background: T.paper,
        padding: "48px 16px",
        fontFamily: T.sans,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          position: "relative",
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Link
            href="/"
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              border: `1px solid ${T.rule}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.ink,
              textDecoration: "none",
            }}
          >
            <IconX size={11} />
          </Link>
          <div style={{ fontSize: 13, color: T.muted }}>Export</div>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: T.muted,
              marginBottom: 6,
              fontWeight: 500,
            }}
          >
            Export
          </div>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 32,
              letterSpacing: -0.5,
              lineHeight: 1.15,
            }}
          >
            Take your data
            <br />
            <span style={{ fontStyle: "italic" }}>with you.</span>
          </div>
        </div>

        <Eyebrow style={{ marginBottom: 8 }}>Format</Eyebrow>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
            marginBottom: 24,
          }}
        >
          {formats.map((f) => (
            <div
              key={f.fmt}
              style={{
                padding: "14px 10px",
                textAlign: "center",
                background: f.active ? T.ink : T.ivory,
                color: f.active ? T.paper : T.ink,
                border: `1px solid ${f.active ? T.ink : T.rule}`,
                borderRadius: 2,
                cursor: "pointer",
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
            </div>
          ))}
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
          {["This month", "Last month", "This year", "Custom"].map((l, i) => (
            <Chip key={l} tone={i === 0 ? "ink" : "ghost"} size="md">
              {l}
            </Chip>
          ))}
        </div>

        <Eyebrow style={{ marginBottom: 8 }}>Include</Eyebrow>
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          <Chip tone="ink" size="md">
            All transactions
          </Chip>
          <Chip tone="ghost" size="md">
            Expenses
          </Chip>
          <Chip tone="ghost" size="md">
            Earnings
          </Chip>
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
          <Chip tone="ink" size="md">
            All 9
          </Chip>
          <Chip tone="ghost" size="md">
            Select&hellip;
          </Chip>
        </div>

        <div
          style={{
            padding: "14px 16px",
            background: T.ivory,
            border: `1px solid ${T.rule}`,
            borderRadius: 2,
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
          Export statement &middot; PDF
        </Button>
      </div>
    </div>
  )
}
