// Design tokens — editorial minimal fintech
// Ivory canvas, true black, one warm coral for expenses, one cool teal for earnings.

const T = {
  // Canvas
  ivory: "#F4F1EC",
  paper: "#FBF9F5",
  ink: "#141311",
  ink2: "#2B2926",
  muted: "#8A847B",
  faint: "#C8C2B6",
  rule: "#E4DFD5",
  rule2: "#EAE5DB",

  // Accents (single-hue per role, matched chroma)
  coral: "#D66A4E", // expense / money out
  coralSoft: "#F4D9CE",
  coralBg: "#FAEAE1",
  teal: "#3E8B85", // earning / money in
  tealSoft: "#C9E0DD",
  tealBg: "#E2EFEC",

  // One shared editorial accent for UI (links, focus)
  accent: "#141311",

  // Type
  serif: '"Fraunces", "Times New Roman", serif',
  sans: '"Inter", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
}

// Currency formatter for Colombian pesos (no decimals, thin-space thousands)
const fmtCOP = (n) => {
  const abs = Math.abs(Math.round(n))
  const s = abs.toLocaleString("es-CO").replace(/,/g, ".")
  return (n < 0 ? "−" : "") + "COP$ " + s
}
// Compact variant for big hero numbers — same formatting, caller adds sign
const fmtCOPraw = (n) => {
  const abs = Math.abs(Math.round(n))
  return abs.toLocaleString("es-CO").replace(/,/g, ".")
}

window.T = T
window.fmtCOP = fmtCOP
window.fmtCOPraw = fmtCOPraw
