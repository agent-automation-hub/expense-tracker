"use client"

import { Suspense } from "react"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { T } from "@/lib/design/tokens"

import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { DisplayNumber } from "@/components/ui/display-number"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Field } from "@/components/ui/field"
import {
  IconArrowRight,
  IconMinus,
  IconPlus,
  IconX,
} from "@/components/ui/icons"
import { Rule } from "@/components/ui/rule"

function AddTransactionContent() {
  const params = useSearchParams()
  const type = params.get("type") === "earning" ? "earning" : "expense"
  const isExpense = type === "expense"

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        background: T.ivory,
        padding: "48px 16px",
        fontFamily: T.sans,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: T.paper,
          borderRadius: 2,
          border: `1px solid ${T.rule}`,
          position: "relative",
          padding: "28px 28px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
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
          <div style={{ fontSize: 13, color: T.muted }}>New transaction</div>
          <div style={{ fontSize: 13, fontWeight: 500, color: T.muted }}>
            Save
          </div>
        </div>

        <div
          style={{
            height: 44,
            background: T.ivory,
            borderRadius: 999,
            padding: 4,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              background: isExpense ? T.coral : "transparent",
              color: isExpense ? "#fff" : T.muted,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 13.5,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <span style={{ display: "inline-flex" }}>
              <IconMinus size={12} />
            </span>
            Expense
          </div>
          <div
            style={{
              background: !isExpense ? T.teal : "transparent",
              color: !isExpense ? "#fff" : T.muted,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 13.5,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <span style={{ display: "inline-flex" }}>
              <IconPlus size={12} />
            </span>
            Earning
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Eyebrow>Amount</Eyebrow>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: T.serif,
                fontSize: 22,
                color: T.muted,
              }}
            >
              COP$
            </span>
            <DisplayNumber
              size={68}
              color={isExpense ? T.coral : T.teal}
              weight={300}
            >
              18.500
            </DisplayNumber>
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 40,
                background: isExpense ? T.coral : T.teal,
                marginLeft: 2,
                animation: "blink 1s steps(2, end) infinite",
              }}
            />
          </div>
        </div>

        <div
          style={{
            background: T.ivory,
            borderRadius: 2,
            border: `1px solid ${T.rule}`,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <Field label="Merchant" value="Azahar Coffee" />
          <Rule color={T.rule2} />
          <Field
            label="Category"
            rightNode={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Chip tone="coral" size="sm">
                  Food & drink
                </Chip>
                <span style={{ color: T.muted }}>
                  <IconArrowRight size={12} />
                </span>
              </div>
            }
          />
          <Rule color={T.rule2} />
          <Field label="Date" value="Today, 09:12" />
          <Rule color={T.rule2} />
          <Field label="Note" value="Oat latte &middot; Chapinero" muted />
        </div>

        <Eyebrow style={{ marginBottom: 10 }}>Suggested</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[
            "Food & drink",
            "Transport",
            "Groceries",
            "Coffee",
            "Leisure",
            "+ New",
          ].map((l, i) => (
            <Chip key={l} tone={i === 0 ? "ink" : "ghost"} size="md">
              {l}
            </Chip>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 28,
            right: 28,
          }}
        >
          <Button
            variant={isExpense ? "coral" : "teal"}
            size="lg"
            style={{ width: "100%", justifyContent: "center", fontSize: 15 }}
          >
            Save {isExpense ? "expense" : "earning"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function AddPage() {
  return (
    <Suspense>
      <AddTransactionContent />
    </Suspense>
  )
}
