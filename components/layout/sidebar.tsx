"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { T } from "@/lib/design/tokens"
import { logout } from "@/app/auth/actions"

import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconMinus, IconPlus, IconUpload } from "@/components/ui/icons"
import { Rule } from "@/components/ui/rule"

const navItems = [
  { label: "Overview", href: "/", badge: null },
  { label: "All activity", href: "/activity", badge: null },
  { label: "Categories", href: "/categories", badge: null },
  { label: "Upload", href: "/upload", badge: "AI" },
  { label: "Export", href: "/export", badge: null },
]

export function Sidebar({
  userEmail,
  userName,
}: {
  userEmail?: string | null
  userName?: string | null
}) {
  const pathname = usePathname()
  const displayName = userName || (userEmail ? userEmail.split("@")[0] : "Guest")
  const initial = displayName[0].toLowerCase()

  return (
    <aside
      style={{
        width: 232,
        padding: "28px 22px",
        borderRight: `1px solid ${T.rule}`,
        display: "flex",
        flexDirection: "column",
        gap: 28,
        background: T.paper,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <div
          style={{
            fontFamily: T.serif,
            fontSize: 26,
            fontWeight: 400,
            letterSpacing: -0.5,
            fontStyle: "italic",
          }}
        >
          Ledger
        </div>
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 10,
            color: T.muted,
            letterSpacing: 1,
          }}
        >
          v 1.0
        </div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: "9px 12px",
                borderRadius: 8,
                background: active ? T.ink : "transparent",
                color: active ? T.paper : T.ink2,
                fontSize: 14,
                fontWeight: active ? 500 : 400,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                textDecoration: "none",
                fontFamily: T.sans,
              }}
            >
              <span>{item.label}</span>
              {item.badge && (
                <Chip
                  tone="coral"
                  size="sm"
                  style={{ height: 18, fontSize: 10, padding: "0 8px" }}
                >
                  {item.badge}
                </Chip>
              )}
            </Link>
          )
        })}
      </nav>

      <Rule />

      <div>
        <Eyebrow style={{ marginBottom: 12 }}>Quick add</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link href="/add?type=expense" style={{ textDecoration: "none" }}>
            <Button
              variant="coral"
              size="sm"
              icon={<IconMinus size={12} />}
              style={{ width: "100%" }}
            >
              Expense
            </Button>
          </Link>
          <Link href="/add?type=earning" style={{ textDecoration: "none" }}>
            <Button
              variant="teal"
              size="sm"
              icon={<IconPlus size={12} />}
              style={{ width: "100%" }}
            >
              Earning
            </Button>
          </Link>
          <Link href="/upload" style={{ textDecoration: "none" }}>
            <Button
              variant="light"
              size="sm"
              icon={<IconUpload size={14} />}
              style={{ width: "100%" }}
            >
              Upload receipt
            </Button>
          </Link>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          paddingTop: 10,
          borderTop: `1px solid ${T.rule}`,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              background: T.ink,
              color: T.paper,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: T.serif,
              fontSize: 15,
              fontStyle: "italic",
              flexShrink: 0,
            }}
          >
            {initial}
          </div>
          <div style={{ lineHeight: 1.2, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {displayName}
            </div>
            <div style={{ fontSize: 11, color: T.muted }}>
              Personal &middot; COP
            </div>
          </div>
        </div>
        <button
          onClick={() => logout()}
          style={{
            width: "100%",
            height: 30,
            borderRadius: 999,
            border: `1px solid ${T.rule}`,
            background: "transparent",
            color: T.muted,
            fontFamily: T.sans,
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
