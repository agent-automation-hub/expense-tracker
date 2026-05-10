import { TRPCError } from "@trpc/server"
import { and, desc, eq, gte, lt, ne, sql } from "drizzle-orm"
import { z } from "zod"

import { categories, profiles, transactions } from "@/lib/db/schema"
import type { TransactionListItem } from "@/lib/transactions/types"

import { createTRPCRouter, protectedProcedure } from "@/trpc/init"

function monthRange(month: number, year: number) {
  const start = `${year}-${String(month).padStart(2, "0")}-01`
  const nextMonth = month === 12 ? 1 : month + 1
  const nextYear = month === 12 ? year + 1 : year
  const end = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`
  return { start, end }
}

type CategoryPartial = {
  id: string
  name: string
  color: string | null
  icon: string | null
}

function toListItem(
  tx: typeof transactions.$inferSelect,
  cat: CategoryPartial | null,
): TransactionListItem {
  return {
    id: tx.id,
    type: tx.type === "expense" ? "out" : "in",
    merchant: tx.merchant,
    note: tx.note,
    amount: Number(tx.amount),
    currency: tx.currency,
    date: tx.date,
    createdAt: tx.createdAt.toISOString(),
    src: tx.aiExtractionId ? "ai" : "manual",
    categoryId: tx.categoryId,
    category: cat
      ? { id: cat.id, name: cat.name, color: cat.color, icon: cat.icon }
      : null,
  }
}

const listInput = z
  .object({
    month: z.number().int().min(1).max(12).optional(),
    year: z.number().int().min(2000).max(2100).optional(),
    limit: z.number().int().min(1).max(200).optional(),
  })
  .optional()

const createInput = z.object({
  type: z.enum(["expense", "income"]),
  amount: z.string().regex(/^\d+(\.\d{1,4})?$/),
  currency: z.string().length(3),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  merchant: z.string().trim().max(200).optional(),
  note: z.string().trim().max(500).optional(),
  categoryId: z.string().uuid().optional(),
})

const updateInput = z.object({
  id: z.string().uuid(),
  type: z.enum(["expense", "income"]).optional(),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,4})?$/)
    .optional(),
  currency: z.string().length(3).optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  merchant: z.string().trim().max(200).nullish(),
  note: z.string().trim().max(500).nullish(),
  categoryId: z.string().uuid().nullish(),
})

export const transactionsRouter = createTRPCRouter({
  list: protectedProcedure.input(listInput).query(async ({ ctx, input }) => {
    const now = new Date()
    const month = input?.month ?? now.getMonth() + 1
    const year = input?.year ?? now.getFullYear()
    const limit = input?.limit ?? 50
    const { start, end } = monthRange(month, year)

    const rows = await ctx.db
      .select({ tx: transactions, cat: categories })
      .from(transactions)
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .where(
        and(
          eq(transactions.userId, ctx.user.id),
          ne(transactions.status, "deleted"),
          gte(transactions.date, start),
          lt(transactions.date, end),
        ),
      )
      .orderBy(desc(transactions.date), desc(transactions.createdAt))
      .limit(limit)

    return rows.map((r) => toListItem(r.tx, r.cat))
  }),

  create: protectedProcedure
    .input(createInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(profiles)
        .values({
          defaultCurrency: "COP",
          displayName:
            typeof ctx.user.user_metadata.display_name === "string"
              ? ctx.user.user_metadata.display_name
              : null,
          id: ctx.user.id,
        })
        .onConflictDoNothing()

      const [row] = await ctx.db
        .insert(transactions)
        .values({
          userId: ctx.user.id,
          type: input.type,
          status: "confirmed",
          amount: input.amount,
          currency: input.currency,
          date: input.date,
          merchant: input.merchant ?? null,
          note: input.note ?? null,
          categoryId: input.categoryId ?? null,
        })
        .returning()

      const catRow = row.categoryId
        ? await ctx.db
            .select({
              id: categories.id,
              name: categories.name,
              color: categories.color,
              icon: categories.icon,
            })
            .from(categories)
            .where(eq(categories.id, row.categoryId))
            .then((r) => r[0] ?? null)
        : null

      return toListItem(row, catRow)
    }),

  update: protectedProcedure
    .input(updateInput)
    .mutation(async ({ ctx, input }) => {
      const { id, ...fields } = input
      const updates: Record<string, unknown> = {}
      if (fields.type !== undefined) updates.type = fields.type
      if (fields.amount !== undefined) updates.amount = fields.amount
      if (fields.currency !== undefined) updates.currency = fields.currency
      if (fields.date !== undefined) updates.date = fields.date
      if (fields.merchant !== undefined) updates.merchant = fields.merchant
      if (fields.note !== undefined) updates.note = fields.note
      if (fields.categoryId !== undefined)
        updates.categoryId = fields.categoryId

      updates.updatedAt = sql`now()`

      const [row] = await ctx.db
        .update(transactions)
        .set(updates)
        .where(
          and(eq(transactions.id, id), eq(transactions.userId, ctx.user.id)),
        )
        .returning()

      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND" })
      }

      return { id: row.id }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const [row] = await ctx.db
        .update(transactions)
        .set({ status: "deleted" as const, updatedAt: sql`now()` })
        .where(
          and(
            eq(transactions.id, input.id),
            eq(transactions.userId, ctx.user.id),
          ),
        )
        .returning({ id: transactions.id })

      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND" })
      }

      return { id: row.id }
    }),
})
