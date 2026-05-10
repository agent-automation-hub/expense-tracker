"use client"

import { T } from "@/lib/design/tokens"
import type { TransactionListItem } from "@/lib/transactions/types"
import { fmtCOPraw, formatTxDate } from "@/lib/utils/format"

import { MonoNumber } from "@/components/ui/mono-number"
import { TypeGlyph } from "@/components/ui/type-glyph"

export function MobileTxRow({
  transaction,
  last = false,
}: {
  transaction: TransactionListItem
  last?: boolean
}) {
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
          {transaction.merchant ?? "Unknown"}
        </div>
        <div style={{ fontSize: 11.5, color: T.muted, marginTop: 2 }}>
          {transaction.category?.name ?? "Uncategorized"} &middot;{" "}
          {formatTxDate(transaction.date)}
        </div>
      </div>
      <MonoNumber
        size={13}
        color={isOut ? T.coral : T.teal}
        style={{ fontWeight: 600 }}
      >
        {isOut ? "−" : "+"} {fmtCOPraw(transaction.amount)}
      </MonoNumber>
    </div>
  )
}
