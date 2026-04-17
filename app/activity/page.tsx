import { createClient } from "@/lib/supabase/server"

import { AppShell } from "@/components/layout/app-shell"

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
      <ActivityView />
    </AppShell>
  )
}
