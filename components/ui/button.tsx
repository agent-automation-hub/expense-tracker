import { T } from "@/lib/design/tokens"

const variantMap = {
  primary: { bg: T.ink, fg: "#FBF9F5", br: T.ink },
  ghost: { bg: T.paper, fg: T.ink, br: T.rule },
  coral: { bg: T.coral, fg: "#fff", br: T.coral },
  teal: { bg: T.teal, fg: "#fff", br: T.teal },
  light: { bg: "#FBF9F5", fg: T.ink, br: T.rule },
}

const sizeMap = {
  sm: { h: 30, px: 12, fs: 13 },
  md: { h: 40, px: 16, fs: 14 },
  lg: { h: 48, px: 20, fs: 15 },
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  style,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  variant?: keyof typeof variantMap
  size?: keyof typeof sizeMap
  icon?: React.ReactNode
  style?: React.CSSProperties
  onClick?: () => void
  disabled?: boolean
}) {
  const v = variantMap[variant]
  const s = sizeMap[size]
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        height: s.h,
        padding: `0 ${s.px}px`,
        background: v.bg,
        color: v.fg,
        border: `1px solid ${v.br}`,
        borderRadius: 999,
        fontFamily: T.sans,
        fontSize: s.fs,
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        letterSpacing: 0,
        userSelect: "none",
        ...style,
      }}
    >
      {icon && <span style={{ display: "inline-flex" }}>{icon}</span>}
      {children}
    </button>
  )
}
