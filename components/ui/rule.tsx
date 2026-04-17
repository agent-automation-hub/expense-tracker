import { T } from "@/lib/design/tokens"

export function Rule({
  color = T.rule,
  style,
}: {
  color?: string
  style?: React.CSSProperties
}) {
  return <div style={{ height: 1, background: color, ...style }} />
}
