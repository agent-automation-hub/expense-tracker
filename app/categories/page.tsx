import { createClient } from "@/lib/supabase/server"

import { AppShell } from "@/components/layout/app-shell"

import { CategoriesView } from "./categories-view"

export default async function CategoriesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <AppShell
      userEmail={user?.email}
      userName={user?.user_metadata?.display_name}
    >
      <CategoriesView />
    </AppShell>
  )
}
