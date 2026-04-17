"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { T } from "@/lib/design/tokens"
import { createClient } from "@/lib/supabase/client"

import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
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
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 28,
              fontWeight: 400,
              letterSpacing: -0.5,
              marginBottom: 12,
            }}
          >
            Check your email
          </div>
          <div
            style={{
              fontSize: 14,
              color: T.muted,
              lineHeight: 1.5,
              marginBottom: 24,
            }}
          >
            We sent a confirmation link to{" "}
            <span style={{ color: T.ink, fontWeight: 500 }}>{email}</span>.
            Click it to activate your account.
          </div>
          <Link
            href="/auth/login"
            style={{
              color: T.ink,
              fontWeight: 500,
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            Back to sign in
          </Link>
        </div>
      </div>
    )
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
            Create your account
          </div>
        </div>

        <form onSubmit={handleRegister}>
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
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder="Valentina Reyes"
            />
          </div>

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
              placeholder="At least 6 characters"
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
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              placeholder="Repeat your password"
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
            {loading ? "Creating account\u2026" : "Create account"}
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
          Already have an account?{" "}
          <Link
            href="/auth/login"
            style={{
              color: T.ink,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
