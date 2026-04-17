"use client"

import { useEffect, useRef, useState } from "react"

import { T, catColors } from "@/lib/design/tokens"
import { categories, tx } from "@/lib/mock/data"
import { fmtCOPraw } from "@/lib/utils/format"

import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconArrowRight, IconPlus, IconX } from "@/components/ui/icons"
import { MonoNumber } from "@/components/ui/mono-number"
import { Rule } from "@/components/ui/rule"

const PALETTE = [
  "#D66A4E",
  "#3E8B85",
  "#E89B7D",
  "#A37A63",
  "#C4A898",
  "#8C6B57",
  "#5AA69F",
  "#7FB9B2",
  "#B07D4F",
  "#6B8F71",
  "#9B6B9E",
  "#C2785C",
]

const expenses = categories.filter((c) => c.kind === "expense")
const earnings = categories.filter((c) => c.kind === "earning")

function CategoryRow({ cat }: { cat: (typeof categories)[number] }) {
  const total = tx
    .filter((t) => t.cat === cat.id)
    .reduce((s, t) => s + t.amount, 0)
  return (
    <div
      style={{
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 999,
          background: catColors[cat.id] || T.faint,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{cat.label}</div>
      </div>
      <MonoNumber size={12} color={T.muted}>
        {fmtCOPraw(total)}
      </MonoNumber>
      <span style={{ color: T.muted }}>
        <IconArrowRight size={12} />
      </span>
    </div>
  )
}

export function CategoriesView() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <Eyebrow>Categories</Eyebrow>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 36,
              fontWeight: 400,
              letterSpacing: -0.8,
              marginTop: 4,
            }}
          >
            How you classify.
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<IconPlus size={12} />}
          onClick={() => setOpen(true)}
        >
          New category
        </Button>
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 28 }}>
        <Eyebrow style={{ marginBottom: 10 }}>
          Expenses &middot; {expenses.length}
        </Eyebrow>
        <div
          style={{
            background: T.paper,
            border: `1px solid ${T.rule}`,
            borderRadius: 16,
            padding: "0 20px",
            marginBottom: 24,
          }}
        >
          {expenses.map((c, i) => (
            <div key={c.id}>
              <CategoryRow cat={c} />
              {i < expenses.length - 1 && <Rule color={T.rule2} />}
            </div>
          ))}
        </div>

        <Eyebrow style={{ marginBottom: 10 }}>
          Earnings &middot; {earnings.length}
        </Eyebrow>
        <div
          style={{
            background: T.paper,
            border: `1px solid ${T.rule}`,
            borderRadius: 16,
            padding: "0 20px",
          }}
        >
          {earnings.map((c, i) => (
            <div key={c.id}>
              <CategoryRow cat={c} />
              {i < earnings.length - 1 && <Rule color={T.rule2} />}
            </div>
          ))}
        </div>
      </div>

      {open && <NewCategoryPopup onClose={() => setOpen(false)} />}
    </>
  )
}

function NewCategoryPopup({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("")
  const [scope, setScope] = useState<"expense" | "income">("expense")
  const [color, setColor] = useState(PALETTE[0])
  const backdropRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === backdropRef.current) onClose()
  }

  function handleSave() {
    if (!name.trim()) return
    // TODO: save to database
    onClose()
  }

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20, 19, 17, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: 400,
          background: T.paper,
          border: `1px solid ${T.rule}`,
          borderRadius: 16,
          padding: "28px 28px 24px",
          boxShadow: "0 16px 48px rgba(20, 19, 17, 0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 22,
              letterSpacing: -0.3,
            }}
          >
            New category
          </div>
          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              border: `1px solid ${T.rule}`,
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.ink,
              cursor: "pointer",
            }}
          >
            <IconX size={10} />
          </button>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: T.muted,
              fontWeight: 500,
              marginBottom: 6,
            }}
          >
            Name
          </label>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave()
            }}
            style={{
              width: "100%",
              height: 42,
              padding: "0 14px",
              border: `1px solid ${T.rule}`,
              borderRadius: 8,
              background: T.ivory,
              fontFamily: T.sans,
              fontSize: 14,
              color: T.ink,
              outline: "none",
              boxSizing: "border-box",
            }}
            placeholder="e.g. Groceries"
          />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: T.muted,
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            Type
          </label>
          <div style={{ display: "flex", gap: 6 }}>
            <Chip
              tone={scope === "expense" ? "coral" : "ghost"}
              size="md"
              style={{ cursor: "pointer" }}
              onClick={() => setScope("expense")}
            >
              Expense
            </Chip>
            <Chip
              tone={scope === "income" ? "teal" : "ghost"}
              size="md"
              style={{ cursor: "pointer" }}
              onClick={() => setScope("income")}
            >
              Earning
            </Chip>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: T.muted,
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            Color
          </label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {PALETTE.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: c,
                  border:
                    color === c
                      ? `2px solid ${T.ink}`
                      : "2px solid transparent",
                  cursor: "pointer",
                  padding: 0,
                  outline: color === c ? `2px solid ${T.paper}` : "none",
                  outlineOffset: -4,
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "16px 0 0",
            borderTop: `1px solid ${T.rule}`,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background: color,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              flex: 1,
              fontSize: 13.5,
              fontWeight: 500,
              color: name.trim() ? T.ink : T.faint,
            }}
          >
            {name.trim() || "Category name"}
          </div>
          <Button variant="light" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            style={{ opacity: name.trim() ? 1 : 0.5 }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}
