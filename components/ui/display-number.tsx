import { T } from "@/lib/design/tokens"

export function DisplayNumber({
  children,
  size = 56,
  color = T.ink,
  weight = 400,
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
        fontFamily: T.serif,
        fontSize: size,
        fontWeight: weight,
        color,
        fontFeatureSettings: '"tnum","lnum"',
        letterSpacing: -0.02 * size,
        lineHeight: 1,
        fontVariationSettings: '"opsz" 144',
        ...style,
      }}
    >
      {children}
    </span>
  )
}
