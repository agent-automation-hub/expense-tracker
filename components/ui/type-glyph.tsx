import { T } from "@/lib/design/tokens"

export function TypeGlyph({
  type,
  size = 28,
}: {
  type: "in" | "out"
  size?: number
}) {
  const isOut = type === "out"
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: isOut ? T.coralBg : T.tealBg,
        color: isOut ? T.coral : T.teal,
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
      {isOut ? "\u2212" : "+"}
    </div>
  )
}
