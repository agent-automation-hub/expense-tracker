import { T } from "@/lib/design/tokens"

export function MonoNumber({
  children,
  size = 14,
  color = T.ink,
  weight = 500,
  style,
}: {
  children: React.ReactNode
  size?: number
  color?: string
  weight?: number
  style?: React.CSSProperties
}) {
  return (
    <span
      style={{
        fontFamily: T.mono,
        fontSize: size,
        fontWeight: weight,
        color,
        fontFeatureSettings: '"tnum"',
        ...style,
      }}
    >
      {children}
    </span>
  )
}
