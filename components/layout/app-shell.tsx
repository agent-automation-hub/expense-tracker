"use client"

import { T } from "@/lib/design/tokens"

import { Sidebar } from "@/components/layout/sidebar"

export function AppShell({
  children,
  userEmail,
  userName,
}: {
  children: React.ReactNode
  userEmail?: string | null
  userName?: string | null
}) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: T.ivory,
        color: T.ink,
        fontFamily: T.sans,
        overflow: "hidden",
      }}
    >
      <Sidebar userEmail={userEmail} userName={userName} />
      <main
        style={{
          flex: 1,
          padding: "28px 36px 0",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main>
    </div>
  )
}
