export function Dot({
  color,
  size = 8,
  style,
}: {
  color: string
  size?: number
  style?: React.CSSProperties
}) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: 999,
        background: color,
        ...style,
      }}
    />
  )
}
