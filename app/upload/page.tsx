import Link from "next/link"

import { T } from "@/lib/design/tokens"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Chip } from "@/components/ui/chip"
import { Button } from "@/components/ui/button"
import { Rule } from "@/components/ui/rule"
import { UploadRow } from "@/components/transactions/upload-row"
import {
  IconX,
  IconSparkle,
  IconUpload,
  IconDoc,
} from "@/components/ui/icons"

export default function UploadPage() {
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
      <div style={{ width: "100%", maxWidth: 520 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
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
              background: T.paper,
            }}
          >
            <IconX size={11} />
          </Link>
          <Chip tone="ink" size="sm">
            <span
              style={{ display: "inline-flex", marginRight: 4 }}
            >
              <IconSparkle size={10} />
            </span>
            AI
          </Chip>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: T.muted,
              marginBottom: 6,
              fontWeight: 500,
            }}
          >
            Upload
          </div>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 32,
              letterSpacing: -0.5,
              lineHeight: 1.15,
            }}
          >
            Drop a file.
            <br />
            <span style={{ fontStyle: "italic", color: T.muted }}>
              We&rsquo;ll do the filing.
            </span>
          </div>
        </div>

        <div
          style={{
            padding: "36px 28px",
            background: T.paper,
            border: `1.5px dashed ${T.faint}`,
            borderRadius: 2,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: T.ivory,
              margin: "0 auto 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.ink,
            }}
          >
            <IconUpload size={22} />
          </div>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 18,
              letterSpacing: -0.2,
              marginBottom: 4,
            }}
          >
            Drag a file, or click to pick
          </div>
          <div
            style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}
          >
            PDF &middot; JPG &middot; PNG &middot; HEIC &middot; CSV
            &middot; up to 20 MB
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
            }}
          >
            <Button
              variant="primary"
              size="sm"
              icon={<IconDoc size={12} />}
            >
              Choose file
            </Button>
            <Button variant="light" size="sm">
              Take photo
            </Button>
          </div>
        </div>

        <Eyebrow style={{ marginBottom: 10 }}>In progress</Eyebrow>
        <div
          style={{
            background: T.paper,
            border: `1px solid ${T.rule}`,
            borderRadius: 2,
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          <UploadRow
            name="receipt-azahar.jpg"
            state="scanning"
            progress={62}
          />
          <Rule color={T.rule2} />
          <UploadRow
            name="bancolombia-march.pdf"
            state="extracted"
            count={14}
          />
          <Rule color={T.rule2} />
          <UploadRow name="uber-trip.pdf" state="ready" count={1} />
        </div>

        <Eyebrow style={{ marginBottom: 10 }}>What it reads</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[
            "Receipts",
            "Invoices",
            "Bank statements",
            "Screenshots",
            "Plain notes",
          ].map((l) => (
            <Chip key={l} tone="ghost" size="md">
              {l}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )
}
