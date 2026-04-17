import { T } from "@/lib/design/tokens"
import { createClient } from "@/lib/supabase/server"

import { AppShell } from "@/components/layout/app-shell"
import { UploadRow } from "@/components/transactions/upload-row"
import { Button } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconDoc, IconSparkle, IconUpload } from "@/components/ui/icons"
import { Rule } from "@/components/ui/rule"

export default async function UploadPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <AppShell
      userEmail={user?.email}
      userName={user?.user_metadata?.display_name}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <Eyebrow>Upload</Eyebrow>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 36,
              fontWeight: 400,
              letterSpacing: -0.8,
              marginTop: 4,
            }}
          >
            Drop a file.{" "}
            <span style={{ fontStyle: "italic", color: T.muted }}>
              We&rsquo;ll do the filing.
            </span>
          </div>
        </div>
        <Chip tone="ink" size="md">
          <span style={{ display: "inline-flex", marginRight: 4 }}>
            <IconSparkle size={12} />
          </span>
          AI powered
        </Chip>
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 28 }}>
        <div
          style={{
            padding: "36px 28px",
            background: T.paper,
            border: `1.5px dashed ${T.faint}`,
            borderRadius: 16,
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
          <div style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>
            PDF &middot; JPG &middot; PNG &middot; HEIC &middot; CSV &middot; up
            to 20 MB
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
            }}
          >
            <Button variant="primary" size="sm" icon={<IconDoc size={12} />}>
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
            borderRadius: 16,
            padding: "0 20px",
            overflow: "hidden",
            marginBottom: 24,
          }}
        >
          <UploadRow name="receipt-azahar.jpg" state="scanning" progress={62} />
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
    </AppShell>
  )
}
