export function fmtCOP(n: number) {
  const abs = Math.abs(Math.round(n))
  const s = abs.toLocaleString("es-CO").replace(/,/g, ".")
  return (n < 0 ? "\u2212" : "") + "COP$ " + s
}

export function fmtCOPraw(n: number) {
  const abs = Math.abs(Math.round(n))
  return abs.toLocaleString("es-CO").replace(/,/g, ".")
}

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function toLocalDate(iso: string) {
  return new Date(iso + "T00:00:00")
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function formatTxDate(isoDate: string, isoCreatedAt?: string) {
  const d = toLocalDate(isoDate)
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  if (isSameDay(d, now)) {
    if (isoCreatedAt) {
      const t = new Date(isoCreatedAt)
      const hh = String(t.getHours()).padStart(2, "0")
      const mm = String(t.getMinutes()).padStart(2, "0")
      return `Today · ${hh}:${mm}`
    }
    return "Today"
  }

  if (isSameDay(d, yesterday)) {
    if (isoCreatedAt) {
      const t = new Date(isoCreatedAt)
      const hh = String(t.getHours()).padStart(2, "0")
      const mm = String(t.getMinutes()).padStart(2, "0")
      return `Yesterday · ${hh}:${mm}`
    }
    return "Yesterday"
  }

  const mon = MONTHS_SHORT[d.getMonth()]
  const day = String(d.getDate()).padStart(2, "0")
  if (d.getFullYear() !== now.getFullYear()) {
    return `${mon} ${day}, ${d.getFullYear()}`
  }
  return `${mon} ${day}`
}

export function parseISODate(isoDate: string) {
  return toLocalDate(isoDate)
}
