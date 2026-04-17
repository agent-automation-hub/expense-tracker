import { T } from "@/lib/design/tokens"

export function ActionCard({
  tone,
  label,
  icon,
}: {
  tone: "coral" | "teal"
  label: string
  icon: React.ReactNode
}) {
  const bg = tone === "coral" ? T.coralBg : T.tealBg
  const fg = tone === "coral" ? T.coral : T.teal
  return (
    <div
      style={{
        background: bg,
        borderRadius: 2,
        padding: "18px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        minHeight: 106,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 999,
          background: T.paper,
          color: fg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: T.serif,
          fontSize: 18,
          color: T.ink,
          letterSpacing: -0.3,
        }}
      >
        {label}
      </div>
    </div>
  )
}
