import { createTRPCRouter } from "@/trpc/init"

import { categoriesRouter } from "./categories"
import { dashboardRouter } from "./dashboard"
import { transactionsRouter } from "./transactions"

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  dashboard: dashboardRouter,
  transactions: transactionsRouter,
})

export type AppRouter = typeof appRouter
