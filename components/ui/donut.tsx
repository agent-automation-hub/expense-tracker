import { T } from "@/lib/design/tokens"

export interface DonutSegment {
  pct: number
  color: string
}

export function Donut({
  segments,
  size = 220,
  thickness = 22,
  center,
}: {
  segments: DonutSegment[]
  size?: number
  thickness?: number
  center?: React.ReactNode
}) {
  const r = (size - thickness) / 2
  const C = 2 * Math.PI * r
  let offset = 0

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={T.rule2}
          strokeWidth={thickness}
        />
        {segments.map((s, i) => {
          const dash = s.pct * C
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${C - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          )
          offset += dash + 2
          return el
        })}
      </svg>
      {center && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {center}
        </div>
      )}
    </div>
  )
}
