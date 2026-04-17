import { T } from "@/lib/design/tokens"

export function Sparkline({
  data,
  width = 260,
  height = 44,
  color = T.ink,
  soft = "#E4DFD5",
}: {
  data: number[]
  width?: number
  height?: number
  color?: string
  soft?: string
}) {
  const max = Math.max(...data)
  const bw = width / data.length
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {data.map((v, i) => {
        const h = Math.max(2, (v / max) * (height - 4))
        return (
          <rect
            key={i}
            x={i * bw + 0.5}
            y={height - h}
            width={Math.max(1, bw - 1.5)}
            height={h}
            rx={0}
            fill={i === data.length - 1 ? color : soft}
          />
        )
      })}
    </svg>
  )
}
