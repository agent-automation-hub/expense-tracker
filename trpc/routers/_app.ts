import { createTRPCRouter } from "@/trpc/init"

import { categoriesRouter } from "./categories"

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
})

export type AppRouter = typeof appRouter
