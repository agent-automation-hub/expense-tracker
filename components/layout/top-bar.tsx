"use client"

import Link from "next/link"

import { T } from "@/lib/design/tokens"

import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconFilter, IconPlus, IconSearch } from "@/components/ui/icons"

export function TopBar({ userName }: { userName?: string | null }) {
  const firstName = userName?.split(" ")[0] || "there"
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
      }}
    >
      <div>
        <Eyebrow>April, 2026</Eyebrow>
        <div
          style={{
            fontFamily: T.serif,
            fontSize: 36,
            fontWeight: 400,
            letterSpacing: -0.8,
            marginTop: 4,
          }}
        >
          Good afternoon, {firstName}.
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            height: 36,
            padding: "0 14px",
            border: `1px solid ${T.rule}`,
            borderRadius: 999,
            background: T.paper,
            color: T.muted,
            fontSize: 13,
            width: 260,
          }}
        >
          <IconSearch size={13} />
          <span>Search transactions&hellip;</span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: T.mono,
              fontSize: 10,
            }}
          >
            &lceil;K
          </span>
        </div>
        <Button variant="light" icon={<IconFilter size={13} />}>
          April
        </Button>
        <Link href="/add?type=expense" style={{ textDecoration: "none" }}>
          <Button variant="primary" icon={<IconPlus size={12} />}>
            Add
          </Button>
        </Link>
      </div>
    </div>
  )
}
