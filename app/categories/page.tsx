import { T, catColors } from "@/lib/design/tokens"
import { categories, tx } from "@/lib/mock/data"
import { createClient } from "@/lib/supabase/server"
import { fmtCOPraw } from "@/lib/utils/format"

import { AppShell } from "@/components/layout/app-shell"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import { IconArrowRight, IconPlus } from "@/components/ui/icons"
import { MonoNumber } from "@/components/ui/mono-number"
import { Rule } from "@/components/ui/rule"

const expenses = categories.filter((c) => c.kind === "expense")
const earnings = categories.filter((c) => c.kind === "earning")

function CategoryRow({ cat }: { cat: (typeof categories)[number] }) {
  const total = tx
    .filter((t) => t.cat === cat.id)
    .reduce((s, t) => s + t.amount, 0)
  return (
    <div
      style={{
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 999,
          background: catColors[cat.id] || T.faint,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>{cat.label}</div>
      </div>
      <MonoNumber size={12} color={T.muted}>
        {fmtCOPraw(total)}
      </MonoNumber>
      <span style={{ color: T.muted }}>
        <IconArrowRight size={12} />
      </span>
    </div>
  )
}

export default async function CategoriesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <AppShell userEmail={user?.email} userName={user?.user_metadata?.display_name}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <Eyebrow>Categories</Eyebrow>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 36,
              fontWeight: 400,
              letterSpacing: -0.8,
              marginTop: 4,
            }}
          >
            How you classify.
          </div>
        </div>
        <Button variant="primary" size="sm" icon={<IconPlus size={12} />}>
          New category
        </Button>
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 28 }}>
        <Eyebrow style={{ marginBottom: 10 }}>
          Expenses &middot; {expenses.length}
        </Eyebrow>
        <div
          style={{
            background: T.paper,
            border: `1px solid ${T.rule}`,
            borderRadius: 2,
            marginBottom: 24,
          }}
        >
          {expenses.map((c, i) => (
            <div key={c.id}>
              <CategoryRow cat={c} />
              {i < expenses.length - 1 && <Rule color={T.rule2} />}
            </div>
          ))}
        </div>

        <Eyebrow style={{ marginBottom: 10 }}>
          Earnings &middot; {earnings.length}
        </Eyebrow>
        <div
          style={{
            background: T.paper,
            border: `1px solid ${T.rule}`,
            borderRadius: 2,
          }}
        >
          {earnings.map((c, i) => (
            <div key={c.id}>
              <CategoryRow cat={c} />
              {i < earnings.length - 1 && <Rule color={T.rule2} />}
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
