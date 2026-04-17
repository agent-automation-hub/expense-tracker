import { T } from "@/lib/design/tokens"

const toneMap = {
  neutral: { bg: "#EDEAE2", fg: T.ink2, br: "transparent" },
  ink: { bg: T.ink, fg: "#FBF9F5", br: T.ink },
  coral: { bg: T.coralBg, fg: "#8B3A20", br: "transparent" },
  teal: { bg: T.tealBg, fg: "#1F5A55", br: "transparent" },
  ghost: { bg: T.paper, fg: T.ink2, br: T.rule },
}

const sizeMap = {
  sm: { fs: 11, px: 10, h: 22 },
  md: { fs: 13, px: 12, h: 28 },
}

export function Chip({
  children,
  tone = "neutral",
  size = "sm",
  style,
  onClick,
}: {
  children: React.ReactNode
  tone?: keyof typeof toneMap
  size?: keyof typeof sizeMap
  style?: React.CSSProperties
  onClick?: () => void
}) {
  const t = toneMap[tone]
  const s = sizeMap[size]
  return (
    <span
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: s.h,
        padding: `0 ${s.px}px`,
        borderRadius: 999,
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.br}`,
        fontFamily: T.sans,
        fontSize: s.fs,
        fontWeight: 500,
        letterSpacing: 0,
        whiteSpace: "nowrap",
        userSelect: "none",
        cursor: onClick ? "pointer" : undefined,
        ...style,
      }}
    >
      {children}
    </span>
  )
}
