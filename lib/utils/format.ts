export function fmtCOP(n: number) {
  const abs = Math.abs(Math.round(n))
  const s = abs.toLocaleString("es-CO").replace(/,/g, ".")
  return (n < 0 ? "\u2212" : "") + "COP$ " + s
}

export function fmtCOPraw(n: number) {
  const abs = Math.abs(Math.round(n))
  return abs.toLocaleString("es-CO").replace(/,/g, ".")
}
