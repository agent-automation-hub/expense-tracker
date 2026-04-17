import { T } from "@/lib/design/tokens"

export function Field({
  label,
  value,
  rightNode,
  muted,
}: {
  label: string
  value?: string
  rightNode?: React.ReactNode
  muted?: boolean
}) {
  return (
    <div
      style={{
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: T.muted,
          letterSpacing: 0.3,
          textTransform: "uppercase",
          fontWeight: 500,
          width: 90,
        }}
      >
        {label}
      </div>
      {rightNode || (
        <div
          style={{
            fontSize: 14,
            color: muted ? T.muted : T.ink,
            flex: 1,
            textAlign: "right",
          }}
        >
          {value}
        </div>
      )}
    </div>
  )
}
