import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#141311",
        display: "flex",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 62,
          top: 40,
          width: 18,
          height: 88,
          background: "#F4F1EC",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 62,
          top: 110,
          width: 64,
          height: 18,
          background: "#F4F1EC",
        }}
      />
    </div>,
    { ...size },
  )
}
