import { and, eq, gte, lt, ne, sql } from "drizzle-orm"
import { z } from "zod"

import { categories, transactions } from "@/lib/db/schema"

import { createTRPCRouter, protectedProcedure } from "@/trpc/init"

function monthRange(month: number, year: number) {
  const start = `${year}-${String(month).padStart(2, "0")}-01`
  const nextMonth = month === 12 ? 1 : month + 1
  const nextYear = month === 12 ? year + 1 : year
  const end = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`
  return { start, end }
}

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate()
}

const periodInput = z
  .object({
    month: z.number().int().min(1).max(12).optional(),
    year: z.number().int().min(2000).max(2100).optional(),
  })
  .optional()

export const dashboardRouter = createTRPCRouter({
  stats: protectedProcedure.input(periodInput).query(async ({ ctx, input }) => {
    const now = new Date()
    const month = input?.month ?? now.getMonth() + 1
    const year = input?.year ?? now.getFullYear()
    const { start, end } = monthRange(month, year)
    const days = daysInMonth(month, year)

    const [agg] = await ctx.db
      .select({
        earned: sql<string>`coalesce(sum(case when ${transactions.type} = 'income' then ${transactions.amount} else 0 end), 0)`,
        spent: sql<string>`coalesce(sum(case when ${transactions.type} = 'expense' then ${transactions.amount} else 0 end), 0)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, ctx.user.id),
          ne(transactions.status, "deleted"),
          gte(transactions.date, start),
          lt(transactions.date, end),
        ),
      )

    const earned = Number(agg?.earned ?? 0)
    const spent = Number(agg?.spent ?? 0)

    const dailyRows = await ctx.db
      .select({
        day: sql<string>`${transactions.date}`,
        total: sql<string>`coalesce(sum(${transactions.amount}), 0)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, ctx.user.id),
          ne(transactions.status, "deleted"),
          eq(transactions.type, "expense"),
          gte(transactions.date, start),
          lt(transactions.date, end),
        ),
      )
      .groupBy(transactions.date)

    const dailyMap = new Map(
      dailyRows.map((r) => {
        const dayNum = new Date(r.day + "T00:00:00").getDate()
        return [dayNum, Number(r.total)]
      }),
    )

    const spark = Array.from(
      { length: days },
      (_, i) => dailyMap.get(i + 1) ?? 0,
    )

    return {
      earned,
      spent,
      balance: earned - spent,
      spark,
      month,
      year,
    }
  }),

  breakdown: protectedProcedure
    .input(periodInput)
    .query(async ({ ctx, input }) => {
      const now = new Date()
      const month = input?.month ?? now.getMonth() + 1
      const year = input?.year ?? now.getFullYear()
      const { start, end } = monthRange(month, year)

      const rows = await ctx.db
        .select({
          categoryId: transactions.categoryId,
          categoryName: categories.name,
          categoryColor: categories.color,
          categoryIcon: categories.icon,
          total: sql<string>`coalesce(sum(${transactions.amount}), 0)`,
        })
        .from(transactions)
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
        .where(
          and(
            eq(transactions.userId, ctx.user.id),
            ne(transactions.status, "deleted"),
            eq(transactions.type, "expense"),
            gte(transactions.date, start),
            lt(transactions.date, end),
          ),
        )
        .groupBy(
          transactions.categoryId,
          categories.name,
          categories.color,
          categories.icon,
        )
        .orderBy(sql`sum(${transactions.amount}) desc`)

      const totalSpent = rows.reduce((sum, r) => sum + Number(r.total), 0)

      return rows.map((r) => ({
        id: r.categoryId,
        name: r.categoryName ?? "Uncategorized",
        color: r.categoryColor,
        icon: r.categoryIcon,
        amount: Number(r.total),
        pct: totalSpent > 0 ? Number(r.total) / totalSpent : 0,
      }))
    }),
})
