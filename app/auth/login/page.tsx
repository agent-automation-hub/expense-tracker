"use client"

import { useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { T } from "@/lib/design/tokens"
import { createClient } from "@/lib/supabase/client"

import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.ivory,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: T.sans,
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: T.paper,
          border: `1px solid ${T.rule}`,
          borderRadius: 2,
          padding: "40px 32px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 32,
              fontWeight: 400,
              letterSpacing: -0.5,
              fontStyle: "italic",
              marginBottom: 8,
            }}
          >
            Ledger
          </div>
          <div style={{ fontSize: 14, color: T.muted }}>
            Sign in to your account
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
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
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                height: 42,
                padding: "0 14px",
                border: `1px solid ${T.rule}`,
                borderRadius: 2,
                background: T.ivory,
                fontFamily: T.sans,
                fontSize: 14,
                color: T.ink,
                outline: "none",
                boxSizing: "border-box",
              }}
              placeholder="you@example.com"
            />
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
                marginBottom: 6,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                height: 42,
                padding: "0 14px",
                border: `1px solid ${T.rule}`,
                borderRadius: 2,
                background: T.ivory,
                fontFamily: T.sans,
                fontSize: 14,
                color: T.ink,
                outline: "none",
                boxSizing: "border-box",
              }}
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            />
          </div>

          {error && (
            <div
              style={{
                padding: "10px 14px",
                background: T.coralBg,
                border: `1px solid ${T.coralSoft}`,
                borderRadius: 2,
                fontSize: 13,
                color: T.coral,
                marginBottom: 16,
              }}
            >
              {error}
            </div>
          )}

          <Button
            variant="primary"
            size="lg"
            style={{
              width: "100%",
              justifyContent: "center",
              opacity: loading ? 0.7 : 1,
            }}
            onClick={() => {}}
          >
            {loading ? "Signing in\u2026" : "Sign in"}
          </Button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: T.muted,
          }}
        >
          Don&rsquo;t have an account?{" "}
          <Link
            href="/auth/register"
            style={{
              color: T.ink,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  )
}
