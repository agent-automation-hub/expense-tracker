import { T } from "@/lib/design/tokens"
import { createClient } from "@/lib/supabase/server"
import { AppShell } from "@/components/layout/app-shell"
import { TopBar } from "@/components/layout/top-bar"
import { HeroStats } from "@/components/dashboard/hero-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <AppShell userEmail={user?.email} userName={user?.user_metadata?.display_name}>
      <TopBar userName={user?.user_metadata?.display_name} />
      <HeroStats />
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.35fr 1fr",
          gap: 16,
          flex: 1,
          minHeight: 0,
          paddingBottom: 28,
        }}
      >
        <RecentActivity />
        <CategoryBreakdown />
      </section>
    </AppShell>
  )
}
