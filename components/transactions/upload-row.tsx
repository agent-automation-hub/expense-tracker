"use client"

import { T } from "@/lib/design/tokens"

import { Chip } from "@/components/ui/chip"
import { IconCheck, IconDoc, IconSparkle } from "@/components/ui/icons"

export function UploadRow({
  name,
  state,
  progress,
  count,
}: {
  name: string
  state: "scanning" | "extracted" | "ready"
  progress?: number
  count?: number
}) {
  return (
    <div
      style={{
        padding: "14px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 32,
          height: 40,
          borderRadius: 2,
          background: T.ivory,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: T.ink,
        }}
      >
        <IconDoc size={14} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: T.ink,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
        {state === "scanning" && (
          <div style={{ marginTop: 6 }}>
            <div
              style={{
                height: 3,
                background: T.rule2,
                borderRadius: 999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: T.ink,
                }}
              />
            </div>
            <div
              style={{
                fontSize: 11,
                color: T.muted,
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ display: "inline-flex" }}>
                <IconSparkle size={10} />
              </span>
              Reading&hellip; {progress}%
            </div>
          </div>
        )}
        {state === "extracted" && (
          <div style={{ fontSize: 11.5, color: T.muted, marginTop: 2 }}>
            {count} transactions found &middot; review
          </div>
        )}
        {state === "ready" && (
          <div style={{ fontSize: 11.5, color: T.teal, marginTop: 2 }}>
            Added &middot; {count} entry
          </div>
        )}
      </div>
      {state === "extracted" && (
        <Chip tone="ink" size="sm">
          Review
        </Chip>
      )}
      {state === "ready" && (
        <span style={{ color: T.teal, display: "inline-flex" }}>
          <IconCheck size={14} />
        </span>
      )}
    </div>
  )
}
