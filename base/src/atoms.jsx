// Shared atoms

const { T, fmtCOP, fmtCOPraw } = window

// Small serif uppercase label (editorial eyebrow)
function Eyebrow({ children, style }) {
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

// Serif display number, tabular
function Num({ children, size = 56, color = T.ink, weight = 400, style }) {
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

// Mono tabular number (for list rows)
function Mono({ children, size = 14, color = T.ink, weight = 500, style }) {
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

// Hairline rule
function Rule({ color = T.rule, style }) {
  return <div style={{ height: 1, background: color, ...style }} />
}

// Dot (category swatch)
function Dot({ color, size = 8, style }) {
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

// Pill / chip
function Chip({ children, tone = "neutral", size = "sm", style }) {
  const tones = {
    neutral: { bg: "#EDEAE2", fg: T.ink2, br: "transparent" },
    ink: { bg: T.ink, fg: "#FBF9F5", br: T.ink },
    coral: { bg: T.coralBg, fg: "#8B3A20", br: "transparent" },
    teal: { bg: T.tealBg, fg: "#1F5A55", br: "transparent" },
    ghost: { bg: "transparent", fg: T.ink2, br: T.rule },
  }[tone]
  const sz =
    size === "md"
      ? { fs: 13, py: 6, px: 12, h: 28 }
      : { fs: 11, py: 4, px: 10, h: 22 }
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: sz.h,
        padding: `0 ${sz.px}px`,
        borderRadius: 999,
        background: tones.bg,
        color: tones.fg,
        border: `1px solid ${tones.br}`,
        fontFamily: T.sans,
        fontSize: sz.fs,
        fontWeight: 500,
        letterSpacing: 0,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </span>
  )
}

// Type/source glyph
function TypeGlyph({ type, size = 28 }) {
  const out = type === "out"
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: out ? T.coralBg : T.tealBg,
        color: out ? T.coral : T.teal,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: T.serif,
        fontSize: size * 0.58,
        fontWeight: 500,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      {out ? "−" : "+"}
    </div>
  )
}

// Sparkline (SVG) — reads from spark array, can color bars by sign
function Spark({
  data,
  width = 260,
  height = 44,
  color = T.ink,
  soft = "#E4DFD5",
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

// Donut with stroke segments
function Donut({ segments, size = 220, thickness = 22, center }) {
  // segments: [{pct, color}]
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
          offset += dash + 2 // 2px gap
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

// Button
function Btn({
  children,
  variant = "primary",
  size = "md",
  icon,
  style,
  onClick,
}) {
  const variants = {
    primary: { bg: T.ink, fg: "#FBF9F5", br: T.ink },
    ghost: { bg: "transparent", fg: T.ink, br: T.rule },
    coral: { bg: T.coral, fg: "#fff", br: T.coral },
    teal: { bg: T.teal, fg: "#fff", br: T.teal },
    light: { bg: "#FBF9F5", fg: T.ink, br: T.rule },
  }[variant]
  const sizes = {
    sm: { h: 30, px: 12, fs: 13 },
    md: { h: 40, px: 16, fs: 14 },
    lg: { h: 48, px: 20, fs: 15 },
  }[size]
  return (
    <button
      onClick={onClick}
      style={{
        height: sizes.h,
        padding: `0 ${sizes.px}px`,
        background: variants.bg,
        color: variants.fg,
        border: `1px solid ${variants.br}`,
        borderRadius: 999,
        fontFamily: T.sans,
        fontSize: sizes.fs,
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        letterSpacing: 0,
        ...style,
      }}
    >
      {icon && <span style={{ display: "inline-flex" }}>{icon}</span>}
      {children}
    </button>
  )
}

// Icon set — line icons, currentColor
const I = {
  plus: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 14 14">
      <path
        d="M7 1v12M1 7h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  minus: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 14 14">
      <path
        d="M1 7h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  up: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 12 12">
      <path
        d="M3 7l3-3 3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  down: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 12 12">
      <path
        d="M3 5l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ar: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 14 14">
      <path
        d="M3 7h8m-3-3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  upload: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 16 16">
      <path
        d="M8 11V2m0 0L4 6m4-4l4 4M2 11v3h12v-3"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  dl: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 16 16">
      <path
        d="M8 2v9m0 0l4-4m-4 4L4 7M2 12v2h12v-2"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  sparkle: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 14 14">
      <path
        d="M7 1l1.2 3.5L12 5.5l-3 2 1 4-3-2.2-3 2.2 1-4-3-2L4.8 4.5 7 1z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  ),
  search: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 14 14">
      <circle
        cx="6"
        cy="6"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M9.5 9.5L13 13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
  doc: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 16 16">
      <path
        d="M3 1h7l3 3v11H3V1zm7 0v3h3"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  ),
  check: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 12 12">
      <path
        d="M2.5 6.5L5 9l4.5-5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  x: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 12 12">
      <path
        d="M2 2l8 8M10 2l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  dots: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 14 4">
      <circle cx="2" cy="2" r="1.4" fill="currentColor" />
      <circle cx="7" cy="2" r="1.4" fill="currentColor" />
      <circle cx="12" cy="2" r="1.4" fill="currentColor" />
    </svg>
  ),
  filter: (s = 14) => (
    <svg width={s} height={s} viewBox="0 0 14 14">
      <path
        d="M1 3h12M3 7h8M5 11h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),
}

Object.assign(window, {
  Eyebrow,
  Num,
  Mono,
  Rule,
  Dot,
  Chip,
  TypeGlyph,
  Spark,
  Donut,
  Btn,
  I,
})
