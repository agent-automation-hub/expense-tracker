import { T } from "@/lib/design/tokens"
import { createClient } from "@/lib/supabase/server"

import { AppShell } from "@/components/layout/app-shell"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconFilter, IconSearch } from "@/components/ui/icons"

import { ActivityView } from "./activity-view"

export default async function ActivityPage() {
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
          <Eyebrow>Activity</Eyebrow>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 36,
              fontWeight: 400,
              letterSpacing: -0.8,
              marginTop: 4,
            }}
          >
            All movement.
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              background: T.paper,
              border: `1px solid ${T.rule}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.ink,
            }}
          >
            <IconSearch size={13} />
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              background: T.paper,
              border: `1px solid ${T.rule}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: T.ink,
            }}
          >
            <IconFilter size={13} />
          </div>
        </div>
      </div>

      <ActivityView />
    </AppShell>
  )
}
