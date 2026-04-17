import { T } from "@/lib/design/tokens"
import { createClient } from "@/lib/supabase/server"

import { AppShell } from "@/components/layout/app-shell"
import { Eyebrow } from "@/components/ui/eyebrow"

import { ExportView } from "./export-view"

export default async function ExportPage() {
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
          <Eyebrow>Export</Eyebrow>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 36,
              fontWeight: 400,
              letterSpacing: -0.8,
              marginTop: 4,
            }}
          >
            Take your data{" "}
            <span style={{ fontStyle: "italic" }}>with you.</span>
          </div>
        </div>
      </div>

      <ExportView />
    </AppShell>
  )
}
