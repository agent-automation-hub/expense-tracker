import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#141311",
        display: "flex",
        position: "relative",
        borderRadius: 6,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 7,
          width: 3,
          height: 16,
          background: "#F4F1EC",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 10,
          top: 20,
          width: 11,
          height: 3,
          background: "#F4F1EC",
        }}
      />
    </div>,
    { ...size },
  )
}
