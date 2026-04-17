"use client"

import { T } from "@/lib/design/tokens"
import { catMap } from "@/lib/mock/data"
import type { Transaction } from "@/lib/mock/data"
import { fmtCOPraw } from "@/lib/utils/format"

import { Chip } from "@/components/ui/chip"
import { IconDots, IconSparkle } from "@/components/ui/icons"
import { MonoNumber } from "@/components/ui/mono-number"
import { Rule } from "@/components/ui/rule"
import { TypeGlyph } from "@/components/ui/type-glyph"

export function TxRow({
  transaction,
  first = false,
}: {
  transaction: Transaction
  first?: boolean
}) {
  const cat = catMap[transaction.cat]
  const isOut = transaction.type === "out"
  return (
    <>
      {!first && <Rule color={T.rule2} />}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "28px 1fr auto auto 130px 16px",
          alignItems: "center",
          gap: 14,
          padding: "13px 0",
          fontFamily: T.sans,
          fontSize: 13.5,
        }}
      >
        <TypeGlyph type={transaction.type} size={28} />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontWeight: 500,
              color: T.ink,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            {transaction.title}
            {transaction.src === "ai" && (
              <span
                title="From AI extraction"
                style={{ color: T.muted, display: "inline-flex" }}
              >
                <IconSparkle size={10} />
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>
            {transaction.note}
          </div>
        </div>
        <Chip tone="ghost" size="sm">
          {cat.label}
        </Chip>
        <MonoNumber size={11} color={T.muted}>
          {transaction.date}
        </MonoNumber>
        <MonoNumber
          size={14}
          color={isOut ? T.coral : T.teal}
          style={{ textAlign: "right", fontWeight: 500 }}
        >
          {isOut ? "\u2212" : "+"} {fmtCOPraw(transaction.amount)}
        </MonoNumber>
        <div
          style={{
            color: T.muted,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconDots size={12} />
        </div>
      </div>
    </>
  )
}
