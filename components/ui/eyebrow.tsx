import { T } from "@/lib/design/tokens"

export function Eyebrow({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        fontFamily: T.sans,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: 1.6,
        textTransform: "uppercase",
        color: T.muted,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
