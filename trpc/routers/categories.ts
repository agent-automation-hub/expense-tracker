import { and, asc, eq } from "drizzle-orm"
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
})
