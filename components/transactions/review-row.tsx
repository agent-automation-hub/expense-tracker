"use client"

import { T } from "@/lib/design/tokens"
import { fmtCOPraw } from "@/lib/utils/format"

import { Chip } from "@/components/ui/chip"
import { IconCheck } from "@/components/ui/icons"
import { MonoNumber } from "@/components/ui/mono-number"

export interface ReviewItem {
  title: string
  category: string
  amount: number
  date: string
  confidence: number
  flagged?: boolean
}

export function ReviewRow({ item }: { item: ReviewItem }) {
  const conf = Math.round(item.confidence * 100)
  const level =
    item.confidence > 0.9 ? "high" : item.confidence > 0.6 ? "mid" : "low"
  const dotColors = { high: T.teal, mid: "#C79A50", low: T.coral }

  return (
    <div
      style={{
        padding: "14px 14px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          border: `1.5px solid ${item.flagged ? T.coral : T.ink}`,
          background: item.flagged ? "transparent" : T.ink,
          color: T.paper,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {!item.flagged && <IconCheck size={12} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 13.5, fontWeight: 500 }}>{item.title}</div>
          <MonoNumber size={13} color={T.coral} style={{ fontWeight: 600 }}>
            &minus; {fmtCOPraw(item.amount)}
          </MonoNumber>
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 6,
            alignItems: "center",
          }}
        >
          <Chip tone={item.flagged ? "coral" : "ghost"} size="sm">
            {item.category}
          </Chip>
          <span style={{ fontSize: 11, color: T.muted }}>{item.date}</span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: 11,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              color: dotColors[level],
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: 999,
                background: dotColors[level],
              }}
            />
            {conf}% confident
          </span>
        </div>
      </div>
    </div>
  )
}
