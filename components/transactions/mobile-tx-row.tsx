"use client"

import { T } from "@/lib/design/tokens"
import { catMap } from "@/lib/mock/data"
import type { Transaction } from "@/lib/mock/data"
import { fmtCOPraw } from "@/lib/utils/format"

import { MonoNumber } from "@/components/ui/mono-number"
import { TypeGlyph } from "@/components/ui/type-glyph"

export function MobileTxRow({
  transaction,
  last = false,
}: {
  transaction: Transaction
  last?: boolean
}) {
  const cat = catMap[transaction.cat]
  const isOut = transaction.type === "out"
  return (
    <div
      style={{
        padding: "14px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        borderBottom: last ? "none" : `1px solid ${T.rule2}`,
      }}
    >
      <TypeGlyph type={transaction.type} size={30} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: T.ink }}>
          {transaction.title}
        </div>
        <div style={{ fontSize: 11.5, color: T.muted, marginTop: 2 }}>
          {cat.label} &middot; {transaction.date.replace(/·.*/, "").trim()}
        </div>
      </div>
      <MonoNumber
        size={13}
        color={isOut ? T.coral : T.teal}
        style={{ fontWeight: 600 }}
      >
        {isOut ? "\u2212" : "+"} {fmtCOPraw(transaction.amount)}
      </MonoNumber>
    </div>
  )
}
