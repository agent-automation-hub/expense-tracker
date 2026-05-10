"use client"

import { Suspense, useRef, useState } from "react"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { T } from "@/lib/design/tokens"

import { Button } from "@/components/ui/button"
import { DisplayNumber } from "@/components/ui/display-number"
import { Dot } from "@/components/ui/dot"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconMinus, IconPlus, IconX } from "@/components/ui/icons"
import { Rule } from "@/components/ui/rule"

import { trpc } from "@/trpc/client"

function sanitizeAmount(raw: string) {
  return raw.replace(/[^\d]/g, "")
}

function formatAmountDisplay(digits: string) {
  if (!digits) return "0"
  const n = Number(digits)
  if (isNaN(n)) return "0"
  return n.toLocaleString("es-CO").replace(/,/g, ".")
}

function AddTransactionContent() {
  const params = useSearchParams()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [type, setType] = useState<"expense" | "income">(
    params.get("type") === "earning" ? "income" : "expense",
  )
  const isExpense = type === "expense"

  const [amount, setAmount] = useState("")
  const amountRef = useRef<HTMLInputElement>(null)
  const [merchant, setMerchant] = useState("")
  const [note, setNote] = useState("")
  const [date, setDate] = useState(() => {
    const d = new Date()
    return d.toISOString().split("T")[0]
  })
  const [categoryId, setCategoryId] = useState<string | undefined>()
  const [catOpen, setCatOpen] = useState(false)

  const { data: categories = [] } = useQuery(
    trpc.categories.list.queryOptions(),
  )

  const filteredCategories = categories.filter(
    (c) => c.scope === (isExpense ? "expense" : "income") || c.scope === "both",
  )

  const selectedCategory = categories.find((c) => c.id === categoryId)

  const createTx = useMutation(
    trpc.transactions.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.transactions.list.queryFilter())
        queryClient.invalidateQueries(trpc.dashboard.stats.queryFilter())
        queryClient.invalidateQueries(trpc.dashboard.breakdown.queryFilter())
        router.push("/")
      },
    }),
  )

  function handleSave() {
    if (!amount || Number(amount) <= 0) return
    createTx.mutate({
      type,
      amount,
      currency: "COP",
      date,
      merchant: merchant || undefined,
      note: note || undefined,
      categoryId: categoryId || undefined,
    })
  }

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
          <button
            type="button"
            onClick={handleSave}
            disabled={createTx.isPending || !amount}
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: amount ? T.ink : T.muted,
              cursor: amount ? "pointer" : "default",
              background: "none",
              border: "none",
              fontFamily: "inherit",
            }}
          >
            {createTx.isPending ? "Saving..." : "Save"}
          </button>
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
          <button
            type="button"
            onClick={() => {
              setType("expense")
              setCategoryId(undefined)
            }}
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
              border: "none",
              fontFamily: "inherit",
            }}
          >
            <span style={{ display: "inline-flex" }}>
              <IconMinus size={12} />
            </span>
            Expense
          </button>
          <button
            type="button"
            onClick={() => {
              setType("income")
              setCategoryId(undefined)
            }}
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
              border: "none",
              fontFamily: "inherit",
            }}
          >
            <span style={{ display: "inline-flex" }}>
              <IconPlus size={12} />
            </span>
            Earning
          </button>
        </div>

        <div
          style={{
            textAlign: "center",
            marginBottom: 32,
            cursor: "text",
            position: "relative",
          }}
          onClick={() => amountRef.current?.focus()}
        >
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
              {formatAmountDisplay(amount)}
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
          <input
            ref={amountRef}
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(sanitizeAmount(e.target.value))}
            autoFocus
            style={{
              position: "absolute",
              opacity: 0,
              width: 1,
              height: 1,
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
          />
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
          <div
            style={{
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: T.muted,
                letterSpacing: 0.3,
                textTransform: "uppercase",
                fontWeight: 500,
                width: 90,
              }}
            >
              Merchant
            </div>
            <input
              type="text"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              placeholder="Where did you spend?"
              style={{
                flex: 1,
                textAlign: "right",
                fontSize: 14,
                color: T.ink,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: T.sans,
              }}
            />
          </div>
          <Rule color={T.rule2} />
          <div style={{ position: "relative" }}>
            <div
              onClick={() => setCatOpen(!catOpen)}
              style={{
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: T.muted,
                  letterSpacing: 0.3,
                  textTransform: "uppercase",
                  fontWeight: 500,
                  width: 90,
                }}
              >
                Category
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {selectedCategory ? (
                  <>
                    <Dot color={selectedCategory.color || T.faint} size={8} />
                    <span style={{ fontSize: 14, color: T.ink }}>
                      {selectedCategory.name}
                    </span>
                  </>
                ) : (
                  <span style={{ fontSize: 14, color: T.muted }}>
                    Choose...
                  </span>
                )}
                <span
                  style={{
                    color: T.muted,
                    display: "inline-flex",
                    transform: catOpen ? "rotate(90deg)" : "none",
                    transition: "transform 120ms ease",
                  }}
                >
                  ›
                </span>
              </div>
            </div>
            {catOpen && (
              <>
                <div
                  style={{ position: "fixed", inset: 0, zIndex: 19 }}
                  onClick={() => setCatOpen(false)}
                />
                <div
                  style={{
                    background: T.paper,
                    border: `1px solid ${T.rule}`,
                    borderRadius: 10,
                    position: "absolute",
                    left: -1,
                    right: -1,
                    top: "100%",
                    zIndex: 20,
                    boxShadow: "0 6px 24px rgba(0,0,0,.08)",
                    maxHeight: 240,
                    overflowY: "auto",
                  }}
                >
                  {filteredCategories.length === 0 ? (
                    <div
                      style={{
                        padding: "18px 16px",
                        fontSize: 13,
                        color: T.muted,
                        textAlign: "center",
                      }}
                    >
                      No categories yet
                    </div>
                  ) : (
                    filteredCategories.map((c, i) => {
                      const selected = categoryId === c.id
                      return (
                        <div key={c.id}>
                          {i > 0 && (
                            <div
                              style={{
                                height: 1,
                                background: T.rule2,
                                margin: "0 16px",
                              }}
                            />
                          )}
                          <div
                            onClick={() => {
                              setCategoryId(selected ? undefined : c.id)
                              setCatOpen(false)
                            }}
                            style={{
                              padding: "11px 16px",
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              cursor: "pointer",
                              background: selected ? T.ivory : "transparent",
                              transition: "background 80ms ease",
                            }}
                          >
                            <Dot color={c.color || T.faint} size={10} />
                            <span
                              style={{
                                flex: 1,
                                fontSize: 14,
                                fontWeight: selected ? 600 : 400,
                                color: T.ink,
                              }}
                            >
                              {c.name}
                            </span>
                            {selected && (
                              <span
                                style={{
                                  fontSize: 14,
                                  color: isExpense ? T.coral : T.teal,
                                }}
                              >
                                ✓
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })
                  )}
                  <div
                    style={{
                      height: 1,
                      background: T.rule,
                      margin: "0 16px",
                    }}
                  />
                  <Link
                    href="/categories"
                    onClick={() => setCatOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "11px 16px",
                      fontSize: 13,
                      color: T.muted,
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
                    New category
                  </Link>
                </div>
              </>
            )}
          </div>
          <Rule color={T.rule2} />
          <div
            style={{
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: T.muted,
                letterSpacing: 0.3,
                textTransform: "uppercase",
                fontWeight: 500,
                width: 90,
              }}
            >
              Date
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                fontSize: 14,
                color: T.ink,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: T.sans,
              }}
            />
          </div>
          <Rule color={T.rule2} />
          <div
            style={{
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: T.muted,
                letterSpacing: 0.3,
                textTransform: "uppercase",
                fontWeight: 500,
                width: 90,
              }}
            >
              Note
            </div>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional note"
              style={{
                flex: 1,
                textAlign: "right",
                fontSize: 14,
                color: T.muted,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: T.sans,
              }}
            />
          </div>
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
            onClick={handleSave}
            disabled={createTx.isPending || !amount}
          >
            {createTx.isPending
              ? "Saving..."
              : `Save ${isExpense ? "expense" : "earning"}`}
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
