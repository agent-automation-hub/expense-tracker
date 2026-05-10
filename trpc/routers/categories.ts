import { TRPCError } from "@trpc/server"
import { and, asc, eq, sql } from "drizzle-orm"
import { z } from "zod"

import type { CategoryListItem } from "@/lib/categories/types"
import { categories, profiles } from "@/lib/db/schema"

import { createTRPCRouter, protectedProcedure } from "@/trpc/init"

const categoryInput = z.object({
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  icon: z.string().trim().max(40).optional(),
  name: z.string().trim().min(1).max(80),
  scope: z.enum(["expense", "income", "both"]),
})

const categoryListFields = {
  color: categories.color,
  icon: categories.icon,
  id: categories.id,
  name: categories.name,
  scope: categories.scope,
} satisfies Record<keyof CategoryListItem, unknown>

export const categoriesRouter = createTRPCRouter({
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db
      .select(categoryListFields)
      .from(categories)
      .where(
        and(
          eq(categories.userId, ctx.user.id),
          eq(categories.isArchived, false),
        ),
      )
      .orderBy(asc(categories.name))
  }),

  create: protectedProcedure
    .input(categoryInput)
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

      const [category] = await ctx.db
        .insert(categories)
        .values({
          color: input.color,
          icon: input.icon,
          name: input.name,
          scope: input.scope,
          userId: ctx.user.id,
        })
        .returning({
          ...categoryListFields,
        })

      return category
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().trim().min(1).max(80).optional(),
        scope: z.enum(["expense", "income", "both"]).optional(),
        color: z
          .string()
          .regex(/^#[0-9A-Fa-f]{6}$/)
          .nullish(),
        icon: z.string().trim().max(40).nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...fields } = input
      const updates: Record<string, unknown> = {}
      if (fields.name !== undefined) updates.name = fields.name
      if (fields.scope !== undefined) updates.scope = fields.scope
      if (fields.color !== undefined) updates.color = fields.color
      if (fields.icon !== undefined) updates.icon = fields.icon
      updates.updatedAt = sql`now()`

      const [row] = await ctx.db
        .update(categories)
        .set(updates)
        .where(and(eq(categories.id, id), eq(categories.userId, ctx.user.id)))
        .returning(categoryListFields)

      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND" })
      }

      return row
    }),

  archive: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const [row] = await ctx.db
        .update(categories)
        .set({ isArchived: true, updatedAt: sql`now()` })
        .where(
          and(eq(categories.id, input.id), eq(categories.userId, ctx.user.id)),
        )
        .returning({ id: categories.id })

      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND" })
      }

      return { id: row.id }
    }),
})
