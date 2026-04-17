"use client"

import { useState } from "react"

import { T } from "@/lib/design/tokens"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function inRange(date: Date, start: Date, end: Date) {
  return date.getTime() > start.getTime() && date.getTime() < end.getTime()
}

export function Calendar({
  startDate,
  endDate,
  onSelect,
  onClear,
}: {
  startDate: Date | null
  endDate: Date | null
  onSelect: (date: Date) => void
  onClear: () => void
}) {
  const [viewMonth, setViewMonth] = useState(
    () =>
      new Date(
        startDate ? startDate.getFullYear() : 2026,
        startDate ? startDate.getMonth() : 3,
        1,
      ),
  )

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const today = new Date(2026, 3, 17)

  return (
    <div
      style={{
        width: 300,
        background: T.paper,
        border: `1px solid ${T.rule}`,
        borderRadius: 16,
        padding: 20,
        fontFamily: T.sans,
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <button
          type="button"
          onClick={() => setViewMonth(new Date(year, month - 1, 1))}
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: "transparent",
            border: `1px solid ${T.rule}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: T.ink,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          ‹
        </button>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: T.ink,
            letterSpacing: -0.3,
          }}
        >
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setViewMonth(new Date(year, month + 1, 1))}
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: "transparent",
            border: `1px solid ${T.rule}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            color: T.ink,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          ›
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: 4,
        }}
      >
        {DAYS.map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: 10,
              fontWeight: 500,
              color: T.muted,
              padding: "4px 0",
              fontFamily: T.mono,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 2,
        }}
      >
        {cells.map((day, i) => {
          if (day === null) return <div key={`e${i}`} />

          const date = new Date(year, month, day)
          const isToday = sameDay(date, today)
          const isStart = startDate !== null && sameDay(date, startDate)
          const isEnd = endDate !== null && sameDay(date, endDate)
          const isSelected = isStart || isEnd
          const isInRange =
            startDate !== null &&
            endDate !== null &&
            inRange(date, startDate, endDate)

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelect(date)}
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: 12,
                fontFamily: T.mono,
                fontWeight: isSelected ? 600 : 400,
                background: isSelected
                  ? T.ink
                  : isInRange
                    ? T.rule
                    : "transparent",
                color: isSelected ? T.paper : isToday ? T.coral : T.ink,
                border:
                  isToday && !isSelected ? `1.5px solid ${T.coral}` : "none",
                cursor: "pointer",
                transition: "background 80ms ease",
              }}
            >
              {day}
            </button>
          )
        })}
      </div>

      {startDate !== null && (
        <button
          type="button"
          onClick={onClear}
          style={{
            marginTop: 12,
            width: "100%",
            height: 32,
            borderRadius: 999,
            background: "transparent",
            border: `1px solid ${T.rule}`,
            color: T.muted,
            fontSize: 12,
            fontFamily: T.sans,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Clear dates
        </button>
      )}
    </div>
  )
}
