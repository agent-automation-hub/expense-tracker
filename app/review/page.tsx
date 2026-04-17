import Link from "next/link"

import { T } from "@/lib/design/tokens"
import { fmtCOPraw } from "@/lib/utils/format"

import { ReviewRow } from "@/components/transactions/review-row"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconChevronLeft, IconSparkle } from "@/components/ui/icons"
import { Rule } from "@/components/ui/rule"

const rows = [
  {
    title: "\u00C9xito supermarket",
    category: "Food & drink",
    amount: 184320,
    date: "Apr 12",
    confidence: 0.98,
  },
  {
    title: "Pan Pa' Ya",
    category: "Food & drink",
    amount: 12400,
    date: "Apr 12",
    confidence: 0.96,
  },
  {
    title: "Drogueria Cafam",
    category: "Health",
    amount: 34800,
    date: "Apr 11",
    confidence: 0.74,
  },
  {
    title: "Cash withdrawal",
    category: "Uncategorized",
    amount: 200000,
    date: "Apr 10",
    confidence: 0.46,
    flagged: true,
  },
]

const total = rows.reduce((s, r) => s + r.amount, 0)

export default function ReviewPage() {
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
            href="/upload"
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
            <IconChevronLeft size={12} />
          </Link>
          <Chip tone="ghost" size="sm">
            <span
              style={{
                display: "inline-flex",
                marginRight: 4,
                color: T.ink,
              }}
            >
              <IconSparkle size={10} />
            </span>
            Extracted by AI
          </Chip>
        </div>

        <div style={{ marginBottom: 24 }}>
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
            bancolombia-march.pdf
          </div>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 32,
              letterSpacing: -0.5,
              lineHeight: 1.15,
            }}
          >
            4 entries found.
            <br />
            <span style={{ fontStyle: "italic", color: T.muted }}>
              Confirm or edit.
            </span>
          </div>
        </div>

        <div
          style={{
            background: T.ivory,
            border: `1px solid ${T.rule}`,
            borderRadius: 2,
            marginBottom: 18,
          }}
        >
          {rows.map((r, i) => (
            <div key={i}>
              <ReviewRow item={r} />
              {i < rows.length - 1 && <Rule color={T.rule2} />}
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "14px 16px",
            background: T.ivory,
            border: `1px solid ${T.rule}`,
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div>
            <Eyebrow>Will add</Eyebrow>
            <div
              style={{
                fontFamily: T.serif,
                fontSize: 20,
                marginTop: 4,
                color: T.coral,
              }}
            >
              &minus; COP$ {fmtCOPraw(total)}
            </div>
          </div>
          <span
            style={{
              fontSize: 11,
              color: T.muted,
              textAlign: "right",
              maxWidth: 130,
              lineHeight: 1.3,
            }}
          >
            1 needs your review before saving
          </span>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <Button
            variant="light"
            size="lg"
            style={{ flex: 1, justifyContent: "center" }}
          >
            Discard
          </Button>
          <Button
            variant="primary"
            size="lg"
            style={{ flex: 2, justifyContent: "center" }}
          >
            Save 4 transactions
          </Button>
        </div>
      </div>
    </div>
  )
}
